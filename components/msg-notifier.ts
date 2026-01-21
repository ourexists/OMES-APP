import {config, isDev} from "@/config";
import {apiPath} from "@/core/apiRouter/path";
import {userInfo, useStore} from "@/core/store";
import {ref} from "vue";
import {storage} from "@/uni_modules/cool-unix";
import {request} from "@/core/service";
import {parseData} from "@/core/utils/parse";
import type {Message} from "@/core/types";


// #ifdef H5
let controller: any | null = null;
// #endif

let isStop: boolean = false;
let isConnected = false;
let isConnecting = false;

export const notifyQueue = ref<Message[]>([]);
export const notify_message = ref<string>("");
export const notify_visible = ref<boolean>(false);
export const notify_enable = ref<boolean>(true);

export function initNotifyEnable() {
    const saved = storage.get("notify_enable");

    if (saved == null) {
        notify_enable.value = true;
    } else if (typeof saved === "boolean") {
        notify_enable.value = saved;
    } else if (typeof saved === "number") {
        notify_enable.value = saved !== 0;
    } else if (typeof saved === "string") {
        notify_enable.value = saved === "true" || saved === "1";
    } else {
        notify_enable.value = true; // 兜底
    }
}

initNotifyEnable();


export async function connectMessage() {
    console.log("sse connect start")
    if (isConnected || isConnecting) {
        console.log("sse connect is connecting");
        return;
    }
    isStop = false;
    isConnecting = true;

    const {user} = useStore();

    // // #ifdef H5
    // const url = config.baseUrl + apiPath.message_listen;
    // const header = {
    //     Authorization: user.token,
    //     language: locale.value,
    //     "x-era-platform": config.platform,
    //     "x-route-tenant": 0
    // };
    // if (typeof controller !== "undefined") {
    //     controller = new AbortController();
    // }
    // const signal = controller.signal;
    // try {
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             ...header,
    //             Accept: "text/event-stream",
    //             "Cache-Control": "no-cache"
    //         },
    //         signal
    //     })
    //     isConnected = true;
    //     const reader = response.body.getReader();
    //     const decoder = new TextDecoder("utf-8");
    //
    //     while (!isStop) {
    //         const {done, value} = await reader.read();
    //         if (done) throw new Error("sse server disconnect=======");
    //
    //         const chunk = decoder.decode(value, {stream: true});
    //         const lines = chunk.split("\n");
    //
    //         lines.forEach(line => {
    //             if (line.startsWith("data:")) {
    //                 const msg = line.slice(5).trim();
    //                 const m = parse<Message>(msg)!;
    //                 pushNotifyQueue(m);
    //             }
    //         });
    //     }
    // } catch (err) {
    //     console.warn("sse connect error，3s reconnect...", err);
    //     isConnected = false;
    //     setTimeout(() => connectMessage(), 3000);
    // } finally {
    //     isConnecting = false;
    // }
    // // #endif

    function poll() {
        if (isStop) return;
        try {
            const now = Date.now();
            request({
                url: apiPath.message_page as string,
                method: "POST",
                data: {
                    page: 1,
                    pageSize: 10,
                    accId: userInfo.value?.id,
                    platform: config.platform,
                    createdTimeStart: formatDateTime(now - 3000),
                    createdTimeEnd: formatDateTime(now)
                }
            })
                .then((res) => {
                    if (res !== null) {
                        const r = parseData<Message[]>(res);
                        if (r == null) {
                            return
                        }
                        r.forEach((msg: Message) => pushNotifyQueue(msg));
                    }
                })
                .catch((err) => {
                    console.error(err)
                });
        } catch (err) {
            console.warn("poll error", err);
        } finally {
            setTimeout(() => {
                poll()
            }, 3000); // 3秒轮询一次
        }
    }

    poll();
}

export function formatDateTime(ts: number): string {
    const d = new Date(ts);
    const p = (n: number) => n < 10 ? '0' + n : '' + n;

    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

export function disconnectMessage() {
    console.log("sse client disconnect=======");
    isStop = true;
    // #ifdef H5
    if (controller) {
        controller.abort();
        controller = null;
    }
    // #endif
    isConnected = false;
    isConnecting = false;
}

export function pushNotifyQueue(msg: Message) {
    notifyQueue.value.push(msg);
    //保持数据容量不超过10条,防止内存问题
    if (notifyQueue.value.length > 10) {
        notifyQueue.value.shift();
    }
}

export function onNotify() {

    if (notifyQueue.value.length <= 0) {
        notify_visible.value = false;
    } else {
        const msg = notifyQueue.value.shift();
        if (msg == null) {
            return
        }
        notify_visible.value = notify_enable.value ?? true;
        if (isDev) {
            console.log(JSON.stringify(msg) + "-" + notify_visible.value + "-" + notify_enable.value)
        }
        notify_message.value = msg.context;
    }
}

setInterval(() => {
    onNotify();
}, 8000);

function clear() {
    notifyQueue.value = [];
    notify_message.value = '';
    notify_visible.value = false;
}

export function changeNotify(val: boolean) {
    storage.set("notify_enable", val, 0);
    notify_enable.value = val;
}