import "./ThreeHover.less";

import Utils from "../Utils";

const TRANSFORM_NAME = Utils.TRANSFORM_NAME;
const PERSPECTIVE_NAME = Utils.PERSPECTIVE_NAME;
const ORIGIN_NAME = Utils.ORIGIN_NAME;

export default class ThreeHover{

	constructor(ele, opt){
		this.ele = ele;

		opt = opt || {};
		this.perspective = opt.perspective || 800;
		this.rangeX = opt.rangeX || [-15, 15];
		this.rangeY = opt.rangeY || [-15, 15];
		this.invertX = (Utils.isBoolean(opt.invertX) ? opt.invertX : false) ? -1 : 1;
		this.invertY = (Utils.isBoolean(opt.invertY) ? opt.invertY : false) ? -1 : 1;

		this.wrapper = this.ele.querySelector(".three--wrapper");
		this.__bindFlag = false;
		this.__off = null;

		let winSize = Utils.getWindowSize();
		this.winWidth = winSize.width;
		this.winHeight = winSize.height;

		if(opt.origin){
			this.wrapper.style[ORIGIN_NAME] = opt.origin;
		}
		this.ele.style[PERSPECTIVE_NAME] = this.perspective + "px";

		this.__initDepth();
		this.__bind();
	}

	on(){
		if(this.__bindFlag) return false;

		console.log("on")
		this.__bind();
	}

	off(){
		if(!this.__bindFlag) return false;

		Utils.isFunction(this.__off) && this.__off() && (this.__off = null);
	}

	__initDepth(){
		let items = this.wrapper.querySelectorAll(".three--item");

		for(let i=0,l=items.length; i<l; i++){
			let item = items[i];
			let depth = item.dataset && item.dataset.depth;
			item.style.transform = "translate3d(0, 0, " + -1 * depth + "px)";
		}

	}

	__updateTransform(angleX, angleY){
		this.wrapper.style[TRANSFORM_NAME] = "rotateX(" + (this.invertY * angleX) + "deg) rotateY(" + (this.invertX * angleY) + "deg)"
	}

	__calculateAngle(winDelta, winPoint, angleRange){
		let deltaAngle = angleRange[1] - angleRange[0];
		let angle = angleRange[0] + deltaAngle * (winPoint / winDelta);

		return angle;
	}

	__bind(){
		const __mousemove = (e)=>{
			let angleY = this.__calculateAngle(this.winWidth, e.clientX, this.rangeX);
			let angleX = this.__calculateAngle(this.winHeight, e.clientY, this.rangeY);

			this.__updateTransform(angleX, angleY);
		};
		const __resize = (e)=>{
			let winSize = Utils.getWindowSize();
			this.winWidth = winSize.width;
			this.winHeight = winSize.height;
		};

		Utils.bind(document, "mousemove", __mousemove);
		Utils.bind(window, "resize", __resize);
		this.__bindFlag = true;

		this.__off = ()=>{
			Utils.off(document, "mousemove", __mousemove);
			Utils.off(window, "resize", __resize);
			this.__bindFlag = false;

			return true;
		};
	}
}
