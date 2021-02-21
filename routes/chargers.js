var express = require('express');
var router = express.Router();
const Charger = require("../models/chargers");
const Validator = require("validator");
const isEmpty = require("is-empty");
const mongoose = require("mongoose");

const validateChargerInput = require("../validation/charger");
/* GET home page. */
router.post('/', function (req, res, next) {
    res.send('hello');
});

router.post('/add', async function (req, res, next) {
    console.log(req.body);
    const { errors, isValid } = validateChargerInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const uri = process.env.mongoose;
    await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
    Charger.findOne({ owner: req.body.owner, name: req.body.name }).then(charger => {
        if (charger) {
            mongoose.disconnect();
            return res.status.json({ name: "Name already exists" });
        }
        else {
            req.body.image = !isEmpty(req.body.image) ? req.body.image : "";

            const newCharger = new Charger({
                _id: mongoose.Types.ObjectId(),
                owner: req.body.owner,
                name: req.body.name,
                wattage: req.body.wattage,
                plug: req.body.plug,
                address: req.body.address,
                housing: req.body.housing,
                speed: req.body.speed,
                price: req.body.price
            });

            if (!Validator.isEmpty(req.body.image)) {
                newCharger.image = req.body.image;
            }

            newCharger.save().then(charger => {
                res.json(charger);
                mongoose.disconnect();
            }).catch(err => console.log(err));

        }
    });
});

module.exports = router;
