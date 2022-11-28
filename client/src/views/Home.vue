
<template>

    <div class="page">
        <h1>WELCOME TO MY TODOLIST</h1>
        <div class="mt-5">
            <button class="btn btn-primary me-3">
                <router-link :to="{ name: 'signin' }" class="nav-link">
                    Đăng nhập
                </router-link>
            </button>
            <button class="btn btn-light me-3">
                <router-link :to="{ name: 'signup' }" class="nav-link">
                    Đăng kí
                </router-link>
            </button>
        </div>
    </div>

</template>

<style scoped>
.page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
