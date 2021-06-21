<template>
  <div>
  <div id="myModal" class="modal" v-show="isShow">
    <div class="modal-content">
      <div class="modalHeader">
        <slot></slot>
      </div>
      <div class="modalInput">
        <input type="text" v-model="Content" @change="setNote" class="Put" placeholder="客官在这里写点啥" >
      </div>
      <div class="modalFoot">
        <div class="footButton" @click="fn2">确认</div>
        <div class="footButton" @click="fn">取消</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  data(){
    return{
      Content:''
    }
  },
  props:{
      isShow:{
        type:Boolean,
        default:false
      },
     fn:Function,
     fn2:Function
  },
  methods: {
    setNote(){
        this.$emit('transferNote',this.Content)
        this.Content=''
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed; /* 固定定位 */
  margin: auto;
  z-index: 1; /* 设置在顶层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  width: 80%;
  border-radius: 14px;
  box-shadow: 0 0 3px #4f4f4f;
  animation:window-open 0.2s 1;

  .modalHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    background:  #272a3b;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    height: 50px;
    color: white;
    font-size: large;

  }

  .modalInput {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    margin-bottom: 5px;

    .Put {
      box-sizing: border-box;
      font-size: 15px;
      height: 2.7em;
      border-radius: 4px;
      border: 1px solid #c8cccf;
      display: block;
      outline: 0;
      padding: 0 1em;
      text-decoration: none;
      width: 100%;
    }
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .modalFoot {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 0;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    height: 80px;

    .footButton {
      margin: 20px;
      font-size: 17px;
      padding: 5px 15px 5px 15px;
      border-radius: 5px;
      background: #272a3b;
      color: white;
    }
  }
}

@keyframes window-open
{
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0, 0, 1);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
  }
}


</style>