<template>
    <div>
        <section><img src="../assets/bg.png"></section>
        <template v-if="mode == 1">
            <h4>天行健，君子以自强不息</h4>
            <h2 v-if="!enableRegister">2017</h2>
        </template>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props: ['mode'],
        methods: {}
    }

</script>
