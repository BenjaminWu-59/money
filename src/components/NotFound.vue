<template>
  <div class="out">
    <div class="outer">
      <div class="inner1">
        <img src="../assets/picture/404.jpg" alt="404">
      </div>
      <div class="inner">
        <Icon name="404"/>
        <span class="NF2">你竟然迷路了！</span>
      </div>
      <div class="inner">
        <router-link class="Back" to="/">
            返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound'
};
</script>

<style lang="scss" scoped>
.out {
  background:white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;


  .outer {
    width: 100%;
    height: 450px;

 .inner1{
   height: 60%;
   display: flex;
   justify-content: center;
   align-items: center;
}
    .inner{
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    .icon{
       width: 100px;
       height: 55px;
     }
      .NF2 {
        font-weight: 600;
        padding-left: 20px;
        color:#515151;
      }
      .Back{
        padding:5px;
        border-radius: 14px;
        color:#515151;
        border: 0.5px solid #515151;
        background: rgba(196, 196, 196, 0.5);
      }
    }
  }


}
</style>