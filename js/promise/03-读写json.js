const fs=require('fs')

let uid=1

fs.readFile('./json/user.json','utf8',function(err,data){
    const userData=JSON.parse(data),
          userInfo=userData.filter(item=>item.id==uid)[0]
          console.log(userInfo)
    fs.readFile('./json/userCourse.json','utf8',function(err,data){
        const userCourseData=JSON.parse(data),
            userId=userInfo.id,
            //取出 userCourse uid 与 userId 相符的一条 数据
            userCourse=userCourseData.filter(item=>item.uid==userId)[0] 
            fs.readFile('./json/course.json','utf8',function(err,data){
                const courseData=JSON.parse(data),
                userCourses=userCourse.courses
                
                let _arr=[]
                userCourses.map(id=>{
                    courseData.map((item)=>{
                        if(item.id==id){
                            _arr.push(item)
                        }
                    })
                })
                
                //json 数据整合
                const userCourseInfo={
                    username:userInfo.username,
                    courses:_arr
                }
                //写入
                fs.writeFileSync(`./json/${userInfo.username}.json`,JSON.stringify(userCourseInfo))

            })
    })
})      