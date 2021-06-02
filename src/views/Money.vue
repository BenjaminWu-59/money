<template>
    <div class="content">
    <NumberPads/>
    <Types/>
    <Notes/>
    <Tags/>
      <div>返回</div>
    </div>
</template>

<script lang="ts">
import NumberPads from '@/components/Money/NumberPads.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
export default {
  name: 'Money',
  components: {Tags, Notes, Types, NumberPads},
};
</script>

<style lang="scss">
.content {
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
}
</style>