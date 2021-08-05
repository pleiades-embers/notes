# mustache

## 将字符串转换为tokens

```javascript
import parseTemplateToTokens from './parseTemplateToTokens'

window.SSG_TemplateEngine={
    render(templateStr,data){
        var tokens=parseTemplateToTokens(templateStr)
    }
}
```

### 扫描器扫描字符串  (Scanner)

```javascript
export default class Scanner{
    constructor(templateStr){
        this.templateStr=templateStr
        this.pos=0
        this.tail=templateStr 
    }

    //功能弱,就是走过指定内容
    scan(tag){
        if(this.tail.indexOf(tag)===0){
            //tag有多长,比如{{长度是2,就让指针后移多少位
            this.pos+=tag.length
            this.tail=this.templateStr.substring(this.pos)
        }

    }

    //让指针进行扫描,直到遇见指定内容结束,并且能够返回结束之前路过的文字
    scanUtil(stopTag){
        //记录一下执行本方法的时候pos的值
        const pos_backup=this.pos

        while(this.tail.indexOf(stopTag)!==0&&!this.eos()){
            this.pos++
            //改变为尾巴开头不是stopTag的时候,就说明还没有扫描到stopTag
            this.tail=this.templateStr.substring(this.pos)
        }
        // debugger
        return this.templateStr.substring(pos_backup,this.pos)
    }

    //指针是否已经到头,返回布尔值
    eos(){
        return this.pos>=this.templateStr.length
    }
}
```



### 构建成tokens (nestTokens)

