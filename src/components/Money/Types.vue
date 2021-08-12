<template>
  <div class="TYPE">
    <ul class="types">
      <li :class="value === '-' && 'selected'"
          @click="selectType('-')">支出
      </li>
      <li :class="value === '+' && 'selected'"
          @click="selectType('+')">收入
      </li>
      <div class="back">
        <router-link to="/account">取消</router-link>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop,} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop({default:'-'}) readonly value!:string
  selectType(type: string) {
    if(type !== '-' && type !== '+'){
      throw new Error('type is unknown')
    }
    this.$emit('update:value',type)
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #272a3b;
  position: relative;
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 1px 1px hsla(240, 0%, 100%, 0.1) inset,
  0 0 1em rgba(0, 0, 0, 0.2);

  > li {
    font-size: 19px;
    color: white;
    width: 17%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected {
      &::after {
        display: inline-block;
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 100%;
        height: 3px;
        background: #949596;
        transform: translate(-50%);
        animation:hide .25s ease-in
      }
      @keyframes hide{
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }
    }
  }
}

.back {
  position: absolute;
  right: 0;
  padding: 4px;
  color: white;
}
</style>
