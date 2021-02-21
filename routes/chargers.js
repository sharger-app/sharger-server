var express = require('express');
var router = express.Router();
const Charger = require("../models/chargers");
const Session = require("../models/session");
const Validator = require("validator");
const isEmpty = require("is-empty");
const mongoose = require("mongoose");
const fetch = require('node-fetch');
require('dotenv').config();
const maps = process.env.maps;

const validateChargerInput = require("../validation/charger");
/* GET home page. */
router.get('/', function (req, res, next) {
    Charger.find({}).exec(async function (err, charger) {
        res.send(charger);
    });
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

router.get('/search', async function (req, res, next) {
    console.log(maps);
    var distance = [];
    var return1 = [];
    Charger.find({}).exec(async function (err, charger) {
        for (var i = 0; i < charger.length; i++) {
            let dist = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.body.address}&destinations=${charger[i].address}&key=${maps}`).then(res => res.json()).catch(err => { });
            dist1 = dist.rows[0].elements[0].distance.value;
            if (i != 0 && i>10) {
                if (dist1 <= Math.min.apply(Math, nums)) {
                    var rep = distance.indexOf(Math.min.apply(Math, nums));
                    return1[rep] =charger[i];
                    distance[rep]=dist1;
                }
            }
            else{
                distance.push(dist1);
                return1.push(charger[i]);
            }
        }
    });
    res.send(return1);
});


router.post('/book', async function (req, res, next) {
    Charger.findOne({ _id: req.body.charger }).exec(async function (err, charger) {
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
        if (charger.sessions.length == 0) {
            charger.sessions = [newSess._id];
        }
        else {
            charger.sessions.push(newSess._id);
        }
        await charger.save().catch(err => console.log(err));
    });
});

module.exports = router;
