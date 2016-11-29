const _getPropertyName = (function(){
	let _divStyle = document.createElement("div").style;

	return function(propertyNames){
		for(var i=0,l=propertyNames.length; i<l; i++){
			if(_divStyle[propertyNames[i]] != undefined){
				return propertyNames[i];
			}
		}
		return false;
	};
})();

const Utils = {
	TRANSFORM_NAME: _getPropertyName(["transform", "webkitTransform", "mozTransform"]),

	PERSPECTIVE_NAME: _getPropertyName(["perspective", "webkitPerspective"]),

	isBoolean(target){
		return Object.prototype.toString.call(target) === "[object Boolean]";
	},

	bind(ele, eventName, callback){
		if(!ele.addEventListener) return false;

		ele.addEventListener(eventName, callback);
	},

	getWindowSize(){
		return {
			width: document.documentElement.offsetWidth,
			height: document.documentElement.offsetHeight
		}
	}
};

export default Utils;