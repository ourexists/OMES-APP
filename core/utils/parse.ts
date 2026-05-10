import {isArray, isObject} from "@/uni_modules/cool-unix";

/**
 * Android：单对象用 JSON.parseObject 转成宿主类型（如 Equip）。
 * 顶层数组请用 parseDataArray：isObject 排除数组，直接 as 会导致元素仍是 UTSJSONObject 并在运行时 ClassCastException。
 */
export function parseData<T>(data: any | null): T | null {
    if (data == null) {
        return null;
    }
    // #ifdef APP-ANDROID
    if (isObject(data)) {
        // @ts-ignore
        return JSON.parseObject<T>(JSON.stringify(data));
    }
    return data as T;
    // #endif

    // #ifndef APP-ANDROID
    return data as T;
    // #endif
}

/**
 * Android：对象数组逐项 JSON.parseObject（元素类型为泛型 E），避免 UTSJSONObject 无法 cast 为 E。
 */
export function parseDataArray<E>(data: any | null): E[] | null {
    if (data == null) {
        return null;
    }
    // #ifdef APP-ANDROID
    if (!isArray(data)) {
        return null;
    }
    const arr = data as any[];
    const out: E[] = [];
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (el == null) {
            continue;
        }
        if (isObject(el)) {
            // @ts-ignore
            const parsed = JSON.parseObject<E>(JSON.stringify(el));
            if (parsed != null) {
                out.push(parsed);
            }
        } else {
            out.push(el as E);
        }
    }
    return out;
    // #endif

    // #ifndef APP-ANDROID
    return data as E[];
    // #endif
}

export function formatDate(date: Date | null): string {
    if (date == null) {
        return '';
    }
    const year = date.getFullYear();  // 获取年份
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // 获取月份，+1 因为月份从 0 开始
    const day = date.getDate().toString().padStart(2, '0');  // 获取日期
    const hours = date.getHours().toString().padStart(2, '0');  // 获取小时
    const minutes = date.getMinutes().toString().padStart(2, '0');  // 获取分钟
    const seconds = date.getSeconds().toString().padStart(2, '0');  // 获取秒

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  // 格式化为 yyyy-MM-dd HH:mm:ss
}

export function parseDate(dateformat: string): Date {
    return new Date(dateformat.replace(' ', 'T'));
}