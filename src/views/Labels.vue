<template>
  <Layout>
    <Types :value.sync="type" />
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" class="tag" v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <button @click="open">新增标签</button>
      <Dialog2 :value="show" :fn="hideModal">
        <template v-slot:header>
          新增标签
        </template>
        <template v-slot:content>
         <div class="tagName">
           <span>标签名</span>
           <input type="text" placeholder="请输入标签名">
         </div>
          <div class="tagIcons">
            <div class="tagIcon" v-for="icon in addIcons" :key="icon">
              <Icon :name="icon"/>
            </div>
          </div>
        </template>
      </Dialog2>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Btn from '@/components/Btn.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
import Types from '@/components/Money/Types.vue';
import Dialog2 from '@/components/Dialog2.vue'

@Component({
  components: {Btn,Types,Dialog2},
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList.filter((tag:Tag)=> tag.type === this.type);
  }
  beforeCreate() {
    this.$store.commit('fetchTags');
  }

  type = '-'
  show = false;
  addIcons = ['蛋糕','夜宵','银锭','卡卡','月亮']
  open(){
    this.show = true
  }
  hideModal(){
    this.show = false
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}

.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;

    .tagName{
      display: flex;
      align-items: center;
      padding:5px 0;
      border-bottom: 1px solid #cdcccc;
      span{
        white-space:nowrap;
        font-weight: bold;
        margin: 5px;
      }
      input{
        box-sizing: border-box;
        margin:0 5px;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum";
        position: relative;
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 11px;
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
    .tagIcons{
      margin: 5px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;

      .tagIcon{
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        svg{
          margin: 4px;
          padding:0 2px ;
          border: 1px solid #d3d3d3;
          border-radius: 10px;
          height:35px;
          width:80%;
      }}
    }
  }
}
</style>