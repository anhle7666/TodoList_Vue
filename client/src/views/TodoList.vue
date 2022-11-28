<template>
    <div class="page row">
        <div class="col-md-10">
            <Direct></Direct>
        </div>
        <div class=" col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Todolist
                <i class="fas fa-address-book"></i>
            </h4>
            <Todolist v-if="filteredTodolistCount > 0" :todolist="filteredTodolist" v-model:activeIndex="activeIndex" />
            <p v-else>Không có việc nào cần làm.</p>
            <div class="mt-3 d-flex justify-content-between align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddTodolist">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllTodolist">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeTodolist">
                <h4>
                    <i class="fas fa-address-card"></i>
                    Chi tiết
                </h4>
                <ItemCard :todolist="activeTodolist" />
                <router-link :to="{
                    name: 'todo.edit',
                    params: { id: activeTodolist._id },
                }">
                    <span class="mt-2 btn btn-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import ItemCard from "@/components/ItemCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import Todolist from "@/components/Todolist.vue";
import Direct from "@/components/Direction.vue";
import TodolistService from "@/services/todo.service";
export default {
    components: {
        ItemCard,
        InputSearch,
        Todolist,
        Direct,
    },
        props: {
            // id: { type: String, required: true },
            idAccount: { type: String, required: true }
        },
    data() {
        return {
            todolist: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        todolistStrings() {
            return this.todolist.map((todo) => {
                const { title, content, time } = todo;
                return [title, content, time].join("");
            });
        },
        // Trả về các todo có chứa thông tin cần tìm kiếm.
        filteredTodolist() {
            if (!this.searchText) return this.todolist;
            return this.todolist.filter((_todolist, index) =>
                this.todolistStrings[index].includes(this.searchText),
            );
        },
        activeTodolist() {
            if (this.activeIndex < 0) return null;
            return this.filteredTodolist[this.activeIndex];
        },
        filteredTodolistCount() {
            return this.filteredTodolist.length;
        },
    },
    methods: {
        async retrieveTodolist() {
            try {
                this.todolist = await TodolistService.getAll();
                const list = [];
                this.todolist.forEach(todoItem => {
                    if (todoItem.username === this.idAccount) {
                        list.push(todoItem);
                    }
                });
                this.todolist = list;
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveTodolist();
            this.activeIndex = -1;
        },
        async removeAllTodolist() {
            if (confirm("Bạn muốn xóa tất cả việc cần làm?")) {
                try {
                    await TodolistService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddTodolist() {
            this.$router.push({
                name: "todo.add",
                // params: { idAccount: idAccount } 

            });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
};
