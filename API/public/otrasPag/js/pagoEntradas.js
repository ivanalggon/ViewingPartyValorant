
function mostrarOcultarCampos() {
    var metodoPago = document.getElementById("metodo_pago").value;
    var camposTarjeta = document.getElementById("camposTarjeta");
    var camposPayPal = document.getElementById("camposPayPal");

    if (metodoPago === "tarjeta_de_credito") {
        camposTarjeta.classList.remove("hidden");
        camposPayPal.classList.add("hidden");
    } else if (metodoPago === "paypal") {
        camposTarjeta.classList.add("hidden");
        camposPayPal.classList.remove("hidden");
    } else {
        camposTarjeta.classList.add("hidden");
        camposPayPal.classList.add("hidden");
    }
}

function realizarPago() {
    // Realiza las validaciones adicionales que puedas necesitar
    // antes de enviar el formulario

    // Luego, puedes enviar el formulario programáticamente si todo está bien
    document.getElementById("formulario_pago").submit();
}