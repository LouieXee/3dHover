// 在开发模式下，更新html时需要自动刷新页面，所以需要将html引入作为依赖
!PRODUCTION && require("../index.html")
require("./index.less")

import ThreeHover from "./ThreeHover";

let div = document.querySelector(".test--wrapper");

let threeHover = new ThreeHover(div);