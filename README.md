# 3dHover

### Example

``` js
npm install
npm start
```

### Usage

``` html
<div class="test--wrapper">
  <div class="test--wrapper three--wrapper">
		<div class="test--item test__1 three--item" data-depth="100">Three Hover</div>
		<div class="test--item test__2 three--item" data-depth="150"></div>
	</div>
</div>
```

其中`three--wrapper`指代旋转的目标，而`three--item`指代子元素即需要做景深操作的元素，通过`data-depth` 指定景深。

``` js
new ThreeHover(document.querySelector(".test--wrapper"));
```

### ThreeHover

``` js
/* 
@constructor
@param {Element} ele
@param {Object} opt
@param {Number} opt.perspective 指定视距
@param {Array} opt.rangeX 旋转目标绕X轴旋转的区间
@param {Array} opt.rangeY 旋转目标绕Y轴旋转的区间
*/

new ThreeHover(ele[, opt]);

```
