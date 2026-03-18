import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_topbar from '@/uni_modules/cool-unix/components/cl-topbar/cl-topbar.uvue'
import _easycom_cl_icon from '@/uni_modules/cool-unix/components/cl-icon/cl-icon.uvue'
import _easycom_cl_page from '@/uni_modules/cool-unix/components/cl-page/cl-page.uvue'
import {ref} from 'vue'
import type {Equip, EquipAttr} from "@/core/types";
import {t} from "@/locale";
import {request} from "@/core/service";
import {apiPath} from "@/core/apiRouter/path";
import {parseData} from "@/core/utils/parse";
import EquipBadge from "@/pages/index/components/equip-badge.uvue";
import * as equipParser from '@/core/utils/equipParser';
import {isDark, isMp, router, useRefs, useUi} from "@/uni_modules/cool-unix";




const __sfc__ = defineComponent({
  __name: 'equip_detail',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const ui = useUi();
const refs = useRefs();

let equipId: string = ''
const equip = ref<Equip>({
  id: '-1',
  selfCode: '-1',
  name: t('无法识别'),
  type: 0,
  runState: 0,
  alarmState: 0,
  onlineState: 0
}) // 接接口获取

function attrValueWithUnit(attr: EquipAttr) {
  const val = attr.value == null ? t("暂未获取") : attr.value;
  const u = attr.unit;
  if (u != null && u !== '') return val + ' ' + u;
  return val;
}

function loadDetail() {
  request({
    url: apiPath.equip_realtime as string,
    method: "GET",
    data: {
      id: equipId,
    }
  }).then((res) => {
    if (res === null) {
      return;
    }
    let r = parseData<Equip>(res);
    if (r != null) {
      equip.value = r;
    }
  });
}

function copySn() {
  if (equip.value?.selfCode == null) {
    return;
  }

  uni.setClipboardData({
    data: equip.value.selfCode,
    success() {
      uni.showToast({
        title: t('已复制'),
        icon: 'success',
        duration: 1200
      });
    }
  });
}

function typeImage(equip: Equip): string {
  return equipParser.equipImage(equip);
}

onLoad((options) => {
  if (options == null) {
    return
  }
  equipId = options.id as string
  loadDetail()
})

function toEquipHistory() {
  if (equip.value!.attrs == null || equip.value!.attrs.length <= 0) {
    return;
  }
  router.to('/pages/equip/equip_collect?sn=' + equip.value.selfCode)
}

function openAttrChart(attr: EquipAttr) {
  if (equip.value?.selfCode == null || attr?.name == null) return
  const url = '/pages/equip/equip_collect?sn=' + UTSAndroid.consoleDebugError(encodeURIComponent(equip.value.selfCode), " at pages/equip/equip_detail.uvue:228") + '&attr=' + UTSAndroid.consoleDebugError(encodeURIComponent(attr.name), " at pages/equip/equip_detail.uvue:228")
  router.to(url)
}


return (): any | null => {

const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_topbar = resolveEasyComponent("cl-topbar",_easycom_cl_topbar)
const _component_cl_icon = resolveEasyComponent("cl-icon",_easycom_cl_icon)
const _component_cl_page = resolveEasyComponent("cl-page",_easycom_cl_page)

  return _cE("scroll-view", _uM({
    style: _nS(_uM({ flex: 1 })),
    "scroll-y": "true",
    "scroll-x": "false",
    "scroll-with-animation": true
  }), [
    _cV(_component_cl_page, null, _uM({
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
              class: _nC(["flex flex-row items-center justify-center p-3 flex-1 w-full", _uM({
    					'pt-0': unref(isMp)()
    				})])
            }), [
              _cV(_component_cl_text, _uM({
                color: "primary",
                pt: {
						className: '-important-text-xl ml-2'
					}
              }), _uM({
                default: withSlotCtx((): any[] => [_tD(equip.value.name)]),
                _: 1 /* STABLE */
              }))
            ], 2 /* CLASS */)
          ]),
          _: 1 /* STABLE */
        }), 8 /* PROPS */, ["background-color", "height"]),
        _cE("view", _uM({ class: "header-card card" }), [
          _cE("view", _uM({ class: "header" }), [
            _cE("image", _uM({
              src: typeImage(equip.value),
              mode: "aspectFill",
              class: "header-img"
            }), null, 8 /* PROPS */, ["src"]),
            _cV(unref(EquipBadge), _uM({
              equip: equip.value,
              class: "-important-text-xl"
            }), null, 8 /* PROPS */, ["equip"])
          ]),
          _cE("view", _uM({ class: "header-info" }), [
            _cE("text", _uM({ class: "device-name" }), _tD(equip.value!.name), 1 /* TEXT */),
            _cE("view", _uM({ class: "header-info-item" }), [
              _cE("text", _uM({ class: "name" }), _tD(unref(t)('编号')), 1 /* TEXT */),
              _cE("view", _uM({ class: "sn-wrap" }), [
                _cE("text", _uM({ class: "device-sn" }), _tD(equip.value!.selfCode), 1 /* TEXT */),
                _cE("text", _uM({
                  class: "copy-btn",
                  onClick: copySn
                }), _tD(unref(t)('复制')), 1 /* TEXT */)
              ])
            ]),
            _cE("view", _uM({ class: "header-info-item" }), [
              _cE("text", _uM({ class: "name" }), _tD(unref(t)('场景')), 1 /* TEXT */),
              _cE("text", _uM({ class: "value" }), _tD(equip.value!.workshop?.name), 1 /* TEXT */)
            ])
          ])
        ]),
        _cE("view", _uM({ class: "status-card card" }), [
          _cE("view", _uM({ class: "status-item" }), [
            _cE("text", _uM({ class: "label" }), _tD(unref(t)('在线状态')), 1 /* TEXT */),
            _cE("view", _uM({
              class: _nC(["dot shadow", equip.value!.onlineState==1 ? 'online' : 'offline'])
            }), null, 2 /* CLASS */)
          ]),
          _cE("view", _uM({ class: "status-item" }), [
            _cE("text", _uM({ class: "label" }), _tD(unref(t)('运行状态')), 1 /* TEXT */),
            _cE("view", _uM({
              class: _nC(["dot shadow", equip.value!.onlineState==0 ? 'offline': equip.value!.runState == 1 ? 'run' : 'stopped'])
            }), null, 2 /* CLASS */)
          ]),
          _cE("view", _uM({ class: "status-item" }), [
            _cE("text", _uM({ class: "label" }), _tD(unref(t)('报警状态')), 1 /* TEXT */),
            _cE("view", _uM({
              class: _nC(["dot shadow", equip.value!.onlineState==0 ? 'offline': equip.value!.alarmState == 1 ? 'alarm' : 'offline'])
            }), null, 2 /* CLASS */)
          ])
        ]),
        isTrue(equip.value!.alarmTexts != null && equip.value!.alarmTexts.length >0)
          ? _cE("view", _uM({
              key: 0,
              class: "card attr-card"
            }), [
              _cE("text", _uM({ class: "card-title" }), _tD(unref(t)('实时报警')), 1 /* TEXT */),
              _cE("view", _uM({ class: "attr-grid" }), [
                _cE(Fragment, null, RenderHelpers.renderList(equip.value!.alarmTexts, (i2, idx2, __index, _cached): any => {
                  return _cE("view", _uM({
                    key: idx2,
                    class: "alarm-item"
                  }), [
                    _cE("text", _uM({ class: "value" }), _tD(i2), 1 /* TEXT */)
                  ])
                }), 128 /* KEYED_FRAGMENT */)
              ])
            ])
          : _cC("v-if", true),
        _cE("view", _uM({ class: "operate-card" }), [
          _cE("view", _uM({
            class: _nC(["operate-item", _uM({ disabled: equip.value!.attrs == null || equip.value!.attrs.length<=0 })]),
            onClick: toEquipHistory
          }), [
            _cE("view", _uM({ class: "icon-wrap" }), [
              _cV(_component_cl_icon, _uM({
                name: "hospital-line",
                class: "icon"
              }))
            ]),
            _cE("text", _uM({ class: "name" }), _tD(unref(t)('历史')), 1 /* TEXT */)
          ], 2 /* CLASS */)
        ]),
        isTrue(equip.value!.attrs != null && equip.value!.attrs.length >0)
          ? _cE("view", _uM({
              key: 1,
              class: "attr-card card"
            }), [
              _cE("text", _uM({ class: "card-title" }), _tD(unref(t)('实时数据')), 1 /* TEXT */),
              _cE("view", _uM({ class: "attr-grid" }), [
                _cE(Fragment, null, RenderHelpers.renderList(equip.value!.attrs, (i, idx, __index, _cached): any => {
                  return _cE("view", _uM({
                    key: idx,
                    class: "attr-item attr-item-clickable",
                    onClick: () => {openAttrChart(i)}
                  }), [
                    _cV(_component_cl_icon, _uM({
                      name: "pushpin-line",
                      class: "attr-item-pin",
                      color: "primary",
                      pt: { className: '-important-text-base' }
                    })),
                    _cE("text", _uM({ class: "value" }), _tD(attrValueWithUnit(i)), 1 /* TEXT */),
                    _cE("text", _uM({ class: "name" }), _tD(i.name), 1 /* TEXT */)
                  ], 8 /* PROPS */, ["onClick"])
                }), 128 /* KEYED_FRAGMENT */)
              ])
            ])
          : _cC("v-if", true)
      ]),
      _: 1 /* STABLE */
    }))
  ], 4 /* STYLE */)
}
}

})
export default __sfc__
const GenPagesEquipEquipDetailStyles = [_uM([["run", _uM([["", _uM([["backgroundImage", "none"], ["backgroundColor", "#52c41a"]])], [".shadow", _uM([["boxShadow", "0 0 6px rgba(82, 196, 26, 0.6)"]])]])], ["stopped", _uM([["", _uM([["backgroundImage", "none"], ["backgroundColor", "#FAAD14"]])], [".shadow", _uM([["boxShadow", "0 0 6px rgba(250, 173, 20, 0.6)"]])]])], ["online", _uM([["", _uM([["backgroundImage", "none"], ["backgroundColor", "#1890ff"]])], [".shadow", _uM([["boxShadow", "0 0 6px rgba(24, 144, 255, 0.6)"]])]])], ["alarm", _uM([["", _uM([["backgroundImage", "none"], ["backgroundColor", "#ff4d4f"]])], [".shadow", _uM([["boxShadow", "0 0 6px rgba(255, 77, 79, 0.8)"]])]])], ["offline", _pS(_uM([["backgroundImage", "none"], ["backgroundColor", "#bfbfbf"]]))], ["card", _pS(_uM([["boxShadow", "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)"], ["marginLeft", "28rpx"], ["marginRight", "28rpx"], ["marginBottom", "28rpx"], ["borderTopLeftRadius", "28rpx"], ["borderTopRightRadius", "28rpx"], ["borderBottomRightRadius", "28rpx"], ["borderBottomLeftRadius", "28rpx"], ["backgroundColor", "rgba(255,255,255,1)"], ["paddingTop", "28rpx"], ["paddingBottom", "28rpx"]]))], ["header-card", _pS(_uM([["alignItems", "stretch"], ["borderTopLeftRadius", "28rpx"], ["borderTopRightRadius", "28rpx"], ["borderBottomRightRadius", "28rpx"], ["borderBottomLeftRadius", "28rpx"], ["overflow", "hidden"], ["marginTop", "14rpx"], ["display", "flex"], ["flexDirection", "row"], ["boxShadow", "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)"], ["marginLeft", "28rpx"], ["marginRight", "28rpx"], ["marginBottom", "28rpx"], ["backgroundColor", "rgba(255,255,255,1)"], ["paddingTop", "28rpx"], ["paddingBottom", "28rpx"]]))], ["header", _pS(_uM([["width", "200rpx"], ["height", "200rpx"], ["flexShrink", 0], ["position", "relative"], ["display", "flex"]]))], ["header-img", _uM([[".header ", _uM([["backgroundImage", "none"], ["backgroundColor", "#eef2f6"], ["height", "100%"], ["width", "100%"]])]])], ["header-info", _pS(_uM([["backgroundImage", "none"], ["backgroundColor", "#ffffff"], ["display", "flex"], ["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["flexDirection", "column"], ["paddingLeft", "28rpx"], ["paddingRight", "28rpx"], ["paddingTop", "21rpx"], ["paddingBottom", "21rpx"]]))], ["device-name", _uM([[".header-info ", _uM([["marginBottom", "28rpx"], ["fontSize", "35rpx"], ["lineHeight", "49rpx"], ["color", "rgba(30,41,59,1)"]])]])], ["header-info-item", _uM([[".header-info ", _uM([["borderBottomWidth", 1], ["borderBottomStyle", "solid"], ["borderBottomColor", "rgba(148,163,184,0.12)"], ["marginBottom", "14rpx"], ["display", "flex"], ["flexDirection", "row"], ["justifyContent", "space-between"]])]])], ["name", _uM([[".header-info .header-info-item ", _uM([["fontSize", "28rpx"], ["lineHeight", "42rpx"], ["color", "rgba(71,85,105,1)"]])], [".disabled ", _uM([["color", "#9ca3af"]])], [".operate-card .operate-item ", _uM([["color", "#6b7280"], ["marginTop", "7rpx"], ["fontSize", "24.5rpx"], ["lineHeight", "35rpx"]])], [".attr-card .attr-grid .attr-item ", _uM([["color", "#64748b"], ["fontSize", "30rpx"], ["paddingRight", "32rpx"]])]])], ["value", _uM([[".header-info .header-info-item ", _uM([["fontSize", "21rpx"], ["lineHeight", "28rpx"], ["color", "rgba(148,163,184,1)"]])], [".attr-card .attr-grid .alarm-item ", _uM([["color", "#ffffff"], ["fontSize", "24.5rpx"], ["lineHeight", "35rpx"]])], [".attr-card .attr-grid .attr-item ", _uM([["lineHeight", 1.35], ["color", "#0f172a"], ["wordBreak", "break-all"], ["fontSize", "38rpx"], ["paddingRight", "32rpx"]])]])], ["workshop-name", _uM([[".header-info ", _uM([["fontSize", "21rpx"], ["lineHeight", "28rpx"], ["color", "rgba(100,116,139,1)"]])]])], ["device-sn", _uM([[".header-info ", _uM([["fontSize", "21rpx"], ["lineHeight", "28rpx"], ["color", "rgba(148,163,184,1)"]])]])], ["sn-wrap", _uM([[".header-info ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["gap", "14rpx"]])]])], ["copy-btn", _uM([[".header-info ", _uM([["fontSize", "22rpx"], ["color", "#2563eb"], ["paddingTop", "2rpx"], ["paddingRight", "10rpx"], ["paddingBottom", "2rpx"], ["paddingLeft", "10rpx"], ["borderTopLeftRadius", "12rpx"], ["borderTopRightRadius", "12rpx"], ["borderBottomRightRadius", "12rpx"], ["borderBottomLeftRadius", "12rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(37,99,235,0.08)"]])]])], ["copy-btn-colon-active", _uM([[".header-info ", _uM([["opacity", 0.7]])]])], ["disabled", _pS(_uM([["opacity", 0.3]]))], ["icon-wrap", _uM([[".disabled ", _uM([["backgroundImage", "none"], ["backgroundColor", "#f1f5f9"]])], [".operate-card .operate-item ", _uM([["backgroundImage", "none"], ["backgroundColor", "#f5f5f5"], ["display", "flex"], ["height", "84rpx"], ["width", "84rpx"], ["alignItems", "center"], ["justifyContent", "center"], ["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999], ["paddingTop", "7rpx"], ["paddingRight", "7rpx"], ["paddingBottom", "7rpx"], ["paddingLeft", "7rpx"]])]])], ["icon", _uM([[".disabled ", _uM([["color", "#9ca3af"]])]])], ["operate-card", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["paddingTop", "28rpx"], ["paddingRight", "28rpx"], ["paddingBottom", "28rpx"], ["paddingLeft", "28rpx"], ["boxShadow", "0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 16px rgba(0, 0, 0, 0.06)"], ["marginLeft", "28rpx"], ["marginRight", "28rpx"], ["marginBottom", "28rpx"], ["borderTopLeftRadius", "28rpx"], ["borderTopRightRadius", "28rpx"], ["borderBottomRightRadius", "28rpx"], ["borderBottomLeftRadius", "28rpx"], ["backgroundColor", "rgba(255,255,255,1)"]]))], ["operate-item", _uM([[".operate-card ", _uM([["width", "20%"], ["marginRight", "35rpx"], ["marginLeft", "35rpx"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"]])]])], ["status-item", _uM([[".status-card ", _uM([["marginTop", "14rpx"], ["marginRight", "14rpx"], ["marginBottom", "14rpx"], ["marginLeft", "14rpx"], ["display", "flex"], ["width", "100%"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"]])]])], ["label", _uM([[".status-card .status-item ", _uM([["marginLeft", "28rpx"], ["width", "50%"], ["fontSize", "24.5rpx"], ["lineHeight", "35rpx"], ["color", "rgba(71,85,105,1)"]])]])], ["dot", _uM([[".status-card .status-item ", _uM([["marginRight", "56rpx"], ["boxSizing", "border-box"], ["display", "flex"], ["height", "21rpx"], ["width", "21rpx"], ["borderTopLeftRadius", 9999], ["borderTopRightRadius", 9999], ["borderBottomRightRadius", 9999], ["borderBottomLeftRadius", 9999]])]])], ["attr-card", _pS(_uM([["paddingTop", "40rpx"], ["paddingRight", "40rpx"], ["paddingBottom", "44rpx"], ["paddingLeft", "40rpx"]]))], ["card-title", _uM([[".attr-card ", _uM([["fontSize", "40rpx"], ["color", "#1e293b"], ["marginBottom", "28rpx"]])]])], ["attr-grid", _uM([[".attr-card ", _uM([["display", "flex"], ["width", "100%"], ["flexDirection", "row"], ["flexWrap", "wrap"], ["gap", "20rpx"]])]])], ["alarm-item", _uM([[".attr-card .attr-grid ", _uM([["backgroundImage", "none"], ["backgroundColor", "#ba0404"], ["boxSizing", "border-box"], ["marginTop", "14rpx"], ["marginRight", "14rpx"], ["marginBottom", "14rpx"], ["marginLeft", "14rpx"], ["borderTopLeftRadius", "7rpx"], ["borderTopRightRadius", "7rpx"], ["borderBottomRightRadius", "7rpx"], ["borderBottomLeftRadius", "7rpx"], ["paddingTop", "14rpx"], ["paddingRight", "14rpx"], ["paddingBottom", "14rpx"], ["paddingLeft", "14rpx"]])]])], ["attr-item-clickable", _uM([[".attr-card .attr-grid ", _uM([["cursor", "pointer"], ["transitionProperty", "opacity"], ["transitionDuration", "0.2s"]])]])], ["attr-item-clickable-colon-active", _uM([[".attr-card .attr-grid ", _uM([["opacity", 0.85]])]])], ["attr-item", _uM([[".attr-card .attr-grid ", _uM([["minHeight", "140rpx"], ["backgroundImage", "none"], ["backgroundColor", "#f5f6f8"], ["boxSizing", "border-box"], ["position", "relative"], ["borderTopLeftRadius", "20rpx"], ["borderTopRightRadius", "20rpx"], ["borderBottomRightRadius", "20rpx"], ["borderBottomLeftRadius", "20rpx"], ["paddingTop", "28rpx"], ["paddingRight", "52rpx"], ["paddingBottom", "28rpx"], ["paddingLeft", "32rpx"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "flex-start"], ["justifyContent", "center"], ["gap", "12rpx"]])]])], ["attr-item-pin", _uM([[".attr-card .attr-grid .attr-item ", _uM([["position", "absolute"], ["top", "20rpx"], ["right", "20rpx"], ["opacity", 0.6], ["fontSize", "40rpx"]])]])], ["action-bar", _pS(_uM([["display", "flex"], ["gap", "20rpx"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["btn", _uM([[".action-bar ", _uM([["flexGrow", 1], ["flexShrink", 1], ["flexBasis", "0%"], ["borderTopLeftRadius", "40rpx"], ["borderTopRightRadius", "40rpx"], ["borderBottomRightRadius", "40rpx"], ["borderBottomLeftRadius", "40rpx"]])]])], ["primary", _uM([[".action-bar ", _uM([["backgroundImage", "none"], ["backgroundColor", "#2563eb"], ["borderTopLeftRadius", "32rpx"], ["borderTopRightRadius", "32rpx"], ["borderBottomRightRadius", "32rpx"], ["borderBottomLeftRadius", "32rpx"], ["color", "#ffffff"]])]])], ["@TRANSITION", _uM([["attr-item-clickable", _uM([["property", "opacity"], ["duration", "0.2s"]])]])]])]
