<style>
    .footer {
        text-align: center;
        color: blue;
        margin-top: 20px;
        font-size: 14px;
    }
    
    .link {
        width: 100%;
        margin-top: 3px;
    }

</style>
<template>
    <div class="footer">
        <section v-if="enableRegister">
            <mt-button type="primary" @click="routeToPage('user')">限时注册</mt-button>
        </section>
        <div>Copyright © 郑宇宙的个人主页 2017
        </div>
        <div class="link"><a href="http://www.miitbeian.gov.cn/" target="_blank">苏ICP备16048732号</a></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                enableRegister: true
            }
        },
        methods: {
            routeToPage(name) {
                this.$router.push({
                    name: name
                })
            }
        }
    }

</script>
