import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_topbar from '@/uni_modules/cool-unix/components/cl-topbar/cl-topbar.uvue'
import _easycom_cl_tree from '@/uni_modules/cool-unix/components/cl-tree/cl-tree.uvue'
import _easycom_cl_page from '@/uni_modules/cool-unix/components/cl-page/cl-page.uvue'
import {isDark, isMp, router, useRefs, useUi} from "@/uni_modules/cool-unix";
import {t} from "@/locale";
import {ref} from "vue";
import {workshopTree} from "@/components/workshop";


const __sfc__ = defineComponent({
  __name: 'workshop_tree',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const ui = useUi();
const refs = useRefs();

const treeRef = ref<ClTreeComponentPublicInstance | null>(null);

function confirmSelect() {
  ui.showLoading(t('切换中'))
  workshopTree.selectConfirm();
  setTimeout(() => {
    router.back();
    ui.hideLoading()
  }, 300)
}

onLoad(() => {
  workshopTree.loadWorkshopTree();
})


return (): any | null => {

const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_topbar = resolveEasyComponent("cl-topbar",_easycom_cl_topbar)
const _component_cl_tree = resolveEasyComponent("cl-tree",_easycom_cl_tree)
const _component_cl_page = resolveEasyComponent("cl-page",_easycom_cl_page)

  return _cV(_component_cl_page, null, _uM({
    default: withSlotCtx((): any[] => [
      _cV(_component_cl_topbar, _uM({
        fixed: "",
        "background-color": unref(isDark)? 'black': 'white',
        "show-back": true,
        "safe-area-top": "",
        height: unref(isMp)() ? null : 100,
        pt: {
    				className: '-important-z-50'
    			}
      }), _uM({
        default: withSlotCtx((): any[] => [
          _cE("view", _uM({
            class: _nC(["w-full flex flex-row items-end", _uM({
    					'pt-0': unref(isMp)()
    				})])
          }), [
            _cE("view", _uM({ class: "flex flex-row justify-center flex-1" }), [
              _cV(_component_cl_text, _uM({
                color: "primary",
                pt: {
						className: '-important-text-xl ml-2'
					}
              }), _uM({
                default: withSlotCtx((): any[] => [_tD(unref(t)('选择场景'))]),
                _: 1 /* STABLE */
              }))
            ]),
            _cE("view", _uM({
              class: _nC(["flex flex-row justify-end", _uM({
						'mr-32': unref(isMp)(),
						'mr-10': !unref(isMp)()
					})]),
              onClick: confirmSelect
            }), [
              _cV(_component_cl_text, _uM({
                color: "primary",
                pt: {
						className: '-important-text-base ml-2'
					}
              }), _uM({
                default: withSlotCtx((): any[] => [_tD(unref(t)('确定'))]),
                _: 1 /* STABLE */
              }))
            ], 2 /* CLASS */)
          ], 2 /* CLASS */)
        ]),
        _: 1 /* STABLE */
      }), 8 /* PROPS */, ["background-color", "height"]),
      _cE("view", _uM({ class: "tree overflow-y-auto" }), [
        _cV(_component_cl_tree, _uM({
          ref_key: "treeRef",
          ref: treeRef,
          list: unref(workshopTree).tree.value,
          icon: "hospital-line",
          expandIcon: "hospital-line",
          pt: {className:'overflow-y-auto'}
        }), null, 8 /* PROPS */, ["list"])
      ])
    ]),
    _: 1 /* STABLE */
  }))
}
}

})
export default __sfc__
const GenPagesEquipWorkshopTreeStyles = [_uM([["tree", _pS(_uM([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#ebedf0"], ["borderRightColor", "#ebedf0"], ["borderBottomColor", "#ebedf0"], ["borderLeftColor", "#ebedf0"], ["boxShadow", "0 2rpx 6rpx rgba(0, 0, 0, 0.1)"], ["marginTop", "14rpx"], ["marginRight", "14rpx"], ["marginBottom", "14rpx"], ["marginLeft", "14rpx"], ["height", "100%"], ["borderTopLeftRadius", "21rpx"], ["borderTopRightRadius", "21rpx"], ["borderBottomRightRadius", "21rpx"], ["borderBottomLeftRadius", "21rpx"]]))]])]

import { ClTreeComponentPublicInstance  } from "@/uni_modules/cool-unix/components/cl-tree/cl-tree.uvue"