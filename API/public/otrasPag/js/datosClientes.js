
const selectPais = document.getElementById("pais");

// Utilizamos la API pública 'restcountries.com' para obtener la lista de países
fetch("https://restcountries.com/v2/all")
    .then(response => response.json())
    .then(data => {
    data.forEach(country => {
        const option = document.createElement("option");
        option.value = country.alpha2Code.toLowerCase();
        option.text = country.name;
        selectPais.add(option);
    });

// Establecer "Spain" como seleccionado por defecto
const defaultOption = selectPais.querySelector('option[value="es"]');
    if (defaultOption) {
        defaultOption.selected = true;
    }
})
.catch(error => console.error("Error al obtener la lista de países:", error));




document.getElementById("volver").addEventListener("click", function() {
    window.location.href = "pago.html";
});

document.getElementById("payment-form").addEventListener("submit", function(event) {
    window.location.href = this.action;
    event.preventDefault();
});
