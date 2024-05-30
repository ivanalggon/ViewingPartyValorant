document.addEventListener('DOMContentLoaded', () => {
    const productsTable = document.getElementById('productsTable');
    const updateProductForm = document.forms.updateProductForm;

    // Función para crear una fila de tabla para un producto
    function createProductRow(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.stock}</td>
            <td>${product.price}</td>
            <td>
                <button onclick="addProduct()" id='AddBtn'>Add</button>
                <button onclick="editProduct(${product.id_product})"id='EditBtn'>Edit</button>
                <button onclick="deleteProduct(${product.id_product})" id='DeleteBtn'>Delete</button>
            </td>
        `;
        return row;
    }

    // Función para obtener y mostrar productos
    function fetchAndDisplayProducts() {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                const products = data.products;
                const tbody = productsTable.querySelector('tbody');
                tbody.innerHTML = ''; // Limpiar las filas existentes

                products.forEach(product => {
                    const row = createProductRow(product);
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    // Función para eliminar un producto
    window.deleteProduct = function(productId) {
        const confirmDelete = confirm('¿Seguro que quieres eliminar este producto?');
        if (confirmDelete) {
            fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    fetchAndDisplayProducts(); // Actualizar la lista de productos después de la eliminación
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                    alert('Error deleting product');
                });
        }
    };

    // Función para redirigir a la página de edición de productos
    window.editProduct = function(productId) {
        window.location.href = `editProducts.html?id=${productId}`;
    };

    // Función para redirigir a la página de creación de productos
    window.addProduct = function() {
        window.location.href = 'createProducts.html';
    };

    // Inicializar la obtención y visualización de productos
    fetchAndDisplayProducts();
});

document.getElementById('returnBtn').addEventListener('click', () => {
    window.location.href = '../../dashboard/index.html';
});