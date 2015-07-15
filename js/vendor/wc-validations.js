var WCValidationModule = (function() {

	var inputPresent = function($input) {
		return inputMinLength($input, 1);
	};

	var inputEmail = function($input) {
		var value = getInputValue($input);
		var reg = /.+@.+\..+/i;
		return reg.test(value);
	};

	var inputMaxLength = function($input, maxLength) {
		var value = getInputValue($input);
		return value.length <= maxLength;
	};

	var inputMinLength = function($input, minLength) {
		var value = getInputValue($input);
		return value.length >= minLength;
	};

	var getInputValue = function($input) {
		var value = $input.val();
		return value.trim();
	};

	return {
		inputPresent: inputPresent,
		inputEmail: inputEmail,
		inputMaxLength: inputMaxLength
	};
})();