document.addEventListener('DOMContentLoaded', () => {
    const usersTable = document.getElementById('usersTable');
    const updateUserForm = document.forms.updateUserForm;


    // funcion que pase el user.role de 0 a user y de 1 a admin
    function roleUser(user) {
        return user.role === 0 ? 0 : 1;
    }

    // Function to create a table row for a user
    function createUserRow(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${roleUser(user.role)}</td>
            <td>
                <button onclick= "addUser()" id='AddBtn'>Add</button>
                <button onclick= "editUser(${user.id_user})" id='EditBtn'>Edit</button>
                <button onclick="deleteUser(${user.id_user})" id='DeleteBtn'>Delete</button>
            </td>

        `;
        return row;
    }
    // Function to fetch and display users
    function fetchAndDisplayUsers() {
        fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then(data => {
                const users = data.users;
                const tbody = usersTable.querySelector('tbody');
                tbody.innerHTML = ''; // Clear existing rows

                users.forEach(user => {
                    const row = createUserRow(user);
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    // Function to delete a user
    window.deleteUser = function (userId) {
        const confirmDelete = confirm('¿Seguro que quieres eliminar este usuario?');
        if (confirmDelete) {
            fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    fetchAndDisplayUsers(); // Refresh the user list after deletion
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    alert('Error deleting user');
                });
        }
    };

    window.editUser = function (userId) {
        window.location.href = `editUsers.html?id=${userId}`;
    };

    window.addUser = function () {
        window.location.href = 'createUsers.html';
    };

    // Initial fetch and display of users
    fetchAndDisplayUsers();
});

document.getElementById('returnBtn').addEventListener('click', () => {
    window.location.href = '../../dashboard/index.html';
});