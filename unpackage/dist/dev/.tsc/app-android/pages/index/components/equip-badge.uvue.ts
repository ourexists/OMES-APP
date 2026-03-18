import {useRefs, useUi} from "@/uni_modules/cool-unix";
import {Equip} from "@/core/types";
import {parseType} from "@/core/utils/equipParser";

export type EquipBadgePayload = { __$originalPosition?: UTSSourceMapPosition<"EquipBadgePayload", "pages/index/components/equip-badge.uvue", 20, 13>;
  equip: Equip;
}


const __sfc__ = defineComponent({
  __name: 'equip-badge',

  name: "equip-badge"
,
  props: {
    equip: { type: Object, required: true }
  },
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;




const ui = useUi();
const refs = useRefs();

const props = __props;

const badge = computed(() => {
  return parseType(props.equip as Equip);
})


return (): any | null => {

  return isTrue(unref(badge))
    ? _cE("text", _uM({
        key: 0,
        class: _nC(["badge", unref(badge).type])
      }), _tD(unref(badge).text), 3 /* TEXT, CLASS */)
    : _cC("v-if", true)
}
}

})
export default __sfc__
const GenPagesIndexComponentsEquipBadgeStyles = [_uM([["badge", _uM([["", _uM([["position", "absolute"], ["top", "7rpx"], ["left", "7rpx"], ["borderTopLeftRadius", "10.5rpx"], ["borderTopRightRadius", "10.5rpx"], ["borderBottomRightRadius", "10.5rpx"], ["borderBottomLeftRadius", "10.5rpx"], ["paddingTop", "7rpx"], ["paddingBottom", "7rpx"], ["paddingLeft", "17.5rpx"], ["paddingRight", "17.5rpx"], ["fontSize", "21rpx"], ["lineHeight", "28rpx"], ["color", "rgba(255,255,255,1)"]])], [".offline", _uM([["backgroundImage", "none"], ["backgroundColor", "#bfbfbf"]])], [".alarm", _uM([["backgroundImage", "none"], ["backgroundColor", "#ff4d4f"]])], [".run", _uM([["backgroundImage", "none"], ["backgroundColor", "#52c41a"]])], [".stopped", _uM([["backgroundImage", "none"], ["backgroundColor", "#FAAD14"]])]])]])]
