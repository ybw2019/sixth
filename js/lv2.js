let recommend = document.getElementById("recommend");
let container = document.getElementById("container");
const urls = [];//保存图片的url
const names = [];//保存对图片的描述

//ajax封装函数
function ajax(options) {
    let defaults = {
        type: "get",
        url: "",
        data: {},//用户传入的关键字
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function () {
            console.log("you are right :(");
        },
        error: function () {
            console.log("Ohoh,there is something wrong with your code XD");
        }
    };
    Object.assign(defaults, options);//用options将defaults覆盖
    let xhr = new XMLHttpRequest();
    //onreadyState
    xhr.onreadystatechange = () => {
        console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
                const res = JSON.parse(xhr.responseText);
                //获取图片的url和描述
                for (let i = 0; i < 10; i++) {
                    urls.push(res.result[i].picUrl);
                    names.push(res.result[i].name);
                }
                //请求结果状态提示
                console.log("请求成功");
                //调用成功函数
                defaults.success();
            }
            else {
                console.log("请求失败");
            }
        }
    }
    //储存自定义关键字
    let params = "";
    for (let key in defaults.data) {
        params += key + "=" + defaults.data[key] + "&";
    }
    params = params.substr(0, params.length - 1);
    if (defaults.type == "get") {
        if (Object.keys(defaults.data).length == 0) {
            params = params;
        }
        else {
            defaults.url += "?" + params;
        }
    }
    xhr.open(defaults.type, defaults.url, true);
    if (defaults.type == "post") {
        let ContentType = defaults.header["Content-Type"];
        xhr.setRequestHeader("Content-Type", ContentType);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log("数据接收完成");
                defaults.success();
            }
            else {
                console.log("数据接收失败");
            }
        };
        xhr.send(params);
    }
    else {
        xhr.onreadystatechange();
        xhr.send();
    }
}
//自定义成功函数
function getRecommend() {
    //设置图片的url和描述
    let blocks = container.children;
    for (let i = 0; i < urls.length; i++) {
        blocks[i].children[0].setAttribute("src", `${urls[i]}`);
        blocks[i].children[1].innerHTML = names[i];
    }
    console.log("执行了");
    console.log("享受你的图片吧");
}
//用户使用参数调用封装的ajax
function prepare() {
    ajax({
        type: "get",
        url: "http://musicapi.leanapp.cn/personalized",
        success: function () {
            getRecommend();
        }
    });
}
//绑定监听事件
recommend.addEventListener("click", prepare, false);
