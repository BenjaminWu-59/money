<template>
  <div>
    <transition >
    <router-view class="view"/>
    </transition>
  </div>
</template>
<script>
import store from "@/store/index2";
export default {
  data(){
    return{
      store:store
    }
  }
}
</script>


<style lang="scss">
@import "assets/style/helper.scss";
@import "assets/style/reset.scss";
body{
    line-height: 1.5;
    font-family: $font-hei;
    background: #f6f6f6;
    color:#333;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
  }
</style>
