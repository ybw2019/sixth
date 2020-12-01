const xhr = new XMLHttpRequest();
let recommend = document.getElementById("recommend");
let container = document.getElementById("container");
const urls = [];//保存图片的url
const names = [];//保存对图片的描述
let searchTarget = document.getElementById("searchText");
let searchBtn = document.getElementById("btnSearch");
const xhr2 = new XMLHttpRequest();
let albumNames = [];//专辑名
let artistNames = [];//歌手名
const initialize = ["编号", "音乐标题", "歌手", "专辑"];
let searchList = document.getElementById("searchList");


xhr.open("get", "http://musicapi.leanapp.cn/personalized", true);
xhr.onreadystatechange = () => {
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
        }
        else {
            console.log("请求失败");
        }
    }
};
xhr.send();
function getRecommend() {
    //设置图片的url和描述
    let blocks = container.children;
    for (let i = 0; i < urls.length; i++) {
        blocks[i].children[0].setAttribute("src", `${urls[i]}`);
        blocks[i].children[1].innerHTML = names[i];
    }
    console.log("执行了");
}
function prepareGet() {
    let text = searchTarget.value;
    xhr2.open("get", `http://musicapi.leanapp.cn/search?keywords=${text}`, true);
    xhr2.onreadystatechange = () => {
        //从第二次发送请求时开始将上一次请求的数据进行删除
        if (albumNames.length != 0 || artistNames.length != 0) {
            albumNames = [];
            artistNames = [];
            console.log(artistNames);
        }
        //发送请求并以此初始化数组
        if (xhr2.readyState === 4) {
            if ((xhr2.status >= 200 && xhr2.status <= 300) || xhr2.status == 304) {
                //获取歌曲的歌手和专辑名称
                const res2 = JSON.parse(xhr2.responseText);
                for (let i = 0; i < 10; i++) {
                    albumNames.push(res2.result.songs[i].album.name);
                    artistNames.push(res2.result.songs[i].artists[0].name);
                }
                console.log("请求成功");
                getSearchList();
            }
            else {
                console.log("请求失败");
            }
        }
    }
    xhr2.send();
}
function getSearchList() {
    let text = searchTarget.value;
    for (let i = 0; i < albumNames.length + 1; i++) {
        if (i == 0) {
            for (let j = 0, len = searchList.children[i].children.length; j < len; j++) {
                searchList.children[i].children[j].innerHTML = initialize[j];
            }
        }
        else {
            if (i < 10) {
                searchList.children[i].children[0].innerHTML = `0${i}`;
            }
            else {
                searchList.children[i].children[0].innerHTML = `${i}`;
            }
            if (i > 0) {
                searchList.children[i].children[1].innerHTML = `${text}`;
                searchList.children[i].children[2].innerHTML = `${artistNames[i - 1]}`;
                searchList.children[i].children[3].innerHTML = `${albumNames[i - 1]}`;
            }
        }
    }
}

recommend.addEventListener("click", getRecommend, false);
searchBtn.addEventListener("click", prepareGet, false);