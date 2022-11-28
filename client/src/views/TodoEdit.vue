<template>
    <div v-if="todo" class="page">
        <h4>Hiệu chỉnh</h4>
        <TodolistForm :todo="todo" @submit:todo="updateTodolist" @delete:todo="deleteTodolist" />
        <p>{{ message }} </p>
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
    props: {
        id: { type: String, required: true },
        idAccount: { type: String, required: true }
    },
    data() {
        return {
            todo: null,
            message: "ok",
        };
    },
    methods: {
        async getTodolist(id) {
            try {
                this.todo = await TodolistService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1),
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateTodolist(data) {
            try {
                await TodolistService.update(this.todo._id, data);
                this.message = "Liên hệ được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTodolist() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await TodolistService.delete(this.todo._id);
                    this.$router.push({ name: "todolist" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getTodolist(this.id);
        this.message = "";
    },
};
</script>
