<script>
export default {
    props: {
        todolist: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
    },
};
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(todo, index) in todolist" :key="todo._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ todo.title }}
        </li>
    </ul>
</template>
