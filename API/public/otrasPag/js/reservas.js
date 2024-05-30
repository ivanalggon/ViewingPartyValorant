document.addEventListener('DOMContentLoaded', function () {
    const datePicker = document.getElementById('date-filter');
    const tournamentFilter = document.getElementById('tournament-filter');
    const locationFilter = document.getElementById('location-filter');
    const priceFilter = document.getElementById('price-filter');
    const applyFilterButton = document.getElementById('apply-filter');

    // Configura Flatpickr para el campo de fecha
    flatpickr(datePicker, {
        dateFormat: 'd/m/Y',
        minDate: 'today', // Establece la fecha mínima como la fecha actual
    });

    applyFilterButton.addEventListener('click', function () {
        // Lógica de filtrado basada en los valores seleccionados
        // ...
    });
});

function openPricePage(eventName) {
    window.location.href = 'precio.html?evento=' + eventName;
}