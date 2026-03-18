import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_icon from '@/uni_modules/cool-unix/components/cl-icon/cl-icon.uvue'
import _easycom_cl_topbar from '@/uni_modules/cool-unix/components/cl-topbar/cl-topbar.uvue'
import _easycom_cl_image from '@/uni_modules/cool-unix/components/cl-image/cl-image.uvue'
import _easycom_cl_button from '@/uni_modules/cool-unix/components/cl-button/cl-button.uvue'
import _easycom_cl_page from '@/uni_modules/cool-unix/components/cl-page/cl-page.uvue'
import type {ClTreeItem} from "@/uni_modules/cool-unix";
import {isDark, isMp, router, useRefs, useUi} from "@/uni_modules/cool-unix";
import CustomTabbar from "@/components/tabbar.uvue";
import {ref, watch} from 'vue';
import {t} from "@/locale";
import {workshopTree} from "@/components/workshop";
import {request} from "@/core/service";
import {apiPath} from "@/core/apiRouter/path";
import {parseData} from "@/core/utils/parse";
import type {WorkshopRealtimeCollect, WorkshopScada} from "@/core/types";


const __sfc__ = defineComponent({
  __name: 'work',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const ui = useUi();
const refs = useRefs();

const workshopScada = ref<WorkshopScada | null>(null);
const realtimes = ref<WorkshopRealtimeCollect[]>([]);

function setWorkshop() {
  router.to("/pages/equip/workshop_tree");
}

function toScada() {
  if (workshopScada.value == null) {
    return;
  }
  router.to(`/pages/equip/workshop_scada?workshopCode=${workshopTree.selectNode.value.id}`);
}

function loadIframeUrl(workshopCode: string | number | null) {
  if (workshopCode == null || workshopCode == '-1' || workshopCode == -1) {
    workshopScada.value = null;
    return
  }
  request({
    url: apiPath.workshop_scada as string,
    method: "GET",
    data: {
      workshopCode: workshopCode,
      platform: 2
    }
  })
      .then((res) => {
        if (res === null) {
          workshopScada.value = null;
          return;
        }
        const r = parseData<WorkshopScada>(res);
        if (r == null || r.url == null || r.url == "") {
          workshopScada.value = null;
          return
        }
        workshopScada.value = r;
      });
}

function loadRealtime(workshopCode: string | number | null) {
  if (workshopCode == null || workshopCode == '-1' || workshopCode == -1) {
    realtimes.value = [];
    return
  }
  request({
    url: apiPath.workshop_realtime as string,
    method: "GET",
    data: {
      workshopCode: workshopCode
    }
  })
      .then((res) => {
        if (res === null) {
          realtimes.value = [];
          return;
        }
        let r = parseData<WorkshopRealtimeCollect[]>(res);
        if (r == null) {
          realtimes.value = [];
          return
        }
        realtimes.value = r;
      });
}


watch(
    workshopTree.selectNode,
    (val: ClTreeItem | null) => {
      if (val != null) {
        loadIframeUrl(val.id);
        loadRealtime(val.id);
      } else {
        loadIframeUrl(null);
        loadRealtime(null);
      }

    }
)

onLoad(() => {
  loadIframeUrl(workshopTree.selectNode.value.id);
  loadRealtime(workshopTree.selectNode.value.id);
})

return (): any | null => {

const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_icon = resolveEasyComponent("cl-icon",_easycom_cl_icon)
const _component_cl_topbar = resolveEasyComponent("cl-topbar",_easycom_cl_topbar)
const _component_cl_image = resolveEasyComponent("cl-image",_easycom_cl_image)
const _component_cl_button = resolveEasyComponent("cl-button",_easycom_cl_button)
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
            class: _nC(["flex flex-row items-end p-3 flex-1 w-full ml-5", _uM({
    					'pt-0': unref(isMp)()
    				})])
          }), [
            _cE("view", _uM({ class: "flex flex-row flex-1" }), [
              _cV(_component_cl_text, _uM({
                color: "primary",
                pt: {
						className: '-important-text-2xl'
					}
              }), _uM({
                default: withSlotCtx((): any[] => [_tD(unref(t)('场景'))]),
                _: 1 /* STABLE */
              }))
            ]),
            _cE("view", _uM({
              class: _nC(["flex flex-row justify-end ml-3", _uM({
    					'mr-32': unref(isMp)(),
    					'mr-3': !unref(isMp)()
    				})]),
              onClick: setWorkshop
            }), [
              _cV(_component_cl_text, _uM({
                color: "primary",
                pt: {
						className: '-important-text-base ml-2'
					}
              }), _uM({
                default: withSlotCtx((): any[] => [_tD(unref(workshopTree).selectNode.value.label)]),
                _: 1 /* STABLE */
              })),
              _cV(_component_cl_icon, _uM({
                name: "arrow-right-s-line",
                color: "primary",
                pt: {
						className: '-important-text-base mb-1'
					}
              }))
            ], 2 /* CLASS */)
          ], 2 /* CLASS */)
        ]),
        _: 1 /* STABLE */
      }), 8 /* PROPS */, ["background-color", "height"]),
      _cE("view", _uM({ class: "p-2 flex flex-col" }), [
        _cE("view", _uM({ class: "header-card" }), [
          _cV(_component_cl_image, _uM({
            class: "image-wrap",
            src: `/static/icon/workshop.svg`
          }), null, 8 /* PROPS */, ["src"]),
          _cE("view", _uM({ class: "header-info" }), [
            _cE("view", _uM({ class: "scene-header" }), [
              _cE("text", _uM({ class: "sence-name" }), _tD(unref(workshopTree).selectNode.value.label), 1 /* TEXT */),
              _cV(_component_cl_button, _uM({
                icon: "arrow-left-right-line",
                class: "switch-btn",
                onClick: setWorkshop
              }))
            ]),
            _cE("view", _uM({ class: "header-info-item" }), [
              _cE("text", _uM({ class: "name" }), _tD(unref(t)('编号')), 1 /* TEXT */),
              _cE("text", _uM({ class: "value" }), _tD(unref(workshopTree).selectNode.value.id), 1 /* TEXT */)
            ])
          ])
        ]),
        _cE("view", _uM({ class: "operate-card" }), [
          _cE("view", _uM({
            class: _nC(["operate-item", _uM({ disabled: workshopScada.value==null })]),
            onClick: toScada
          }), [
            _cE("view", _uM({ class: "icon-wrap" }), [
              _cV(_component_cl_icon, _uM({
                name: "hospital-line",
                class: "icon"
              }))
            ]),
            _cE("text", _uM({ class: "name" }), _tD(unref(t)('工艺')), 1 /* TEXT */)
          ], 2 /* CLASS */)
        ]),
        isTrue(realtimes.value!=null && realtimes.value.length  > 0)
          ? _cE("view", _uM({
              key: 0,
              class: "attr-card card"
            }), [
              _cE("text", _uM({ class: "card-title" }), _tD(unref(t)('场景属性')), 1 /* TEXT */),
              _cE("view", _uM({ class: "attr-grid" }), [
                _cE(Fragment, null, RenderHelpers.renderList(realtimes.value, (i, idx, __index, _cached): any => {
                  return _cE("view", _uM({
                    key: idx,
                    class: "attr-item"
                  }), [
                    _cV(_component_cl_icon, _uM({
                      name: "pushpin-line",
                      class: "attr-item-pin",
                      color: "primary",
                      pt: { className: '-important-text-base' }
                    })),
                    _cE("text", _uM({ class: "value" }), _tD(i.value == null ? unref(t)("暂未获取") : i.value) + _tD((i.unit != null && i.unit !== '') ? ' ' + i.unit : ''), 1 /* TEXT */),
                    _cE("text", _uM({ class: "name" }), _tD(i.name), 1 /* TEXT */)
                  ])
                }), 128 /* KEYED_FRAGMENT */)
              ])
            ])
          : _cC("v-if", true)
      ]),
      _cV(unref(CustomTabbar))
    ]),
    _: 1 /* STABLE */
  }))
}
}

})
export default __sfc__
const GenPagesIndexWorkStyles = [_uM([["card", _pS(_uM([["boxShadow", "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)"], ["marginLeft", "28rpx"], ["marginRight", "28rpx"], ["marginBottom", "28rpx"], ["borderTopLeftRadius", "28rpx"], ["borderTopRightRadius", "28rpx"], ["borderBottomRightRadius", "28rpx"], ["borderBottomLeftRadius", "28rpx"], ["backgroundColor", "rgba(255,255,255,1)"], ["paddingTop", "28rpx"], ["paddingBottom", "28rpx"]]))], ["header-card", _pS(_uM([["alignItems", "stretch"], ["borderTopLeftRadius", "28rpx"], ["borderTopRightRadius", "28rpx"], ["borderBottomRightRadius", "28rpx"], ["borderBottomLeftRadius", "28rpx"], ["overflow", "hidden"], ["marginTop", "14rpx"], ["display", "flex"], ["flexDirection", "row"], ["boxShadow", "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)"], ["marginLeft", "28rpx"], ["marginRight", "28rpx"], ["marginBottom", "28rpx"], ["backgroundColor", "rgba(255,255,255,1)"], ["paddingTop", "28rpx"], ["paddingBottom", "28rpx"]]))], ["image-wrap", _uM([[".header-card ", _uM([["height", "250rpx"], ["width", "300rpx"], ["marginTop", "28rpx"], ["marginRight", "28rpx"], ["marginBottom", "28rpx"], ["marginLeft", "28rpx"], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"]])]])], ["header-info", _uM([[".header-card ", _uM([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["display", "flex"], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["flexDirection", "column"], ["paddingLeft", "28rpx"], ["paddingRight", "28rpx"], ["paddingTop", "21rpx"], ["paddingBottom", "21rpx"]])]])], ["scene-header", _uM([[".header-card .header-info ", _uM([["marginBottom", "28rpx"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["sence-name", _uM([[".header-card .header-info .scene-header ", _uM([["display", "flex"], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["fontSize", "35rpx"], ["lineHeight", "49rpx"], ["color", "rgba(30,41,59,1)"]])]])], ["switch-btn", _uM([[".header-card .header-info .scene-header ", _uM([["display", "flex"], ["aspectRatio", "1 / 1"]])]])], ["header-info-item", _uM([[".header-card .header-info ", _uM([["borderBottomWidth", 1], ["borderBottomStyle", "solid"], ["borderBottomColor", "rgba(148,163,184,0.12)"], ["marginBottom", "14rpx"], ["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"]])]])], ["name", _uM([[".header-card .header-info .header-info-item ", _uM([["fontSize", "28rpx"], ["lineHeight", "42rpx"], ["color", "rgba(71,85,105,1)"]])], [".disabled ", _uM([["color", "#9ca3af"]])], [".operate-card .operate-item ", _uM([["color", "#6b7280"], ["marginTop", "7rpx"], ["fontSize", "24.5rpx"], ["lineHeight", "35rpx"]])], [".attr-card .attr-grid .attr-item ", _uM([["color", "#64748b"], ["fontSize", "30rpx"], ["paddingRight", "32rpx"]])]])], ["value", _uM([[".header-card .header-info .header-info-item ", _uM([["fontSize", "28rpx"], ["lineHeight", "42rpx"], ["color", "rgba(30,41,59,1)"]])], [".attr-card .attr-grid .alarm-item ", _uM([["color", "#ffffff"], ["fontSize", "24.5rpx"], ["lineHeight", "35rpx"]])], [".attr-card .attr-grid .attr-item ", _uM([["lineHeight", 1.35], ["color", "#0f172a"], ["wordBreak", "break-all"], ["fontSize", "38rpx"], ["paddingRight", "32rpx"]])]])], ["disabled", _pS(_uM([["opacity", 0.3]]))], ["icon-wrap", _uM([[".disabled ", _uM([["backgroundImage", "none"], ["backgroundColor", "#f1f5f9"]])], [".operate-card .operate-item ", _uM([["backgroundImage", "none"], ["backgroundColor", "#f5f5f5"], ["display", "flex"], ["height", "84rpx"], ["width", "84rpx"], ["alignItems", "center"], ["justifyContent", "center"], ["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999], ["paddingTop", "7rpx"], ["paddingRight", "7rpx"], ["paddingBottom", "7rpx"], ["paddingLeft", "7rpx"]])]])], ["icon", _uM([[".disabled ", _uM([["color", "#9ca3af"]])]])], ["operate-card", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["paddingTop", "28rpx"], ["paddingRight", "28rpx"], ["paddingBottom", "28rpx"], ["paddingLeft", "28rpx"], ["boxShadow", "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)"], ["marginLeft", "28rpx"], ["marginRight", "28rpx"], ["marginBottom", "28rpx"], ["borderTopLeftRadius", "28rpx"], ["borderTopRightRadius", "28rpx"], ["borderBottomRightRadius", "28rpx"], ["borderBottomLeftRadius", "28rpx"], ["backgroundColor", "rgba(255,255,255,1)"]]))], ["operate-item", _uM([[".operate-card ", _uM([["width", "20%"], ["marginRight", "35rpx"], ["marginLeft", "35rpx"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"]])]])], ["attr-card", _pS(_uM([["paddingTop", "40rpx"], ["paddingRight", "40rpx"], ["paddingBottom", "44rpx"], ["paddingLeft", "40rpx"]]))], ["card-title", _uM([[".attr-card ", _uM([["fontSize", "40rpx"], ["color", "#1e293b"], ["marginBottom", "28rpx"]])]])], ["attr-grid", _uM([[".attr-card ", _uM([["display", "flex"], ["width", "100%"], ["flexDirection", "row"], ["flexWrap", "wrap"], ["gap", "20rpx"]])]])], ["alarm-item", _uM([[".attr-card .attr-grid ", _uM([["backgroundImage", "none"], ["backgroundColor", "#ba0404"], ["boxSizing", "border-box"], ["marginTop", "14rpx"], ["marginRight", "14rpx"], ["marginBottom", "14rpx"], ["marginLeft", "14rpx"], ["borderTopLeftRadius", "7rpx"], ["borderTopRightRadius", "7rpx"], ["borderBottomRightRadius", "7rpx"], ["borderBottomLeftRadius", "7rpx"], ["paddingTop", "14rpx"], ["paddingRight", "14rpx"], ["paddingBottom", "14rpx"], ["paddingLeft", "14rpx"]])]])], ["attr-item", _uM([[".attr-card .attr-grid ", _uM([["minHeight", "140rpx"], ["backgroundImage", "none"], ["backgroundColor", "#f5f6f8"], ["boxSizing", "border-box"], ["position", "relative"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "28rpx"], ["paddingRight", "52rpx"], ["paddingBottom", "28rpx"], ["paddingLeft", "32rpx"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "flex-start"], ["justifyContent", "center"], ["gap", "12rpx"]])]])], ["attr-item-pin", _uM([[".attr-card .attr-grid .attr-item ", _uM([["position", "absolute"], ["top", "20rpx"], ["right", "20rpx"], ["opacity", 0.6], ["fontSize", "40rpx"]])]])], ["workshop-name", _pS(_uM([["fontSize", "21rpx"], ["lineHeight", "28rpx"], ["color", "rgba(107,114,128,1)"]]))], ["fake-top", _pS(_uM([["position", "fixed"], ["top", 0], ["left", 0], ["height", 44], ["width", "100%"], ["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["zIndex", 999]]))], ["fake-tab", _pS(_uM([["position", "fixed"], ["bottom", 0], ["width", "100%"], ["height", 50], ["backgroundImage", "none"], ["backgroundColor", "#ffffff"]]))]])]
