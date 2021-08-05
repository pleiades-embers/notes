var Stack=function(){
    var items=[]        //私有
    this.push=function(element){
        items.push(element)
    }
    this.pop=function(){
        return items.pop()
    }
    //检查栈顶元素
    this.peek=function(){
        return items[items.length-1]
    }
    //检查栈是否为空
    this.isEmpty=function(){
        return items.length==0
    }
    //清除栈
    this.clear=function(){
         items=[]
    }
    this.size=function(){
        return items.length
    }

    this.getItems=function(){
        return items
    }

} 