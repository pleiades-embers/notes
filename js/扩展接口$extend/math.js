let sb = {
    extends(obj, target ) {
        target=target||this
        Object.keys(obj).forEach(key => {
            target[key] = obj[key]
        })
    },
    getLocationArgs() {
        let str = location.search.replace('?', '')
        return this.convertStr2Obj(str)
    },
    convertStr2Obj(str) {
        let obj = {}
        str.splist('&').forEach(item => {
            let kv = item.split('=')
            obj[kv[0]] = decodeURI(kv[1])
        })
        return obj
    },
    getUrlParam(key) {
        let url = window.location.search;
        let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        let result = url.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    /**
     *  TODO: 返回一段随机颜色字符串
     *  ? 无需传递任何参数
     */
    rndColor(){
        let str='0123456789ABCDEF'
        let color=['#']
        for(let i=0;i<6;i++){
            color.push(str[Math.rnd(str.length-1)])
        }
        return color.join('')
    },
    caoitalize(str){
        return str[0].toUpperCase()+str.substr(1)
    }

    
}


//扩展 可以指定挂载到那里
sb.extends({
    rnd(max, min = 0) {
        return Math.round(Math.random() * (max - min))+min
    },
    isOdd(val) {
        return val % 2 == 0
    },
    isEven(val) {
        return val % 2 == 0
    }
}, Math)



sb.extends({
    cssCamelCase( string ) {
        return  string.replace( /^-ms-/, "ms-" ) ;
    }
})