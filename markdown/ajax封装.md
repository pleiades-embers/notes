## ajax封装

 

```javascript
var xhr=new XMLHttpRequest()
xhr.open('get','')  //第二个参数为api地址
xhr.send(null)
xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
        var data=xhr.responseText
    }
}
```

