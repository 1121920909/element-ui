<template>
    <div>
        <div class="title">
            <el-row :gutter="20">
                <el-col :span="4">
                    <h3>课程信息</h3>
                </el-col>
                <el-col :span="3" :offset="13">
                    <div class="add-button">
                        <el-button type="primary" plain @click="openDialog">添加</el-button>
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
                        >
                            <el-table-column type="expand" >
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="table-expand" label-suffix="：">
                                        <el-form-item label="课程名称">
                                        <span>{{props.row.name}}</span>
                                        </el-form-item>
                                        <el-form-item label="任课教师">
                                            <span>{{props.row.teacher}}</span>
                                        </el-form-item>
                                        <el-form-item label="指导老师">
                                            <span>{{props.row.instructor.toString()}}</span>
                                        </el-form-item>
                                        <el-form-item label="班级">
                                            <span>{{props.row.class.toString()}}</span>
                                        </el-form-item>
                                        <el-form-item label="课程类型">
                                            <span>{{props.row.sort}}</span>
                                        </el-form-item>
                                        <el-form-item label="课程类别">
                                            <span>{{props.row.type}}</span>
                                        </el-form-item>
                                        <el-form-item label="课程要求">
                                            <span>{{props.row.demand}}</span>
                                        </el-form-item>
                                        <el-form-item label="人数">
                                            <span>{{props.row.count}}</span>
                                        </el-form-item>
                                        <el-form-item label="学时">
                                            <span>{{props.row.hour}}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
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
        <el-dialog
                title="开课"
                :visible.sync="dialogVisible"
                width="400px"
                inline
                :before-close="handleClose"
        >
            <div class="add-dialog">
                <el-form class="add-form" ref="form" :model="form" label-width="80px" label-position="right">
                    <el-form-item label="课程">
                        <el-select v-model="form.name" placeholder="请选择课程">
                            <el-option v-for="(course, index) in courseList" :key="index" :label="course" :value="course"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任课教师">
                        <el-select v-model="form.teacher" placeholder="请选择教师">
                            <el-option v-for="(teacher, index) in teacherList" :key="index" :label="teacher" :value="teacher"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指导老师">
                        <el-select v-model="form.instructor" placeholder="请选择指导老师" multiple>
                            <el-option
                                v-for="(teacher, index) in teacherList"
                                :key="index"
                                :label="teacher"
                                :value="teacher"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-select v-model="form.class" placeholder="请选择班级" multiple>
                            <el-option
                                    v-for="(c, index) in classList"
                                    :key="index"
                                    :label="c"
                                    :value="c"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人数">
                        <el-input-number v-model="form.count" placeholder="请输入上课人数"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import data from '../data'
    export default {
        name: "course2",
        data(){
            return{
                data:data(),
                form:{
                    name:'',
                    teacher:'',
                    instructor:[],
                    class:[],
                    sort:'',
                    type:'',
                    demand:'',
                    count: 0,
                    hour: 0,
                },
                formDefault:{
                    name:'',
                    teacher:'',
                    instructor:[],
                    class:[],
                    sort:'',
                    type:'',
                    demand:'',
                    count: 0,
                    hour: 0,
                },
                dialogVisible:false,
                courseList:[
                    'ERP实验',
                    'ERP',
                    '商务数据分析',
                    '程序设计语言'
                ],
                teacherList:[
                    '白羽',
                    '钟金宏',
                    '靳鹏',
                    '杨颖',
                    '王刚'
                ],
                classList:[
                    '信息管理15-1',
                    '信息管理15-2',
                    '电子商务15-1',
                    '电子商务15-2'
                ]
            }
        },
        methods:{
            openDialog:function () {
                this.dialogVisible=true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then( ()=>{
                        done();
                    })
                    .catch(()=>{

                    });
            },
            onSubmit:function () {
                this.data.push(this.form);
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.form = this.formDefault;
                this.dialogVisible = false;
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
    .table-expand {
        font-size: 0;
    }
    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .add-dialog{
        text-align: center;
    }
    .el-form-item{
        margin-bottom: 10px
    }


</style>