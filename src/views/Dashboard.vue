<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 class="text-3xl font-bold mb-8 text-blue-600">Dashboard</h1>

        <div v-if="!selectedOption" class="flex gap-6">
            <button @click="selectOption('litsey')"
                class="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md">
                Litseyga tayyorgarlik
            </button>
            <button @click="selectOption('universitet')"
                class="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
                Universitetga tayyorgarlik
            </button>
        </div>

        <div v-if="selectedOption === 'litsey'" class="w-full max-w-2xl mt-8">
            <button @click="goBack"
                class="mb-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 shadow-md">
                ◀ Orqaga
            </button>
            <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Litsey fakultetlarini tanlang:</h2>
            <ul class="space-y-4">
                <li v-for="faculty in faculties" :key="faculty" @click="selectFaculty(faculty)"
                    class="cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-gray-700 hover:bg-blue-50">
                    {{ faculty }}
                </li>
            </ul>
        </div>

        <div v-if="selectedOption === 'universitet'" class="w-full max-w-2xl mt-8">
            <button @click="goBack"
                class="mb-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 shadow-md">
                Orqaga
            </button>
            <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Universitet fanlari jadvali:</h2>
            <ul class="space-y-4">
                <li v-for="subject in subjects" :key="subject" class="bg-white p-4 rounded-lg shadow-md text-gray-700">
                    {{ subject }}
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

        const selectFaculty = (faculty) => {
            alert(`Siz tanladingiz: ${faculty}`);
        };

        const goBack = () => {
            selectedOption.value = null;
        };

        return { selectedOption, faculties, subjects, selectOption, selectFaculty, goBack };
    }
};
</script>

<style scoped>
button {
    transition: background 0.3s, transform 0.3s;
}

button:hover {
    transform: translateY(-2px);
}

li {
    transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
}

li:hover {
    transform: translateY(-2px);
}
</style>