<template>
    <div class="component">
        <div class="title">
            <el-row :gutter="20">
                <el-col :span="5">
                    <h3>课程信息</h3>
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
                            fixed="left"
                            prop="name"
                            label="课程名称"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="hours"
                            label="学时"></el-table-column>
                        <el-table-column
                            prop="credit"
                            label="学分"></el-table-column>
                        <el-table-column
                            prop="tool"
                            label="相关工具"
                            width="200"></el-table-column>
                        <el-table-column
                            prop="exam"
                            label="考核方式"
                            width="200"></el-table-column>
                        <el-table-column
                            prop="sort"
                            label="实验类别"></el-table-column>
                        <el-table-column
                            prop="type"
                            label="实验类型"></el-table-column>
                        <el-table-column
                            prop="require"
                            label="实验要求"></el-table-column>
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
                <el-form :inline="true" :model="update" >
                    <el-form-item label="课程名称">
                        <el-input v-model="update.name" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                    <el-form-item label="学时:">
                        <el-input-number v-model="update.hours"></el-input-number>
                    </el-form-item>
                    <el-form-item label="学分:">
                        <el-input-number v-model="update.credit"></el-input-number>
                    </el-form-item>
                    <el-form-item label="相关软件:">
                        <el-input v-model="update.tool" placeholder="请输入相关软件"></el-input>
                    </el-form-item>
                    <el-form-item label="考核方式:">
                        <el-input v-model="update.exam" placeholder="请输入考核方式"></el-input>
                    </el-form-item>
                    <el-form-item label="实验类别:">
                        <el-select v-model="update.sort" placeholder="请选择">
                            <el-option
                                label="1-基础"
                                value="1-基础"></el-option>
                            <el-option
                                label="2-专业基础"
                                value="2-专业基础"></el-option>
                            <el-option
                                label="3-专业"
                                value="3-专业"></el-option>
                            <el-option
                                label="4-其他"
                                value="4-其他"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="实验类型:">
                        <el-select v-model="update.type" placeholder="请选择">
                            <el-option
                                    label="1-演示型"
                                    value="1-演示型"></el-option>
                            <el-option
                                    label="2-验证型"
                                    value="2-验证型"></el-option>
                            <el-option
                                    label="3-综合型"
                                    value="3-综合型"></el-option>
                            <el-option
                                    label="4-设计研究"
                                    value="4-设计研究"></el-option>
                            <el-option
                                    label="5-其他"
                                    value="5-其他"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="实验要求:">
                        <el-select v-model="update.require" placeholder="请选择">>
                            <el-option
                                    label="1-必修"
                                    value="1-必修"></el-option>
                            <el-option
                                    label="2-选修"
                                    value="2-选修"></el-option>
                            <el-option
                                    label="3-其他"
                                    value="3-其他"></el-option>
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
    export default {
        name: "course",
        data(){
            return {
                data:[],
                update:{},
                updateVisible:false,
                addVisible:false,
                type:''
            }
        },
        methods:{
            loadData:function(){
                var _this = this;
                this.getRequest("/admin/getAllCourseInfo").then(resp=>{
                    if (resp && resp.status == 200) {
                        _this.data = resp.data;
                    }
                })
            },
            updateDialog:function (course) {
                this.type='修改';
                this.update = course;
                this.updateVisible = true;
            },
            updateCourse:function (course) {
                var _this = this;
                if (this.type === "修改"){
                    this.postRequest('/admin/updateCourseInfo',course).then(resp=>{
                        _this.updateVisible = false;
                        if (resp && resp.status == 200) {
                            _this.$message({
                                message:resp.data.data,
                                type:'success'
                            });
                            _this.loadData();
                        }
                    });
                } else {
                    this.postRequest('/admin/addCourseInfo',course).then(resp=>{
                        _this.updateVisible = false;
                        if (resp && resp.status == 200){
                            _this.$message({
                                message:resp.data.data,
                                type:'success'
                            });
                            _this.update = {};
                            _this.loadData();
                        }
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
        },
        mounted() {
            this.loadData();
        }
    }
</script>

<style scoped>
</style>