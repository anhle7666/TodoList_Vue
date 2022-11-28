<script>
export default {
    props: {
        todolist: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Ngày chỉnh sửa: </strong>
            {{ todolist.modify }}
        </div>
        <p> --</p>
        <div class="p-1">
            <strong>Nội dung:</strong>
            {{ todolist.content }}
        </div>
        <div class="p-1">
            <strong>Ngày hết hạn:</strong>
            {{ todolist.time }}
        </div>
        <div class="p-1">
            <strong>Trạng thái:&nbsp;</strong>
            <p v-if="todolist.status"> Đã hoàn thành</p>
            <p v-else> Chưa hoàn thành</p>
        </div>
        <div class="p-1">
            <strong>Quan trọng:&nbsp;</strong>
            <i v-if="todolist.important" class="fa-sharp fa-solid fa-star"></i>
            <i v-else class="fa-regular fa-star"></i>
        </div>
    </div>
</template>
