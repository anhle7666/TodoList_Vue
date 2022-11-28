<template>
    <Form @submit="submitTodolist">
        <div class="form-group">
            <label for="name">Tiêu đề</label>
            <Field name="name" type="text" class="form-control" autocomplete="off" v-model="todo.title" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Nội dung</label>
            <Field name="email" type="text" class="form-control" autocomplete="off" v-model="todo.content" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Thời gian</label>
            <Field name="address" type="date" class="form-control" autocomplete="off" v-model="todo.time" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>

        <div class="form-group form-check my-3">
            <input id="status" name="status" type="checkbox" class="form-check-input" v-model="todo.status" />
            <label for="status" class="form-check-label">
                <strong>Trạng thái</strong>
            </label>
        </div>


        <div class="form-group form-check my-3">
            <input id="important" name="important" type="checkbox" class="form-check-input" v-model="todo.important" />
            <label for="important" class="form-check-label">
                <strong>Quan trọng</strong>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Lưu
            </button>
            <button v-if="todo._id" type="button" class="ms-2 btn btn-danger" @click="deleteTodolist">
                <i class="fa-solid fa-trash"></i> Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:todo", "delete:todo"],
    props: {
        todo: { type: Object, required: true },
    },
    data() {
        return {
            todo: this.todo,
        };
    },
    methods: {
        submitTodolist() {
            this.$emit("submit:todo", this.todo);
        },
        deleteTodolist() {
            this.$emit("delete:todo", this.todo.id);
        },
    },
};
</script>
