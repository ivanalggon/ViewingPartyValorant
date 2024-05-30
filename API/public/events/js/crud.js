document.addEventListener('DOMContentLoaded', () => {
    const eventsTable = document.getElementById('eventsTable');

    // Función para crear una fila para un evento
    function createEventRow(event) {
        const row = document.createElement('tr');

        let imgSrc = '';
        if (event.img && event.img.type === 'Buffer' && Array.isArray(event.img.data)) {
            const bufferData = new Uint8Array(event.img.data);
            const fileName = new TextDecoder().decode(bufferData); // Obtener el nombre del archivo
            imgSrc = `http://localhost:3000/${fileName}`;
        }

        row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${event.stock}</td>
            <td>${event.location}</td>
            <td>${event.price}</td>
            <td>${event.date}</td>
            <td>${event.hour}</td>
            <td><img src="${imgSrc}" style="width:100px;height:auto;" /></td>
            <td>
                <button onclick="addEvent()" id='AddBtn'>Add</button>
                <button onclick="editEvent(${event.id_event})" id='EditBtn'>Edit</button>
                <button onclick="deleteEvent(${event.id_event})" id='DeleteBtn'>Delete</button>
            </td>
        `;

        return row;
    }

    // Función para obtener y mostrar eventos
    function fetchAndDisplayEvents() {
        const eventsTable = document.getElementById('eventsTable');
        if (!eventsTable) {
            console.error("Error: 'eventsTable' no se encontró.");
            return;
        }

        fetch('http://localhost:3000/api/events')
            .then(response => response.json())
            .then(data => {
                if (data && data.events) {
                    const tbody = eventsTable.querySelector('tbody');
                    if (!tbody) {
                        console.error("Error: 'tbody' no se encontró.");
                        return;
                    }

                    tbody.innerHTML = ''; // Limpiar filas existentes
                    data.events.forEach(event => {
                        const row = createEventRow(event);
                        tbody.appendChild(row);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
        }
    
    // Función para eliminar un evento
    window.deleteEvent = function (eventId) {
        const confirmDelete = confirm('¿Seguro que quieres eliminar este evento?');
        if (confirmDelete) {
            fetch(`http://localhost:3000/api/events/${eventId}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    fetchAndDisplayEvents(); // Refrescar la lista de eventos tras la eliminación
                })
                .catch(error => {
                    console.error('Error deleting event:', error);
                    alert('Error al eliminar el evento');
                });
        }
    };

    // Función para editar un evento
    window.editEvent = function (eventId) {
        window.location.href = `editEvents.html?id=${eventId}`;
    };

    // Función para añadir un evento
    window.addEvent = function () {
        window.location.href = 'createEvents.html';
    };

    // Obtener y mostrar eventos al inicio
    fetchAndDisplayEvents();
});

document.getElementById('returnBtn').addEventListener('click', () => {
    window.location.href = '../../dashboard/index.html';
});