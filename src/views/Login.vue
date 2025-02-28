<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-4 text-center">Kirish</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded mb-2" required />
            <input v-model="password" type="password" placeholder="Parol" class="w-full p-2 border rounded mb-2"
                required />
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Kirish</button>
        </form>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
    setup() {
        const email = ref("");
        const password = ref("");
        const error = ref("");
        const router = useRouter();

        const handleLogin = async () => {
            try {
                await signInWithEmailAndPassword(auth, email.value, password.value);
                localStorage.setItem("user", JSON.stringify(auth.currentUser));
                router.push("/dashboard");
            } catch (err) {
                error.value = err.message;
            }
        };

        return { email, password, error, handleLogin };
    }
};
</script>