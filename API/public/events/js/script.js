// Crear alerta personalizada
function customAlert(message, alertType) {
    window.alert(`${alertType.toUpperCase()}: ${message}`);
}

// Función para enviar el formulario
function submit() {
    // Crear un objeto FormData para manejar archivos
    const formData = new FormData();

    formData.append('name', document.getElementById('name').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('stock', document.getElementById('stock').value);
    formData.append('location', document.getElementById('location').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('date', document.getElementById('date').value);
    formData.append('hour', document.getElementById('hour').value);
    
    // Adjuntar la imagen cargada al FormData
    const imageInput = document.getElementById('image');
    if (imageInput.files.length > 0) {
        formData.append('img', imageInput.files[0]); // 'img' es el nombre de la clave que espera el servidor
    }

    const url = 'http://localhost:3000/api/events';

    // Realizar la solicitud `fetch` con el método POST y enviar el FormData
    fetch(url, {
        method: 'POST',
        body: formData, // Utiliza FormData como cuerpo
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            console.log("ENVIADO:", data);
            customAlert('¡Enviado correctamente!', 'Evento creado');
            // Recargar la página después de la alerta
            location.reload();
        })
        .catch(function (error) {
            console.error('Hubo un problema con la operación fetch:', error.message);
            customAlert('Error al enviar', 'danger');
        });
}