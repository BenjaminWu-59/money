<template>
    <Layout>
      <Types class="x" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{group.title}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record"
            >
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}} </span>
            </li>
          </ol>
        </li>
      </ol>
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
  tagString(tags: Tag[]) {
  return tags.length === 0 ? '无' : tags[0].name;
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    const {recordList} = this;
    type HashTableValue = { title: string, items:RecordItem[]}

    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createAt!.split('T');
      console.log(time);
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }
  beforeCreate() {
    this.$store.commit('fetchRecords');
  }


  type = '-'
  interval = 'day';
  intervalList = intervalList
}
</script>

<style lang="scss" scoped>
::v-deep .back {
  display: none;
}
::v-deep .interval-tabs-item{
  height: 48px;
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>