import _easycom_cl_text from '@/uni_modules/cool-unix/components/cl-text/cl-text.uvue'
import _easycom_cl_topbar from '@/uni_modules/cool-unix/components/cl-topbar/cl-topbar.uvue'
import _easycom_cl_select_date from '@/uni_modules/cool-unix/components/cl-select-date/cl-select-date.uvue'
import _easycom_cl_loading from '@/uni_modules/cool-unix/components/cl-loading/cl-loading.uvue'
import _easycom_l_echart from '@/uni_modules/lime-echart/components/l-echart/l-echart.uvue'
import _easycom_cl_page from '@/uni_modules/cool-unix/components/cl-page/cl-page.uvue'
import {type ClSelectDateShortcut, dayUts, isDark, isMp, usePage, useRefs, useUi} from "@/uni_modules/cool-unix";
import type {EquipCollect, EquipConfig, EquipConfigAttr} from "@/core/types";
import {t} from "@/locale";
import {request} from "@/core/service";
import {apiPath} from "@/core/apiRouter/path";
import {parseData} from "@/core/utils/parse";
import {nextTick, ref, watch} from "vue";



const __sfc__ = defineComponent({
  __name: 'equip_collect',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

const ui = useUi();
const page = usePage();
const refs = useRefs();

const attrConfig = ref<EquipConfigAttr[]>([]);
const data = ref<EquipCollect[]>([]);
const chartRef = ref<LEchartComponentPublicInstance | null>(null);

const containerSize = ref<number>(800);
const selectDateRef = ref<ClSelectDateComponentPublicInstance | null>(null);
const customDate = ref<string[]>(["", ""]);
const loading = ref<boolean>(false);
const dataDownsampled = ref<boolean>(false);

let equipSn: string = ''
let singleAttrName: string = ''

const pageTitle = ref<string>(t('历史曲线'))

let singleHeight = 600;

/** 单条折线最大点数，超过则降采样以提升渲染性能 */
const MAX_CHART_POINTS = 400;
/** 时间跨度超过该天数时提示用户可能较慢（仍会加载，仅做降采样展示） */
const LARGE_RANGE_DAYS = 90;

/**
 * 对折线数据做降采样，保留首尾并均匀取点，避免时间跨度大时数据量过多导致卡顿
 */
function downsampleSeriesData<T>(arr: T[], maxPoints: number): T[] {
  if (arr.length <= maxPoints) return arr;
  const result: T[] = [];
  result.push(arr[0]);
  const step = (arr.length - 1) / (maxPoints - 1);
  for (let i = 1; i < maxPoints - 1; i++) {
    const idx = Math.min(Math.round(i * step), arr.length - 1);
    result.push(arr[idx]);
  }
  result.push(arr[arr.length - 1]);
  return result;
}

const shortcuts = ref<ClSelectDateShortcut[]>([
  {
    label: t("今天"),
    value: [
      dayUts().format("YYYY-MM-DD"),
      dayUts().format("YYYY-MM-DD"),
    ],
  },
  {
    label: t("昨日"),
    value: [
      dayUts().subtract(1, "day").format("YYYY-MM-DD"),
      dayUts().subtract(1, "day").format("YYYY-MM-DD"),
    ],
  },
  {
    label: t("本周"),
    value: [
      dayUts().startOf("week").format("YYYY-MM-DD"),
      dayUts().endOf("week").format("YYYY-MM-DD"),
    ],
  },
  {
    label: t("本月"),
    value: [
      dayUts().startOf("month").format("YYYY-MM-DD"),
      dayUts().endOf("month").format("YYYY-MM-DD"),
    ],
  },
]);

const INDUSTRY_THEME = {__$originalPosition: new UTSSourceMapPosition("INDUSTRY_THEME", "pages/equip/equip_collect.uvue", 147, 7),
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  axisLine: '#d1d5db',
  splitLine: '#e5e7eb',

  line: '#3b82f6',
  areaFrom: 'rgba(59,130,246,0.25)',
  areaTo: 'rgba(59,130,246,0.02)',

  tooltipBg: 'rgba(15,23,42,0.9)',
  tooltipBorder: '#334155'
}

function generateOption() {
  let visualMap: Array<any> = [];
  let xAxis: Array<any> = [];
  let yAxis: Array<any> = [];
  let grid: Array<any> = [];
  let series: Array<any> = [];
  let title: Array<any> = [];
  let single = 100 / attrConfig.value.length;
  attrConfig.value.forEach(((item, index) => {
    visualMap.push(
        {
          show: false,
          type: 'continuous',
          seriesIndex: index,
        }
    );
    title.push({
      top: `${single / 15 + single * index}%`,
      left: 'center',
      text: item.name,
      textStyle: {
        fontSize: 12,
        fontWeight: 500,
        color: INDUSTRY_THEME.textPrimary
      }
    });
    xAxis.push({
      gridIndex: index,
      type: 'time',
      axisLine: {
        lineStyle: {
          color: INDUSTRY_THEME.axisLine
        }
      },
      axisTick: {show: false},
      splitLine: {
        show: false
      },
      axisLabel: {
        color: INDUSTRY_THEME.textSecondary,
        fontSize: 11,
        rotate: 30
      },
    })
    yAxis.push({
      type: 'value',
      axisLine: {
        lineStyle: {
          color: INDUSTRY_THEME.axisLine
        }
      },
      axisTick: {show: false},
      axisLabel: {
        color: INDUSTRY_THEME.textSecondary,
        fontSize: 11
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: INDUSTRY_THEME.splitLine,
          type: 'dashed'
        }
      },
      gridIndex: index
    })
    grid.push({
      top: `${single / 5 + single * index}%`,
      height: `${single * 3 / 5}%`
    },)
    let vList: Array<any> = []
    data.value.forEach(item2 => {
      let d = item2.data[item.name];
      if (d != null) {
        vList.push([item2.time, d])
      } else {
        vList.push([item2.time, ""])
      }
    })
    vList = downsampleSeriesData(vList, MAX_CHART_POINTS)
    series.push({
      type: 'line',
      smooth: true,
      showSymbol: false,
      sampling: 'lttb',
      lineStyle: {
        width: 1.5,
        color: INDUSTRY_THEME.line
      },
      areaStyle: {
        color: INDUSTRY_THEME.line,
        opacity: 0.12
      },
      data: vList,
      xAxisIndex: index,
      yAxisIndex: index
    })
  }))
  return {
    visualMap,
    title,
    tooltip: {
      trigger: 'axis'
    },
    xAxis,
    yAxis,
    grid,
    series
  };
}

const loadConfig = async () => {
  await request({
    url: apiPath.equip_config as string,
    method: "GET",
    data: {
      equipSn: equipSn,
    }
  }).then((res) => {
    if (res === null) {
      return;
    }
    let r = parseData<EquipConfig>(res);
    if (r == null || r.config == null) {
      return;
    }
    if (r.config.attrs == null || r.config.attrs.length <= 0) {
      return;
    }
    let rr = [] as EquipConfigAttr[];
    r.config.attrs.forEach(item => {
      if (item.needCollect != null && item.needCollect) {
        rr.push(item)
      }
    })
    if (singleAttrName !== '') {
      rr = rr.filter(item => item.name === singleAttrName)
      pageTitle.value = singleAttrName
    } else {
      pageTitle.value = t('历史曲线')
    }
    containerSize.value = rr.length * singleHeight
    attrConfig.value = rr
    loadHistory()
  });
}


const loadHistory = async () => {
  if (attrConfig.value == null || attrConfig.value.length <= 0) {
    return;
  }
  loading.value = true;
  dataDownsampled.value = false;
  try {
    await request({
      url: apiPath.equip_collect_page as string,
      method: "POST",
      data: {
        sn: equipSn,
        startDate: customDate.value[0] == null ? null : customDate.value[0] + "  00:00:00",
        endDate: customDate.value[1] == null ? null : customDate.value[1] + " 23:59:59",
        requirePage: false
      }
    }).then((res) => {
      if (res === null) {
        return;
      }
      let r = parseData<EquipCollect[]>(res);
      if (r == null) {
        return;
      }
      data.value = r;
      dataDownsampled.value = r.length > MAX_CHART_POINTS;
    });
  } finally {
    loading.value = false;
  }
}

function reloadHistory(s: string[]) {
  if (s != null && s.length >= 2 && s[0] && s[1]) {
    const start = new Date(s[0]).getTime();
    const end = new Date(s[1]).getTime();
    const days = (end - start) / (24 * 3600 * 1000);
    if (days > LARGE_RANGE_DAYS) {
      uni.showToast({
        title: t('时间跨度较大，已做采样展示'),
        icon: 'none',
        duration: 2500
      });
    }
  }
  loadHistory();
}

function formatDate(date: Date | null): string {
  if (date == null) {
    return '';
  }
  const year = date.getFullYear();  // 获取年份
  const month = (date.getMonth() + 1).toString().padStart(2, '0');  // 获取月份，+1 因为月份从 0 开始
  const day = date.getDate().toString().padStart(2, '0');  // 获取日期

  return `${year}-${month}-${day}`;  // 格式化为 yyyy-MM-dd HH:mm:ss
}

const init = async () => {
  if (chartRef.value == null) return
  await chartRef.value.init(null)
  reloadEChart()
}

const reloadEChart = () => {
  if (chartRef.value == null) return;
  const option = generateOption();
  nextTick(() => {
    if (chartRef.value == null) return;
    chartRef.value.setOption(option);
  });
}

watch(data, () => {
  reloadEChart();
}, {deep: true});

onLoad((options) => {
  equipSn = (options?.sn as string) ?? ''
  singleAttrName = (options?.attr as string) ?? ''
  if (singleAttrName) {
    try {
      singleAttrName = UTSAndroid.consoleDebugError(decodeURIComponent(singleAttrName), " at pages/equip/equip_collect.uvue:391")
    } catch (_) {}
  }
  let current = new Date();
  customDate.value = [formatDate(current), formatDate(current)]
  loadConfig()
})

onShow(() => {
  if (attrConfig.value.length > 0) {
    loadHistory()
  }
})

return (): any | null => {

const _component_cl_text = resolveEasyComponent("cl-text",_easycom_cl_text)
const _component_cl_topbar = resolveEasyComponent("cl-topbar",_easycom_cl_topbar)
const _component_cl_select_date = resolveEasyComponent("cl-select-date",_easycom_cl_select_date)
const _component_cl_loading = resolveEasyComponent("cl-loading",_easycom_cl_loading)
const _component_l_echart = resolveEasyComponent("l-echart",_easycom_l_echart)
const _component_cl_page = resolveEasyComponent("cl-page",_easycom_cl_page)

  return _cE("scroll-view", _uM({
    style: _nS(_uM({ flex: 1 })),
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
                default: withSlotCtx((): any[] => [_tD(pageTitle.value)]),
                _: 1 /* STABLE */
              }))
            ], 2 /* CLASS */)
          ]),
          _: 1 /* STABLE */
        }), 8 /* PROPS */, ["background-color", "height"]),
        attrConfig.value.length >0
          ? _cE("view", _uM({
              key: 0,
              class: "p-3"
            }), [
              _cV(_component_cl_select_date, _uM({
                ref: selectDateRef.value,
                values: customDate.value,
                "onUpdate:values": $event => {(customDate).value = $event},
                type: "date",
                title: "",
                shortcuts: shortcuts.value,
                "label-format": "YYYY-MM-DD",
                "value-format": "YYYY-MM-DD",
                onRangeChange: reloadHistory,
                pt: {className: 'text-2xl h-16'},
                rangeable: ""
              }), null, 8 /* PROPS */, ["values", "onUpdate:values", "shortcuts"]),
              _cE("view", _uM({ class: "echart-equip-wrap" }), [
                isTrue(loading.value)
                  ? _cE("view", _uM({
                      key: 0,
                      class: "echart-loading"
                    }), [
                      _cV(_component_cl_loading, _uM({ pt: { className: '-important-text-primary' } })),
                      _cE("text", _uM({ class: "loading-text" }), _tD(unref(t)('加载中...')), 1 /* TEXT */)
                    ])
                  : _cC("v-if", true),
                isTrue(dataDownsampled.value)
                  ? _cE("view", _uM({
                      key: 1,
                      class: "downsample-hint"
                    }), _tD(unref(t)('数据较多已采样展示')), 1 /* TEXT */)
                  : _cC("v-if", true),
                _cE("view", _uM({
                  class: "echart-equip",
                  style: _nS('height: '+containerSize.value+'rpx' )
                }), [
                  _cV(_component_l_echart, _uM({
                    ref_key: "chartRef",
                    ref: chartRef,
                    onFinished: init,
                    style: _nS(_uM({"width":"100%","height":"100%"}))
                  }), null, 8 /* PROPS */, ["style"])
                ], 4 /* STYLE */)
              ])
            ])
          : _cC("v-if", true),
        attrConfig.value.length<=0
          ? _cE("view", _uM({
              key: 1,
              class: "p-3 mt-5"
            }), [
              _cE("text", _uM({ class: "text-gray-400 text-center" }), "-- " + _tD(unref(singleAttrName) ? unref(t)('该属性暂无历史采集') : unref(t)('未对该设备进行数据采集配置')) + " --", 1 /* TEXT */)
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
const GenPagesEquipEquipCollectStyles = [_uM([["echart-equip-wrap", _pS(_uM([["position", "relative"], ["marginTop", "35rpx"], ["width", "100%"]]))], ["echart-loading", _pS(_uM([["position", "absolute"], ["left", 0], ["right", 0], ["top", 0], ["bottom", 0], ["zIndex", 10], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.85)"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"], ["gap", "12rpx"]]))], ["loading-text", _uM([[".echart-loading ", _uM([["fontSize", "28rpx"], ["color", "#64748b"]])]])], ["downsample-hint", _pS(_uM([["fontSize", "24rpx"], ["color", "#94a3b8"], ["paddingTop", "8rpx"], ["paddingRight", 0], ["paddingBottom", "8rpx"], ["paddingLeft", 0], ["textAlign", "center"]]))], ["echart-equip", _pS(_uM([["overflow", "hidden"], ["width", "100%"], ["backgroundColor", "rgba(255,255,255,1)"]]))]])]

import { LEchartComponentPublicInstance  } from "@/uni_modules/lime-echart/components/l-echart/l-echart.uvue"
import { ClSelectDateComponentPublicInstance  } from "@/uni_modules/cool-unix/components/cl-select-date/cl-select-date.uvue"