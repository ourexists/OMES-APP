"use strict";
const common_vendor = require("../../common/vendor.js");
const core_service_index = require("../../core/service/index.js");
const core_apiRouter_path = require("../../core/apiRouter/path.js");
const locale_index = require("../../locale/index.js");
const core_utils_parse = require("../../core/utils/parse.js");
const defaultNode = {
  id: -1,
  label: locale_index.t("全部场景"),
  isExpand: true
};
class WorkshopTree {
  constructor() {
    this.selectNode = common_vendor.ref(defaultNode);
    this.tree = common_vendor.ref([]);
    this.workshopLoading = false;
    this.isNeedLoading = true;
    this.workshopLoading = false;
    this.isNeedLoading = true;
  }
  loadWorkshopTree() {
    if (this.workshopLoading) {
      return;
    }
    this.workshopLoading = true;
    try {
      if (!this.isNeedLoading) {
        return;
      }
      core_service_index.request({
        url: core_apiRouter_path.apiPath.workshop_tree,
        method: "GET"
      }).then((res) => {
        this.isNeedLoading = false;
        const parent = defaultNode;
        if (res === null) {
          this.tree.value = [parent];
          return;
        }
        parent.isChecked = this.selectNode.value.id === -1;
        const r = core_utils_parse.parseData(res);
        if (r != null) {
          parent.children = this.convertWorkshopTree(r);
        }
        this.tree.value = [parent];
      });
    } finally {
      this.workshopLoading = false;
    }
  }
  convertWorkshopTree(nodes) {
    return nodes.map((node) => {
      return {
        id: node.selfCode,
        label: node.name,
        isExpand: true,
        children: node.children == null ? null : this.convertWorkshopTree(node.children)
      };
    });
  }
  getCheckedNodes() {
    const result = [];
    function collectCheckedKeys(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.isChecked == true) {
          result.push(node);
        }
        if (node.children != null) {
          collectCheckedKeys(node.children);
        }
      }
    }
    collectCheckedKeys(this.tree.value);
    return result;
  }
  selectConfirm() {
    let nodes = this.getCheckedNodes();
    let node = null;
    if (nodes.length > 0) {
      node = nodes[0];
      if (node.id == -1) {
        node = null;
      }
    }
    if (node == null) {
      this.selectNode.value = defaultNode;
    } else {
      this.selectNode.value = node;
    }
  }
}
const workshopTree = new WorkshopTree();
exports.workshopTree = workshopTree;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/workshop/workshopTree.js.map
