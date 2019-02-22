// window.onload = function(){


var alpha = ""
var ua = navigator.userAgent.toLowerCase();

var compass = document.getElementById("compass") //罗盘元素
var deg_img = document.querySelector('.deg-img') //指南针

var dot = document.querySelector('.dot')
var gradienter = document.querySelector('.gradienter')
var gradienterWidth = gradienter.offsetWidth
var gradienterHeight = gradienter.offsetHeight
var gradienterScale = gradienterWidth / 180

var isAndroid = true


// 兼容适配
if (/android/.test(ua)) {
	window.addEventListener('deviceorientationabsolute', DeviceOrientationHandlerCompass, false);
	window.addEventListener('deviceorientationabsolute', DeviceOrientationHandlerDeg_img, false);

	function DeviceOrientationHandlerCompass(event) {
		/* 
		alpha  设备绕z轴旋转的角度。 （指南针的应用只要拿到alpha就OK啦）
		beta   设备绕x轴旋转的角度
		gamma  设备绕y轴旋转的角度 
		 */
		var alpha = event.alpha
		var beta = event.beta
		var gamma = event.gamma
		// console.log('x轴旋转的角度',beta);
		// console.log('y轴旋转的角度',gamma);
		// console.log('z轴旋转的角度',alpha);
		var top = beta + gradienterHeight / 2 - dot.offsetHeight / 2
		var left = gamma + gradienterWidth / 2 - dot.offsetWidth / 2

		dot.style.top = top + 'px'
		dot.style.left = left + 'px'



		document.querySelector(".fangwei").innerHTML = check(Math.round(360 - alpha));
		document.querySelector(".deg").innerHTML = Math.round(360 - alpha) + '°';
		compass.style.transform = 'rotate(-' + Math.round(360 - alpha) + 'deg)'
	}

	function DeviceOrientationHandlerDeg_img(event) {
		var alpha = event.alpha

		document.querySelector(".fangwei").innerHTML = check(Math.round(360 - alpha));
		document.querySelector(".deg").innerHTML = Math.round(360 - alpha) + '°';
		deg_img.style.transform = 'rotate(-' + Math.round(360 - alpha) + 'deg)'

	}

} else {
	// 非安卓
	isAndroid = false
	window.addEventListener('deviceorientation', DeviceOrientationHandlerCompassIos, false);
	window.addEventListener('deviceorientation', DeviceOrientationHandlerDeg_imgIos, false);

	function DeviceOrientationHandlerCompassIos(event) {
		/* 
		alpha  设备绕z轴旋转的角度。 （指南针的应用只要拿到alpha就OK啦）
		beta   设备绕x轴旋转的角度
		gamma  设备绕y轴旋转的角度 
		 */
		var alpha = event.alpha
		var beta = event.beta
		var gamma = event.gamma
		console.log('x轴旋转的角度', beta);
		// console.log('y轴旋转的角度',gamma);
		// console.log('z轴旋转的角度',alpha);
		var top = beta + gradienterHeight / 2
		var left = gamma + gradienterWidth / 2

		dot.style.top = top + 'px'
		dot.style.left = left + 'px'

		compass.style.transform = 'rotate(-' + event.webkitCompassHeading + 'deg)'
	}

	function DeviceOrientationHandlerDeg_imgIos(event) {
		var plpha = event.webkitCompassHeading
		document.querySelector(".fangwei").innerHTML = check(Math.round(360 - alpha));
		document.querySelector(".deg").innerHTML = Math.round(360 - alpha) + '°';
		
		deg_img.style.transform = 'rotate(-' + plpha + 'deg)'

	}
}


