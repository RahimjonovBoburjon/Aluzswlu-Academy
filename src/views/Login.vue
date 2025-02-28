<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="block text-gray-700">Email</label>
                    <input type="email" v-model="email" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Password</label>
                    <input type="password" v-model="password" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                <button type="submit"
                    class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Login
                </button>
                <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
    setup() {
        const email = ref("");
        const password = ref("");
        const error = ref("");

        const handleLogin = async () => {
            error.value = "";
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "/dashboard";
            } catch (err) {
                error.value = "Login xatosi: " + err.message;
                console.error(err);
            }
        };
        return { email, password, handleLogin, error };
    },
};
</script>



<style>
.input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.btn-primary {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
}
</style>