// Crear alerta personalizada
function customAlert(message, alertType) {
    window.alert(`${alertType.toUpperCase()}: ${message}`);
}

// Función para enviar el formulario
function submit() {
    const descriptionInput = document.getElementById('description');
    const descriptionValue = descriptionInput.value;

    const data = {
        name: document.getElementById('name').value,
        description: descriptionValue,
        stock: parseInt(document.getElementById('stock').value),
        price: parseFloat(document.getElementById('price').value)
    };

    const url = 'http://localhost:3000/api/products';

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
            customAlert('¡Enviado correctamente!', 'Producto creado');
            // Recargar la página después de la alerta
            location.reload();
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error.message);
            customAlert('Error al enviar', 'danger');
        });
}