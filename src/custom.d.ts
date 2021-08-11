type RootState = {
    recordList:RecordItem[],
    tagList:Tag[],
    currentTag?:Tag
}

type RecordItem = {
    tags?:Tag[];
    notes: string;
    type:string;
    amount:number;
    createAt?: string //创建了一个类
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




