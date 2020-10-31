one.onclick = () => {
    // AJAX
    const request = new XMLHttpRequest()
    request.open('get', 'style.css')
    request.onload = () => {
        let style = document.createElement('style')
        console.log(request.response);
        style.innerHTML = request.response  /* request.response 获取的就是 style.css里面的内容 */
        document.head.appendChild(style)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()
}


getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('get', 'style.css')
    request.onreadystatechange = () => {
        console.log(request.readyState); /* readyState = 1 */
        /* 下载完成，但不知道成功 2xx 还是失败 4xx 5xx */
        if(request.readyState===4){
            // console.log("下载完成");
            console.log(request.status);
            if(request.status>=200 && request.status <300){
                /* 创建style 标签 */
                let style = document.createElement('style')
                /* 填写 style 内容 */
                style.innerHTML = request.response
                /* 插到头里面 */
                document.head.appendChild(style)
            }else {
                alert('加载CSS失败')
            }
        }
    }
    request.send()  /* readyState = 2 */
}

// alert('我执行了')

getJs.onclick=()=>{
    const request =new XMLHttpRequest()
    request.open('GET','/2.js')
    request.onload=()=>{
        // console.log(request.response);
        /* 创建一个script 标签 */
        const script  = document.createElement('script')
        /* 填写script内容 */
        script.innerHTML=request.response
        /* 插到身体里 */
        document.head.appendChild(script)
    }
    request.onerror=()=>{}
    request.send()
}

getHTML.onclick=()=>{
    const request =new XMLHttpRequest()
    request.open('GET','3.html')
    request.onload=()=>{
        const div = document.createElement('div')
        div.innerHTML=request.response
        document.body.appendChild(div)
    }
    request.onerror=()=>{}
    request.send()
}

getXML.onclick=()=>{
    const request= new XMLHttpRequest()
    request.open('GET','4.xml')
    request.onreadystatechange=()=>{
        if(request.readyState===4&&request.status>=200&&request.status<300){
            // console.log(request.responseXML);
            const dom = request.responseXML
           const text=  dom.getElementsByTagName('warning')[0].textContent
           console.log(text.trim());
        }
    };
    request.send()
};







getJSON.onclick=()=>{
    const request =new XMLHttpRequest()
    request.open("GET","5.json")
    request.onreadystatechange=()=>{
        if(request.readyState===4&&request.status>=200&&request.status<300){
            // console.log(typeof request.response);
            // console.log(request.response);
            const boolean = JSON.parse(request.response)  // JSON.parse可以把符合json语法的字符串变成对应的对象或者是其他东西，不一定是对象
            // console.log(typeof boolean);
            // console.log(boolean);
            // myName.textContent=object.name
            console.log(request.response);
        }
    };
    request.send()
    console.log(request.response);
   

}




let n =1;
getPage.onclick=()=>{
    const request =new XMLHttpRequest()
    request.open('GET',`/page${n+1}.json`)
    request.onreadystatechange=()=>{
        if(request.readyState===4&&request.status>=200&&request.status<300){
            // console.log(request.response);
            const array = JSON.parse(request.response) //转换成JSON数组
            array.forEach(item=>{
                const li = document.createElement('li')
                li.textContent=item.id
                xxx.appendChild(li)
            });
            n += 1;
        }
    }
    request.send()
}


/* ----------------------------------- */

ajax=(method,url,options)=>{
    const {success,fail}=options // 析构赋值
    const success = options.success
    const fail =options.fail
    const request= new XMLHttpRequest()
    request.open(method,url)
    request.onreadystatechange=()=>{
        if(request.readyState===4){
            /* 成功就调用 success ，失败就调用 fail */
            if(request.status<400){
                success.call(null,request.response)
            }else if(request.status>=400){
                fail.call(null,request,request.status)
            }
        }
    }
    request.send()
}

ajax('get','/xxx',{
    success(response){},fail:(request,status)=>{}
})//左边是function 缩写，右边是箭头函数

/* ------------------------- */

ajax=(method,url,options)=>{
    return new Promise((resolve,reject)=>{
      const {success,fail}=options // 析构赋值
         const request= new XMLHttpRequest()
         request.open(method,url)
         request.onreadystatechange=()=>{
         if(request.readyState===4){
             /* 成功就调用 success ，失败就调用 fail */
             if(request.status<400){
                 resolve.call(null,request.response)
             }else if(request.status>=400){
                 reject.call(null,request,request.status)
             }
         }
     }
     request.send()
 })
 }

 ajax('get','/xxx')
    .then((response)=>{},(request)=>{})

/* ------------------------------ */


