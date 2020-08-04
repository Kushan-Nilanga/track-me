const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const Device = require('./models/device');
const User = require('./models/user')
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("db connection successful")).catch(error => console.error(error));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
});

app.use(express.static(`${__dirname}/public/generated-docs/`));

app.post('/api/registration', (req, res) => {
    const { user, password, isAdmin } = req.body;
    User.findOne({ user: user }, (err, re) => {
        if (re != null) {
            return res.status(409).send("User already exists")
        } else {
            let usr = new User({ user: user, password: password, isAdmin: isAdmin })
            usr.save(err => { return err ? res.send(err) : res.json({ success: true, message: "user created" }) })
        }
    })
})

app.post('/api/authenticate', (req, res) => {
    const { user, password } = req.body;
    User.findOne({ user, password }, (error, user) => {
        if (user == null) {
            return res.json({ error: "Incorrect username or password", user: user })
        } else {
            return res.json({
                success: true,
                message: 'Authenticated successfully',
                isAdmin: user.isAdmin
            });
        }
    })
})

app.get('/api/users/:user/devices', (req, res) => {
    const { user } = req.params;
    Device.find({ "user": user }, (err, devices) => {
        return err
            ? res.send(err)
            : res.send(devices);
    });
});


app.get('/api/devices/:deviceId/device-history', (req, res) => {
    const { deviceId } = req.params;
    Device.findOne({ "_id": deviceId }, (err, devices) => {
        const { sensorData } = devices;
        return err ? res.send(err) : res.send(sensorData);
    });
});

app.get('/docs', (req, res) => {
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
 * @api {post} /api/devices Post a device to database
 * @apiDescription This route adds a device with relavent details to the database.
 * @apiGroup Device
 * 
 * @apiParam {String} name Name of the Device.
 * @apiParam {String} user Name of the User.
 * @apiParam {json} sensorData Array containing longitude and latitude of device
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "successfully added device and data"
 * }
 */
app.post('/api/devices', (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
        name,
        user,
        sensorData
    });
    newDevice.save(err => {
        return err ?
            res.send(err) :
            res.send('successfully added device and data');
    });
});

/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiDescription This route returns all the devices in the database.
* @apiSuccessExample {json} Success-Response:
* [
    * {
    * "_id": "dsohsdohsdofhsofhosfhsofh",
    * "name": "Mary's iPhone",
    * "user": "mary",
    * "sensorData": 
    * [
            * {
            * "ts": "1529542230",
            * "temp": 12,
            * "loc": 
                * {
                    * "lat": -37.84674,
                    * "lon": 145.115113
                * }
            * },
                * {
                * "ts": "1529572230",
                * "temp": 17,
                * "loc": 
                * {
                    * "lat": -37.850026,
                    * "lon": 145.117683
                * }
            * }
        * ]
    * }
* ]
* @apiErrorExample {json} Error-Response:
* {
*   "User does not exist"
* }
*/

app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        return err ?
            res.send(err) :
            res.send(devices);
    });
});

// /**
// * @api {post} /api/send-command Command A string of command
// * @apiGroup Test
// * @apiDescription This route outputs the said command as a console output.
// */
// app.post('/api/send-command', (req, res) => {
//     console.log(req.body);
// })

/**
* @api {get} /api/test SuccessString A string verifying success
* @apiGroup Test
* @apiDescription This route is a test route to check the functionality of the api.
* @apiSuccessExample {json} Success-Response:
*   {
*        "The API is working!"
*   }  
*/
app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});