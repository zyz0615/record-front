<style>
    .sub-title {
        font-size: 16px;
        padding-bottom: 5px;
    }

</style>
<template>
    <div>
        <headInfo :mode="1"></headInfo>
        <section class="sub-title">培养一个爱好，记录投入的时间</section>
        <section>
            <mt-button type="primary" @click="routeToPage('checkin')">活动签到</mt-button>
        </section>
        <h5 class="margin-top20">据说犹太人读书平均64本/年/人</h5>
        <section class="sub-title">粗缯大布裹生涯，腹有诗书气自华。</section>
        <section>
            <mt-button type="primary" @click="routeToPage('books')">读书记录</mt-button>
        </section>
        <poem></poem>
    </div>
</template>
<script>
    import poem from "./poem.vue"
    import headInfo from './head.vue'
    import {
        MessageBox
    } from "mint-ui"
    export default {
        components: {
            poem,
            headInfo
        },
        mounted() {
            this.userId = localStorage.userId
            this.$emit('routeChanged', this.$route)
        },
        data() {
            return {}
        },
        methods: {
            routeToPage(name) {
                let uid = this.userId || localStorage.userId
                if (!uid) {
                    MessageBox.prompt('请输入用户ID').then(({
                        value,
                        action
                    }) => {
                        if (!value) {
                            return false;
                        } else {
                            localStorage.userId = value
                            this.userId = value
                            this.$emit('userLogin')
                            this.$router.push({
                                name: name,
                                params: {
                                    userId: value
                                }
                            })
                        }
                    });
                } else {
                    this.$router.push({
                        name: name,
                        params: {
                            userId: uid
                        }
                    })
                }
            },
        }
    }

</script>
