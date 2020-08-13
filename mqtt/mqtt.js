const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Device = require('./models/device')
const app = express();
const dotenv = require('dotenv');
const randomCoordinates = require('random-coordinates');
const rand = require('random-int')
dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("db connection successful")).catch(error => console.error(error));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    client.subscribe('/sensorData');
    console.log('mqtt connected');
});

client.on('message', (topic, message) => {
    if (topic == '/sensorData') {
        const data = JSON.parse(message);

        Device.findOne({ "name": data.deviceId }, (err, device) => {
            if (err) {
                console.log(err)
            }

            const { sensorData } = device;
            const { ts, loc, temp } = data;
            sensorData.push({ ts, loc, temp });
            device.sensorData = sensorData;
            device.save(err => {
                if (err) {
                    console.log(err)
                }
            });
        });
    }
});

/**
 * @api {post} /send-command
 * @apiDescription This route sends a command to the targeted device
 * @apiGroup SensorData
 * 
 * @apiParam {String} deviceId Id of of the Device.
 * @apiParam {String} command to the Device.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "published new message"
 * }
 */
app.post('/send-command', (req, res) => {
    const { deviceId, command } = req.body;
    const topic = `/219397418/command/${deviceId}`;
    client.publish(topic, command, () => {
        res.send('publish new message');
    });
});


/**
 * @api {put} /sensor-data Post a device sensor data to database
 * @apiDescription This route adds a sensor data with relavent details to the database.
 * @apiGroup SensorData
 * 
 * @apiParam {String} deviceId Id of the Device.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "published new message"
 * }
 */
app.put('/sensor-data', (req, res) => {
    const { deviceId } = req.body;
    const [lat, lon] = randomCoordinates().split(", ");
    const ts = new Date().getTime();
    const loc = { lat, lon };
    const temp = rand(20, 50);
    const topic = `/sensorData`;
    const message = JSON.stringify({ deviceId, ts, loc, temp });
    client.publish(topic, message, () => {
        res.send('published new message');
    });
});

app.use(express.static(`${__dirname}/public/generated-docs/`));
app.get('/', (req, res) => { res.sendFile(`${__dirname}/public/generated-docs/`); });

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
