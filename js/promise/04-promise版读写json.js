const fs=require('fs')

function readFile(path,prevData){
    return new Promise((reslove,reject)=>{
        fs.readFile(path,'utf8',function(err,data){
            if(err){
                reject(err)
            }

            const resData=JSON.parse(data)
            reslove({
                prevData,
                resData
            })
        })
    })
}

let uid=1

readFile('./json/user.json')
    .then((res)=>{
        const {resData}=res,
        userInfo=resData.filter(item=>item.id===uid)
        return readFile('./json/userCourse.json',userInfo)
    })
    .then((res)=>{
        const {prevData,resData}=res,
        userId=prevData[0].id
        userCourse=resData.filter(item=>item.uid==userId)
        return readFile('./json/course.json',{
            username:prevData[0].username,
            userCourse
        })
    })
    .then((res)=>{
        const {prevData,resData}=res
        userCourses=prevData.userCourse[0].courses
        let _arr=[]
        userCourses.map(id=>{
            resData.map(item=>{
                if(item.id===id){
                    _arr.push(item)
                } 
            })
        })

        const userCourseInfo={
            username:prevData.username,
            courses:_arr
        }
        fs.writeFileSync(`./json/${prevData.username}.json`,JSON.stringify(userCourseInfo))
    }).catch((err)=>{
        console.log(err)
    })
