<template>
    <div>
        <headInfo></headInfo>
        <mt-navbar v-model="operation">
            <mt-tab-item id="1">{{totalCount}}</mt-tab-item>
            <mt-tab-item id="2">新增图书</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="operation" :swipeable="true">
            <mt-tab-container-item id="1">
                <mt-cell v-if="bookListLoading" title="Loading...">
                    <mt-spinner type="fading-circle"></mt-spinner>
                </mt-cell>
                <section v-if="!bookListLoading && !bookListFailed">
                    <mt-cell v-for="book in bookList" :title="book.bookName" :label="book.createDate | localTime">
                    </mt-cell>
                </section>
                <mt-cell v-if="!bookListLoading && bookListFailed" :title="bookListMessage">
                </mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-field label="书名" placeholder="请输入书名" v-model="bookName"></mt-field>
                <mt-radio class="title-hidden" title="载体类型" v-model="bookType" :options="options">
                </mt-radio>
                <section>
                    <mt-button type="primary" size="large" :disabled="!bookName" @click.native="newBook">添加新书</mt-button>
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
            this.getBookList()
        },
        data() {
            return {
                options: [{
                    label: 'PDF',
                    value: '1'
                }, {
                    label: '纸质图书',
                    value: '2'
                }, {
                    label: '其他',
                    value: '3'
                }],
                bookType: '1',
                operation: '1',
                bookList: [{
                    bookName: '当下的力量',
                }],
                bookName: '',
                bookListLoading: true,
                bookListFailed: false,
                bookList: []
            }
        },
        computed: {
            totalCount() {
                return this.bookListLoading ? '已读列表' : '已读列表(' + this.bookList.length + ')'
            }
        },
        watch: {
            operation: function (val) {
                if (val == '1') {
                    this.getBookList()
                }
            }
        },
        methods: {
            getBookList() {
                this.bookList = []
                this.bookListLoading = true
                this.$http.post('/book/bookList', {
                    userId: this.userId
                }).then((resp) => {
                    this.bookListLoading = false
                    if (resp && resp.body && resp.body[0]) {
                        this.bookListFailed = false
                        this.bookList = resp.body || []
                    } else {
                        this.bookListFailed = true
                        this.bookListMessage = '暂无读书记录'
                    }
                })
            },
            newBook() {
                let bookName = this.bookName
                let bookType = this.bookType
                if (bookName) {
                    let url = '/book/newBook';
                    this.$http.post(url, {
                            bookName: bookName,
                            userId: this.userId
                        })
                        .then((response) => {
                            let body = response.body
                            this.bookName = ''
                            this.bookType = '1'
                            alert(body.retMessage)
                        });
                } else {
                    alert('Book name cannot be empty!')
                }
            }
        }
    }

</script>
