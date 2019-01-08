<template>
    <el-card :body-style="body_style" class="card">
        <div class="card-header">
            <span>图片新闻</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
        </div>
        <el-carousel height="150px">
            <el-carousel-item v-for="item in 3" :key="item">
                <h3>{{item}}</h3>
            </el-carousel-item>
        </el-carousel>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            body_style:{
                padding: '0 5px 10px 5px'
            }
        }
    }
}
</script>

<style scoped>
.card-header{
    border-bottom: 1px solid rgb(235, 238, 245);
    padding: 3px;
    text-align: left;
}
h3{
    background-color: #99a9bf;
    line-height: 150px;
    margin: 0;
}
</style>


