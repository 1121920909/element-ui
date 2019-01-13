<template>
    <div class="component">
        <div class="title">
            <el-row :gutter="20">
                <el-col :span="6">
                    <h3>设备信息信息</h3>
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
                                label="设备名称"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="price"
                                label="价格"></el-table-column>
                        <el-table-column
                                prop="amount"
                                label="数量"></el-table-column>
                        <el-table-column
                                prop="country"
                                label="国别"
                                width="200"></el-table-column>
                        <el-table-column
                                prop="supplier"
                                label="供应商"
                                width="200"></el-table-column>
                        <el-table-column
                                prop="date"
                                label="日期"></el-table-column>
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
                    <el-form-item label="设备名称">
                        <el-input v-model="update.name" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input v-model="update.price"></el-input>
                    </el-form-item>
                    <el-form-item label="数量:">
                        <el-input v-model="update.amount"></el-input>
                    </el-form-item>
                    <el-form-item label="国别">
                        <el-input v-model="update.country" placeholder="请输入国别"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-input v-model="update.supplier" placeholder="请输入考核方式"></el-input>
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-input v-model="update.date" placeholder="请输入日期"></el-input>
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
        name: "device",
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
            loadData: function () {
                var _this = this;
                this.getRequest('/admin/getAllDeviceInfo').then(reps=>{
                    if (reps && reps.status == 200) {
                        _this.data = reps.data;
                    }
                })
            },
            updateDialog:function (device) {
                this.type='修改';
                this.update = device;
                this.updateVisible = true;
            },
            updateCourse:function (device) {
                //TODO 修改
                var _this = this;
                if (this.type === "修改"){
                    this.postRequest('/admin/updateDevice',device).then(resp=>{
                        if (resp && resp.status == 200){
                            _this.updateVisible=false;
                            _this.$message({
                                message:resp.data.msg,
                                type:'success'
                            });
                        }
                    });
                } else {
                    this.postRequest('/admin/addDevice',device).then(resp=>{
                        if (resp && resp.status == 200){
                            _this.updateVisible=false;
                            _this.$message({
                                message:resp.data.msg,
                                type:'success'
                            })
                        }
                    });
                }
                _this.loadData();
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