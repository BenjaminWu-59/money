import recordListModel from '@/models/recordListModel';

const localStorageKeyName = 'recordList';

export default {
    //record store
    recordList:recordListModel.fetch(),
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList;
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    createRecord:(record:RecordItem)=> recordListModel.create(record),
}