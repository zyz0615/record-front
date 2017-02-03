<template>
    <div>
        <headInfo></headInfo>
        <mt-navbar v-model="operation">
            <mt-tab-item id="1">注册用户</mt-tab-item>
            <mt-tab-item id="2">新建活动</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="operation" :swipeable="true">
            <mt-tab-container-item id="1">
                <mt-field label="登陆ID" placeholder="请输入登陆ID" v-model="userId"></mt-field>
                <mt-field label="用户姓名" placeholder="请输入用户姓名" v-model="userName"></mt-field>
                <section>
                    <mt-button type="primary" size="large" :disabled="!userId || userId.length < 4 || !userName" @click.native="addUser">新建用户</mt-button>
                </section>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-field label="活动ID" placeholder="请输入活动ID" v-model="actionId"></mt-field>
                <mt-field label="活动名称" placeholder="请输入活动名称" v-model="actionName"></mt-field>
                <section>
                    <mt-button type="primary" size="large" :disabled="!actionId || actionId.length < 4 || !actionName" @click.native="newAction">新建活动</mt-button>
                </section>
            </mt-tab-container-item>
        </mt-tab-container>
        <poem></poem>
    </div>
</template>
<script>
    import moment from "moment"
    import headInfo from './head.vue'
    import poem from './poem.vue'
    import {
        Toast
    } from 'mint-ui'
    export default {
        components: {
            headInfo,
            poem
        },
        created() {
            this.operation = localStorage.userId ? '2' : '1'
        },
        mounted() {
            this.$emit('routeChanged', this.$route)
        },
        data() {
            return {
                userId: localStorage.userId,
                userName: '',
                operation: '1',
                actionId: '',
                actionName: ''
            }
        },
        computed: {},
        methods: {
            addUser() {
                if (!this.userId || this.userId.length < 4 || !this.userName) {
                    Toast({
                        message: 'ID不少于4位，用户姓名不能为空',
                        duration: 2000
                    })
                } else {
                    let url = '/user/addUser'
                    this.$http.post(url, {
                        userId: this.userId,
                        userName: this.userName
                    }).then((resp) => {
                        console.log(resp.body)
                        localStorage.userId = this.userId
                        this.$emit('userLogin')
                        this.userId = ''
                        this.userName = ''
                        if (resp.body.retCode == '1001') {
                            this.operation = '2'
                        }
                        alert(resp.body.retMessage)
                    })
                }
            },
            newAction() {
                if (!this.actionId || this.actionId.length < 4 || !this.actionName) {
                    Toast({
                        message: 'ID不少于4位，活动名称不能为空',
                        duration: 2000
                    })
                } else {
                    let url = '/action/newAction'
                    this.$http.post(url, {
                        userId: this.userId,
                        actionId: this.actionId,
                        actionName: this.actionName
                    }).then((resp) => {
                        console.log(resp.body)
                        this.actionId = ''
                        this.actionName = ''
                        this.operation = '2'
                        alert(resp.body.retMessage)
                    })
                }
            }
        }
    }

</script>
