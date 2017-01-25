<style>
    .poem {
        font-size: 16px;
        margin-top: 30px;
        padding-bottom: 20px;
    }
    
    .poem div {
        padding-bottom: 5px;
    }

</style>
<template>
    <div class="poem">
        <div v-for="p in poem">{{p}}</div>
    </div>
</template>
<script>
    import poems from '../assets/poem.js'
    export default {
        props: ['route'],
        created() {
            this.poem = []
            if (poems[this.$route.name]) {
                this.poem = poems[this.$route.name][0] || []
            }
        },
        data() {
            return {}
        }
    }

</script>
