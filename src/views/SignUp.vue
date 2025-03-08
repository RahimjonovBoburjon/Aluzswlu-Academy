<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 hover:shadow-xl">
            <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">Ro‘yxatdan o‘tish</h2>
            <input type="text" v-model="username" placeholder="Foydalanuvchi nomi"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="tel" v-model="phone" placeholder="Telefon raqami (+998...)"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="password" v-model="password" placeholder="Parol"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button @click="handleSignUp" :disabled="loading"
                class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center">
                <span v-if="!loading">Ro‘yxatdan o‘tish</span>
                <span v-else>
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </span>
            </button>
            <p v-if="error" class="text-red-500 mt-4 text-sm text-center">{{ error }}</p>
            <p v-if="success" class="text-green-500 mt-4 text-sm text-center">{{ success }}</p>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "../firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default {
    setup() {
        const phone = ref("");
        const password = ref("");
        const username = ref("");
        const error = ref("");
        const success = ref("");
        const loading = ref(false);

        const handleSignUp = async () => {
            error.value = "";
            success.value = "";
            loading.value = true;

            try {
                const email = phone.value + "@dummy.com";
                const userCredential = await createUserWithEmailAndPassword(auth, email, password.value);
                const user = userCredential.user;

                await setDoc(doc(db, "users", user.uid), {
                    username: username.value,
                    phone: phone.value,
                });

                localStorage.setItem("user", JSON.stringify({ uid: user.uid, phone: phone.value, username: username.value }));
                success.value = "Muvaffaqiyatli ro‘yxatdan o‘tildi!";
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1200);
            } catch (err) {
                switch (err.code) {
                    case "auth/email-already-in-use":
                        error.value = "Ushbu telefon raqami allaqachon ro‘yxatdan o‘tgan!";
                        break;
                    case "auth/invalid-email":
                        error.value = "Noto‘g‘ri telefon raqami formati!";
                        break;
                    case "auth/weak-password":
                        error.value = "Parol juda oddiy. Kuchliroq parol tanlang!";
                        break;
                    default:
                        error.value = "Tizimda xatolik yuz berdi. Iltimos, keyinroq urunib ko‘ring.";
                }
            } finally {
                loading.value = false;
            }
        };

        return { phone, password, username, handleSignUp, error, success, loading };
    },
};
</script>

<style scoped>
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>