<template>
    <div>
        <Menu :menus="menu"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import Menu from './NavMenu'
    export default {
        name: "admin",
        components:{
            Menu
        },
        data(){
            return{
                menu:[
                    {
                        route:{
                            name:'classInfo'
                        },
                        name:'班级信息'
                    },{
                        route:{
                            name:'courseInfo'
                        },
                        name:'课程信息'
                    },{
                        route:{
                            name:'deviceInfo'
                        },
                        name:'设备信息'
                    },{
                        route:{
                            name:'labInfo'
                        },
                        name:'实验室信息'
                    },{
                        route:{
                            name:'teacherInfo'
                        },
                        name:'教师信息'
                    },
                ]
                }
            }
    }
</script>

<style scoped>

</style>