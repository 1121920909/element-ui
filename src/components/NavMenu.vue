<template>
    <el-menu :default-active="activeIndex" router="true" mode="horizontal" class="menu" background-color="#f1f1f1">
        <el-menu-item v-for="(menu,index) in menus" :key="index" :index="index" :route="menu.route">{{menu.name}}</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1'
        }
    },
    props:['menus']
}
</script>

<style>
.menu{
    margin-bottom: 10px;
}
</style>
