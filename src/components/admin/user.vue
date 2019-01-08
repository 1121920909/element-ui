<template>
    <div class="component">
        <div class="title">
            <el-row :gutter="20">
                <el-col :span="5">
                    <h3>教师信息</h3>
                </el-col>
                <el-col :span="3" :offset="13">
                    <div class="add-button">
                        <el-button type="primary" plain @click="add()">添加</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="main">
            <el-row :gutter="24">
                <el-col :span="20" :offset="2">
                    <el-table
                            :data="data"
                            stripe
                    >
                        <el-table-column
                            prop="id"
                            label="id"></el-table-column>
                        <el-table-column
                                fixed="left"
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="userName"
                                label="用户名"></el-table-column>
                        <el-table-column
                                prop="password"
                                label="密码"></el-table-column>
                        <el-table-column
                                prop="sex"
                                label="性别"></el-table-column>
                        <el-table-column
                                prop="birth"
                                label="出生年月"
                                width="150"></el-table-column>
                        <el-table-column
                                prop="degree"
                                label="学位"></el-table-column>
                        <el-table-column
                                prop="position"
                                label="职位"></el-table-column>
                        <el-table-column
                                prop="major"
                                label="专业"></el-table-column>
                        <el-table-column
                            prop="worktime"
                            label="工龄"></el-table-column>
                        <el-table-column
                            prop="duty"
                            label="职务"></el-table-column>
                        <el-table-column
                            prop="department"
                            label="部门"
                            width="250"></el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="updateDialog(scope.row)" type="text" size="small">修改</el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </el-col>
            </el-row>
        </div>
        <el-dialog
                :title="type"
                :visible.sync="updateVisible"
                :before-close="handleClose"
                width="25%">
            <div class="form">
                <el-form :inline="true" :model="update" :rules="rules" label-width="100px" label-suffix="：">
                    <el-form-item label="姓名">
                        <el-input v-model="update.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="update.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="update.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="update.sex" placeholder="请选择">
                            <el-option
                                label="男"
                                value="男"></el-option>
                            <el-option
                                label="女"
                                value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生年月">
                        <el-input v-model="update.birth" placeholder="请输入出生年月"></el-input>
                    </el-form-item>
                    <el-form-item label="学位">
                        <el-select v-model="update.degree">
                            <el-option v-for="(i,index) in degree" :key="index" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-select v-model="update.position">
                            <el-option v-for="(i,index) in position" :key="index" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工龄">
                        <el-input v-model="update.worktime" placeholder="请输入工龄"></el-input>
                    </el-form-item>
                    <el-form-item label="职务">
                        <el-select v-model="update.duty">
                            <el-option v-for="(i,index) in duty" :key="index" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-select v-model="update.department">
                            <el-option v-for="(i,index) in department" :key="index" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button @click="updateVisible=false">取消</el-button>
                <el-button @click="updateCourse(update)" >{{type}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import './common.css'
    import data from './data'
    export default {
        name: "course",
        data(){
            return {
                data:data('teacher'),
                update:{},
                updateVisible:false,
                addVisible:false,
                type:'',
                degree:['学士','硕士','博士'],
                position:['主任','管理员','教师'],
                major:['信息管理','电子商务','工商管理','会计学'],
                department:['管理学院信息管理与信息系统系','管理学院会计系','管理学院电子商务系','管理学院工商管理系'],
                duty:['教授','副教授','研究员','副研究员','讲师','高级实验师','工程师'],
                rules:{
                    name:[
                        {required:true,message:'请输入教师姓名',trigger:'blur'}
                    ],
                    userName:[
                        {required: true,message:'请输入用户名',trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'请输入用户名',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            updateDialog:function (course) {
                this.type='修改';
                this.update = course;
                this.updateVisible = true;
            },
            updateCourse:function (course) {
                //TODO 修改
                if (this.type === "修改"){
                    this.updateVisible=false;
                    this.$message({
                        message:'修改成功',
                        type:'success'
                    })
                } else {
                    this.data.push(course);
                    this.updateVisible=false;
                    this.$message({
                        message:'添加成功',
                        type:'success'
                    })
                }

            },
            add:function () {
                this.type='添加';
                this.update={};
                this.updateVisible = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then( ()=>{
                        done();
                    })
                    .catch(()=>{

                    });
            }
        }
    }
</script>

<style scoped>
</style>