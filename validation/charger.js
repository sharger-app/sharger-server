
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChargerInput(data) {
    let errors = {};

    data.speed = !isEmpty(data.speed) ? data.speed : "";
    data.plug = !isEmpty(data.plug) ? data.plug : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.name = !isEmpty(data.name) ? data.name : "";

    // Name checks
    if (Validator.isEmpty(data.speed)) {
        errors.speed = "Spped field is required";
    }
    if (Validator.isEmpty(data.plug)) {
        errors.plug = "Plug field is required";
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = "Address field is required";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
