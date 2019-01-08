<template>
    <div>
        <div class="title">
            <el-row :gutter="20">
                <el-col :span="4">
                    <h3>课程信息</h3>
                </el-col>
                <el-col :span="3" :offset="13">
                    <div class="add-button">
                        <el-button type="primary" plain>添加</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="table">
            <el-row :gutter="24">
                <el-col :span="20" :offset="2">
                    <div>
                        <el-table :data="data"
                                  class="table"
                                  @row-click="openDialog"
                                 >
                            <el-table-column
                                    prop="name"
                                    label="课程名称"
                                    width="200"></el-table-column>
                            <el-table-column
                                    prop="teacher"
                                    label="任课教师"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="sort"
                                    label="课程类型"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="type"
                                    label="课程类别"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="demand"
                                    label="课程要求"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="count"
                                    label="人数"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="hour"
                                    label="学时"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="year"
                                    label="学期"
                                    width="200"></el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog :title="dialog.name"
                   :visible.sync="dialogVisible"
                   class="dialog">
                    <div class="dialog-contain">
                        <el-row>
                            <el-col :span="10">
                                <span>课程名称：{{dialog.name}}</span>
                            </el-col>
                            <el-col :span="10">
                                <span>任课教师：{{dialog.teacher}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <span>指导老师：{{dialog.instructor.toString()}}</span>
                            </el-col>
                            <el-col :span="10">
                                <span>班级：{{dialog.class.toString()}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7"><span>课程类型：{{dialog.sort}}</span></el-col>
                            <el-col :span="7"><span>课程类别：{{dialog.type}}</span></el-col>
                            <el-col :span="7"><span>课程要求:{{dialog.demand}}</span></el-col>
                        </el-row>
                        <el-row>
                            <div>
                                <el-table
                                        :data="dialog.reserve"
                                >
                                    <el-table-column
                                        label="时间">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.week+scope.row.watt+scope.row.time}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="place"
                                        label="地点"></el-table-column>
                                </el-table>
                            </div>
                        </el-row>
                    </div>
        </el-dialog>
    </div>
</template>

<script>
    import data from '../data'
    export default {
        name: "course",
        data(){
            return{
                data:data(),
                dialog:{
                    name:'Java程序设计课程设计',
                    teacher:'程浩',
                    instructor:['白羽'],
                    class:['电子商务17-1','电子商务17-2'],
                    sort:'3',
                    type:'2',
                    demand:'1',
                    count: 100,
                    hour: 90,
                    reserve:[
                        {
                            place:'管理1号楼1403/1415',
                            week:'第13周',
                            watt:'周日',
                            time:'1-12节'
                        },
                        {
                            place:'管理1号楼1403/1415',
                            week:'第14周',
                            watt:'周日',
                            time:'1-12节'
                        },
                        {
                            place:'管理1号楼1403/1415',
                            week:'第15周',
                            watt:'周日',
                            time:'1-12节'
                        },
                        {
                            place:'管理1号楼1403/1415',
                            week:'第16周',
                            watt:'周日',
                            time:'1-12节'
                        }
                    ],
                    year:'2017－2018学年第二学期'
                },
                dialogVisible:false
            }
        },
        methods:{
            openDialog: function(row){
                    this.dialog=row;
                    this.dialogVisible = true;
                }
        }
    }
</script>

<style scoped>
    .title{
        background-color: white;
        margin: 0;
    }
    .title h3{
        color: #b3b2b2;
        font-size: 16pt;
        margin: 10% 0 10% 50%;
    }
    .add-button{
        margin: 10%;
    }
    .table{
        background-color: white;
    }
    .dialog-contain{
        margin: 0 10% 0 10%;
    }
</style>