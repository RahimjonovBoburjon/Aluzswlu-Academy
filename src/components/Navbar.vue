<template>
    <nav
        class="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex justify-between items-center shadow-lg animate-fade-in">
        <a href="/" class="flex items-center hover:text-blue-200 transition duration-300">
            <!-- <img src="/path/to/logo.png" alt="Logo" class="h-8 mr-2"> -->
            <h1 class="text-xl font-bold">PrepUzSWLU</h1>
        </a>

        <div class="hidden md:flex items-center">
            <router-link v-if="!isLoggedIn" to="/login"
                class="mr-4 hover:text-blue-200 transition duration-300">Login</router-link>
            <router-link v-if="!isLoggedIn" to="/signup" class="mr-4 hover:text-blue-200 transition duration-300">Sign
                Up</router-link>
            <router-link v-if="isLoggedIn" to="/dashboard"
                class="mr-4 hover:text-blue-200 transition duration-300">Dashboard</router-link>
            <button v-if="isLoggedIn" @click="logout"
                class="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition duration-300">Logout</button>
        </div>

        <button class="md:hidden" @click="toggleMenu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </nav>

    <div v-if="isMenuOpen" class="md:hidden bg-blue-600 text-white p-4">
        <router-link v-if="!isLoggedIn" to="/login" class="block py-2 hover:text-blue-200">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/signup" class="block py-2 hover:text-blue-200">Sign Up</router-link>
        <router-link v-if="isLoggedIn" to="/dashboard" class="block py-2 hover:text-blue-200">Dashboard</router-link>
        <button v-if="isLoggedIn" @click="logout"
            class="block w-full text-left py-2 hover:text-blue-200">Logout</button>
    </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebase/config.js";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
    data() {
        return {
            isMenuOpen: false,
        };
    },

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
    },

    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
    },
};
</script>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
}
</style>