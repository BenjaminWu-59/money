<template>
    <Layout>
      <Types class="x" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{beautify(group.title)}}</h3>
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
import dayjs from 'dayjs';
import clone from '@/lib/clone';

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
    // type HashTableValue = { title: string, items:RecordItem[]}
    if (recordList.length === 0) {
      return [];
    }
    // const hashTable: {title: string,items:RecordItem[]}[];
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());//对recordList进行排序，不排序时间就会乱展示

    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        console.log(sum);
        console.log(item);
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  beautify(string:string){
     const day = dayjs(string)
     return day.format('YYYY年M月D日')
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