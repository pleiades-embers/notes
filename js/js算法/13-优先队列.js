//优先队列
class Priority{
    constructor(items){
        this.items=[]
        this.added=false
    }
    //辅助类
    QueueItem=function(element,priority){   //class中构造函数写发
        this.element=element
        this.priority=priority
    }

    enqueue(element,priority){
        let queueItem=new this.QueueItem(element,priority)  //实例化类对象
        var added=false
        for(let i=0;i<this.items.length;i++){  //遍历数组
            if(queueItem.priority>this.items[i].priority){  //如果传入元素优先级大于此元素组
                this.items.splice(i,0,queueItem)

                added=true
                break
            }
        }
        if(!added){  //如果优先级最低就放到队列最后面
            this.items.push(queueItem)
        }
    }
    getItems(){
        return this.items
    }
}

var pq=new Priority()
pq.enqueue('aaa',10)
pq.enqueue('xxx',12)
pq.enqueue('bbb',9)
pq.enqueue('ccc',13)
console.log(pq.getItems())