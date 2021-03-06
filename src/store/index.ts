import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';
import defaultTagList from '@/constants/defaultTagList';

Vue.use(Vuex) //把 store 绑到Vue.prototype


const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError:null,
    createTagError:null,
    tagList:[],
    currentTag: undefined //用于新增页面的tag
  }as RootState,
  mutations:{
    setCurrentTag(state,id:string){
      state.currentTag = state.tagList.filter(t => t.id === id)[0]
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      console.log({id,name});
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
         window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      console.log(state.tagList);
    },
    createRecord(state, record:RecordItem) {
      const record2 = clone(record);
      record2.createAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
          JSON.stringify(state.recordList));
    },

    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(state.tagList.length === 0) {
        store.commit('setDefault')}
      },//我是个傻逼，之前还放错地方

    setDefault(){
      for(let i =0; i <defaultTagList.length; i++){
        store.commit('createTag',defaultTagList[i])
      }
    },

    createTag(state, newTag:Tag) {
      // state.createTagError = null;
      // const names = state.tagList.map(item => item.name);
      // if (names.indexOf(newTag.name) >= 0) {
      //   state.createTagError = new Error('tag name duplicated')
      //   return
      // }
      const id = createId().toString();
      state.tagList.push({id, name:newTag.name,type:newTag.type,svg:newTag.svg});
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  }
})
export default store