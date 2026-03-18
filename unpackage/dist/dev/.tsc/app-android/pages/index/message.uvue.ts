import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_icon from '@/uni_modules/cool-unix/components/cl-icon/cl-icon.uvue'
import _easycom_cl_topbar from '@/uni_modules/cool-unix/components/cl-topbar/cl-topbar.uvue'
import _easycom_cl_image from '@/uni_modules/cool-unix/components/cl-image/cl-image.uvue'
import _easycom_cl_page from '@/uni_modules/cool-unix/components/cl-page/cl-page.uvue'
import CustomTabbar from "@/components/tabbar.uvue";
import type {MessageSetPayload} from "@/pages/index/components/message-set.uvue";
import MessageSet from "@/pages/index/components/message-set.uvue";
import {t} from "@/locale";
import {ref} from "vue";
import {request} from "@/core/service";
import {apiPath} from "@/core/apiRouter/path";
import {userInfo} from "@/core/store";
import {config} from "@/config";
import {isDark, isMp, router, useRefs, useUi} from "@/uni_modules/cool-unix";
import type {Message} from "@/core/types";
import {parseData} from "@/core/utils/parse";


const __sfc__ = defineComponent({
  __name: 'message',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;


const refs = useRefs();
const page = ref(1)
const pageSize = 10
const list = ref<Message[]>([])
const loading = ref(false)
const hasMore = ref(true)
// 跟踪当前已展开的卡片 id
const readStatus = ref<number | null>(null)

const ui = useUi();

function setMessage() {
  refs.open("messageSet");
}

const loadData = async (isClear: boolean) => {
  if (loading.value) {
    return
  }
  loading.value = true
  // 这里可以替换成你的实际接口请求
  try {
    await request({
      url: apiPath.message_page as string,
      method: "POST",
      data: {
        page: page.value,
        pageSize: pageSize,
        accId: userInfo.value?.id,
        platform: config.platform,
        readStatus: readStatus.value == -1 ? null : readStatus.value
      }
    })
        .then((res) => {
          if (res === null) {
            if (isClear) {
              list.value = [];
            }
            return;
          }
          const r = parseData<Message[]>(res);
          if (r === null) {
            if (isClear) {
              list.value = [];
            }
            return
          }
          if (isClear) {
            list.value = r;
          } else {
            list.value.push(...r);
          }
          if (r.length < pageSize) {
            hasMore.value = false
          } else {
            hasMore.value = true
            page.value++
          }
        })
        .catch((err) => {
          hasMore.value = true;
          page.value = 1;
          list.value = [];
        });
  } finally {
    loading.value = false
  }
}

const reloadData = async () => {
  page.value = 1;
  await loadData(true);
}

const loadMore = async () => {
  if (!hasMore.value) {
    return
  }
  await loadData(false);
}

onLoad(() => {
  reloadData();
  uni.$on("maskAsRead", (id: string) => {
    const index = list.value.findIndex(item => item.id == id);
    if (index !== -1) {
      list.value[index].readStatus = 1;
      list.value = [...list.value];
    }
  })
})

// 监听页面滚动到底（uni-app写法）
onReachBottom(() => {
  loadMore()
})

onPullDownRefresh(() => {
  reloadData();
  uni.stopPullDownRefresh();
})

function onMessageChange(payload: MessageSetPayload) {
  if (readStatus.value === payload.status) {
    return
  }
  readStatus.value = payload.status;
  reloadData();
}

return (): any | null => {

const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_icon = resolveEasyComponent("cl-icon",_easycom_cl_icon)
const _component_cl_topbar = resolveEasyComponent("cl-topbar",_easycom_cl_topbar)
const _component_cl_image = resolveEasyComponent("cl-image",_easycom_cl_image)
const _component_cl_page = resolveEasyComponent("cl-page",_easycom_cl_page)

  return _cV(_component_cl_page, null, _uM({
    default: withSlotCtx((): any[] => [
      _cV(_component_cl_topbar, _uM({
        fixed: "",
        "background-color": unref(isDark)? 'black': 'white',
        "show-back": false,
        "safe-area-top": "",
        height: unref(isMp)() ? null : 100,
        pt: {
				className: '-important-z-50'
			}
      }), _uM({
        default: withSlotCtx((): any[] => [
          _cE("view", _uM({
            class: _nC(["flex flex-row items-center justify-center p-3 w-full", _uM({
					'pt-0': unref(isMp)()
				})]),
            onClick: setMessage
          }), [
            _cV(_component_cl_text, _uM({
              color: "primary",
              pt: {
						className: '-important-text-xl'
					},
              title: unref(t)('消息')
            }), _uM({
              default: withSlotCtx((): any[] => [_tD(unref(t)('消息'))]),
              _: 1 /* STABLE */
            }), 8 /* PROPS */, ["title"]),
            _cV(_component_cl_icon, _uM({
              name: "bar-chart-horizontal-line",
              color: "primary"
            }))
          ], 2 /* CLASS */)
        ]),
        _: 1 /* STABLE */
      }), 8 /* PROPS */, ["background-color", "height"]),
      _cE("view", _uM({ class: "p-3" }), [
        _cE(Fragment, null, RenderHelpers.renderList(list.value, (item, __key, __index, _cached): any => {
          return _cE("view", _uM({
            key: item.id,
            class: "swipe-wrapper",
            onClick: () => {unref(router).to('/pages/message/message_detail?id=' + item.id)}
          }), [
            _cE("view", _uM({
              class: _nC(["card", _uM({ 'card-type1': item.type == 1 })])
            }), [
              _cE("view", _uM({ class: "message-icon" }), [
                _cV(_component_cl_image, _uM({
                  src: `/static/icon/message/type_${item?.type}.svg`,
                  class: "detail-icon"
                }), null, 8 /* PROPS */, ["src"])
              ]),
              _cE("view", _uM({ class: "message-content" }), [
                _cE("text", _uM({ class: "card-title" }), _tD(item.title), 1 /* TEXT */),
                _cE("text", _uM({ class: "card-time" }), _tD(item.createdTime), 1 /* TEXT */),
                _cE("text", _uM({ class: "card-content" }), _tD(item.context), 1 /* TEXT */)
              ]),
              item.readStatus == 0
                ? _cE("view", _uM({
                    key: 0,
                    class: "dot"
                  }))
                : _cC("v-if", true)
            ], 2 /* CLASS */)
          ], 8 /* PROPS */, ["onClick"])
        }), 128 /* KEYED_FRAGMENT */),
        isTrue(loading.value)
          ? _cE("text", _uM({
              key: 0,
              class: "text-center p-2 text-gray-300"
            }), "加载中…")
          : _cC("v-if", true)
      ]),
      _cV(unref(CustomTabbar)),
      _cV(unref(MessageSet), _uM({
        ref: unref(refs).set('messageSet'),
        status: readStatus.value,
        onChange: onMessageChange
      }), null, 8 /* PROPS */, ["status"])
    ]),
    _: 1 /* STABLE */
  }))
}
}

})
export default __sfc__
const GenPagesIndexMessageStyles = [_uM([["card", _pS(_uM([["height", "280rpx"], ["marginBottom", "28rpx"], ["display", "flex"], ["flexWrap", "wrap"], ["borderTopLeftRadius", "21rpx"], ["borderTopRightRadius", "21rpx"], ["borderBottomRightRadius", "21rpx"], ["borderBottomLeftRadius", "21rpx"], ["backgroundColor", "rgba(255,255,255,1)"], ["paddingTop", "28rpx"], ["paddingRight", "28rpx"], ["paddingBottom", "28rpx"], ["paddingLeft", "28rpx"], ["boxShadow", "rgba(0, 0, 0, 0.1)"]]))], ["message-icon", _pS(_uM([["width", "30%"], ["display", "flex"], ["height", "100%"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["message-content", _pS(_uM([["width", "70%"], ["display", "flex"], ["height", "100%"]]))], ["card-title", _pS(_uM([["marginBottom", "14rpx"], ["fontSize", "42rpx"], ["lineHeight", "56rpx"], ["fontWeight", "700"]]))], ["card-time", _pS(_uM([["marginBottom", "28rpx"], ["fontSize", "24.5rpx"], ["lineHeight", "35rpx"]]))], ["card-content", _pS(_uM([["fontSize", "28rpx"], ["lineHeight", "42rpx"], ["fontWeight", "400"]]))], ["card-type1", _pS(_uM([["borderTopWidth", 2], ["borderRightWidth", 2], ["borderBottomWidth", 2], ["borderLeftWidth", 2], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#ba0404"], ["borderRightColor", "#ba0404"], ["borderBottomColor", "#ba0404"], ["borderLeftColor", "#ba0404"]]))], ["card-icon", _pS(_uM([["marginRight", "28rpx"], ["width", "50%"]]))], ["swipe-wrapper", _pS(_uM([["position", "relative"]]))], ["dot", _pS(_uM([["position", "absolute"], ["right", "42rpx"], ["top", "42rpx"], ["height", "21rpx"], ["width", "21rpx"], ["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999], ["backgroundColor", "rgba(239,68,68,1)"]]))]])]
