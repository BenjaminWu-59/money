type RootState = {
    recordList:RecordItem[],
    tagList:Tag[],
    currentTag?:Tag,
    createRecordError:Error | null,
    createTagError:Error | null,
}

type RecordItem = {
    tags?:Tag[];
    notes: string;
    type:string;
    amount:number;
    createAt?: string //创建了一个类
}

type Tag = {
    id?:string;
    name:string;
    svg:string;
    type:moneyType
}//给tag标签赋予id，方便后面调用

type moneyType = '+'|'-'

type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated' //联合类型
    update:(id:string,name:string) => 'success' | 'not found' | 'duplicated'
    remove:(id:string) => boolean
    save: () => void
}




