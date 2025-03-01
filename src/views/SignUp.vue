<template>
    <div class="flex justify-center items-center min-h-scree">
        <div class="bg-white p-6 rounded shadow-md w-96">
            <h2 class="text-xl font-bold mb-4">Ro‘yxatdan o‘tish</h2>
            <input type="text" v-model="username" placeholder="Foydalanuvchi nomi"
                class="w-full px-3 py-2 border rounded mb-4">
            <input type="tel" v-model="phone" placeholder="Telefon raqami (+998...)"
                class="w-full px-3 py-2 border rounded mb-4">
            <input type="password" v-model="password" placeholder="Parol" class="w-full px-3 py-2 border rounded mb-4">
            <button @click="handleSignUp" class="w-full bg-blue-500 text-white py-2 rounded">Ro‘yxatdan o‘tish</button>
            <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
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

        const handleSignUp = async () => {
            error.value = "";
            success.value = "";
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, phone.value + "@dummy.com", password.value);
                const user = userCredential.user;

                await setDoc(doc(db, "users", user.uid), {
                    username: username.value,
                    phone: phone.value,
                });
                localStorage.setItem("user", JSON.stringify({ uid: user.uid, phone: phone.value, username: username.value }));
                success.value = "Muvaffaqiyatli ro‘yxatdan o‘tildi!";
                window.location.href = "/dashboard";
            } catch (err) {
                error.value = "Xatolik: " + err.message;
            }
        };
        return { phone, password, username, handleSignUp, error, success };
    },
};
</script>
