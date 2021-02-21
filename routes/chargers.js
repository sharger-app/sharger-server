var express = require('express');
var router = express.Router();
const Charger = require("../models/chargers");
const Session = require("../models/session");
const Validator = require("validator");
const isEmpty = require("is-empty");
const mongoose = require("mongoose");
const fetch = require('node-fetch');

const User = require("../models/user");
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

router.post('/search', async function (req, res, next) {
    var distance = [];
    var return1 = [];
    Charger.find({}).exec(async function (err, charger) {
        for (var i = 0; i < charger.length; i++) {
            let dist = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.body.address}&destinations=${charger[i].address}&key=${maps}`).then(res => res.json()).catch(err => { });
            dist1 = dist.rows[0].elements[0].distance.value;
            if (i != 0 && i > 10) {
                if (dist1 <= Math.min.apply(Math, nums)) {
                    var rep = distance.indexOf(Math.min.apply(Math, nums));
                    return1[rep] = charger[i];
                    distance[rep] = dist1;
                }
            }
            else {
                distance.push(dist1);
                return1.push(charger[i]);
            }
            console.log(dist1);
        }
    });
    // console.log(return1);
    // for (var i = 0; i < return1.length; i++) {
    //     for (var k = 0; k < return1[i].sessions.length; k++) {
    //         Session.findOne({ _id: return1[i].sessions[k] }).then(sess => {
    //             return1[i].sessions[k] = sess;
    //         });
    //     }
    //     User.findOne({ _id: return1[i].owner }).then(sess => {
    //         return1[i].owner = sess;
    //     });
    // }
    // console.log(return1);
    res.send(return1);
});

router.get('/getsession', async function (req, res, next) {
    Session.findOne({_id:req.body.sess}).exec(async function (err, charger) {
        res.send(charger);
    });
});

router.get('/getowner', async function (req, res, next) {
    User.find({_id : req.body.owner}).exec(async function (err, charger) {
        res.send(charger);
    });
});


// router.post('/adduser', async function (req, res, next) {
//     const newSess = new User({
//         _id: mongoose.Types.ObjectId(),
//         email: req.body.e,
//         password: req.body.p,
//         first_name: req.body.end,
//         last_name: req.body.booker
//     });
//     await newSess.save().then(charger => {
//         res.json(charger);
//     }).catch(err => console.log(err));
// });


router.get('/getcharger', async function (req, res, next) {
    Charger.findOne({_id:req.body.charger}).exec(async function (err, charger) {
        res.send(charger);
    });
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
