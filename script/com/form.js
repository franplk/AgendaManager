/*
 * JavaScript Library Customized For From Element
 * Form 表单相关的类库
 * 依赖于 api.js（主要是dom操作） 库
 * */
(function(w) {
	
	// Text Input Assert
	var isTypeOf = function (el, typeName) {
		var type = $api.attr(el, "type");
		return type == typeName;
	};
	
	// Get Input Type
	var getInputType = function (el) {
		var type = $api.attr(el, "type");
		return type;
	};
	
	/*校验是否全由数字组成 */
	var isNumber = function (str) {
		var reg=/^[0-9]$/;
		return reg.test(str);
	};
	
	var u = {};
	
	// 设定表单元素的可编辑
	u.setFormDisabled = function (isEnable) {
		var formItems = $api.domAll("input");
		for (var idx in formItems) {
			var item = formItems[idx];
			item.disabled = isEnable;
		}
	};
	
	// 获取表单数据
	u.getFormData = function(selector) {
		selector || (selector = "input");
		var formData = {};
		var formItems = $api.domAll(selector);
		for (var idx in formItems) {
			var item = formItems[idx];
			var key = $api.attr(item, "name");
			var value = $api.val(item);
			if (isTypeOf(item, 'checkbox')) {
				formData[key] = item.checked;
			} else if (isTypeOf(item, 'radio')) {
				if (item.checked) {
					formData[key] = value;
				}
			} else {
				formData[key] = value;
			}
		}
		return formData;
	};

	// 设置表单数据
	u.setFormData = function (formData) {
		var formItems = $api.domAll("input");
		for (var idx in formItems) {
			var item = formItems[idx];
			var key = $api.attr(item, "name");
			var value = formData[key];
			if (isTypeOf(item, 'checkbox')) {
				value && (item.checked = true);
			} else if (isTypeOf(item, 'radio')) {
				var radiovalue = $api.val(item);
				(radiovalue == value) && (item.checked = true);
			} else {
				value && $api.val(item, value);
			}
		}
	};
	
	// 表单验证
	u.validateForm = function (selector) {
		selector || (selector = "input");
		var errorMsg = "";
		var formItems = $api.domAll(selector);
		for (var idx in formItems) {
			var item = formItems[idx];
			var isValid = validateInput(item);
			if (isValid == false) {
				errorMsg = $api.attr(item, "errorMsg");
				break;
			}
		}
		return errorMsg;
	};
	
	// Input Validation
	var validateInput = function (domEl) {
		var value = $api.val(domEl);
		var validate = $api.attr(domEl, "validate");
		if (!validate) {
			return true;
		} else if (validate == "required") {
			return true && value;
		} else if (validate == "number") {
			return isNumber(value);
		}
		return true;
	};

	window.$form = u;

})(window); 