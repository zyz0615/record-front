<template>
    <div>
        <headInfo></headInfo>
        <h4>千里之行，始于足下</h4>
        <mt-button type="primary" size="large" @click.native="checkin">开始活动</mt-button>
        </section>
        <mt-navbar v-model="operation">
            <mt-tab-item id="1">正在进行</mt-tab-item>
            <mt-tab-item id="2">全部活动</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="operation" :swipeable="true">
            <mt-tab-container-item id="2">
                <mt-cell v-if="actionListLoading" title="Loading...">
                    <mt-spinner type="fading-circle"></mt-spinner>
                </mt-cell>
                <section v-if="!actionListLoading && !actionListFailed">
                    <mt-cell v-for="action in actionList" :title="actionTitle(action)" :label="action.timestamp | localTime">
                        <mt-button v-if="action.checked" type="primary" size="small" @click.native="checkOut(action)">签出</mt-button>
                        <mt-button v-if="!action.checked" type="primary" size="small" @click.native="checkin(action.actionName)">开始</mt-button>
                    </mt-cell>
                </section>
                <mt-cell v-if="!actionListLoading && actionListFailed" :title="actionListMessage">
                </mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
                <mt-cell v-if="checklistLoading" title="Loading...">
                    <mt-spinner type="fading-circle"></mt-spinner>
                </mt-cell>
                <section v-if="!checklistLoading && !checklistFailed">
                    <mt-cell v-for="checkin in checklist" :title="checkin.actionName" :label="checkin.checkinTime | localTime">
                        <mt-button type="primary" size="small" @click.native="checkOut(checkin)">签出</mt-button>
                    </mt-cell>
                </section>
                <mt-cell v-if="!checklistLoading && checklistFailed" :title="checklistMessage">
                </mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
        <poem></poem>
    </div>
</template>
<script>
    import moment from "moment"
    import headInfo from "./head.vue"
    import poem from './poem.vue'
    import {
        MessageBox
    } from "mint-ui"
    export default {
        components: {
            headInfo,
            poem
        },
        created() {
            this.userId = this.$route.params.userId || localStorage.userId
        },
        mounted() {
            this.$emit('routeChanged', this.$route)
            this.getChecklist()
        },
        data() {
            return {
                checklistLoading: true,
                checklistFailed: false,
                checklist: [],
                checklistMessage: '暂无已签到活动',
                actionListLoading: true,
                actionListFailed: false,
                actionList: [],
                actionListMessage: '暂无已签到活动',
                operation: '1'
            }
        },
        watch: {
            operation: function (val) {
                this.getChecklist()
            }
        },
        methods: {
            actionTitle(action) {
                let title = action.actionName
                let total = action.totalTime
                if (total * 1 > 0) {
                    let hours = Math.floor(total / 60)
                    let minutes = Math.floor(total % 60)
                    return title + '(' + hours + ':' + minutes + ')'
                } else {
                    return title
                }
            },
            getChecklist() {
                console.log(this.operation)
                if (this.operation == '1') {
                    this.checklist = []
                    this.checklistLoading = true
                    this.$http.post('/action/checklist', {
                        userId: this.userId
                    }).then((resp) => {
                        this.checklistLoading = false
                        let checklist = resp.body
                        console.log('get checklist')
                        if (checklist && checklist[0]) {
                            console.log(checklist)
                            this.checklistFailed = false
                            this.checklist = checklist
                        } else {
                            this.checklistFailed = true
                            this.checklistMessage = '暂无已签到活动'
                        }
                    })
                } else {
                    this.actionList = []
                    this.actionListLoading = true
                    this.$http.post('/action/actionList', {
                        userId: this.userId
                    }).then((resp) => {
                        let actionList = resp.body
                        this.actionListLoading = false
                        console.log('get action list')
                        if (actionList && actionList[0]) {
                            console.log(actionList)
                            this.actionListFailed = false
                            this.actionList = actionList
                        } else {
                            this.actionListFailed = true
                            this.actionListMessage = '暂无记录'
                        }
                    })
                }
            },
            addUser() {
                this.$http.post('/user/addUser', {
                        userId: '870615',
                        userName: 'Allen'
                    })
                    .then((response) => {
                        let body = response.body
                        alert(body.retMessage)
                    });
            },
            checkin(actionName) {
                MessageBox.prompt('输入活动编号：').then(({
                    value,
                    action
                }) => {
                    if (!value) {
                        return false;
                    } else {
                        let url = '/action/checkin';
                        this.$http.post(url, {
                                actionId: value,
                                userId: this.userId,
                                actionName: actionName
                            })
                            .then((response) => {
                                let body = response.body
                                alert(body.retMessage)
                                this.getChecklist()
                            });
                    }
                });
            },
            checkOut(checkin) {
                let actionId = checkin && checkin.actionId
                if (actionId) {
                    let url = '/action/checkout';
                    this.$http.post(url, {
                            actionId: actionId,
                            userId: this.userId
                        })
                        .then((response) => {
                            let body = response.body
                            alert(body.retMessage)
                            this.getChecklist()
                        });
                } else {
                    alert('Action id cannot be empty!')
                }
            },
            newAction() {
                let actionId = '2017'
                if (actionId) {
                    let url = '/action/newAction';
                    this.$http.post(url, {
                            actionId: '2017',
                            actionName: 'Russian learning',
                            userId: this.userId
                        })
                        .then((response) => {
                            let body = response.body
                            alert(body.retMessage)
                        });
                } else {
                    alert('Action id cannot be empty!')
                }
            }
        }
    }

</script>
