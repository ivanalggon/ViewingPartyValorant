document.addEventListener('DOMContentLoaded', () => {
    const updateEventForm = document.forms.updateEventForm;
    const editIdEvent = document.getElementById('editIdEvent');
    const editName = document.getElementById('editName');
    const editDescription = document.getElementById('editDescription');
    const editStock = document.getElementById('editStock');
    const editLocation = document.getElementById('editLocation');
    const editPrice = document.getElementById('editPrice');
    const editDate = document.getElementById('editDate');
    const editHour = document.getElementById('editHour');
    const editImage = document.getElementById('editImage');
    const imagePreview = document.getElementById('imagePreview'); // Para vista previa

    // Verifica si todos los elementos son válidos
    if (!updateEventForm || !editIdEvent || !editName || !editDescription || !editStock || !editLocation || !editPrice || !editDate || !editHour) {
        console.error("Error: No se pudieron encontrar algunos elementos requeridos en el DOM.");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        console.error("Error: ID de evento no encontrado en la URL.");
        alert("ID de evento no encontrado. Redirigiendo a la página principal.");
        window.location.href = 'viewEvents.html';
        return;
    }

    // Función para obtener datos del evento
    function fetchEventData() {
        fetch(`http://localhost:3000/api/events/${eventId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener datos del evento: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.event) {
                    const event = data.event;
                    editIdEvent.value = event.id_event;
                    editName.value = event.name;
                    editDescription.value = event.description;
                    editStock.value = event.stock;
                    editLocation.value = event.location;
                    editPrice.value = event.price;
                    editDate.value = event.date ? event.date.split('T')[0] : ''; // Solo la fecha
                    editHour.value = event.hour ? event.hour : ''; // Solo la hora

                    editImage.value = ''; // Limpiar el campo de imagen para evitar problemas con la vista previa

                    // Vista previa de la imagen si está presente
                    if (event.img) {
                        const imgSrc = `http://localhost:3000/uploads/${event.img}`;
                        imagePreview.innerHTML = `<img src="${imgSrc}" style="width:100px;height:auto;">`;
                    }
                } else {
                    throw new Error("Datos del evento no válidos.");
                }
            })
            .catch(error => {
                console.error("Error fetching event data:", error);
                alert("Error al obtener datos del evento.");
            });
    }

    fetchEventData(); // Carga inicial de datos para edición

    updateEventForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", editName.value);
        formData.append("description", editDescription.value);
        formData.append("stock", editStock.value);
        formData.append("location", editLocation.value);
        formData.append("price", editPrice.value);
        formData.append("date", editDate.value);
        formData.append("hour", editHour.value);

        if (editImage && editImage.files.length > 0) {
            formData.append("image", editImage.files[0]);
        }

        console.log("Datos que se envían:", Array.from(formData.entries())); // Verificación de datos enviados

        fetch(`http://localhost:3000/api/events/${eventId}`, {
            method: 'PUT',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al actualizar datos del evento.");
            }
            return response.json();
        })
        .then(result => {
            alert(result.message);
            window.location.href = 'viewEvents.html'; // Redirige a la vista de eventos
        })
        .catch(error => {
            console.error("Error updating event data:", error);
            alert("Error al actualizar datos del evento.");
        });
    });
});