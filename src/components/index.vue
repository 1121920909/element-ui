<template>
    <div>
        <nav-menu :menus="menus"></nav-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    import NavMenu from './NavMenu'
    export default {
        name: "index",
        components: {
            NavMenu
        },
        data(){
            return{
                menus:[
                    {
                        route:{
                            name:'home'
                        },
                        name:'首页'
                    },{
                        route:{
                            name:'intro'
                        },
                        name:'中心简介'
                    },{
                        route:{
                            name:'manage'
                        },
                        name:'体制与管理'
                    },{
                        route:{
                            name:'teach'
                        },
                        name:'实训队伍'
                    },{
                        route:{
                            name:'device'
                        },
                        name:'设备环境'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>