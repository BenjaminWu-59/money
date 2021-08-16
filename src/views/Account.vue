<template>
  <Layout class="Layout">
    <div class="header">
      <img src="../assets/picture/rain4.jpeg" alt="图片不见了">
      <div class="link1">雨点记账</div>
      <div class="Button"></div>
      <div id="wave" @click="onClick">
        <transition name="bounce">
          <div class="A" v-if="show">
            <Icon class="aaa" name="pocket"/>
          </div>
        </transition>
      </div>
    </div>

    <div class="timeLine">
      <ol class="main">
        <li v-for="(group,index) in result" :key="index">
          <div class="title">
            <span class="title-date">{{ beautify(group.title) }}</span>
            <div class="title-dot">
              <div class="title-line"/>
              <div class="dot"/>
            </div>
            <span class="title-account">{{ group.total }}元</span>
          </div>
          <ol class="content">
            <li v-for="item in group.items" :key="item.id"
                class="record"
            >
              <div class="content-line"/>
              <div class="content-icon" :class="{changeColor:typeString(item.tags)=== '-'}">
                <Icon :name="svgString(item.tags)"/>
              </div>
              <div class="message">
                <span class="name"><strong>{{ tagString(item.tags) }}</strong></span>
                <span class="amount">{{ item.amount }}元 </span>
              </div>
              <div class="time">{{ hour(item.createAt) }}</div>
            </li>
          </ol>
        </li>
      </ol>
    </div>


    <div class="before-timeLine" v-if="recordList.length <= 0">
      <div class="tree">
        <Icon name="树林"/>
      </div>
      <span>记一笔，会出现时间树哟~</span>

    </div>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import clone from '@/lib/clone';
import dayjs from 'dayjs';
import Types from '@/components/Money/Types.vue';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';


@Component({
  components: {Types, Tabs}
})
export default class Account extends Vue {
  template!: '#wave';
  show = true;

  onClick() {
    this.show = !this.show;
    setTimeout(() => {
      this.show = !this.show;
    }, 100); //再跳回来，状态转换true->false->true，等于点两次
    setTimeout(() => {
      this.$router.replace('/money');
    }, 400);
  }


  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags[0].name;
  }

  svgString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags[0].svg;
  }

  typeString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags[0].type;
  }

  timeString(tags: RecordItem[]) {
    console.log(tags);
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
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());//对recordList进行排序，不排序时间就会乱展示

    if (newList.length === 0) return []; //里面是空的时候，会导致result无法出现。渲染就出问题。
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD HH:mm'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) { //按照日期title集合数据
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD HH:mm'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    console.log(result[0].items);
    return result;
  }


  beautify(string: string) {
    const day = dayjs(string);
    return day.format('M月D日');
  }

  hour(string: string) {
    const day = dayjs(string);
    return day.format('HH:mm');
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  intervalList = intervalList;
}
</script>

<style lang="scss" scoped>
.Layout {
  position: relative;
}

.header {
  width: 100%;
  height: 20vh;
  position: relative;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.Button {
  background: white;
  border: 1px solid white;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: -50px;
}

#wave {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -35px;
  width: 70px;
  height: 70px;
  border-radius: 50%;

  .A {
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    box-shadow: 1px 1px 1px 1px hsla(240, 0%, 100%, 0.1) inset,
    0 0 1em rgba(0, 0, 0, 0.3);
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 50%;

  }

  .bounce-enter-active {
    animation: ease-out .3s;
  }

  .bounce-leave-active {
    animation: ease-out .3s reverse;
  }

  @keyframes ease-out {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .aaa {
    width: 30px;
    height: 20px;
  }
}

.link1 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  width: 65px;
  height: 30px;
  left: 49.5%;
  top: 15%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  font-size: x-small;
  background: transparent;
  box-shadow: 0 0 0 1px hsla(240, 0%, 100%, .3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.35);
}

.timeLine {
  height: 63vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  overflow: auto;

  > .main {
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      width: 80vw;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        color: #969696;
        font-size: 12px;
        font-family: sans-serif;
        white-space: nowrap;
      }

      > .title-dot {
        flex: 1;
        height: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        > .title-line {
          position: absolute;
          border: 0.8px solid #c4c4c4;
          width: 0;
          height: 30px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b3b1b1;
        }
      }
    }

    .content {
      flex-direction: row;
      height: 100%;
      overflow: hidden;

      > li {
        width: 80vw;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        position: relative;

        .content-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          background: #79e56c;
          box-shadow: 0 0 0 0 rgb(255 255 255 / 30%) inset, 0 0.3em 1em rgb(0 0 0 / 24%);

          &.changeColor {
            background: #9abcd2;
            box-shadow: 0 0 0 0 rgb(255 255 255 / 30%) inset, 0 0.3em 1em rgb(0 0 0 / 24%);
          }
        }

        .content-line {
          position: absolute;
          border: 0.8px solid #c4c4c4;
          width: 0;
          height: 50px;
          left: 50%;
          top: 2%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }


        .message {
          position: absolute;
          left: 80%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;

          > span {
            white-space: nowrap;
            font-size: 11px;
            font-family: sans-serif;
            font-weight: normal;
            color: #929292;
            display: flex;
            justify-content: center;
            align-items: center;

            &.amount {
              color: #474747;
              font-size: 8px;
            }
          }
        }

        .time {
          position: absolute;
          left: 20%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #949696;
          font-family: sans-serif;
          font-size: 10px;
        }
      }
    }
  }
}

.before-timeLine {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 30vh;
  position: absolute;
  z-index: 10;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items:center;

  .tree{
    >svg{
      width: 50px;
      height: 50px;
    }
  }
  >span{
    margin-top: 10px;
    font-family: sans-serif;
    font-size: 13px;
    color: #666666;
  }
}
</style>