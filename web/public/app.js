// DEVICE REQUESTS
const API_URL = 'http://localhost:5000/api';
const currentUser = localStorage.getItem('user');
if (currentUser) {
    $.get(`${API_URL}/users/${currentUser}/devices`)
        .then(response => {
            response.forEach((device) => {
                $('#devices tbody').append(`
                    <tr>
                    <td>${device.user}</td>
                    <td><button data-device-id=${device._id} class="btn btn-primary btn-sm">${device.name}</button></td>
                    </tr>`
                );
            });
            $('#devices tbody button').on('click', (e) => {
                const deviceId = e.currentTarget.getAttribute('data-device-id');
                $.get(`${API_URL}/devices/${deviceId}/device-history`)
                    .then(response => {
                        response.map(sensorData => {
                            $('#historyContent').append(`
                            <tr>
                            <td>${sensorData.ts}</td>
                            <td>${sensorData.temp}</td>
                            <td>${sensorData.loc.lat}</td>
                            <td>${sensorData.loc.lon}</td>
                            </tr>`);
                        });
                    });
                $('#historyModal').modal('show');
            });
        })
        .catch(error => { console.error(`Error: ${error}`); });
} else {
    const path = window.location.pathname;
    if (path !== '/login') { location.href = '/login'; }
}



// ONCLICK event handler to add devices    
$('#add-device').on('click', function () {
    const user = $('#user').val();
    const name = $('#name').val();
    sensorData = "N/A"
    const body = { name, user, sensorData }
    $.post(`${API_URL}/devices`, body)
        .then(response => {
            location.href = '/';
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        })
});

$('#login').on('click', () => {
    const user = $('#uname').val();
    const password = $('#pword').val();
    $.post(`${API_URL}/authenticate`, { user, password })
        .then((response) => {
            if (response.success) {
                localStorage.setItem('user', user);
                localStorage.setItem('isAdmin', response.isAdmin);
                localStorage.setItem('isAuthenticated', true)
                location.href = '/';
            } else { $('#message').append(`<p class="alert alert-danger">${response}</p>`); }
        });
});

//ONCLICK event handler to send devices
$('#send-command').on('click', function () {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
});

$('#register').on('click', function () {
    const user = $('#username').val()
    const password = $('#password').val()
    const c_password = $('#c_password').val()
    if (password != c_password) {
        document.getElementById('error').innerHTML = "Passwords doesn't match";
    } else if (password == "" || c_password == "") {
        document.getElementById('error').innerHTML = "Password cannot be empty";
    } else {
        $.post(`${API_URL}/registration`, { user, password, isAdmin: 1 }).then(response => { console.log(response) })
        location.href = '/login';
    }
});

$('#signin').on('click', function () {
    const username = $('#uname').val()
    const password = $('#pword').val()
    const exists = users.find(user => user.username === username);
    if (exists) {
        if (exists.password == password) {
            document.getElementById('error').innerHTML = "";
            location.href = '/';
            localStorage.setItem('isAuthenticated', true);
        } else { document.getElementById('error').innerHTML = "Incorrect password or username"; }
    } else { document.getElementById('error').innerHTML = "Incorrect password or username"; }
});

const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
}
// adding navbar
$('#navbar').load('navbar.html');

// adding navbar
$('#footer').load('footer.html');