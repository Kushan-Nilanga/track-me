const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const { API_URL } = process.env;


// Testing user registration endpoint
describe("test user registration endpoint", () => {
    test('test existing user registration', () => {
        expect.assertions(1);
        return axios.post(`${API_URL}/registration`, { user: 'test', password: 'pw' })
            .catch(err => {
                expect(err.response.status).toEqual(409);
            })
    });

    test('test new user registration', () => {
        expect.assertions(1);
        return axios.post(`${API_URL}/registration`, { user: 'jest.test.user', password: 'jest.test.pw' })
            .then(res => {
                expect(res.status).toEqual(200);
            })
    });
})

describe("test authentication endpoint", () => {
    // Testing authentication endpoint
    test('test invalid (username) authenticate', () => {
        expect.assertions(1);
        return axios.post(`${API_URL}/authenticate`, { user: 'thisisnotauser', password: 'somepass' }).then(res => {
            expect(res.data.error).toEqual("Incorrect username or password")
        })
    })
    test('test invalid (password) authenticate', () => {
        expect.assertions(1);
        return axios.post(`${API_URL}/authenticate`, { user: 'jestuser', password: 'somepass' }).then(res => {
            expect(res.data.error).toEqual("Incorrect username or password")
        })
    })
})

describe("test post device endpoint", () => { 
    test('test post device endpoint', () => { 
        expect.assertions(1);
        return axios.post(`${API_URL}/devices`,
            {
                name: "jest IoT", user: "jestuser",
                sensorData: [{
                    'ts': '1529542230',
                    "temp": "12",
                    "loc": {
                        "lat": -37.84674,
                        "lon": 145.115113
                    }
                }]
            }).then(res => { 
                expect(res.data).toEqual('successfully added device and data');
            })
    })
})

// Testing devices endpoint
describe("test get devices endpoint", () => {
    test('test device array', () => {
        expect.assertions(1);
        return axios.get(`${API_URL}/devices`)
            .then(resp => resp.data)
            .then(resp => {
                expect(resp[0].user).toEqual('test');
            });
    });
    test('test user device endpoint', () => {
        expect.assertions(1)
        return axios.get(`${API_URL}/users/jestuser/devices`)
            .then(res => {
                expect(res.data[0].name).toEqual('jest IoT');
            })
    })
})

describe("test device history endpoints", () => { 
    test('test device history', () => {
        expect.assertions(1)
        return axios.get(`${API_URL}/devices/5f1baeb6bf3db310f46cd89e/device-history`)
            .then(res => {
                expect(res.data[0].temp).toEqual("30.0")
            })
    })
})