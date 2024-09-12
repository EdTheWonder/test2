<template>
    <div id="RegisterPage" class="w-full h-[100vh] bg-white">
        <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
            <NuxtLink to="/" class="min-w-[170px]">
                <img width="170" src="/AliExpress-logo.png">
            </NuxtLink>
        </div>

        <div class="max-w-[400px] mx-auto px-2">
            <div class="text-center my-6">Register</div>

            <form @submit.prevent="handleRegister">
                <input 
                    v-model="email" 
                    type="email" 
                    placeholder="Email" 
                    class="w-full border p-2 mb-4"
                    required
                />
                <input 
                    v-model="password" 
                    type="password" 
                    placeholder="Password (min 6 characters)" 
                    class="w-full border p-2 mb-4"
                    required
                />
                <button 
                    :disabled="password.length < 6"
                    type="submit" 
                    class="flex items-center justify-center gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold"
                >
                    Register
                </button>
            </form>
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

            <div class="mt-4 text-center">
                <NuxtLink to="/auth" class="text-blue-500">Already have an account? Login here</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

let email = ref('')
let password = ref('')
let errorMessage = ref('')

watchEffect(() => {
    if (user.value) {
        return navigateTo('/')
    }
})

const handleRegister = async () => {
    const { data, error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
    });

    if (error) {
        errorMessage.value = 'Registration failed. Please check your credentials.';
    } else {
        navigateTo('/');
    }
}
</script>
