<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <InformationForm :account="account" :status="status" @submit:account="signin(account)">
        </InformationForm>
        <p>{{ message }}</p>
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
<script>
import Direct from "@/components/Direction.vue";
import InformationForm from "@/components/InformationForm.vue";
import TodolistService from "@/services/todo.service";
// import router from "@/router";

export default {
    components: {
        InformationForm, Direct
    },
    data() {
        return {
            account: {},
            status: "Đăng nhập",
            message: "",
        };
    },
    props: {
        idAccount: { type: String, required: true },
    },
    methods: {
        async signin(data) {
            try {
                const account = await TodolistService.signin(data);
                const id = account[0]._id;
                this.$router.push({
                    name: 'home',
                    params: { idAccount: id },
                });


            } catch (error) {
                console.log(error);

            }
        },
    },
}
</script>