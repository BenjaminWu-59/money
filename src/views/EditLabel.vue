<template>
  <Layout>
    <div class="navBar">
      <div class="back" @click="goBack">
      <Icon class="leftIcon" name="left"/>
      </div>
      <span class="title">编辑标签</span>
      <span class="rightIcon"/>
    </div>
    <div class="form-wrapper">
      <div class="formItem">
        <span class="name">标签名</span>
        <input type="text"
               :value="tag.name"
               @input="update($event.target.value)"
               placeholder="请输入标签名">
      </div>
    </div>
    <div class="button-wrapper">
      <Btn @click="remvoe">
        删除标签
      </Btn>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Btn from '@/components/Btn.vue';

@Component({
  components: {Btn}
})
export default class EditLabel extends Vue {
 tag?:Tag = undefined

  created() {//将路由和标签串联，使得标签单独变成可访问页面
    //TODO
    // this.tag = store.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(value:string) {
    if (this.tag) {
      //TODO
      // store.updateTag(this.tag.id, value);
    }
  }
  remvoe(){
    if (this.tag) {
      //TODO
      // if (store.removeTag(this.tag.id)) {
      //   this.$router.back();
      // } else {
      //   window.alert('删除失败');
      // }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}

.navBar {
  position:relative;
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  > .title {
  }

  >.back {
    position: absolute;
    left: 8px;
    > .leftIcon {
      width: 24px;
      height: 24px;
    }
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>