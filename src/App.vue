<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            fileBaseUrl: '',
            ossSecurityToken: '',
            ossConfig: { region: '', bucket: '', accessKeyId: '' },
            ossSavePath: ''
        }
    },
    created() {
        this.$store.dispatch('setFileParams')
    },
    methods: {}
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
