"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../cool/router/index.js");
require("../cool/ctx/index.js");
require("../theme/index.js");
const uni_modules_coolUnix_cool_hooks_parent = require("../cool/hooks/parent.js");
require("../config.js");
class Form {
  constructor() {
    this.formRef = common_vendor.ref(null);
    this.addField = (prop, rules) => {
      this.formRef.value.addField(prop, rules);
    };
    this.removeField = (prop) => {
      this.formRef.value.removeField(prop);
    };
    this.getValue = (prop) => {
      return this.formRef.value.getValue(prop);
    };
    this.setError = (prop, error) => {
      this.formRef.value.setError(prop, error);
    };
    this.getError = (prop) => {
      return this.formRef.value.getError(prop);
    };
    this.getErrors = () => {
      return common_vendor.__awaiter(this, void 0, void 0, function* () {
        return this.formRef.value.getErrors();
      });
    };
    this.removeError = (prop) => {
      this.formRef.value.removeError(prop);
    };
    this.clearErrors = () => {
      this.formRef.value.clearErrors();
    };
    this.getRule = (prop) => {
      return this.formRef.value.getRule(prop);
    };
    this.setRule = (prop, rules) => {
      this.formRef.value.setRule(prop, rules);
    };
    this.removeRule = (prop) => {
      this.formRef.value.removeRule(prop);
    };
    this.validateRule = (value, rule) => {
      return this.formRef.value.validateRule(value, rule);
    };
    this.clearValidate = () => {
      this.formRef.value.clearValidate();
    };
    this.validateField = (prop) => {
      return this.formRef.value.validateField(prop);
    };
    this.validate = (callback) => {
      this.formRef.value.validate(callback);
    };
    this.isError = (prop) => {
      return this.formRef.value.getError(prop) != "";
    };
    if (this.formRef.value == null) {
      const ClForm = uni_modules_coolUnix_cool_hooks_parent.useParent("cl-form");
      if (ClForm != null) {
        this.formRef.value = ClForm;
      }
    }
    this.disabled = common_vendor.computed(() => {
      if (this.formRef.value == null) {
        return false;
      }
      return this.formRef.value.disabled;
    });
  }
}
class FormItem {
  constructor() {
    this.formItemRef = common_vendor.ref(null);
    const isError = new Form().isError;
    if (this.formItemRef.value == null) {
      const ClFormItem = uni_modules_coolUnix_cool_hooks_parent.useParent("cl-form-item");
      if (ClFormItem != null) {
        this.formItemRef.value = ClFormItem;
      }
    }
    this.isError = common_vendor.computed(() => {
      if (this.formItemRef.value == null) {
        return false;
      }
      return isError(this.formItemRef.value.prop);
    });
  }
}
const useForm = () => {
  return new Form();
};
const useFormItem = () => {
  return new FormItem();
};
exports.useForm = useForm;
exports.useFormItem = useFormItem;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/cool-unix/hooks/form.js.map
