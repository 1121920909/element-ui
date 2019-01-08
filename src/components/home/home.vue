<template>
    <el-row :gutter="20">
      <el-col :span="6">
        <new/>
        <calendar/>
      </el-col>
      <el-col :span="12">
        <card :cardTitle="news.title" :list="news.list"/>
        <card :cardTitle="node.title" :list="node.list"/>
      </el-col>
      <el-col :span="6">
        <card :cardTitle="tel.title" :list="tel.list"/>
        <card :card-title="system.title" :list="system.list"/>
      </el-col>
    </el-row>
</template>

<script>
import New from './new.vue';
import Card from './card.vue';
import Calendar from './calendar.vue';

export default {
    
  components: {
    New,
    Card,
    Calendar
  },
  data() {
    return{
      news:{
          title:'新闻动态',
          list:[
            {
              id:1,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:2,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:3,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:4,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:5,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:6,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:7,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:8,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:9,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            }
          ]
        },
        tel:{
          title:'常用电话',
          list:[
            {
              id: 1,
              title: '办公室：6884035--625'
            },{
              id: 1,
              title: '办公室：6884035--625'
            },{
              id: 1,
              title: '办公室：6884035--625'
            },{
              id: 1,
              title: '办公室：6884035--625'
            }
          ]
        },
        node:{
          title:'通知公告',
          list:[
            {
              id:1,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:2,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:3,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:4,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            },{
              id:5,
              title:'XXXXXXXXX',
              date:'2018/12/12'
            }
          ]
        },
        system:{
          title:'实验室管理系统',
          list:[
            {
              id:1,
              title:'实验教学软件平台(新的)'
            },{
              id:2,
              title:'实验教学软件平台(B/S模式）'
            },{
              id:3,
              title:'实验教学软件平台(B/S模式）'
            },{
              id:4,
              title:'实验教学软件平台(B/S模式）'
            },{
              id:5,
              title:'实验教学软件平台(B/S模式）'
            },{
              id:6,
              title:'实验教学软件平台(B/S模式）'
            }
          ]
        }
    }
    
  }
}
</script>

