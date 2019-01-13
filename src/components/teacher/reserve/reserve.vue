<template>
    <div>
        <div>

        </div>
        <div>
            <el-steps :active="active" finish-status="success">
                <el-step title="选择预约的实验">
                    <!--课程选择-->
                </el-step>
                <el-step title="选择日期">
                    <!--日期预约-->
                </el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <div v-if="active==0">
                <el-table
                        ref="singleTable"
                        :data="courses"
                        highlight-current-row
                        @current-change="handleCurrentChange">
                    <el-table-column
                            label="课程名称"
                            prop="courseInfo.name"></el-table-column>
                    <el-table-column
                            label="任课老师"
                            prop="instructor.name"></el-table-column>
                    <el-table-column
                            label="指导老师">
                        <template slot-scope="scope">
                            <span>{{transformString(scope.row.teacherList)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="班级">
                        <template slot-scope="scope">
                            <span>{{transformString(scope.row.classList)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="人数"
                            prop="count"></el-table-column>
                </el-table>
            </div>
            <div v-else-if="active==1">
                <div class="reserve_select">
                    <el-select v-model="selectWeek" @change="selectChange1">
                        <el-option v-for="(item,index) in weeks" :key="index" :value="index" :label="item" ></el-option>
                    </el-select>
                    <el-select v-model="selectLab" @change="selectChange2">
                        <el-option v-for="(item, index) in labs" :key="index" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </div>
                <div class="reserve_date">
                    <ul class="reserve_date_header">
                        <li><span>时间</span></li>
                        <li><span>周一</span></li>
                        <li><span>周二</span></li>
                        <li><span>周三</span></li>
                        <li><span>周四</span></li>
                        <li><span>周五</span></li>
                        <li><span>周六</span></li>
                        <li><span>周日</span></li>
                    </ul>
                    <ul v-for="(r, time) in reserveCourse" :key="time" class="reserve_date_row">
                        <li><span>{{times[time]}}</span></li>
                        <li v-for="(c, watt) in r" :key="watt">
                            <cell :time="time" :watt="watt" :reservation="c" @reserve="reserve" :current-course="currentRow"/>
                        </li>
                    </ul>
                </div>
            </div>
            <el-button @click="next">{{nextButtonText}}</el-button>
        </div>
    </div>
</template>

<script>
    import cell from './cell'
    export default {
        name: "reserve",
        data(){
            return{
                courses:[],
                reserveCourse:[],
                active: 0,
                nextButtonText:'下一步',
                weeks:[],
                labs:[],
                times:[
                    '1~4节',
                    '5~8节',
                    '9~12节'
                ],
                currentRow :null,
                selectWeek:0,
                selectLab:1
            }
        },
        components:{
            cell
        },
        methods:{
            loadData: function () {
                var _this = this;
                this.getRequest('/teacher/getCourse?year=2017-2018第二学期').then(resp => {
                    if (resp && resp.status == 200) {
                        _this.courses = resp.data;
                    }
                });
                this.getRequest('/teacher/getWeeks').then(resp => {
                    if (resp && resp.status == 200) {
                        _this.weeks = resp.data;
                    }
                });
                this.getRequest('/teacher/getLabList').then(resp => {
                    if (resp && resp.status == 200) {
                        _this.labs = resp.data;
                    }
                })
            },
            getReservation: function () {
                var _this = this;
                this.getRequest('/teacher/getReservation?year=2017-2018第二学期&week='+this.selectWeek+"&labId="+this.selectLab).then(resp => {
                    if (resp && resp.status == 200) {
                        _this.reserveCourse = resp.data;
                    }
                })
            },
            next:function(){
                if (this.currentRow == null) {
                    this.$message({
                        message:'请选择课程',
                        type:'error'
                    });
                    return;
                }
                if (this.active == 0){
                    this.nextButtonText = '预约完成';
                    this.active++;
                }
                else if (this.active == 1){
                    this.nextButtonText = "下一步";
                    this.active = 0;
                }
            },
            handleCurrentChange:function (val) {
                this.currentRow = val;
            },
            reserve:function (watt,time) {
                var _this = this;
                this.postRequest("/teacher/reserve",{
                    courseId:_this.currentRow.id,
                    week:_this.selectWeek,
                    time:time,
                    watt:watt,
                    labId:_this.selectLab
                }).then(resp => {
                    if (resp && resp.status == 200) {
                        _this.$message({
                            message:resp.data.msg,
                            type:'success'
                        })
                    }
                    _this.getReservation();
                })
            },
            transformString:function (list) {
                var temp = [];
                var i = 0;
                for (i; i<list.length;i++) {
                    temp.push(list[i].name);
                }
                return temp.join();
            },
            selectChange1(val) {
                this.selectWeek = val;
                this.getReservation();
            },
            selectChange2(val) {
                this.selectLab = val;
                this.getReservation();
            }
        },
        mounted() {
            this.loadData();
            this.getReservation();
        }
    }
</script>

<style scoped>
    .reserve_date{
        width: 1000px;
    }
    .reserve_date ul{
        list-style-type: none;
        background-color: #f3edf8;
        width: 100%;
        padding: 0;
    }
    .reserve_date ul li{
        width: 120px;
        margin: 0;
        padding: 0;
    }
    .reserve_date_header li{
        display: inline-block;
        text-align: center;
    }
    .reserve_date_row li{
        display: inline-block;
        height: 100px;;
        text-align: center;
        vertical-align: top;
    }
    .reserve_date_row li span{
        display: block;
        margin-top: 35%;
        font-size: 1.25em;
    }
    .reserve_date_watt{
        display: inline-block;
        width: 52px;
        margin: 0 1px 0 1px;
        text-align: center;
    }
    .reserve_date_time{
        display: inline-block;
        width: 80px;
        margin: 0 1px 0px 1px;
        text-align: center;
    }
</style>