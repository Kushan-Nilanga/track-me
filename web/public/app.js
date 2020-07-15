// DEVICE REQUESTS
$.get('http://localhost:3001/devices')
    .then(response => {
        response.forEach(device => {
            $('#devices tbody').append(`
                <tr>
                    <td>${device.user}</td>
                    <td>${device.name}</td>
                </tr>`
            );
        });
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });


const users = JSON.parse(localStorage.getItem('users')) || [];

// ONCLICK event handler to add devices    
$('#add-device').on('click', function () {
    const user = $('#user').val();
    const name = $('#name').val();
    sensorData = "N/A"
    const body = { name, user, sensorData }
    $.post('http://localhost:3001/devices', body)
        .then(response => {
            location.href = '/';
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        })
});

//ONCLICK event handler to remove all the devices
$('#remove-devices').on('click', function () {
    $.get('http://localhost:3001/devices')
        .then(response => {
            response.forEach(entry => {
                $.ajax({
                    url: `http://localhost:3001/devices/${entry.id}`,
                    type: 'DELETE'
                })
            })
        }).then(() => {
            location.href = '/';
        })
});

//ONCLICK event handler to send devices
$('#send-command').on('click', function () {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
});

$('#register').on('click', function () {
    const username = $('#username').val()
    const password = $('#password').val()
    const c_password = $('#c_password').val()
    const exists = users.find(user => user.username === username);
    if (exists) {
        document.getElementById('error').innerHTML = "User already exists";
    } else if (password != c_password) {
        document.getElementById('error').innerHTML = "Passwords doesn't match";
    } else if (password == "" || c_password == "") {
        document.getElementById('error').innerHTML = "Password cannot be empty";
    }
    else {
        users.push({ username, password })
        localStorage.setItem('users', JSON.stringify(users));
        location.href = '/login';
    }
});

$('#signin').on('click', function () {
    const username = $('#uname').val()
    const password = $('#pword').val()
    const exists = users.find(user => user.username === username);
    if (exists) {
        if (exists.password == password) { document.getElementById('error').innerHTML = ""; location.href = '/'; localStorage.setItem('isAuthenticated', true); }
        else { document.getElementById('error').innerHTML = "Incorrect password or username"; }
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