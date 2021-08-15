<template>
  <Layout>
    <div class="navBar">
      <div  class="leftIcon" @click="goBack">
        <Icon name="left"/>
      </div>
      <span class="title">编辑标签</span>
    </div>
    <div class="form-wrapper">
      <div class="display">
        <Icon :name="currentTag.svg"/>
        <span>{{currentTag.name}}</span>
      </div>
    </div>
    <div class="button-wrapper">
      <Button class="change" @click="open">修改标签</Button>
      <Button class="remove" @click="remove">删除标签</Button>
    </div>

    <Dialog2  :value="show" :fn="hideModal" :fn2="ok">
      <template v-slot:header>修改标签</template>
      <template  v-slot:content>
        <div class="changeContent">
          <input type="text"
                 @input="onValueChanged($event.target.value)"
                 placeholder="输入要修改的标签名">
        </div>
      </template>
    </Dialog2>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Btn.vue';
import Dialog2 from '@/components/Dialog2.vue'
@Component({
  components: {Button, FormItem,Dialog2},
})
export default class EditLabel extends Vue {
  show = false
  changeName = ''
  tag!:{id:string,name:string}

  get currentTag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);
    if (!this.currentTag) {
      this.$router.replace('/404');
    }
  }


  onValueChanged(value:string){
    this.changeName = value
    console.log(this.changeName);
  }

  open(){
    this.show = true
  }

  hideModal(){
    this.show = false
  }

  ok(){
    const x:string = this.changeName
    const y:string = this.currentTag.id
    if(this.changeName === ''){
      window.alert('标签名不能为空')
    }else{
      this.tag = {id:y,name:x} //试了很多遍，才发现最好是用对象传过去
      this.$store.commit('updateTag', this.tag)
    }
    this.show = false
  }


  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag', this.currentTag.id);
    }
  }
  goBack(){
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  position: relative;
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background:#272a3b;
  display: flex;
  align-items: center;
  justify-content:center;
  > .title {
    color: white;
  }
  > .leftIcon {
    position:absolute;
    font-weight: 15;
    left: 20px;
    cursor: pointer;
    >svg{
      color:white;;
      width: 24px;
      height: 24px;
    }
  }
}
.form-wrapper {
  background: white;
  margin-top: 10px;
  .display{
    padding: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
   svg{
     width: 30px;
     height: 30px;
     margin-right:10px ;
   }
    >span{
      font-weight: bold;
    }
  }
}
.button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin:30px 0;
  >Button{
    margin: 5px 0;
    width: 100px;
    &.change{
       background: #77bae5;
    }
    &.remove{
      background: #272a3b;
    }
  }
}
.changeContent{
  >input{
    box-sizing: border-box;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    width: 100%;
    height: 32px;
    margin-top: 5px;
    padding: 0 10px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .3s;
  }
}
</style>