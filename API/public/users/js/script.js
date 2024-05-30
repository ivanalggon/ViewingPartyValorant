// Crear alerta personalizada
function customAlert(message, alertType) {
    window.alert(`${alertType.toUpperCase()}: ${message}`);
}

// funcion que si el usuario selecciona en el select user, el campo role se rellena con 0 y si selecciona admin se rellena con 1
function roleUser() {
    const role = document.getElementById('role');
    const roleValue = role.value;

    if (roleValue === 'user') {
        role.value = 0;
    } else if (roleValue === 'admin') {
        role.value = 1;
    }
}

// Función para enviar el formulario
function submit() {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value;
    const roleInput = document.getElementById('role');
    const roleValue = roleInput.value;

    if (!emailValue.includes('@')) {
        customAlert('El campo de correo electrónico debe contener "@"', 'danger');
        return;
    }

    const data = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        username: document.getElementById('username').value,
        email: emailValue,
        password: document.getElementById('password').value,
        role: roleValue,
    };

    const url = 'http://localhost:3000/api/users';

    let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    });

    fetch(request)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            console.log("ENVIADO:", data);
            customAlert('¡Enviado correctamente!', 'Usuario creado');
            // Recargar la página después de la alerta
            location.reload();
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error.message);
            customAlert('Error al enviar', 'danger');
        });
}