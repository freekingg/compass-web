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