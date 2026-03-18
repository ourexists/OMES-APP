"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../cool/router/index.js");
require("../../cool/ctx/index.js");
require("../../theme/index.js");
const uni_modules_coolUnix_cool_utils_comm = require("../../cool/utils/comm.js");
const uni_modules_coolUnix_cool_utils_parse = require("../../cool/utils/parse.js");
require("../../config.js");
if (!Array) {
  const _easycom_cl_tree_item_1 = common_vendor.resolveComponent("cl-tree-item");
  _easycom_cl_tree_item_1();
}
const _easycom_cl_tree_item = () => "../cl-tree-item/cl-tree-item.js";
if (!Math) {
  _easycom_cl_tree_item();
}
class PassThrough extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          className: { type: String, optional: true }
        };
      },
      name: "PassThrough"
    };
  }
  constructor(options, metadata = PassThrough.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.className = this.__props__.className;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  name: "cl-tree"
}, { __name: "cl-tree", props: {
  pt: {
    type: Object,
    default: () => {
      return new UTSJSONObject({});
    }
  },
  // 绑定值
  modelValue: {
    type: [Array, String, Number],
    default: null
  },
  // 树形结构数据
  list: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 节点图标
  icon: {
    type: String,
    default: "arrow-right-s-fill"
  },
  // 展开图标
  expandIcon: {
    type: String,
    default: "arrow-down-s-fill"
  },
  // 是否严格的遵循父子不互相关联
  checkStrictly: {
    type: Boolean,
    default: false
  },
  // 是否可以选择节点
  checkable: {
    type: Boolean,
    default: true
  },
  // 是否允许多选
  multiple: {
    type: Boolean,
    default: false
  }
}, emits: ["update:modelValue", "change"], setup(__props, _a) {
  var __expose = _a.expose, __emit = _a.emit;
  const props = __props;
  const emit = __emit;
  const pt = common_vendor.computed(() => {
    return uni_modules_coolUnix_cool_utils_parse.parsePt(props.pt);
  });
  const data = common_vendor.ref(props.list);
  const nodeMap = common_vendor.computed(() => {
    const map = /* @__PURE__ */ new Map();
    function buildMap(nodes, parent = null) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        map.set(node.id, { node, parent, index: i });
        if (node.children != null && node.children.length > 0) {
          buildMap(node.children, node);
        }
      }
    }
    buildMap(data.value);
    return map;
  });
  function findNodeInfo(key) {
    const result = UTS.mapGet(nodeMap.value, key);
    return result != null ? result : null;
  }
  function getAncestors(key) {
    const result = [];
    let nodeInfo = findNodeInfo(key);
    while (nodeInfo != null && nodeInfo.parent != null) {
      result.unshift(nodeInfo.parent);
      nodeInfo = findNodeInfo(nodeInfo.parent.id);
    }
    return result;
  }
  function updateAllCheckStates() {
    function updateNodeStates(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const children = node.children != null ? node.children : [];
        if (children.length == 0) {
          node.isHalfChecked = false;
          continue;
        }
        updateNodeStates(children);
        let checkedCount = 0;
        let halfCheckedCount = 0;
        for (let j = 0; j < children.length; j++) {
          if (children[j].isChecked == true) {
            checkedCount++;
          } else if (children[j].isHalfChecked == true) {
            halfCheckedCount++;
          }
        }
        if (checkedCount == children.length) {
          node.isChecked = true;
          node.isHalfChecked = false;
        } else if (checkedCount > 0 || halfCheckedCount > 0) {
          node.isChecked = false;
          node.isHalfChecked = true;
        } else {
          node.isChecked = false;
          node.isHalfChecked = false;
        }
      }
    }
    updateNodeStates(data.value);
  }
  function updateAncestorsCheckState(key) {
    const ancestors = getAncestors(key);
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const ancestor = ancestors[i];
      const children = ancestor.children != null ? ancestor.children : [];
      if (children.length == 0)
        continue;
      let checkedCount = 0;
      let halfCheckedCount = 0;
      for (let j = 0; j < children.length; j++) {
        if (children[j].isChecked == true) {
          checkedCount++;
        } else if (children[j].isHalfChecked == true) {
          halfCheckedCount++;
        }
      }
      if (checkedCount == children.length) {
        ancestor.isChecked = true;
        ancestor.isHalfChecked = false;
      } else if (checkedCount > 0 || halfCheckedCount > 0) {
        ancestor.isChecked = false;
        ancestor.isHalfChecked = true;
      } else {
        ancestor.isChecked = false;
        ancestor.isHalfChecked = false;
      }
    }
  }
  function getDescendants(key) {
    const nodeInfo = findNodeInfo(key);
    if (nodeInfo == null || nodeInfo.node.children == null) {
      return [];
    }
    const result = [];
    const queue = [];
    for (let i = 0; i < nodeInfo.node.children.length; i++) {
      queue.push(nodeInfo.node.children[i]);
    }
    while (queue.length > 0) {
      const node = UTS.arrayShift(queue);
      if (node == null)
        break;
      result.push(node);
      if (node.children != null && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          queue.push(node.children[i]);
        }
      }
    }
    return result;
  }
  function clearChecked() {
    nodeMap.value.forEach((info) => {
      info.node.isChecked = false;
      info.node.isHalfChecked = false;
    });
  }
  function setChecked(key, flag) {
    const nodeInfo = findNodeInfo(key);
    if (nodeInfo == null)
      return null;
    if (!props.multiple) {
      clearChecked();
    }
    nodeInfo.node.isChecked = flag;
    if (props.multiple) {
      if (!props.checkStrictly) {
        const descendants = getDescendants(key);
        for (let i = 0; i < descendants.length; i++) {
          descendants[i].isChecked = flag;
        }
        updateAncestorsCheckState(key);
      }
    }
  }
  function setCheckedKeys(keys) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const nodeInfo = findNodeInfo(key);
      if (nodeInfo != null) {
        nodeInfo.node.isChecked = true;
        if (!props.checkStrictly) {
          const descendants = getDescendants(key);
          for (let j = 0; j < descendants.length; j++) {
            descendants[j].isChecked = true;
          }
        }
      }
    }
    if (!props.checkStrictly) {
      updateAllCheckStates();
    }
  }
  function getCheckedKeys() {
    const result = [];
    function collectCheckedKeys(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.isChecked == true) {
          result.push(node.id);
        }
        if (node.children != null) {
          collectCheckedKeys(node.children);
        }
      }
    }
    collectCheckedKeys(data.value);
    return result;
  }
  function getHalfCheckedKeys() {
    const result = [];
    function collectHalfCheckedKeys(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.isHalfChecked == true) {
          result.push(node.id);
        }
        if (node.children != null) {
          collectHalfCheckedKeys(node.children);
        }
      }
    }
    collectHalfCheckedKeys(data.value);
    return result;
  }
  function setExpanded(key, flag) {
    const nodeInfo = findNodeInfo(key);
    if (nodeInfo == null)
      return null;
    nodeInfo.node.isExpand = flag;
  }
  function setExpandedKeys(keys) {
    for (let i = 0; i < keys.length; i++) {
      const nodeInfo = findNodeInfo(keys[i]);
      if (nodeInfo != null) {
        nodeInfo.node.isExpand = true;
      }
    }
  }
  function getExpandedKeys() {
    const result = [];
    function collectExpandedKeys(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.isExpand == true) {
          result.push(node.id);
        }
        if (node.children != null) {
          collectExpandedKeys(node.children);
        }
      }
    }
    collectExpandedKeys(data.value);
    return result;
  }
  function expandAll() {
    nodeMap.value.forEach((info) => {
      if (info.node.children != null && info.node.children.length > 0) {
        info.node.isExpand = true;
      }
    });
  }
  function collapseAll() {
    nodeMap.value.forEach((info) => {
      info.node.isExpand = false;
    });
  }
  function syncModelValue() {
    if (uni_modules_coolUnix_cool_utils_comm.isEmpty(data.value)) {
      return null;
    }
    const checkedKeys = getCheckedKeys();
    if (props.modelValue == null || !uni_modules_coolUnix_cool_utils_comm.isEqual(checkedKeys, props.modelValue)) {
      const value = props.multiple ? checkedKeys : uni_modules_coolUnix_cool_utils_comm.first(checkedKeys);
      emit("update:modelValue", value);
      emit("change", value);
    }
  }
  function syncCheckedState() {
    if (props.modelValue == null) {
      return null;
    }
    const checkedKeys = getCheckedKeys();
    if (!uni_modules_coolUnix_cool_utils_comm.isEqual(checkedKeys, props.modelValue)) {
      if (Array.isArray(props.modelValue)) {
        setCheckedKeys(props.modelValue);
      } else {
        setChecked(props.modelValue, true);
      }
    }
    syncModelValue();
  }
  common_vendor.watch(common_vendor.computed(() => {
    return props.list;
  }), (val) => {
    data.value = val;
    syncCheckedState();
  }, { immediate: true });
  common_vendor.watch(common_vendor.computed(() => {
    var _a2;
    return [(_a2 = props.modelValue) !== null && _a2 !== void 0 ? _a2 : 0];
  }), () => {
    syncCheckedState();
  }, { immediate: true, deep: true });
  common_vendor.watch(data, () => {
    if (!props.checkStrictly && props.multiple) {
      updateAllCheckStates();
    }
    syncModelValue();
  }, { deep: true });
  __expose({
    icon: common_vendor.computed(() => {
      return props.icon;
    }),
    expandIcon: common_vendor.computed(() => {
      return props.expandIcon;
    }),
    checkStrictly: common_vendor.computed(() => {
      return props.checkStrictly;
    }),
    checkable: common_vendor.computed(() => {
      return props.checkable;
    }),
    multiple: common_vendor.computed(() => {
      return props.multiple;
    }),
    clearChecked,
    setChecked,
    setCheckedKeys,
    getCheckedKeys,
    getHalfCheckedKeys,
    setExpanded,
    setExpandedKeys,
    getExpandedKeys,
    expandAll,
    collapseAll
  });
  return (_ctx, _cache) => {
    "raw js";
    const __returned__ = {
      a: common_vendor.f(data.value, (item, k0, i0) => {
        return {
          a: item.id,
          b: "9c6ea1fc-0-" + i0,
          c: common_vendor.p({
            item,
            level: 0,
            pt: props.pt
          })
        };
      }),
      b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      c: common_vendor.n({}),
      d: common_vendor.n(pt.value.className)
    };
    return __returned__;
  };
} }));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/components/cl-tree/cl-tree.js.map
