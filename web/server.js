const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const base = `${__dirname}/public`

// serving static files from public directory
app.use(express.static('public'))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
});

// MIDDLEWARE
// handling calls from / path
app.get('/', (req, res) => { res.sendFile(`${base}/device-list.html`); });
app.get('/registration', (req, res) => { res.sendFile(`${base}/registration.html`); });
app.get('/register-device', (req, res) => { res.sendFile(`${base}/register-device.html`); });
app.get('/send-command', (req, res) => { res.sendFile(`${base}/send-command.html`); });
app.get('/about', (req, res) => { res.sendFile(`${base}/about-me.html`); });
app.get('/login', (req, res) => { res.sendFile(`${base}/login.html`); });
app.get('*', (req, res) => { res.sendFile(`${base}/404.html`); });

// server listen
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}/`);
});