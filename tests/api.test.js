const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const {API_URL} = process.env;

test('test device array', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/devices`)    
    .then(resp => resp.data)    
    .then(resp => {
        expect(resp[0].user).toEqual('test');    
    });  
});

test('test registration endpoint', () => {
    expect.assertions(1);
    return axios.post(`${API_URL}/registration`, {user:'test', password:'pw'})    
    .then(resp => resp.data)    
    .then(resp => {
        expect(resp[0].user).toEqual('test');    
    });  
});