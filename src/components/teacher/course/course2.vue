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
                                        <span>{{props.row.courseInfo.name}}</span>
                                        </el-form-item>
                                        <el-form-item label="任课教师">
                                            <span>{{props.row.instructor.name}}</span>
                                        </el-form-item>
                                        <el-form-item label="指导老师">
                                            <span>{{transformString(props.row.teacherList)}}</span>
                                        </el-form-item>
                                        <el-form-item label="班级">
                                            <span>{{transformString(props.row.classList)}}</span>
                                        </el-form-item>
                                        <el-form-item label="课程类型">
                                            <span>{{props.row.courseInfo.sort}}</span>
                                        </el-form-item>
                                        <el-form-item label="课程类别">
                                            <span>{{props.row.courseInfo.type}}</span>
                                        </el-form-item>
                                        <el-form-item label="课程要求">
                                            <span>{{props.row.courseInfo.require}}</span>
                                        </el-form-item>
                                        <el-form-item label="人数">
                                            <span>{{props.row.count}}</span>
                                        </el-form-item>
                                        <el-form-item label="学时">
                                            <span>{{props.row.courseInfo.hour}}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="courseInfo.name"
                                    label="课程名称"
                                    width="200"></el-table-column>
                            <el-table-column
                                    prop="instructor.name"
                                    label="任课教师"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="courseInfo.sort"
                                    label="课程类型"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="courseInfo.type"
                                    label="课程类别"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="courseInfo.require"
                                    label="课程要求"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="count"
                                    label="人数"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="courseInfo.hour"
                                    label="学时"
                                    width="80"></el-table-column>
                            <el-table-column
                                    prop="academicYear"
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
                        <el-select v-model="form.course" placeholder="请选择课程">
                            <el-option v-for="(course, index) in courseList" :key="index" :label="course.name" :value="course.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任课教师">
                        <el-select v-model="form.teacher" placeholder="请选择教师">
                            <el-option v-for="(teacher, index) in teacherList" :key="index" :label="teacher.name" :value="teacher.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指导老师">
                        <el-select v-model="form.instructor" placeholder="请选择指导老师" multiple>
                            <el-option
                                v-for="(teacher, index) in teacherList"
                                :key="index"
                                :label="teacher.name"
                                :value="teacher.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-select v-model="form.class" placeholder="请选择班级" multiple>
                            <el-option
                                    v-for="(c, index) in classList"
                                    :key="index"
                                    :label="c.name"
                                    :value="c.id"></el-option>
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
    export default {
        name: "course2",
        data:function(){
            return{
                data:[],
                form:{
                    course:'',
                    teacher:'',
                    class:[],
                    academic_year:'2017-2018第二学期',
                    instructor:[],
                    count: 0,
                },
                formDefault:{
                    course:'',
                    teacher:'',
                    class:[],
                    academic_year:'2017-2018第二学期',
                    instructor:[],
                    count: 0,
                },
                dialogVisible:false,
                courseList:[],
                teacherList:[],
                classList:[]
            }
        },
        methods:{
            loadData:function() {
                var _this = this;
                this.getRequest('/teacher/getAllCourse').then(resp => {
                    if (resp && resp.status == 200) {
                        _this.data = resp.data;
                    }
                });
                this.getRequest('/teacher/getTeacher').then(resp => {
                    if (resp && resp.status == 200) {
                        _this.teacherList = resp.data;
                    }
                });
                this.getRequest('/teacher/getCourseInfo').then(resp => {
                    if (resp && resp.status == 200) {
                        _this.courseList = resp.data;
                    }
                });
                this.getRequest('/teacher/getClassInfo').then(resp => {
                    if (resp && resp.status == 200) {
                        _this.classList = resp.data;
                    }
                });
            },
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
                var _this = this;
                this.postRequest("/teacher/addCourse",{
                    courseInfoId:_this.form.course,
                    academicYear:_this.form.academic_year,
                    count:_this.form.count,
                    instructorId:_this.form.teacher,
                    classIds:_this.form.class,
                    teacherIds:_this.form.instructor
                }).then(resp => {
                    if (resp && resp == 200) {
                        _this.$message({
                            message:resp.data.msg,
                            type:'success'
                        });
                    }
                });
                this.form = this.formDefault;
                this.dialogVisible = false;
                this.loadData();
            },
            transformString:function (list) {
                var temp = [];
                var i = 0;
                for (i; i<list.length;i++) {
                    temp.push(list[i].name);
                }
                return temp.join();
            }
        },
        mounted() {
            this.loadData();
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