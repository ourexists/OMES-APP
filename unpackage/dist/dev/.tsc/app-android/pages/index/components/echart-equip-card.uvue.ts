import _easycom_l_echart from '@/uni_modules/lime-echart/components/l-echart/l-echart.uvue'
import {t} from "@/locale";
import type {EquipCount} from "@/core/types";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useRefs, useUi} from "@/uni_modules/cool-unix";
import {request} from "@/core/service";
import {apiPath} from "@/core/apiRouter/path";
import {parseData} from "@/core/utils/parse";
import type {LEchartComponentPublicInstance} from "@/uni_modules/lime-echart/components/l-echart/l-echart.uvue";
import {config} from "@/config";
import {workshopTree} from "@/components/workshop";


const __sfc__ = defineComponent({
  __name: 'echart-equip-card',

  name: "chart-equip-runtime"
,
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;



const ui = useUi();
const refs = useRefs();

const chartRef = ref<LEchartComponentPublicInstance | null>(null);

const loading = ref<boolean>(false);

const equipCount = ref<EquipCount>({
  total: 0,
  alarm: 0,
  online: 0,
  offline: 0,
  run: 0,
  stopped: 0
});

let timer: number | null = null;

const init = async () => {
  if (chartRef.value == null) return
  const chart = await chartRef.value!.init(null)

  chart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical', // 竖直排列
      right: '5%',
      top: '15%'
    },
    color: [
      '#bfbfbf',
      '#1890ff',
      '#FAAD14',
      '#52c41a'
    ],
    series: [
      {
        name: t('设备在线统计'),
        type: 'pie',
        radius: ['30%', '45%'],
        center: ['25%', '50%'],
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
          }
        },
        label: {
          show: true,
          formatter: '{d}%',       // 显示百分比
          position: 'inside'      // 内部显示
        },
        data: [
          {value: equipCount.value.offline, name: t('离线')},
          {value: equipCount.value.online, name: t('在线')},
        ]
      },
      {
        name: t('设备运行状态'),
        type: 'pie',
        radius: ['30%', '45%'],
        center: ['55%', '50%'],
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
          }
        },
        label: {
          show: true,
          formatter: '{d}%',      // 显示百分比
          position: 'inside'      // 内部显示
        },
        data: [
          {value: equipCount.value.stopped, name: t('停止')},
          {value: equipCount.value.run, name: t('运行')},
        ],
      }
    ]
  })
}

function reloadEChart() {
  chartRef.value!.setOption({
    series: [
      {
        data: [
          {value: equipCount.value.offline, name: t('离线')},
          {value: equipCount.value.online, name: t('在线')},
        ]
      },
      {
        data: [
          {value: equipCount.value.stopped, name: t('停止')},
          {value: equipCount.value.run, name: t('运行')},
        ],
      }
    ]
  })
}

function reloadData() {
  if (loading.value) {
    return
  }
  loading.value = true;
  try {
    request({
      url: apiPath.equip_count as string,
      method: "POST",
      data: {
        needWorkshopCascade: false,
        limitUserWorkshop: true,
        workshopCode: workshopTree.selectNode.value.id == -1 ? null : workshopTree.selectNode.value.id,
      }
    })
        .then((res) => {
          if (res === null) {
            return;
          }
          let t = parseData<EquipCount>(res);
          if (t === null) {
            return;
          }
          equipCount.value = t;
        });
  } finally {
    loading.value = false;
  }
}


watch(equipCount, () => {
  reloadEChart();
}, {deep: true});

onMounted(() => {
  timer = setInterval(() => {
    reloadData();
  }, config.equipRefreshTime); // 每10秒刷新
});

onUnmounted(() => {
  if (timer != null) {
    clearInterval(timer as number); // 清除定时器
    timer = null;
  }
})

onShow(() => {
  setTimeout(() => {
    reloadData();
  }, 500)
})

onHide(() => {
  if (timer != null) {
    clearInterval(timer as number); // 清除定时器
    timer = null;
  }
})


