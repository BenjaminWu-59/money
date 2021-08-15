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
<!--      <FormItem :value="currentTag.name"-->
<!--                @update:value="update"-->
<!--                field-name="标签名" placeholder="请输入标签名"/>-->
    </div>
    <div class="button-wrapper">
      <Button class="change" @click="remove">修改标签</Button>
      <Button class="remove" @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Btn.vue';
@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue {
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
  update(name: string) {
    if (this.currentTag) {
      this.$store.commit('updateTag', {
        id: this.currentTag.id, name
      });
    }
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
</style>