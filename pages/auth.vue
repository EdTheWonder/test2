<template>
    <div id="AuthPage" class="w-full h-[100vh] bg-white">
        <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
            <NuxtLink to="/" class="min-w-[170px]">
                <img width="170" src="/AliExpress-logo.png">
            </NuxtLink>
        </div>

        <div class="max-w-[400px] mx-auto px-2">
            <div class="text-center my-6">Login</div>

            <form @submit.prevent="handleAuth">
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
                    placeholder="Password" 
                    class="w-full border p-2 mb-4"
                    required
                />
                <button 
                    :disabled="password.length < 6"
                    type="submit" 
                    class="flex items-center justify-center gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold"
                >
                    Submit
                </button>
            </form>
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

            <button 
                @click="loginWithGoogle"
                class="flex items-center justify-center gap-3 p-1.5 w-full border hover:bg-gray-100 rounded-full text-lg font-semibold mt-4"
            >
                <img class="w-full max-w-[30px]" src="/google-logo.png">
                <div>Login with Google</div>
            </button>

            <div class="mt-4 text-center">
                <NuxtLink to="/register" class="text-blue-500">Don't have an account? Register here</NuxtLink>
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

const handleAuth = async () => {
    const { data, error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });

    if (error) {
        if (error.message.includes('invalid password')) {
            errorMessage.value = 'You are already registered. Please enter the correct password.';
        } else {
            errorMessage.value = 'Login failed. Please check your credentials.';
        }
    } else {
        navigateTo('/');
    }
}

const loginWithGoogle = async () => {
    const { data, error } = await client.auth.signInWithOAuth({
        provider: 'google',
        redirectTo: window.location.origin
    });
}
</script>