/* 根据度数判断方位 */
// 判断文字
function check(i) {
	if (22.5 < i && i < 67.5) {
		return '东北'
	} else if (67.5 < i && i < 112.5) {
		return '正东'
	} else if (112.5 < i && i < 157.5) {
		return '东南'
	} else if (157.5 < i && i < 202.5) {
		return '正南'
	} else if (202.5 < i && i < 247.5) {
		return '西南'
	} else if (247.5 < i && i < 292.5) {
		return '正西'
	} else if (292.5 < i && i < 337.5) {
		return '西北'
	} else {
		return '正北'
	}
}

/*底部工具选项【切换，锁定，手动，收起】*/

//切换
var switchs_warp = document.querySelector('.switchs_warp')
var switchs = document.getElementById("switch")
switchs.addEventListener('touchend', function() {
	switchs_warp.style.display = 'block'
	setTimeout(() => {
		switchs_warp.classList.add('show')
	}, 100)
})


switchs_warp.addEventListener('touchstart', function(e) {
	console.log(e.target.className);
	var target = e.target.className
	if (target == 'switch_content') {
		switchs_warp.style.display = 'none'
		switchs_warp.classList.remove('show')
	}
})


//锁定
var lock = document.getElementById("lock")
var isLock = false
lock.addEventListener('touchend', function() {
	// 取消罗盘监听事件,切换为手动转盘
	if (isAndroid) {
		if (isLock) {
			window.addEventListener('deviceorientationabsolute', DeviceOrientationHandlerCompass, false);
			this.children[0].classList.remove('active')
			this.children[1].innerText = '锁定'
		} else {
			window.removeEventListener('deviceorientationabsolute', DeviceOrientationHandlerCompass, false)
			this.children[0].classList.add('active')
			this.children[1].innerText = '解锁'
			isManual = false
		}
	} else {
		if (isLock) {
			window.addEventListener('deviceorientation', DeviceOrientationHandlerCompassIos, false);
			this.children[0].classList.remove('active')
			this.children[1].innerText = '锁定'
		} else {
			window.removeEventListener('deviceorientation', DeviceOrientationHandlerCompassIos, false)
			this.children[0].classList.add('active')
			this.children[1].innerText = '解锁'
			isManual = false
		}
	}

	isLock = !isLock
})

// 手动转盘
var manual = document.getElementById("manual")
var isManual = false
manual.addEventListener('touchend', function() {
	// 取消罗盘监听事件,切换为手动转盘
	if (isAndroid) {
		if (isManual) {
			window.addEventListener('deviceorientationabsolute', DeviceOrientationHandlerCompass, false);
			this.children[0].classList.remove('active')
			this.children[1].innerText = '手动'
		} else {
			window.removeEventListener('deviceorientationabsolute', DeviceOrientationHandlerCompass, false)
			this.children[0].classList.add('active')
			this.children[1].innerText = '自动'
		}
	} else {
		if (isManual) {
			window.addEventListener('deviceorientation', DeviceOrientationHandlerCompassIos, false);
			this.children[0].classList.remove('active')
			this.children[1].innerText = '手动'
		} else {
			window.removeEventListener('deviceorientation', DeviceOrientationHandlerCompassIos, false)
			this.children[0].classList.add('active')
			this.children[1].innerText = '自动'
		}
	}

	isManual = !isManual
})

// 监听手动转盘数据
// 罗盘距离页面距离
var panOffsetTop = compass.getBoundingClientRect().top
var panOffsetLeft = compass.getBoundingClientRect().left
var panOffsetRight = compass.getBoundingClientRect().right
var panWidth = compass.offsetWidth / 2 //罗盘一半的宽度
var touchX, touchY; //用于记录手指按下位置，判断手指在罗盘哪个位置
compass.addEventListener('touchstart', function(e) {
	var clientY = e.changedTouches[0].pageY
	var clientX = e.changedTouches[0].pageX
	var currentClentY = clientY - panOffsetTop //手指在当前盘上竖向的位置
	var currentClentX = clientX - panOffsetLeft //手指在当前盘上横向位置

})
compass.addEventListener('touchmove', function(e) {
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
})


// }
