type RecordItem = {
    tags?:string[];
    notes: string;
    type:string;
    amount:number;
    createAt?: Date //创建了一个类
}

type Tag = {
    id:string;
    name:string;
}//给tag标签赋予id，方便后面调用

type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated' //联合类型
    update:(id:string,name:string) => 'success' | 'not found' | 'duplicated'
    remove:(id:string) => boolean
    save: () => void
}



interface Window {
    tagList: Tag[]
    createTag: (name: string) => void
    findTag:(id:string) => Tag
    removeTag: (id: string) => boolean
    updateTag: TagListModel['update']
    recordList:RecordItem[]
    createRecord:(record:RecordItem)=> void
}
