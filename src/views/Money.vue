<template>
  <div class="content">
    <NumberPads :value.sync="record.amount" @submit="saveRecord" @update:note="onUpdateNotes"/>
    <Tags :value.sync="record.tags"/>
    <Types :value.sync="record.type" />
  </div>
</template>

<script lang="ts">
import NumberPads from '@/components/Money/NumberPads.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue'
import {Component} from "vue-property-decorator";


@Component({
  components: {Tags, Types, NumberPads},
})
export default class Money extends Vue{
  get recordList() {
    return this.$store.state.recordList;
  }
  record:RecordItem ={
    tags:[],notes:'',type:'-',amount:0
  }
  created(){
    this.$store.commit('fetchRecords')
  }
  onUpdateNotes(value:string){
    this.record.notes =value
  }
  saveRecord(){
    if(!this.record.tags || this.record.tags.length === 0){
      return window.alert('请至少选择一个标签')
    }
    this.$store.commit('createRecord',this.record)
    if(this.$store.state.createRecordError === null){
      window.alert('已保存')
    }
    this.$router.push('/detail')
  }

}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  min-width: 100%;
}

</style>