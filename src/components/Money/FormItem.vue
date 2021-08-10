<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="this.placeholder">
      <button @click="changeTagMessage">修改</button>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;
  message!:string
  onValueChanged(value: string) {
    this.message = value
  }
  changeTagMessage(){
    this.$emit('update:value', this.message);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  position: relative;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    position: relative;
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
button{
  border:1px solid #d9d8d8;
  border-radius: 4px;
  padding: 1px 4px;
  position: absolute;
  right: 5px;
}
</style>