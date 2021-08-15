<template>
    <Layout>
      <Types class="x" :value.sync="type"/>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">
            {{beautify(group.title)}}
            <span>￥{{group.total}}</span>
          </h3>
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
      <div class="displayNone" v-if="recordList.length === 0">
        <Icon name="空"/>
        <span>空空如也~</span>
      </div>
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

    const newList = clone(recordList)//分类->排序->按日期集合
        .filter(r => r.type === this.type)//将收入支出数据分类
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());//对recordList进行排序，不排序时间就会乱展示

    if(newList.length === 0) return [] //里面是空的时候，会导致result无法出现。渲染就出问题。
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) { //按照日期title集合数据
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
  background: #b4b8bc;
  @extend %item;
  >span{
    font-size: 17px;
    margin-right: -2px;
  }
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

.displayNone{
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:10px;
  >svg{
    width:150px;
    height: 150px;
  }
  >span{
    margin-top: 5px;
    color: #a2a2a2;
  }
}
</style>