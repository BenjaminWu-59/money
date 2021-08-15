<template>
  <Layout>
    <Types :value.sync="type"/>
    <div class="tags">
      <router-link :to="`/money/labels/edit/${tag.id}`" class="tag" v-for="tag in tags" :key="tag.id">
        <div class="combination">
          <Icon :name="tag.svg"/>
          <span>{{ tag.name }}</span>
        </div>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <button class="addButton" @click="open">新增标签</button>

      <Dialog2 :value="show" :fn="hideModal" :fn2="ok">
        <template v-slot:header>
          新增标签
        </template>
        <template v-slot:content>
         <div class="tagName">
           <span>标签名</span>
           <input type="text"
                  v-model="tagAddName"
                  placeholder="请输入标签名">
         </div>
          <div class="tagIcons">
            <div class="tagIcon" @click="toggle(icon)"  v-for="(icon,index) in addIcons" :key="index" :class="{selected: selectedAddTags.indexOf(icon)>=0}">
              <Icon  :name="icon.name"/>
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
export default class Labels extends mixins(TagHelper){
type:moneyType = '-'
show = false;
selectedAddTags:string[] = [];
tagAddName = ''
addTagList!:Tag

  get tags() {
    return this.$store.state.tagList.filter((tag:Tag)=> tag.type === this.type);
  }
  beforeCreate() {
    this.$store.commit('fetchTags');
  }


  addIcons = [{name:'蛋糕'},{name:'夜宵'},{name:'银锭'},{name:'卡卡'},{name:'音乐'},{name:'电器'},{name:'月亮'},{name:'手机'},{name:'图书'},{name:'约会'},{name:'宇宙'},{name:'游戏'}]

  open(){
    this.show = true
  }
  hideModal(){
    this.show = false
  }


  toggle(icon:string){
    const index = this.selectedAddTags.indexOf(icon)
    if(index >= 0){
      this.selectedAddTags.splice(index,1)
    }else {
      this.selectedAddTags.splice(index,1)
      this.selectedAddTags.push(icon)
    }
    // console.log(JSON.stringify(this.selectedAddTags[0].name));
    // console.log(this.type);
  }



  ok(){
    if(this.tagAddName === '' || this.selectedAddTags.length <= 0){
      window.alert('请输入标签名或选择图标')
    }else{
      this.addTagList= {name:JSON.parse(JSON.stringify(this.tagAddName)),svg:JSON.parse(JSON.stringify(this.selectedAddTags[0])).name,type:this.type}
      this.$store.commit('createTag',this.addTagList)
    }
    this.show = false
    this.tagAddName = ''
  }
}
</script>

<style lang="scss" scoped>
::v-deep .types {
  > .left {
    display: block;
  }
  >.back {
    display: none;
  }
}

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
      height: 10vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      margin:5px 0 ;

      .addButton{
        border:none;
        background: #272a3b;
        color: #f8f6f6;
        border-radius: 4px;
        height: 35px;
        width: 90px;
      }

      .tagName{
        display: flex;
        align-items: center;
        padding:10px 0;
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
        border:1.1px solid #cac7c7;
        box-shadow: 0 0 3px #cac7c7 inset;
        max-height: 22vh;
        overflow: auto;
        margin: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;

        .tagIcon{
          width: 33.333%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          &.selected{
            >svg{
              background: #c6d5e5;
            }
          }
          svg{
            margin: 10px;
            padding:4px 2px ;
            border: 1px solid #d3d3d3;
            border-radius: 10px;
            height:35px;
            width:70%;
          }
        }
      }
    }
  }
</style>