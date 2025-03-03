<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

        <div v-if="!selectedOption" class="flex gap-4">
            <button @click="selectOption('litsey')" class="px-6 py-3 bg-blue-500 text-white rounded-lg">Litseyga
                tayyorgarlik</button>
            <button @click="selectOption('universitet')"
                class="px-6 py-3 bg-green-500 text-white rounded-lg">Universitetga tayyorgarlik</button>
        </div>

        <div v-if="selectedOption === 'litsey'">
            <h2 class="text-xl font-semibold mt-6">Litsey fakultetlarini tanlang:</h2>
            <ul class="mt-4">
                <li v-for="faculty in faculties" :key="faculty"
                    class="cursor-pointer bg-gray-200 p-2 my-2 rounded-lg hover:bg-gray-300">
                    {{ faculty }}
                </li>
            </ul>
        </div>

        <div v-if="selectedOption === 'universitet'">
            <h2 class="text-xl font-semibold mt-6">Universitet fanlari jadvali:</h2>
            <ul class="mt-4">
                <li v-for="subject in subjects" :key="subject" class="bg-gray-200 p-2 my-2 rounded-lg">{{ subject }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const selectedOption = ref(null);
        const faculties = ['Filologiya', 'Texnika', 'Iqtisod', 'Kimyo-biologiya'];
        const subjects = ['Matematika', 'Fizika', 'Kimyo', 'Biologiya', 'Tarix', 'Ingliz tili'];

        const selectOption = (option) => {
            selectedOption.value = option;
        };

        return { selectedOption, faculties, subjects, selectOption };
    }
};
</script>

<style scoped>
button {
    transition: background 0.3s;
}
</style>