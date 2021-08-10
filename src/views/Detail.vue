<template>
    <Layout>
      <Types class="x" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <div>
        type: {{type}}
        <br/>
        interval: {{interval}}
      </div>
    </Layout>
</template>

<script lang="ts">
import Types from '@/components/Money/Types.vue';
import Tabs from '@/components/Tabs.vue'
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import intervalList from '@/constants/intervalList';

@Component({
  components: {Types,Tabs}
})
export default class Detail extends Vue {
   type = '-'
  interval = 'day';
  intervalList = intervalList
}
</script>

<style lang="scss" scoped>
.x{
  &::v-deep .back{
    display: none;
  }
}
</style>