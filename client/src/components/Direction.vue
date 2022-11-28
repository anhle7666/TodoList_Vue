<template>
    <nav class="navbar navbar-expand d-flex justify-content-between mb-5 border-bottom">
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link fs-4">
                    Todolist
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>
        <div v-if="!idAccount">
            <button class="btn btn-dark me-3">
                <router-link :to="{ name: 'todolist' }" class="nav-link">
                    Đăng xuất
                </router-link>
            </button>
        </div>
        <div v-else>
            <button class="btn btn-dark me-3">
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
    </nav>
</template>

<script>
export default {
    data() {
        return {
            idAccount: this.idAccount,
        }
    },
}
</script>