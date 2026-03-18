import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_topbar from '@/uni_modules/cool-unix/components/cl-topbar/cl-topbar.uvue'
import _easycom_cl_image from '@/uni_modules/cool-unix/components/cl-image/cl-image.uvue'
import _easycom_cl_icon from '@/uni_modules/cool-unix/components/cl-icon/cl-icon.uvue'
import _easycom_cl_page from '@/uni_modules/cool-unix/components/cl-page/cl-page.uvue'
import {ref} from "vue";
import {request} from "@/core/service";
import {apiPath} from "@/core/apiRouter/path";
import {isDark, router, useUi} from "@/uni_modules/cool-unix";
import type {Equip, Message} from "@/core/types";
import {t} from "@/locale";
import {userInfo} from "@/core/store";
import {parseData} from "@/core/utils/parse";


const __sfc__ = defineComponent({
  __name: 'message_detail',
  emits: ["maskAsRead"],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const ui = useUi();
const message = ref<Message | null>(null);
const sourceTitle = ref<String | null>(null);
const sourceId = ref<String | null>(null);
const sourceSubTitle = ref<String | null>(null);

function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

const markAsRead = async (id: string) => {
  await request({
    url: apiPath.message_read as string,
    method: "GET",
    data: {messageId: id}
  }).then((res) => {
    uni.$emit('maskAsRead', id)
  });
};

const equipQuery = async (id: string) => {
  await request({
    url: apiPath.equip_id as string,
    method: "GET",
    data: {id: id}
  }).then((res) => {
    if (res == null) {
      return;
    }
    const r = parseData<Equip>(res);
    if (r == null) {
      return;
    }
    sourceTitle.value = r.name;
    sourceId.value = r.selfCode;
    sourceSubTitle.value = r.workshop?.name
  });
}

const loadDetail = async (id: string) => {
  await request({
    url: apiPath.message_detail as string,
    method: "GET",
    data: {
      id,
      accId: userInfo.value?.id,
    }
  })
      .then((res) => {
        if (res == null) {
          return;
        }
        const r = parseData<Message>(res);
        if (r == null) {
          return;
        }
        message.value = r;
        // 进入即标记为已读（幂等）
        if (r.readStatus == 0) {
          markAsRead(r.id);
        }
        if (r.source == "Equip" && r.sourceId != null) {
          equipQuery(r.sourceId)
        }
      })
};

function toOther() {
  if (message.value == null || message.value.source == null || message.value.sourceId == null) {
    return;
  }

  if (message.value.source == "Equip") {
    router.to('/pages/equip/equip_detail?id=' + message.value.sourceId)
  }
}

onLoad((options) => {
  if (options == null) {
    return
  }
  let id = options.id as string
  loadDetail(id);
});

return (): any | null => {

const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_topbar = resolveEasyComponent("cl-topbar",_easycom_cl_topbar)
const _component_cl_image = resolveEasyComponent("cl-image",_easycom_cl_image)
const _component_cl_icon = resolveEasyComponent("cl-icon",_easycom_cl_icon)
const _component_cl_page = resolveEasyComponent("cl-page",_easycom_cl_page)

  return _cV(_component_cl_page, null, _uM({
    default: withSlotCtx((): any[] => [
      _cV(_component_cl_topbar, _uM({
        fixed: "",
        "show-back": true,
        "safe-area-top": "",
        "background-color": unref(isDark) ? 'black' : 'white'
      }), _uM({
        default: withSlotCtx((): any[] => [
          _cV(_component_cl_text, _uM({
            pt: { className: '-important-text-xl font-bold' },
            title: unref(t)('消息详情')
          }), _uM({
            default: withSlotCtx((): any[] => [" 消息详情 "]),
            _: 1 /* STABLE */
          }), 8 /* PROPS */, ["title"])
        ]),
        _: 1 /* STABLE */
      }), 8 /* PROPS */, ["background-color"]),
      _cE("scroll-view", _uM({
        "scroll-y": "",
        class: "p-4 content-wrapper"
      }), [
        _cE("view", _uM({
          class: _nC(["detail-card", _uM({ 'card-type1': message.value?.type === 1 })])
        }), [
          _cE("view", _uM({ class: "detail-header" }), [
            _cV(_component_cl_image, _uM({
              src: `/static/icon/message/type_${message.value==null?0:message.value.type}.svg`,
              class: "detail-icon"
            }), null, 8 /* PROPS */, ["src"]),
            _cE("view", _uM({ class: "detail-meta" }), [
              _cE("text", _uM({ class: "detail-title" }), _tD(message.value?.title), 1 /* TEXT */),
              _cE("text", _uM({ class: "detail-time" }), _tD(message.value?.createdTime), 1 /* TEXT */)
            ])
          ]),
          sourceTitle.value!=null
            ? _cE("view", _uM({
                key: 0,
                class: "message-source",
                onClick: toOther
              }), [
                _cV(_component_cl_image, _uM({
                  class: "message-source-left",
                  src: `/static/icon/source.svg`
                }), null, 8 /* PROPS */, ["src"]),
                _cE("view", _uM({ class: "message-source-middle" }), [
                  _cE("text", _uM({ class: "text-lg text-gray-600" }), _tD(sourceTitle.value), 1 /* TEXT */),
                  _cE("text", _uM({ class: "text-xs text-gray-500" }), _tD(sourceSubTitle.value), 1 /* TEXT */),
                  _cE("text", _uM({ class: "text-base text-gray-400" }), _tD(sourceId.value), 1 /* TEXT */)
                ]),
                _cV(_component_cl_icon, _uM({
                  class: "message-source-right",
                  name: "arrow-right-s-line",
                  pt: {
						className: '-important-text-lg text-gray-400'
					}
                }))
              ])
            : _cC("v-if", true),
          _cE("view", _uM({ class: "detail-content" }), [
            _cE("text", _uM({ class: "pb-2 text-lg" }), "[" + _tD(unref(t)('报警内容')) + "]:", 1 /* TEXT */),
            _cE("text", null, _tD(message.value?.context), 1 /* TEXT */)
          ])
        ], 2 /* CLASS */)
      ])
    ]),
    _: 1 /* STABLE */
  }))
}
}

})
export default __sfc__
const GenPagesMessageMessageDetailStyles = [_uM([["detail-card", _pS(_uM([["borderTopLeftRadius", "21rpx"], ["borderTopRightRadius", "21rpx"], ["borderBottomRightRadius", "21rpx"], ["borderBottomLeftRadius", "21rpx"], ["backgroundColor", "rgba(255,255,255,1)"], ["paddingTop", "42rpx"], ["paddingRight", "42rpx"], ["paddingBottom", "42rpx"], ["paddingLeft", "42rpx"], ["boxShadow", "rgba(0, 0, 0, 0.1)"]]))], ["card-type1", _pS(_uM([["borderTopWidth", 2], ["borderRightWidth", 2], ["borderBottomWidth", 2], ["borderLeftWidth", 2], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#ba0404"], ["borderRightColor", "#ba0404"], ["borderBottomColor", "#ba0404"], ["borderLeftColor", "#ba0404"]]))], ["detail-header", _pS(_uM([["marginBottom", "42rpx"], ["display", "flex"], ["alignItems", "center"]]))], ["detail-icon", _pS(_uM([["marginRight", "28rpx"], ["height", "84rpx"], ["width", "84rpx"], ["alignItems", "center"]]))], ["detail-meta", _pS(_uM([["marginTop", "35rpx"], ["display", "flex"], ["flexDirection", "column"]]))], ["detail-title", _pS(_uM([["marginBottom", "7rpx"], ["display", "flex"], ["width", "100%"], ["textAlign", "center"], ["fontSize", "42rpx"], ["lineHeight", "56rpx"], ["fontWeight", "700"]]))], ["message-source", _pS(_uM([["marginBottom", "35rpx"], ["display", "flex"], ["width", "100%"], ["flexDirection", "row"], ["alignItems", "center"], ["borderTopLeftRadius", "7rpx"], ["borderTopRightRadius", "7rpx"], ["borderBottomRightRadius", "7rpx"], ["borderBottomLeftRadius", "7rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(243,244,246,1)"], ["borderRightColor", "rgba(243,244,246,1)"], ["borderBottomColor", "rgba(243,244,246,1)"], ["borderLeftColor", "rgba(243,244,246,1)"], ["backgroundColor", "rgba(255,255,255,1)"], ["paddingTop", "14rpx"], ["paddingRight", "14rpx"], ["paddingBottom", "14rpx"], ["paddingLeft", "14rpx"]]))], ["message-source-middle", _pS(_uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["paddingRight", "14rpx"], ["paddingLeft", "14rpx"]]))], ["message-source-left", _pS(_uM([["flexGrow", 0], ["flexShrink", 0], ["flexBasis", "auto"], ["height", "100%"], ["width", "28rpx"], ["alignItems", "center"], ["justifyContent", "center"], ["paddingTop", "21rpx"], ["paddingRight", "21rpx"], ["paddingBottom", "21rpx"], ["paddingLeft", "21rpx"]]))], ["message-source-right", _pS(_uM([["flexGrow", 0], ["flexShrink", 0], ["flexBasis", "auto"], ["height", "100%"], ["width", "35rpx"]]))], ["detail-time", _pS(_uM([["display", "flex"], ["textAlign", "center"], ["fontSize", "24.5rpx"], ["lineHeight", "35rpx"], ["color", "rgba(107,114,128,1)"]]))], ["detail-content", _pS(_uM([["whiteSpace", "pre-wrap"], ["fontSize", "28rpx"], ["lineHeight", 1.625]]))]])]
