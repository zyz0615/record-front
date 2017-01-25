<template>
    <mt-header :title="navTitle">
        <router-link v-if="!isHome" to="/" slot="left">
            <mt-button icon="back">首页</mt-button>
        </router-link>
        <mt-button @click.native="setUser" slot="right">{{currentUser || 'Login'}}</mt-button>
    </mt-header>
</template>
<script>
    import {
        MessageBox
    } from "mint-ui"
    export default {
        mounted() {},
        props: ['navTitle', 'isHome', 'currentUser'],
        data() {
            return {}
        },
        methods: {
            setUser() {
                MessageBox.prompt('输入用户名：').then(({
                    value,
                    action
                }) => {
                    if (!value) {
                        return false;
                    } else {
                        localStorage.userId = value
                        this.$emit('userLogin')
                    }
                });
            }
        }
    }

</script>
