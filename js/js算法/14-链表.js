// 链表就像一列火车每一列不仅携带自己的乘客(item)
// 还要与下一节火车相连(next)

class LikedList{
    constructor(){
        this.head=null
        this.length=0
    }
    //节点辅助构造函数
    Node=function(element){
        this.element=element
        this.next=null //链表指针
    }
    //向链表尾添加元素
    append(element){
        var node=new this.Node(element)
        if(this.head==null){  //如果链表头为空就初始化链表
            this.head=node
        }else{
            var current=this.head //当前
            while(current.next){
                current=current.next
            }
            current.next=node
        }
        this.length++
    }
    //链表中插入元素
    insert(position,element){  //传入插入的位置和元素
        //越界
        if(position > -1&& position<this.length){
            var node=new this.Node(element)
            if(position==0){ //如果下标为1 当前current 要插入的与元素插入到下一个next
                var current=this.head  
                this.head=node
                this.head.next=current
            }else{  //链表其他位置插入数据
                var index=0
                var current=this.head
                var previous=null  //上一个元素
                while(index<position){
                    previous=current
                    current=current.next
                    index++
                }

                // 插入链表 简历关联
                previous.next=node
                node.next=current

            }
       
            this.length++
        }
    }


    getHead(){
        return this.head
    }
}

let l =new LikedList()
l.append(1)
l.append(2)
l.append(3)
l.insert(1,10)
console.log(l.getHead())

