import "./ThreeHover.less";

import Utils from "../Utils";

const TRANSFORM_NAME = Utils.TRANSFORM_NAME;
const PERSPECTIVE_NAME = Utils.PERSPECTIVE_NAME;

export default class ThreeHover{

	constructor(ele, opt){
		this.ele = ele;

		opt = opt || {};
		this.perspective = opt.perspective || 800;
		this.rangeX = opt.rangeX || [-15, 15];
		this.rangeY = opt.rangeY || [-15, 15];

		this.wrapper = this.ele.querySelector(".three--wrapper");
		this.ele.style[PERSPECTIVE_NAME] = this.perspective + "px";

		let winSize = Utils.getWindowSize();
		this.winWidth = winSize.width;
		this.winHeight = winSize.height;

		this.__initDepth();
		this.__bind();
	}

	__initDepth(){
		let items = this.wrapper.querySelectorAll(".three--item");

		for(let i=0,l=items.length; i<l; i++){
			let item = items[i];
			let depth = item.dataset.depth;
			item.style.transform = "translate3d(0, 0, -" + depth + "px)";
		}

	}

	__updateTransform(angleX, angleY){
		this.wrapper.style[TRANSFORM_NAME] = "rotateX(" + angleX + "deg) rotateY(" + angleY + "deg)"
	}

	__calculateAngle(winDelta, winPoint, angleRange){
		let deltaAngle = angleRange[1] - angleRange[0];
		let angle = angleRange[0] + deltaAngle * (winPoint / winDelta);

		return angle;
	}

	__bind(){
		Utils.bind(document, "mousemove", (e)=>{
			let angleY = this.__calculateAngle(this.winWidth, e.clientX, this.rangeX);
			let angleX = this.__calculateAngle(this.winHeight, e.clientY, this.rangeY);

			this.__updateTransform(angleX, angleY);
		})


		Utils.bind(window, "resize", (e)=>{
			let winSize = Utils.getWindowSize();
			this.winWidth = winSize.width;
			this.winHeight = winSize.height;
		})
	}
}
