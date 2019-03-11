var tpl = `
		<div class="switch_content">
			<div class="switch_main">
				<a href="index.html"><strong>默认主盘</strong> <span>综合风水罗盘</span></a>
				<a href="map.html"><strong>卫星地图盘</strong> <span>根据卫星地图进行测算</span></a>
				<a href="camera.html"><strong>实景取相盘</strong> <span>利用相机取景进行测算</span></a>
				<a href="custom.html"><strong>上传图盘</strong> <span>选择相册中图片进行测算</span></a>
			</div>
		</div>
`
var div = document.createElement('div')
div.className = 'switchs_warp'
div.innerHTML = tpl
document.body.appendChild(div);


// 处理各浏览器下下拉刷新问题
//禁止下拉
var overscroll = function(el) {
	var f = new FormData
	console.log(el);
	el.addEventListener('touchstart', function() {
		var top = el.scrollTop,
			totalScroll = el.scrollHeight,
			currentScroll = top + el.offsetHeight
		//If we're at the top or the bottom of the containers
		//scroll, push up or down one pixel.
		//
		//this prevents the scroll from "passing through" to
		//the body.
		if (top === 0) {
			el.scrollTop = 1
		} else if (currentScroll === totalScroll) {
			el.scrollTop = top - 1
		}
	})
	el.addEventListener('touchmove', function(evt) {
		//if the content is actually scrollable, i.e. the content is long enough
		//that scrolling can occur
		if (el.offsetHeight < el.scrollHeight)
			evt._isScroller = true
	})
}
overscroll(document.querySelector('.scroll'));
document.body.addEventListener('touchmove', function(evt) {
	//In this case, the default behavior is scrolling the body, which
	//would result in an overflow.  Since we don't want that, we preventDefault.
	if (!evt._isScroller) {
		evt.preventDefault()
	}
})