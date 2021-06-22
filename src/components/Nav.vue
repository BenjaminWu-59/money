<template>
  <nav>
    <router-link to="/account" class="item" active-class="selected">
      <Icon name="write"/>
      记账
    </router-link>
    <router-link to="/Detail" class="item" active-class="selected">
      <Icon name="account"/>
      明细
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="Statistics"/>
      图表
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  font-size: 12px;
  background: white;
  min-width: 100vw;
  > .item {
    flex: 1;
    padding: 2px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected{
    color: #6b8fac;
  }
}

</style>