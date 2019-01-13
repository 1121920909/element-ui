<template>
    <div class="component">
        <div class="title">
            <el-row :gutter="20">
                <el-col :span="5">
                    <h3>实验室信息</h3>
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
                                prop="name"
                                label="实验室名称"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址"></el-table-column>
                        <el-table-column
                                prop="principal"
                                label="描述"></el-table-column>
                        <el-table-column
                                prop="remark"
                                label="备注"
                                width="200"></el-table-column>
                        <el-table-column
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
                    <el-form-item label="实验室名称">
                        <el-input v-model="update.name" placeholder="请输入实验室名称"></el-input>
                    </el-form-item>
                    <el-form-item label="地址:">
                        <el-input v-model="update.address"></el-input>
                    </el-form-item>
                    <el-form-item label="描述:">
                        <el-input v-model="update.principal"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input v-model="update.remark" placeholder="请输入备注"></el-input>
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
        name: "lab",
        data(){
            return {
                data:data('lab'),
                update:{},
                updateVisible:false,
                addVisible:false,
                type:''
            }
        },
        methods:{
            loadData: function () {
                var _this = this;
                this.getRequest('/admin/getLabInfo').then(resp => {
                    if (resp && resp.status == 200) {
                        _this.data=resp.data;
                    }
                })
            },
            updateDialog:function (lab) {
                this.type='修改';
                this.update = lab;
                this.updateVisible = true;
            },
            updateCourse:function (lab) {
                var _this = this;
                if (this.type === "修改"){
                    this.postRequest('/admin/updateLab',lab).then(resp => {
                        _this.updateVisible = false;
                        _this.$message({
                            message:resp.data.msg,
                            type:'success'
                        });
                    });
                } else {
                    this.postRequest('/admin/addLab',lab).then(resp => {
                        _this.updateVisible = false;
                        _this.$message({
                            message:resp.data.msg,
                            type:'success'
                        });
                    });
                }
                this.loadData();
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