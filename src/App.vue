<style>
    #app {
        text-align: center;
    }

</style>
<template>
    <div id="app">
        <navBar v-on:userLogin="setLocalUser" :navTitle="navTitle" :isHome="isHome" :currentUser="currentUser"></navBar>
        <transition name="slide-fade" mode="out-in">
            <router-view v-on:userLogin="setLocalUser" v-on:routeChanged="refreshNav"></router-view>
        </transition>
        <myFooter></myFooter>
    </div>
</template>
<script>
    import myFooter from './components/footer.vue'
    import navBar from './components/nav.vue'
    import wordMap from './assets/wordMap'
    export default {
        components: {
            myFooter,
            navBar
        },
        mounted() {
            this.refreshNav(this.$route)
        },
        data() {
            return {
                msg: 'Use Vue 2.0 Today! Hot reload!',
                navTitle: '首页',
                isHome: true,
                currentUser: localStorage.userId
            }
        },
        methods: {
            refreshNav(route) {
                if (route) {
                    this.navTitle = wordMap.navTitle[route.name]
                    this.isHome = route.fullPath == '/'
                    this.currentUser = localStorage.userId
                }
            },
            setLocalUser() {
                this.currentUser = localStorage.userId
            }
        }
    }

</script>
