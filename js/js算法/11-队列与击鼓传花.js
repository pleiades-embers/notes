class Queue {

    constructor(){
        this.items=[]
    }
    //入队
    enqueue(element){
        return this.items.push(element)
    }
    //出队
    dequeue(){
        return this.items.shift()
    }
    //查看队列头
    front(){
        return this.items[0]
    }
    //检查队列是否为空
    isEmpty(){
        return this.items.length==0
    }
    //队列大小
    size(){
        return this.items.length
    }
}

// name:击鼓玩家  num: 第几人淘汰
function chuanhua(names,num=3){
    var q=new Queue()  //实例化队列
    //入队列
    for(let i=0;i<names.length;i++){
        q.enqueue(names[i])
    }
    var taotai
    while(q.size()>1){  
        for(let i=0;i<2;i++){
            q.enqueue(q.dequeue())
        }
        taotai=q.dequeue()
        console.log('淘汰的人'+taotai)
    }
    return q.dequeue()
}


var names=['a','b','c','d','e','f','G'] 
console.log(chuanhua(names))  //打印结果


