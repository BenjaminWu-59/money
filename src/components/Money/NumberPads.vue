<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>C</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NumberPads'
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";

.numberPad {
  .output {
    @extend %clearFix;

    font-size: 30px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    border: 0.5px solid #cacaca;
    background: #e3e3e3;
  }
  .buttons {
    @extend %clearFix;
    display: grid;
    grid-template-columns: repeat(4,25%);
    grid-template-rows: repeat(4,56px);
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
        color:#fff;
      }
      &.zero {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }
  }
}
</style>