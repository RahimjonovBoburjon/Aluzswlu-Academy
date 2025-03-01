<template>
    <div class="flex justify-center items-center min-h-scree">
        <div class="bg-white p-6 rounded shadow-md w-96">
            <h2 class="text-xl font-bold mb-4">Tizimga kirish</h2>
            <input type="tel" v-model="phone" placeholder="Telefon raqami (+998...)"
                class="w-full px-3 py-2 border rounded mb-4">
            <input type="password" v-model="password" placeholder="Parol" class="w-full px-3 py-2 border rounded mb-4">
            <button @click="handleLogin" class="w-full bg-blue-500 text-white py-2 rounded">Kirish</button>
            <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default {
    setup() {
        const phone = ref("");
        const password = ref("");
        const error = ref("");

        const handleLogin = async () => {
            error.value = "";
            try {
                const userCredential = await signInWithEmailAndPassword(auth, phone.value + "@dummy.com", password.value);
                const user = userCredential.user;

                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    localStorage.setItem("user", JSON.stringify({ uid: user.uid, phone: userData.phone, username: userData.username }));

                    window.location.href = "/dashboard";
                } else {
                    error.value = "Foydalanuvchi ma’lumotlari topilmadi!";
                }
            } catch (err) {
                error.value = "Login xatosi: " + err.message;
            }
        };

        return { phone, password, handleLogin, error };
    },
};
</script>