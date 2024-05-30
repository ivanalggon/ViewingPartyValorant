document.addEventListener('DOMContentLoaded', () => {
    const updateProductForm = document.forms.updateProductForm;
    const editIdProduct = document.getElementById('editIdProduct');
    const editName = document.getElementById('editName');
    const editDescription = document.getElementById('editDescription');
    const editStock = document.getElementById('editStock');
    const editPrice = document.getElementById('editPrice');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Función para obtener los datos del producto para la edición
    function fetchProductData() {
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                const product = data.product;
                editIdProduct.value = product.id_product;
                editName.value = product.name;
                editDescription.value = product.description;
                editStock.value = product.stock;
                editPrice.value = product.price;
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
                alert('Error fetching product data');
            });
    }
    
    // Obtener los datos iniciales del producto para la edición
    fetchProductData();

    // Event listener para la presentación del formulario
    updateProductForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            name: editName.value,
            description: editDescription.value,
            stock: parseInt(editStock.value),
            price: parseFloat(editPrice.value)
        };

        // Enviar una solicitud PUT para actualizar los datos del producto
        fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            // Redirigir a la lista de productos u realizar cualquier otra acción
            window.location.href = 'viewProducts.html';
        })
        .catch(error => {
            console.error('Error updating product data:', error);
            alert('Error updating product data');
        });
    });
});