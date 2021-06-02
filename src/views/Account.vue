<template>
  <Layout class="Layout">
    <div>
      <div class="header">
        <img src="../assets/picture/rain4.jpeg" alt="图片不见了">
        <div class="link1">雨点记账</div>
        <div class="link2">
          <Icon name="search"/>
        </div>
        <div class="link3">
          <Icon name="us"/>
        </div>
        <div class="Button"></div>
        <div id="wave" @click="onClick">
          <transition name="bounce" >
            <div  class="A" v-if="show">
            <Icon class="aaa" name="pocket"/>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
@Component
export default class Account extends Vue {
  template: '#wave'
  show = true
  onClick( )  {
    this.show = !this.show
    setTimeout(() => {
      this.show = !this.show
    }, 100) //再跳回来，状态转换true->false->true，等于点两次
    setTimeout(() => {
      this.$router.replace('/money')
    }, 400)

  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 21vh;
  position: relative;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.Button {
  background: white;
  border: 1px solid white;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: -50px;
}

#wave {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -35px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
   .A{
     display: flex;
     justify-content: center;
     align-items: center;
     background: black;
     box-shadow: 0 0 0 1px hsla(240, 0%, 100%, .3) inset,
     0 .5em 1em rgba(0, 0, 0, 0.35);
     position: absolute;
     width: 70px;
     height: 70px;
     border-radius: 50%;

   }

  .bounce-enter-active{
    animation: ease-out .3s;
  }

  .bounce-leave-active {
    animation: ease-out .3s reverse;
  }

  @keyframes ease-out {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  .aaa {
    width: 30px;
    height: 20px;
  }
}



.link1 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  width: 65px;
  height: 30px;
  left: 49.5%;
  top: 15%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  font-size: x-small;
  background: transparent;
  box-shadow: 0 0 0 1px hsla(240, 0%, 100%, .3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.35);
}

.link2 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 80%;
  top: 15%;
  transform: translate(-50%, -50%);
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 0 0 0 1px hsla(240, 0%, 100%, .3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.35);
}

.link3 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 93%;
  top: 15%;
  transform: translate(-50%, -50%);
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 0 0 0 1px hsla(240, 0%, 100%, .3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.35);
}


</style>