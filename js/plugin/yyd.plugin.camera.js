/**
 * 	相机（拍照）方法
 * 使用 Camera.apiFunction;
 */
(function() {
	var _plugin_api = {
		/**
		 * 	拍照
		 * @param {Object} fnCallback
		 */
		fnTakePicture: function(fnCallback) {
			var c = plus.camera.getCamera();
			console.info('开始调用摄像头插件');
			c.captureImage(function(e) {
				plus.io.resolveLocalFileSystemURL(e, function(entry) {
					var s = entry.toLocalURL(); //+ "?version=" + new Date().getTime();
					return fnCallback({
						code: 'ok',
						data: s
					});
				}, function(e) {
					console.log("读取拍照文件错误：" + e.message);
					return fnCallback({
						code: 'error',
						data: null
					});
				});
			}, function(s) {
				console.log("error" + s);
			}, {
				filename: '_doc/camera/',
				index: 1 //默认前置摄像头
			});
		},

		/**
		 * 	相册选取
		 * @param {Object} fnCallback
		 */
		fnChoosePicture: function(fnCallback) {
			// 从相册中选择图片
			plus.gallery.pick(function(e) {
				if(e && e.files) {
					return fnCallback({
						data: e.files,
						code: 'ok'
					});
				}
			}, function(e) {
				return fnCallback({
					data: null,
					code: 'error'
				});
			}, {
				filter: 'image',
				multiple: true,
				maximum: 6, // 最多选择6张图片
				system: false,
				onmaxed: function() {
					plus.nativeUI.alert('最多只能选择【6】张图片');
				}
			});
		}
	};
	this.Camera = _plugin_api;
})();