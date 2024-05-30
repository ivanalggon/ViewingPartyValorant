usersbtn = document.getElementById("usersButton");
productsbtn = document.getElementById("productsButton");
eventsbtn = document.getElementById("eventsButton");

usersbtn.addEventListener("click", function () {
    // ir a ../users/html/viewUsers.html
    window.location.href = "../users/html/viewUsers.html";
});

productsbtn.addEventListener("click", function () {
    window.location.href = "../products/html/viewProducts.html";
});

eventsbtn.addEventListener("click", function () {
    window.location.href = "../events/html/viewEvents.html";
});