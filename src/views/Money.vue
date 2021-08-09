<template>
  <div class="content">
    <NumberPads :value.sync="record.amount" @submit="saveRecord" @update:note="onUpdateNotes"/>
    <Tags/>
    <Types :value.sync="record.type" />
  </div>
</template>

<script lang="ts">
import NumberPads from '@/components/Money/NumberPads.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import oldStore from '@/store/index2.ts'
import store from '@/store/index.ts'

@Component({
  components: {Tags, Types, NumberPads},
})
export default class Money extends Vue{
  recordList = oldStore.recordList
  record:RecordItem ={
    tags:[],notes:'',type:'-',amount:0
  }
  onUpdateNotes(value:string){
    this.record.notes =value
  }
  saveRecord(){
    oldStore.createRecord(this.record)
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