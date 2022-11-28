<template>
    <div class="page">
        <h4>Todolist</h4>
        <TodolistForm :todo="todo" @submit:todo="createTodolist(todo)" />
        <p>{{ message }}</p>
        <button class="btn btn-outline-warning">
            <router-link :to="{ name: 'home', params: { idAccount: this.idAccount } }"
                class="text-decoration-none nav-link">
                Về trang chủ
            </router-link>
        </button>
    </div>
</template>
<script>
import TodolistForm from "@/components/TodolistForm.vue";
import TodolistService from "@/services/todo.service";

export default {
    components: {
        TodolistForm,
    },

    data() {
        return {
            todo: {},
            message: "",
        };
    },
    props: {
        idAccount: { type: String, required: true },
    },
    methods: {
        async createTodolist(data) {
            try {
                console.log(data);
                data.username = this.idAccount;
                await TodolistService.create(data);
                this.message = "Thêm việc cần làm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
