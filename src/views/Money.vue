<template>
  <div class="content">
    {{record}}
    <NumberPads @update:value="onUpdateAmount"  @update:note="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Types :value.sync="record.type" />
  </div>
</template>

<script lang="ts">
import NumberPads from '@/components/Money/NumberPads.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue'
import {Component} from "vue-property-decorator";

type Record = {
  tags?:string[];
  notes: string;
  type:string;
  amount:number
}

@Component({
  components: {Tags, Types, NumberPads},
})
export default class Money extends Vue{
  tags:string[] = ['衣','食','住','行','彩票']
  record:Record ={
    tags:[],notes:'',type:'-',amount:0
  }
  onUpdateTags(value:string[]){
    this.record.tags = value
  }
  onUpdateNotes(value:string){
    this.record.notes =value
  }
  onUpdateAmount(value:string){
    this.record.amount=parseFloat(value)
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