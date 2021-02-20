var express = require('express');
var router = express.Router();
const Charger = require("../models/chargers");
const Validator = require("validator");
const isEmpty = require("is-empty");

/* GET home page. */
router.post('/', function (req, res, next) {
    res.send('hello');
});

router.post('/add', function (req, res, next) {
    const { errors, isValid } = validateChargerInput(req.body);


    if (!isValid) {
        return res.status(400).json(errors);
    }

    Charger.findOne({ owner: req.body.owner, name: req.body.name }).then(charger => {
        if (charger) {
            return res.status.json({ name: "Name already exists" });
        }
        else {
            req.body.image = !isEmpty(data.image) ? data.image : "";

            const newCharger = new Charger({
                _id: mongoose.Types.ObjectId(),
                owner: req.body.owner,
                name: req.body.name,
                wattage: req.body.wattage,
                plug: req.body.plug,
                address: req.body.address,
                housing: req.body.housing,
                speed: req.body.speed
            });

            if (!Validator.isEmpty(req.body.image)) {
                newCharger.image = req.body.image;
            }

            newCharger.save().then(charger => res.json(charger))
                .catch(err => console.log(err));
        }
    });
});

module.exports = router;
