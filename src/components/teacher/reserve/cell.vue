<template>
    <div class="reservation_cell">
        <div v-if="reservation == null" class="can_reserve">
            <a @click="reserve"></a>
        </div>
        <div v-else>
            <div class="reservation_cell_text">
                课程:
                <el-tooltip :content="reservation.courseInfo.name" placement="right" effect="light">
                    <el-tag type="success" size="small">{{strSub(reservation.courseInfo.name)}}</el-tag>
                </el-tooltip>
            </div>
            <div class="reservation_cell_text">
                任课老师：
                <el-tag type="success" size="small">{{strSub(reservation.teacher.name)}}</el-tag>
            </div>
            <div class="reservation_cell_text">
                班级：
                <el-tooltip v-for="(classInfo, index) in reservation.classList" :key="index" placement="right" effect="light" :content="classInfo.name">
                    <el-tag type="success" size="small">
                        {{strSub(classInfo.name)}}
                    </el-tag>
                </el-tooltip>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cell",
        data(){
            return {
                canNot:'can_not_reserve',
                can:'can_reserve',
                had:'reserved'
            }
        },
        props:{
            reservation:Object,
            currentCourse:Object,
            time:Number,
            watt:Number
        },
        methods:{
            reserve:function(){
                this.$emit('reserve',this.watt,this.time);
            },
            transformString:function (list) {
                var temp = [];
                var i = 0;
                for (i; i<list.length;i++) {
                    temp.push(list[i].name);
                }
                return temp.join();
            },
            strSub(str) {
                if (str.length > 4) {
                    return str.slice(0, 4);
                }
                return str;
            },
            /*cancel:function () {
                var _this = this;
                this.$confirm('确认取消预约？')
                    .then( ()=>{
                        _this.postRequest('/teacher/cancelReserve',{id:_this.reservation.id}).then(resp => {
                            if (resp && resp == 200) {
                                _this.$message({
                                    message:resp.data.msg,
                                    type:'success'
                                });
                                _this.$parent.getReservation();
                            }
                        });
                    })
                    .catch(()=>{

                    });
            }*/
        }
    }
</script>

<style scoped>
    .reservation_cell {
        display: inline-block;
        width: 100%;
        margin: 1px;

        height: 98%;
        border: 1px solid #eae3ef;
    }

    .reservation_cell a{
        display: block;
        width: 100%;
        height: 100%;
    }

    .can_not_reserve{
        background-color: #faf4ff;
        height: 100%;
    }

    .can_reserve{
        height: 100%;
    }
    .can_reserve a{
        display: block;
        height: 100%;
        width: 100%;
    }
    .can_reserve:hover{
        background-color: rgba(5, 237, 255, 0.19);
    }

    .reservation_cell_text{
        height: 30%;
        font-size: 0.75em;
        text-align:left;
    }

    .reserved{
        background-color: rgba(5, 237, 255, 0.19);
        height: 100%;
    }

</style>