<template>
    <Form @submit="submitAccountForm">
        <div class="form-group">
            <label for="username" class="form-check-label">
                <strong>Username</strong>
            </label>
            <Field id="username" name="username" type="text" class="form-control" v-model="account.username" />
            <ErrorMessage name="username" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group mt-3">
            <label for="password" class="form-check-label">
                <strong>Password</strong>
            </label>
            <Field id="password" name="password" type="password" class="form-control" v-model="account.password" />
            <ErrorMessage name="password" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group mt-3">
            <button class="btn btn-primary">
                {{ status }}
            </button>

        </div>

    </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"

export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    emits: ["submit:account"],
    props: {
        account: { type: Object, required: true },
        status: { type: String, required: true }
    },
    data() {
        return {
            account: this.account,
            status: this.status
        };
    },
    methods: {
        submitAccountForm() {
            this.$emit("submit:account", this.account)
        }
    }
}
</script>

<style scoped>
.form-control {
    height: 35px;
    line-height: 1.3;
}
</style>