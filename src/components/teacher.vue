<template>
    <div>
        <nav-menu :menus="menus"></nav-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    import NavMenu from './NavMenu'
    export default {
        name: "teacher",
        components: {
            NavMenu
        },
        data(){
            return{
                menus:[
                    {
                        route:{
                            name:'info'
                        },
                        name:'个人信息'
                    },{
                        route:{
                            name:'course'
                        },
                        name:'课程信息'
                    },{
                        route:{
                            name:'reserve'
                        },
                        name:'实验室预约'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>