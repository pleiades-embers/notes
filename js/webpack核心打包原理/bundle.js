const fs=require('fs')
const path=require('path')
const parser=require('@babel/parser')
const traverse=require('@babel/traverse').default    
const babel=require('@babel/core')
const getModuleInfo=(file)=>{
    const body=fs.readFileSync(file,'utf-8')
    const ast=parser.parse(body,{
        sourceType:'module'  //表示我们要解析的是es6 模块
    })
    
    const deps={}
    traverse(ast,{         //遍历ast 语法树 并拿到所有依赖的绝对路径
        ImportDeclaration({node}){
            const dirname=path.dirname(file)
            const abspath="./"+path.join(dirname,node.source.value)
            deps[node.source.value]=abspath
        }
    })

    const {code}=babel.transformFromAst(ast,null,{  //ES6 转ES5 的代码
        presets:["@babel/preset-env"]
    })

    const modelInfo={file,deps,code}
    return modelInfo
}


const parseModules =(file)=>{
    const depsGraph={}
    //获取入口文件信息
    const entry=getModuleInfo(file)
    const temp=[entry]  //转成数组
    for(let i=0;i<temp.length;i++){
        const deps=temp[i].deps
        if(deps){
            //遍历模块依赖 递归获取模块信息
            for(const key in deps){
                if(deps.hasOwnProperty(key)){  //判断有没有key值
                    temp.push(getModuleInfo(deps[key]))
                }
            }
        }
    }

    console.log(temp)

    // temp.forEach(modelInfo=>{
    //     depsGraph[modelInfo.file]={
    //         deps:modelInfo.deps,
    //         code:modelInfo.code
    //     }
    // })
    // console.log(depsGraph)
    // return depsGraph
}


parseModules('./index.js')