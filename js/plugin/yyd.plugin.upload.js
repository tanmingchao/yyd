/**
 * 	文件上传
 * 	使用 Upload.apiFunction
 */
(function() {

	var _plugin_apis = {

		/**
		 * 	文件上传
		 * @param {Object} options:{
		 * 		toUrl:'/ApiController/ApiAction',
		 * 		urlArr:[{path:'',name:''},{path:'',name:''}],
		 * 		fnCallback:functin(res){}
		 * 	}
		 */
		fnUpload: function(options) {
			var task = plus.uploader.createUpload(host.api + options.toUrl, {
				method: 'POST',
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}, function(t, status) {
				if(status == 200) {
					setTimeout(function() {
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast('图片上传成功！');
					}, 1500);
					var result = JSON.parse(t.responseText);
					var imageServerPaths = JSON.parse(result).Data;
					return options.fnCallback({
						code: 'ok',
						data: imageServerPaths //返回的上传之后的服务器图片路径
					});
				} else {
					setTimeout(function() {
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast('图片上传失败！发布失败！');
					}, 1500);
					console.error("上传失败", t.responseText);
					return options.fnCallback({
						code: 'error',
						data: null
					});
				}
			});

			if(options.urlArr && options.urlArr.length > 0) {
				options.urlArr.forEach(function(u, i, input) {
					if(u && u.path && u.name) {
						task.addData("uid", Math.floor(Math.random() * 100000000 + 10000000).toString()) //随机数
						task.addFile(u.path, {
							key: u.name
						});
					}
				});
			}

			task.addEventListener("statechanged", _fnOnStateChanged, false);
			task.start();
		}
	};
	// 监听上传任务状态
	function _fnOnStateChanged(upload, status) {
		if(upload.state == 4 && status == 200) {
			// 上传完成
			console.info('上传成功');
		}
	}

	this.Upload = _plugin_apis;
	
})();