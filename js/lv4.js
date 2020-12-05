let recommend = document.getElementById("recommend");
let container = document.getElementById("container");
const urls = [];//保存图片的url
const names = [];//保存对图片的描述

function fetchs(options) {
    let defaults = {
        url: "",
        success: function () {
            console.log("ok");
        },
        error: function () {
            console.log("no");
        }
    }
    Object.assign(defaults, options);
    fetch(defaults.url)
        .then((res) => res.json())
        .then(data => {
            for (let i = 0; i < 10; i++) {
                urls.push(data.result[i].picUrl);
                names.push(data.result[i].name);
            }
            console.log("请求成功");
            defaults.success();
        })
        .catch(function (err) {
            console.log(`oh,you have a mistake:${err}`);
        });
}
function getPics() {
    fetchs({
        url: "http://musicapi.leanapp.cn/personalized",
        success: function () {
            let blocks = container.children;
            for (let i = 0; i < urls.length; i++) {
                blocks[i].children[0].setAttribute("src", `${urls[i]}`);
                blocks[i].children[1].innerHTML = names[i];
            }
            console.log("执行了");
            console.log("享受你的图片吧");
        }
    });
}
recommend.addEventListener("click", getPics, false);