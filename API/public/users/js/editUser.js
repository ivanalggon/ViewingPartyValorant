document.addEventListener('DOMContentLoaded', () => {
    const updateUserForm = document.forms.updateUserForm;
    const editIdUser = document.getElementById('editIdUser');
    const editName = document.getElementById('editName');
    const editSurname = document.getElementById('editSurname');
    const editUsername = document.getElementById('editUsername');
    const editEmail = document.getElementById('editEmail');
    const editPassword = document.getElementById('editPassword');
    const editRole = document.getElementById('editRole');

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    

    // Function to fetch user data for editing
    function fetchUserData() {
        fetch(`http://localhost:3000/api/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                const user = data.user;
                editIdUser.value = user.id_user;
                editName.value = user.name;
                editSurname.value = user.surname;
                editUsername.value = user.username;
                editEmail.value = user.email;
                editPassword.value = user.password;
                editRole.value = user.role;
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('Error fetching user data');
            });
    }
    
    // Initial fetch of user data for editing
    fetchUserData();

    // Event listener for form submission
    updateUserForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            name: editName.value,
            surname: editSurname.value,
            username: editUsername.value,
            email: editEmail.value,
            password: editPassword.value,
            role: editRole.value
        };

        // Send a PUT request to update user data
        fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            // Redirect to the user list or perform any other action
            window.location.href = 'viewUsers.html';
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            alert('Error updating user data');
        });
    });
});
