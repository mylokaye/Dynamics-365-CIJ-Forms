'use strict';
console.log("[Form Validation] Script loaded");
document.addEventListener("DOMContentLoaded", function () {
	console.log("[Form Validation] DOMContentLoaded fired");
	var form = document.querySelector("form.marketingForm");
	if (!form) {
		console.log("[Form Validation] No marketing form found; aborting");
		return;
	}

	var requiredBlocks = Array.prototype.slice.call(
		form.querySelectorAll('[data-required]:not([data-required="false"])')
	);

	var EMAIL_ERROR_MESSAGE = "Enter a valid email address";
	var blockedEmailDomainsMap = {};
	(function () {
		var raw = (form.dataset.blockedEmailDomains || "example.com,test.com").split(",");
		for (var i = 0; i < raw.length; i++) {
			var d = String(raw[i]).trim().toLowerCase();
			if (d.length > 0) blockedEmailDomainsMap[d] = true;
		}
	})();
	var PHONE_ERROR_MESSAGE = "Enter a valid phone number";
	var phoneBlock = null;
	var phoneInput = null;
	var phonePlugin = null;
	var phoneErrorMessageText = PHONE_ERROR_MESSAGE;

	function showError(block, field, customMessage) {
		block.classList.add("has-error");
		field.setAttribute("aria-invalid", "true");
		var message = block.querySelector(".field-error-message");
		var usedMessage = customMessage || "";
		if (message) {
			var defaultMessage = message.dataset.defaultMessage || "";
			if (customMessage) {
				message.textContent = customMessage;
			} else if (defaultMessage) {
				message.textContent = defaultMessage;
			}
			message.classList.add("is-visible");
			if (!usedMessage) {
				usedMessage = message.textContent || defaultMessage || "";
			}
		}
		console.log("[Form Validation] ShowError", {
			fieldName: field.name || "",
			fieldId: field.id || "",
			message: usedMessage || "(no message)",
		});
	}

	function clearError(block, field) {
		block.classList.remove("has-error");
		field.removeAttribute("aria-invalid");
		var message = block.querySelector(".field-error-message");
		var defaultMessage = message ? (message.dataset.defaultMessage || "") : "";
		if (message) {
			if (defaultMessage) {
				message.textContent = defaultMessage;
			}
			message.classList.remove("is-visible");
		}
		console.log("[Form Validation] ClearError", {
			fieldName: field.name || "",
			fieldId: field.id || "",
		});
	}

	function isEmailField(field) {
		return field.type === "email";
	}

	function isEmailValid(value) {
		var trimmed = value.trim();
		if (!trimmed) return false;

		// Simple RFC5322-like check suitable for client-side use
		var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(trimmed)) return false;

		// Efficient domain extraction and lookup
		var atIdx = trimmed.lastIndexOf("@");
		var domain = trimmed.slice(atIdx + 1).toLowerCase();

		if (blockedEmailDomainsMap[domain]) return false;
		return true;
	}

	function validateEmailField(block, field) {
		if (!isEmailValid(field.value)) {
			showError(block, field, EMAIL_ERROR_MESSAGE);
			return false;
		}

		clearError(block, field);
		return true;
	}

	function ensurePhoneMessageDefaults(messageElement) {
		if (!messageElement) return;
		var trimmed = (messageElement.textContent || "").trim();
		phoneErrorMessageText = trimmed || PHONE_ERROR_MESSAGE;
		// ES5-safe default assignment
		if (!messageElement.dataset.defaultMessage) {
			messageElement.dataset.defaultMessage = phoneErrorMessageText;
		}
	}

	function validatePhoneField(shouldShowError) {
		if (!phoneInput) {
			return true;
		}

		var value = phoneInput.value.trim();
		if (!value) {
			clearError(phoneBlock, phoneInput);
			return true;
		}

		if (!phonePlugin) {
			clearError(phoneBlock, phoneInput);
			return true;
		}

		if (phonePlugin.isValidNumber()) {
			clearError(phoneBlock, phoneInput);
			return true;
		}

		if (shouldShowError) {
			showError(phoneBlock, phoneInput, phoneErrorMessageText);
		}

		return false;
	}

	function handlePhoneInput() {
		validatePhoneField(false);
	}

	function handlePhoneBlur() {
		validatePhoneField(true);
	}

	function handlePhoneCountryChange() {
		if (!phoneInput) {
			return;
		}

		if (!phoneInput.value.trim()) {
			clearError(phoneBlock, phoneInput);
			return;
		}

		if (phonePlugin && phonePlugin.isValidNumber()) {
			clearError(phoneBlock, phoneInput);
		}
	}

	// Centralize preferred countries for reuse
	var PREFERRED_COUNTRIES = ["gb", "us"];

	function initializePhoneField() {
		phoneBlock = form.querySelector(".phoneFormFieldBlock");
		if (!phoneBlock) {
			console.log("[Form Validation] Phone block not present; skipping phone setup");
			return;
		}

		phoneInput = phoneBlock.querySelector('input[type="tel"]');
		if (!phoneInput) {
			console.log("[Form Validation] Phone input not found; skipping phone setup");
			return;
		}

		ensurePhoneMessageDefaults(phoneBlock.querySelector(".field-error-message"));

		if (!window.intlTelInput) {
			console.log("[Form Validation] intlTelInput not available; skipping plugin initialization");
			return;
		}

		phonePlugin = window.intlTelInput(phoneInput, {
			utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@26.0.6/build/js/utils.js",
			autoPlaceholder: "polite",
			nationalMode: false,
			preferredCountries: PREFERRED_COUNTRIES,
		});

		phoneInput.addEventListener("input", handlePhoneInput);
		phoneInput.addEventListener("blur", handlePhoneBlur);
		phoneInput.addEventListener("countrychange", handlePhoneCountryChange);
		console.log("[Form Validation] Phone field initialized", {
			preferredCountries: PREFERRED_COUNTRIES
		});
	}

	function validateRequiredBlocks() {
		var hasErrors = false;

		requiredBlocks.forEach(function (block) {
			var field = block.querySelector("input, textarea, select");
			if (!field) {
				return;
			}

			if (!field.value.trim()) {
				console.log("[Form Validation] Required missing", {
					fieldName: field.name || "",
					fieldId: field.id || "",
				});
				showError(block, field);
				hasErrors = true;
				return;
			}

			if (isEmailField(field) && !isEmailValid(field.value)) {
				console.log("[Form Validation] Email invalid", {
					fieldName: field.name || "",
					fieldId: field.id || "",
					value: field.value,
				});
				showError(block, field, EMAIL_ERROR_MESSAGE);
				hasErrors = true;
				return;
			}

			clearError(block, field);
			console.log("[Form Validation] Field valid", {
				fieldName: field.name || "",
				fieldId: field.id || "",
			});
		});

		return hasErrors;
	}

	initializePhoneField();
	console.log("[Form Validation] Core validation setup complete", {
		requiredBlockCount: requiredBlocks.length
	});

	requiredBlocks.forEach(function (block) {
		var field = block.querySelector("input, textarea, select");
		if (!field) {
			return;
		}

		var message = block.querySelector(".field-error-message");
		if (message && !message.dataset.defaultMessage) {
			message.dataset.defaultMessage = message.textContent.trim();
		}

		field.addEventListener("input", function () {
			if (isEmailField(field)) {
				if (field.value.trim() && isEmailValid(field.value)) {
					clearError(block, field);
				}
				return;
			}

			if (field.value.trim()) {
				clearError(block, field);
			}
		});

		field.addEventListener("blur", function () {
			if (!field.value.trim()) {
				showError(block, field);
				return;
			}

			if (isEmailField(field)) {
				validateEmailField(block, field);
			}
		});

		if (isEmailField(field)) {
			field.addEventListener("change", function () {
				if (!field.value.trim()) {
					showError(block, field);
					return;
				}

				validateEmailField(block, field);
			});
		}
	});

	form.addEventListener("submit", function (event) {
		// Only prevent default when invalid; allow native submission when valid
		var hasRequiredErrors = validateRequiredBlocks();
		var phoneIsValid = validatePhoneField(true);

		if (hasRequiredErrors || !phoneIsValid) {
			event.preventDefault();
			console.log("[Form Validation] Validation failed", {
				hasRequiredErrors: hasRequiredErrors,
				phoneIsValid: phoneIsValid
			});
			return;
		}

		console.log("[Form Validation] Validation passed; submitting form");
		// Let the browser submit naturally (no manual submit call)
	});
});
