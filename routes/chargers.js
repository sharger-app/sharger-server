var express = require('express');
var router = express.Router();
const Charger = require("../models/chargers");
const Session = require("../models/session");
const Validator = require("validator");
const isEmpty = require("is-empty");
const mongoose = require("mongoose");
const fetch = require('node-fetch');
const maps = process.env.maps;

const validateChargerInput = require("../validation/charger");
/* GET home page. */
router.post('/', function (req, res, next) {
    res.send('hello');
});

router.post('/add', async function (req, res, next) {
    console.log(req.body);
    const { errors, isValid } = validateChargerInput(req.body);
    console.log(isValid);
    if (!isValid) {
        res.status(400);
        return res.json(errors);
    }
    Charger.findOne({ owner: req.body.owner, name: req.body.name }).then(charger => {
        if (charger) {
            return res.status(400).json({ name: "Name already exists" });
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
                price: req.body.price,
                sessions: []
            });

            if (!Validator.isEmpty(req.body.image)) {
                newCharger.image = req.body.image;
            }

            newCharger.save().then(charger => {
                res.json(charger);
            }).catch(err => console.log(err));

        }
    });
});

// router.post('/search', async function (req, res, next) {
//     Charger.find({}).exec(async function (err, charger) {
//         for (var i = 0; i < charger.length; i++) {
//             let dist = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.body.address}&destinations=${charger[i].address}&key=${maps}`);
//             console.log(dist);
//         }
//     });
// });


router.post('/book', async function (req, res, next) {
    Charger.findOne({_id: req.body.charger }).exec(async function (err, charger) {
        console.log(req);
        const newSess = new Session({
            _id: mongoose.Types.ObjectId(),
            charger: req.body.charger,
            start: req.body.start,
            end: req.body.end,
            booker: req.body.booker
        });
        await newSess.save().then(charger => {
            res.json(charger);
        }).catch(err => console.log(err));
        if (charger.sessions.length == 0){
            charger.sessions = [newSess._id];
        }
        else{
            charger.sessions.push(newSess._id);
        }
        await charger.save().catch(err => console.log(err));
    });
});

module.exports = router;
