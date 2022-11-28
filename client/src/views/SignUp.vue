<template>
    <div class="page">
        <h4>Đăng kí</h4>
        <InformationForm :account="account" :status="status" @submit:account="signup(account)">
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

import InformationForm from "../components/InformationForm.vue";
import TodolistService from "@/services/todo.service";

export default {
    components: {
        InformationForm,
    },
    props: {
        idAccount: { type: String, required: true },
    },
    data() {
        return {
            account: {},
            status: "Đăng kí",
            message: "",
        };
    },

    methods: {
        async signup(data) {
            try {
                const account = await TodolistService.signup(data);
                console.log(account)
                const id = account._id;
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