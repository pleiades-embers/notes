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
var divBy2=function(number){
    var stack=new Stack()
    var remainder   //余数

    var str=''

    while(number>0){
        remainder=number%2
        stack.push(remainder)
        number=Math.floor(number/2)
    }

    while(!stack.isEmpty()){
        str+=stack.pop()
    }

    return str
}

console.log(divBy2(20))