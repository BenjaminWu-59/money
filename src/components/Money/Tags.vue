<template>
  <div class="tags">
    <ul class="tag-list">
      <li class="tag-item" v-for="tag in tagList" :key="tag.id"
          @click="toggle(tag)">
       <div class="icon-wrapper"  :class="{selected: selectedTags.indexOf(tag)>=0}">
         <Icon :name="tag.svg" />
       </div>
        <span> {{tag.name}}</span>
      </li>
      <li class="edit" @click="goTo">
        <div class="icon-wrapper">
          <Icon name="add" />
        </div>
        <span>编辑</span>
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop()type!:string
  selectedTags:string[] = [];
  get tagList(){
    return this.$store.state.tagList.filter((tag: Tag) => tag.type === this.type)
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
  }

  toggle(tag:string){
    const index = this.selectedTags.indexOf(tag)
    if(index >= 0){
      this.selectedTags.splice(index,1)
    }else {
      this.selectedTags.splice(index,1)
    this.selectedTags.push(tag)
    }
    this.$emit('update:value',this.selectedTags)
    console.log(this.selectedTags);
  }


  goTo(){
    this.$router.push('/labels')
  }
}

</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 12px;
  flex-grow: 1;
  overflow: auto;

  >.tag-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    >.tag-item{
      width: 25%;
      padding: 15px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      >.icon-wrapper{
        width: 48px;
        height: 48px;
        padding: 4px;
        border-radius: 50%;
        background: #dedede;
        margin-bottom: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
       &.selected{
         background: #c6d5e5;
       }
        >svg{
          width: 30px;
          height: 30px;
        }
      }
    }

    >.edit{
      width: 25%;
      padding: 15px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      >.icon-wrapper{
        width: 48px;
        height: 48px;
        padding: 4px;
        border-radius: 50%;
        background: #dedede;
        margin-bottom: 4px;
        display: flex;
        justify-content: center;
        align-items: center;

        >svg{
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
</style>
