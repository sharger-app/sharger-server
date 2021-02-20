
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChargerInput(data) {
    let errors = {};

    data.owner = !isEmpty(data.owner) ? data.owner : "";
    data.speed = !isEmpty(data.speed) ? data.speed : "";
    data.plug = !isEmpty(data.plug) ? data.plug : "";
    data.wattage = !isEmpty(data.wattage) ? data.wattage : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.housing = !isEmpty(data.housing) ? data.housing : "";

    // Name checks
    if (Validator.isEmpty(data.owner)) {
        errors.owner = "Owner field is required";
    }
    if (Validator.isEmpty(data.speed)) {
        errors.speed = "Spped field is required";
    }
    if (!Validator.isEmail(data.plug)) {
        errors.plug = "Plug field is required";
    }
    if (Validator.isEmpty(data.wattage)) {
        errors.wattage = "Wattage field is required";
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = "Address field is required";
    }
    if (Validator.isEmpty(data.housing)) {
        errors.housing = "Housing field is required";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};