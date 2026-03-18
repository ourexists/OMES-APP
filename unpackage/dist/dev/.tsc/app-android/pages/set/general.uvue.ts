import _easycom_cl_list_item from '@/uni_modules/cool-unix/components/cl-list-item/cl-list-item.uvue'
import _easycom_cl_list from '@/uni_modules/cool-unix/components/cl-list/cl-list.uvue'
import _easycom_cl_page from '@/uni_modules/cool-unix/components/cl-page/cl-page.uvue'
import {isDark, useRefs} from "@/uni_modules/cool-unix";
import {t} from "@/locale";
import LocaleSet from "@/components/locale-set.uvue";
import SizeSet from "@/components/size-set.uvue";


const __sfc__ = defineComponent({
  __name: 'general',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const refs = useRefs();

function setLocale() {
  refs.open("localeSet");
}

function setSize() {
  refs.open("sizeSet");
}

return (): any | null => {

const _component_cl_list_item = resolveEasyComponent("cl-list-item",_easycom_cl_list_item)
const _component_cl_list = resolveEasyComponent("cl-list",_easycom_cl_list)
const _component_cl_page = resolveEasyComponent("cl-page",_easycom_cl_page)

  return _cV(_component_cl_page, null, _uM({
    default: withSlotCtx((): any[] => [
      _cE("view", _uM({ class: "p-3" }), [
        _cV(_component_cl_list, null, _uM({
          default: withSlotCtx((): any[] => [
            _cV(_component_cl_list_item, _uM({
              label: unref(t)('多语言'),
              arrow: "",
              hoverable: "",
              onClick: setLocale
            }), null, 8 /* PROPS */, ["label"]),
            _cV(_component_cl_list_item, _uM({
              label: unref(t)('字体大小'),
              arrow: "",
              hoverable: "",
              onClick: setSize
            }), null, 8 /* PROPS */, ["label"])
          ]),
          _: 1 /* STABLE */
        }))
      ]),
      _cV(unref(LocaleSet), _uM({
        ref: unref(refs).set('localeSet')
      }), null, 512 /* NEED_PATCH */),
      _cV(unref(SizeSet), _uM({
        ref: unref(refs).set('sizeSet')
      }), null, 512 /* NEED_PATCH */)
    ]),
    _: 1 /* STABLE */
  }))
}
}

})
export default __sfc__
const GenPagesSetGeneralStyles = []
