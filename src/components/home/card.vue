<template>
    <el-card :body-style="body_style" class="card">
        <div class="card-header">
            <span>{{cardTitle}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
        </div>
        <ul>
            <li v-for="(item,id) in list" :key="id">
                <a href="#">
                    {{item.title}}
                    <span>{{item.date}}</span>
                </a>
            </li>
        </ul>
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
    },
    props:{
        cardTitle:String,
        list:Array
    }
}
</script>
<style>
.card{
    margin-top: 10px;
}
.card-header{
    border-bottom: 1px solid rgb(235, 238, 245);
    padding: 3px;
    text-align: left;
}
.card-header span{
    font-size: 12pt;
    font-weight: bold;
    color: #bdb9b9;
}
ul {
    margin: 0;
}
li {
    text-align: left;
    margin: 2px 0 2px 0;
}
a{
    text-decoration: none;
    font-size: 8pt;
    text-align: center;
}
a:hover{
    color: red;
}
a span{
    float: right;
    
}
</style>

