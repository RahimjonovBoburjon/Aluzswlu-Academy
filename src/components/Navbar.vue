<template>
    <nav class="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">PrepUzSWLU</h1>
        <div>
            <router-link v-if="!isLoggedIn" to="/login" class="mr-4">Login</router-link>
            <router-link v-if="!isLoggedIn" to="/signup">Sign Up</router-link>
            <router-link v-if="isLoggedIn" to="/dashboard" class="mr-4">Dashboard</router-link>
            <button v-if="isLoggedIn" @click="logout" class="bg-red-500 px-4 py-1 rounded">Logout</button>
        </div>
    </nav>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebase/config.js";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();
        const isLoggedIn = ref(localStorage.getItem("user") !== null);

        const logout = async () => {
            await signOut(auth);
            localStorage.removeItem("user");
            isLoggedIn.value = false;
            router.push("/");
        };

        return { isLoggedIn, logout };
    }
};
</script>