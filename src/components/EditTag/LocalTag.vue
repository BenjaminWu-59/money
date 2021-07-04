<template>
  <Layout>
    <div class="tags">
      <div class="tag">
        <span>111</span>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
export default {
  name: 'LocalTag'
};
</script>

<style lang="scss" scoped>
.tags {
  margin:10px;
  background: #dee9ef;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 20%) inset, 0 0.3em 0.3em rgb(0 0 0 / 12%);
  > .tag {
    min-height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>