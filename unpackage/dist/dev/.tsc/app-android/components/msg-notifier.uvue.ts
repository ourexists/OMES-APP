import _easycom_cl_icon from '@/uni_modules/cool-unix/components/cl-icon/cl-icon.uvue'
import _easycom_cl_noticebar from '@/uni_modules/cool-unix/components/cl-noticebar/cl-noticebar.uvue'
import {notify_message, notify_visible} from "@/components/msg-notifier";


const __sfc__ = defineComponent({
  __name: 'msg-notifier',

  name: "msg-notifier"
,
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;




return (): any | null => {

const _component_cl_icon = resolveEasyComponent("cl-icon",_easycom_cl_icon)
const _component_cl_noticebar = resolveEasyComponent("cl-noticebar",_easycom_cl_noticebar)

  return isTrue(unref(notify_visible))
    ? _cE("view", _uM({
        key: 0,
        class: "msgNotifier"
      }), [
        _cV(_component_cl_icon, _uM({
          name: "notification-4-line",
          color: "primary"
        })),
        _cV(_component_cl_noticebar, _uM({
          speed: 30,
          text: unref(notify_message)
        }), null, 8 /* PROPS */, ["text"])
      ])
    : _cC("v-if", true)
}
}

})
export default __sfc__
const GenComponentsMsgNotifierStyles = [_uM([["msgNotifier", _pS(_uM([["width", "80%"], ["marginTop", 0], ["marginRight", "10%"], ["marginBottom", 0], ["marginLeft", "10%"], ["boxSizing", "border-box"], ["backgroundImage", "none"], ["backgroundColor", "rgba(134,239,172,0.2)"], ["zIndex", 50], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["borderTopLeftRadius", "28rpx"], ["borderTopRightRadius", "28rpx"], ["borderBottomRightRadius", "28rpx"], ["borderBottomLeftRadius", "28rpx"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(243,244,246,1)"], ["borderRightColor", "rgba(243,244,246,1)"], ["borderBottomColor", "rgba(243,244,246,1)"], ["borderLeftColor", "rgba(243,244,246,1)"], ["paddingTop", "21rpx"], ["paddingRight", "21rpx"], ["paddingBottom", "21rpx"], ["paddingLeft", "21rpx"]]))], ["cl-icon", _uM([[".msgNotifier ", _uM([["width", "20%"], ["flexGrow", 0], ["flexShrink", 0], ["flexBasis", "auto"], ["textAlign", "center"], ["fontWeight", "700"]])]])], ["cl-noticebar", _uM([[".msgNotifier ", _uM([["marginLeft", "28rpx"], ["width", "80%"], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"]])]])]])]