return (): any | null => {

const _component_l_echart = resolveEasyComponent("l-echart",_easycom_l_echart)

  return _cE("view", _uM({ class: "count-card" }), [
    _cE("view", _uM({ class: "w-full echart-equip" }), [
      _cV(_component_l_echart, _uM({
        ref_key: "chartRef",
        ref: chartRef,
        onFinished: init
      }), null, 512 /* NEED_PATCH */)
    ]),
    _cE("view", _uM({ class: "count-status-group" }), [
      _cE("view", _uM({ class: "count-status" }), [
        _cE("text", _uM({ class: "count-title total" }), _tD(unref(t)('设备总计')), 1 /* TEXT */),
        _cE("text", _uM({ class: "count-num" }), _tD(equipCount.value.total), 1 /* TEXT */)
      ]),
      _cE("view", _uM({ class: "count-status" }), [
        _cE("text", _uM({ class: "count-title alarm" }), _tD(unref(t)('报警设备')), 1 /* TEXT */),
        _cE("text", _uM({ class: "count-num" }), _tD(equipCount.value.alarm), 1 /* TEXT */)
      ])
    ]),
    _cE("view", _uM({ class: "count-status-group" }), [
      _cE("view", _uM({ class: "count-status items-center" }), [
        _cE("text", _uM({ class: "count-title online" }), _tD(unref(t)('在线设备')), 1 /* TEXT */),
        _cE("text", _uM({ class: "count-num" }), _tD(equipCount.value.online), 1 /* TEXT */)
      ]),
      _cE("view", _uM({ class: "count-status" }), [
        _cE("text", _uM({ class: "count-title offline" }), _tD(unref(t)('离线设备')), 1 /* TEXT */),
        _cE("text", _uM({ class: "count-num" }), _tD(equipCount.value.offline), 1 /* TEXT */)
      ]),
      _cE("view", _uM({ class: "count-status" }), [
        _cE("text", _uM({ class: "count-title run" }), _tD(unref(t)('运行设备')), 1 /* TEXT */),
        _cE("text", _uM({ class: "count-num" }), _tD(equipCount.value.run), 1 /* TEXT */)
      ]),
      _cE("view", _uM({ class: "count-status" }), [
        _cE("text", _uM({ class: "count-title stopped" }), _tD(unref(t)('停止设备')), 1 /* TEXT */),
        _cE("text", _uM({ class: "count-num" }), _tD(equipCount.value.stopped), 1 /* TEXT */)
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesIndexComponentsEchartEquipCardStyles = [_uM([["count-card", _pS(_uM([["height", "720rpx"], ["marginTop", "14rpx"], ["display", "flex"], ["width", "100%"], ["alignItems", "center"], ["borderTopLeftRadius", "42rpx"], ["borderTopRightRadius", "42rpx"], ["borderBottomRightRadius", "42rpx"], ["borderBottomLeftRadius", "42rpx"], ["borderTopWidth", 1], ["borderRightWidth", 1], ["borderBottomWidth", 1], ["borderLeftWidth", 1], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "rgba(243,244,246,1)"], ["borderRightColor", "rgba(243,244,246,1)"], ["borderBottomColor", "rgba(243,244,246,1)"], ["borderLeftColor", "rgba(243,244,246,1)"], ["backgroundColor", "rgba(255,255,255,1)"]]))], ["echart-equip", _uM([[".count-card ", _uM([["height", "50%"]])]])], ["count-status", _pS(_uM([["display", "flex"], ["width", "168rpx"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "7rpx"], ["paddingRight", "7rpx"], ["paddingBottom", "7rpx"], ["paddingLeft", "7rpx"]]))], ["count-title", _uM([["", _uM([["borderTopLeftRadius", "7rpx"], ["borderTopRightRadius", "7rpx"], ["borderBottomRightRadius", "7rpx"], ["borderBottomLeftRadius", "7rpx"], ["paddingTop", "14rpx"], ["paddingRight", "14rpx"], ["paddingBottom", "14rpx"], ["paddingLeft", "14rpx"], ["fontSize", "24.5rpx"], ["lineHeight", "35rpx"], ["color", "rgba(255,255,255,1)"]])], [".total", _uM([["backgroundColor", "#858484"]])], [".online", _uM([["backgroundColor", "rgba(59,130,246,1)"]])], [".offline", _uM([["backgroundImage", "none"], ["backgroundColor", "#bfbfbf"]])], [".alarm", _uM([["backgroundColor", "rgba(239,68,68,1)"]])], [".run", _uM([["backgroundColor", "rgba(34,197,94,1)"]])], [".stopped", _uM([["backgroundColor", "rgba(234,179,8,1)"]])]])], ["count-num", _pS(_uM([["marginTop", "21rpx"], ["fontSize", "31.5rpx"], ["lineHeight", "49rpx"]]))], ["count-status-group", _pS(_uM([["display", "flex"], ["width", "100%"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["paddingTop", "14rpx"], ["paddingRight", "14rpx"], ["paddingBottom", "14rpx"], ["paddingLeft", "14rpx"]]))]])]
