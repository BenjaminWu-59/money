<template>
    <div class="content">
    <NumberPads/>
    <Types/>
    <Notes/>
    <Tags/>
      <div class="BACK">
        <router-link to="/account">取消</router-link>
      </div>
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

<style lang="scss" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  min-width: 100%;
}
.BACK{
  background: #02282b;
  color: #e5e3e3;
  height: 35px;
  padding-right: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 1px 1px 1px 1px hsla(240, 0%, 100%, 0.1) inset,
  0 0 1em rgba(0, 0, 0, 0.4);
}
</style>