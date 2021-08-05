# vue2 的 响应式

```javascript
class Emvue {
    constructor(options){
        //保存选项
        this.$options=options

        //传入data选项
        this.$data=options.data

        //响应化
        this.observe(this.$data)
    }

    observe(value){
        //如果 值为空 或者不是对象  

        if(!value||typeof value!=='object'){
            return
        }
        //遍历数据响应式
        Object.keys(value).forEach(key=>{
            this.defineReactive(value,key,value[key])

            //代理转发  简化使用调用的$data 对象
            this.proxyData(key)
        })
    }


    defineReactive(obj,key,val){
        //递归遍历 
        this.observe(val)

        Object.defineProperty(obj,key,{
            get(){
                return val
            },
            set(NewVal){
                if(NewVal!==val){
                    val=NewVal
                    console.log(key+'属性更新了')
                }
            }
        })
    }

    proxyData(key){      //代理转发
        Object.defineProperty(this,key,{
            get(){
                return this.$data[key]
            },
            set(NewVal){
                this.$data[key]=NewVal
            }
        })
    }

}
```

