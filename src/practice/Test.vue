<template>
<div>
  <span>实验场</span>
  <br />
  <br/>
  <div>
    <button @click="show=!show">弹窗</button>
    <Dialog :isShow="show" :fn="hideModal" >
      </Dialog>
  </div>
</div>
</template>

<script>
export default {
  name: 'Test',
  data(){
  return{
    show:false,
  }
},
  methods:{
    hideModal(){
      this.show=false
    },
  }

};
</script>

<style lang="scss" scoped>

</style>