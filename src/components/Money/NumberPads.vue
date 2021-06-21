<template>
  <div class="numberPad">
    <div class="output">
      <div class="note" >
        <span @click="open"><Icon name="notes"/></span>
        <Dialog :isShow="show" :fn="hideModal" :fn2="submit" @transferNote="getNote">
          备注
          </Dialog>
      </div>
      {{ output }}
    </div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">C</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Watch} from 'vue-property-decorator';

@Component
export default class NumberPads extends Vue {
  output = '0';
  show = false;
  noteContent='';
  @Watch('noteContent')
  onValueChanged(value:string){
    this.$emit('update:note',value)
  }
  open(){
    this.show = true
    this.noteContent=''
  }
  hideModal(){
    this.show = false
  }
  getNote(value:string){
    this.noteContent = value
  }
  submit(){
    if(this.noteContent ===''){
      window.alert('备注不能为空')
    }else{
      console.log(this.noteContent)
      this.show=false
    }
  }

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok(){
     this.$emit('update:value',this.output)
  }

}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";

.numberPad {
  .output {
    @extend %clearFix;
    font-size: 28px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    border: 0.5px solid #cacaca;
    background: #e3e3e3;
    height: 62px;
    position:relative;
   .note {
    position:absolute;
   }
  }

  .buttons {
    @extend %clearFix;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(4, 56px);
    background: #f0eff4;
    padding: 6px 10px;

    > button {
      font-size: 22px;
      background: #f3f3f3;
      margin: 3px;
      border: 1px solid #cacaca;
      border-radius: 4px;

      &.ok {
        grid-row-start: 3;
        grid-row-end: 5;
        grid-column-start: 4;
        grid-column-end: 5;
        background: #1671ce;
        color: #fff;
      }

      &.zero {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }
    > button:active{
      font-size: 22px;
      background: #d4d6d6;
      opacity: 0.5;
      margin: 3px;
      border: 1px solid #4e4d4d;
      border-radius: 4px;
    }
  }
}
</style>