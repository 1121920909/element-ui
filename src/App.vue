<template>
  <div id="app">
    <div class="top">
      <img src="./assets/hfut_03.png" height="50px" style="margin:10px"/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
//import course from "./components/teacher/course/cour-*/se2"
//import course from  "./components/admin/course"
//import cl from "./components/admin/class"
export default {
  name: 'app',

}
</script>

<style scoped>
.top {
  background-image: url('./components/back.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 80px;
  background-color: #f1f1f1;
  border-bottom: 2px solid #ececec;
  text-align: left;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 20% 0 20%;
}

</style>
