<template>
  <div>
    <transition :name="SkipSwitchName">
    <router-view class="view"/>
    </transition>
  </div>
</template>
<script>
export default {
  data(){
    return{
      SkipSwitchName:""
    }
  },
  watch: {
    $route(to, from) {
        if (to.meta.tx > from.meta.tx) {
          this.SkipSwitchName = "Skright";
        } else if(from.meta.tx > to.meta.tx) {
          this.SkipSwitchName = "Skleft";
        }
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
.Skright-enter-active,
.Skright-leave-active,
.Skleft-enter-active,
.Skleft-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.Skright-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.Skright-leave-to {
  opacity: 1;
  transform: translateY(100%);
}
.Skleft-enter {
  opacity: 0;
  transform: translateY(-100%);
}

.Skleft-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
</style>
