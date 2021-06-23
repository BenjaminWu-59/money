<template>
  <div class="content">
    {{recordList}}
    <NumberPads :value.sync="record.amount" @submit="saveRecord" @update:note="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Types :value.sync="record.type" />
  </div>
</template>

<script lang="ts">
import NumberPads from '@/components/Money/NumberPads.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue'
import {Component,Watch} from "vue-property-decorator";
import recordListModel from '@/models/recordListModel'

const recordList = recordListModel.fetch()

@Component({
  components: {Tags, Types, NumberPads},
})
export default class Money extends Vue{
  tags = window.tagList
  recordList:RecordItem[]= recordList
  record:RecordItem ={
    tags:[],notes:'',type:'-',amount:0
  }
  onUpdateTags(value:string[]){
    this.record.tags = value
  }
  onUpdateNotes(value:string){
    this.record.notes =value
  }
  saveRecord(){
    recordListModel.create(this.record)
  }
 @Watch('recordList')
  onRecordListChange(){
   recordListModel.save()
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