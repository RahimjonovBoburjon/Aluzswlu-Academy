<template>
    <div class="flex flex-col items-center justify-center h-screen text-center">
        <h1 class="text-2xl font-bold mb-4">Parolni tiklash</h1>
        <p class="text-gray-600 mb-4">Emailingizni kiriting, biz parolni tiklash uchun link yuboramiz.</p>

        <form @submit.prevent="resetPassword" class="w-80 p-4 bg-white rounded-lg shadow-lg">
            <input v-model="email" type="email" required placeholder="Email"
                class="w-full p-2 border border-gray-300 rounded mb-3" />
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Tiklash linkini yuborish
            </button>
        </form>

        <router-link to="/login" class="mt-4 text-blue-500 hover:underline">Orqaga</router-link>
    </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
    data() {
        return {
            email: "",
        };
    },
    methods: {
        async resetPassword() {
            const auth = getAuth();
            try {
                await sendPasswordResetEmail(auth, this.email);
                alert("Parolni tiklash uchun emailingizga link yuborildi!");
            } catch (error) {
                alert("Xatolik yuz berdi: " + error.message);
            }
        },
    },
};
</script>