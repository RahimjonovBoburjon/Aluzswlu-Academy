<template>
    <section class="text-center mt-16">
        <h1 class="text-4xl font-bold">Litsey va universitetga tayyorgarlik platformasi</h1>
        <p class="text-lg mt-4">Qo‘shimcha darslarga yoziling va bilimlaringizni oshiring!</p>
        <router-link to="/signup" class="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">
            Ro‘yxatdan o‘tish
        </router-link>
    </section>

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
            class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div class="lg:pr-8 lg:pt-4">
                <div class="lg:max-w-lg">
                    <h2 class="text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
                    <p class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">A better
                        workflow</p>
                    <p class="mt-6 text-lg/8 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
                    <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                        <div v-for="feature in features" :key="feature.name" class="relative pl-9">
                            <dt class="inline font-semibold text-gray-900">
                                <component :is="feature.icon" class="absolute left-1 top-1 size-5 text-indigo-600"
                                    aria-hidden="true" />
                                {{ feature.name }}
                            </dt>
                            {{ ' ' }}
                            <dd class="inline">{{ feature.description }}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {};
</script>

<style scoped></style>