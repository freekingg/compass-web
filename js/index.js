var alpha = ""
var ua = navigator.userAgent.toLowerCase();

var compass = document.getElementById("compass")
var deg_img = document.querySelector('.deg-img')

var pan = document.querySelector('.main-pan')

if (/android/.test(ua)) {
	window.addEventListener('deviceorientationabsolute', DeviceOrientationHandlerCompass, false);
	window.addEventListener('deviceorientationabsolute', DeviceOrientationHandlerDeg_img, false);

	function DeviceOrientationHandlerCompass(event) {
		console.log(event);
		// document.getElementById("alpha").innerHTML = Math.round(360 - event.alpha);
		compass.style.transform = 'rotate(-' + Math.round(360 - event.alpha) + 'deg)'
	}

	function DeviceOrientationHandlerDeg_img(event) {
		// document.getElementById("alpha").innerHTML = Math.round(360 - event.alpha);
		deg_img.style.transform = 'rotate(-' + Math.round(360 - event.alpha) + 'deg)'

	}

} else {
	window.addEventListener('deviceorientation', function() {
		DeviceOrientationHandlerCompass(event)
		DeviceOrientationHandlerDeg_img(event)
	}, false);

	function DeviceOrientationHandlerCompass(event) {
		// document.getElementById("alpha").innerHTML = Math.round(360 - event.alpha);
		compass.style.transform = 'rotate(-' + event.webkitCompassHeading + 'deg)'
	}

	function DeviceOrientationHandlerDeg_img(event) {
		// document.getElementById("alpha").innerHTML = Math.round(360 - event.alpha);
		deg_img.style.transform = 'rotate(-' + event.webkitCompassHeading + 'deg)'

	}
}

// 手动
var manual = document.getElementById("manual")
var isManual = false
manual.addEventListener('touchstart', () => {
	// 取消罗盘监听事件
	if (isManual) {
		window.addEventListener('deviceorientationabsolute', DeviceOrientationHandlerCompass, false);
		console.log('add');
	} else {
		window.removeEventListener('deviceorientationabsolute', DeviceOrientationHandlerCompass, false)
	}
	isManual = !isManual

	console.log('isManual', isManual)
})

// 监听手动转盘数据
// 罗盘距离页面顶部距离
var panOffsetTop = pan.getBoundingClientRect().top
var panOffsetLeft = pan.getBoundingClientRect().left
var panOffsetRight = pan.getBoundingClientRect().right
var panWidth = pan.offsetWidth / 2 //罗盘一半的宽度
var touchX, touchY; //用于记录手指按下位置，判断手指在罗盘哪个位置
pan.addEventListener('touchstart', function(e) {
	var clientY = e.changedTouches[0].pageY
	var clientX = e.changedTouches[0].pageX
	var currentClentY = clientY - panOffsetTop //手指在当前盘上竖向的位置
	var currentClentX = clientX - panOffsetLeft //手指在当前盘上横向位置
	console.log(clientX, panWidth);

})
pan.addEventListener('touchmove', function(e) {
	console.log('isManual', isManual)
	if (!isManual) {
		return
	}

	console.log('touchmove')
	var clientY = e.changedTouches[0].pageY
	var clientX = e.changedTouches[0].pageX
	var currentClentY = clientY - panOffsetTop //手指在当前盘上竖向的位置
	var currentClentX = clientX - panOffsetLeft //手指在当前盘上横向位置
	if (currentClentX > panWidth) {
		//在右侧拖动
		compass.style.transform = 'rotate(' + Math.round(currentClentY) + 'deg)'
	} else {
		compass.style.transform = 'rotate(-' + Math.round(currentClentY) + 'deg)'
	}

	console.log('currentClentX', currentClentX);
})

document.body.addEventListener("touchmove", function(event) {
	event.preventDefault();
});
