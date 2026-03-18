import _easycom_cl_switch from '@/uni_modules/cool-unix/components/cl-switch/cl-switch.uvue'
import _easycom_cl_list_item from '@/uni_modules/cool-unix/components/cl-list-item/cl-list-item.uvue'
import _easycom_cl_list from '@/uni_modules/cool-unix/components/cl-list/cl-list.uvue'
import _easycom_cl_page from '@/uni_modules/cool-unix/components/cl-page/cl-page.uvue'
import {t} from "@/locale";
import {changeNotify, notify_enable} from "@/components/msg-notifier";



const __sfc__ = defineComponent({
  __name: 'notice',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

function onNotifyChange(val: boolean) {
  changeNotify(val);
}

return (): any | null => {

const _component_cl_switch = resolveEasyComponent("cl-switch",_easycom_cl_switch)
const _component_cl_list_item = resolveEasyComponent("cl-list-item",_easycom_cl_list_item)
const _component_cl_list = resolveEasyComponent("cl-list",_easycom_cl_list)
const _component_cl_page = resolveEasyComponent("cl-page",_easycom_cl_page)

  return _cV(_component_cl_page, null, _uM({
    default: withSlotCtx((): any[] => [
      _cE("view", _uM({ class: "p-3" }), [
        _cV(_component_cl_list, null, _uM({
          default: withSlotCtx((): any[] => [
            _cV(_component_cl_list_item, _uM({
              label: unref(t)('开启通知')
            }), _uM({
              default: withSlotCtx((): any[] => [
                _cV(_component_cl_switch, _uM({
                  modelValue: unref(notify_enable),
                  "onUpdate:modelValue": $event => {trySetRefValue(notify_enable, $event)},
                  onChange: onNotifyChange
                }), null, 8 /* PROPS */, ["modelValue"])
              ]),
              _: 1 /* STABLE */
            }), 8 /* PROPS */, ["label"])
          ]),
          _: 1 /* STABLE */
        }))
      ])
    ]),
    _: 1 /* STABLE */
  }))
}
}

})
export default __sfc__
const GenPagesSetNoticeStyles = []
