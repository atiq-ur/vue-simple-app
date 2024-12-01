import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const loading = ref(false);
    const users = ref([]);
    const user = ref(null);
    const error = ref(null);

    async function fetchUsers() {
        loading.value = true;
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            users.value = await response.json();
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    async function createUser(formData) {
        loading.value = true;
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            users.value = [...users.value, await response.json()];
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    async function fetchUser(id) {
        loading.value = true;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            user.value = await response.json();
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    async function updateUser(id, formData) {
        loading.value = true;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            user.value = await response.json();
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    async function deleteUser(id) {
        loading.value = true;
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE',
            });
            users.value = users.value.filter(user => user.id !== id);
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    // implement realtime search
    async function searchUsers(query) {
        loading.value = true;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`);
            users.value = await response.json();
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        users,
        error,
        fetchUsers,
        createUser,
        user,
        fetchUser,
        updateUser,
        deleteUser,
        searchUsers,
    };
})