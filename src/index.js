// 在开发模式下，更新html时需要自动刷新页面，所以需要将html引入作为依赖
!PRODUCTION && require("../index.html")
require("./index.less")

import Utils from "./Utils";
import ThreeHover from "./ThreeHover";

let div = document.querySelector(".test--wrapper");
let flag = false;

Utils.bind(document, "mousemove", function(){
	console.log("aa");
})

let threeHover = new ThreeHover(div, {
	invertX: true,
	origin: "50% 50% 100px"
});

threeHover.on();
threeHover.on();
threeHover.on();
threeHover.off();
threeHover.on();