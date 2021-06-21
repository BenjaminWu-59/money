<template>
  <div class="content">
    <NumberPads/>
    <Tags :dataSource="tags" />
    <Types/>
  </div>
</template>

<script>
import NumberPads from '@/components/Money/NumberPads.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';

export default {
  name: 'Money',
  components: {Tags, Types, NumberPads},
  data(){
    return{
       tags:['衣','食','住','行','彩票']
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  min-width: 100%;
}

</style>