(function() {

	// post请求
	// 格式化post 传递的数据
	function postDataFormat(obj) {

		var arr = new Array();
		var i = 0;
		for(var attr in obj) {
			arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
			i++;
		}
		return arr.join("&");
	}
	var _plugin_api = {
		fnGet: function() {

		},
		/**
		 * XML request  post请求方式
		 * @param {Object} options：{url:'',params:{},callback:function(res){}}
		 */
		fnPost: function(options) {

			var xhr = new XMLHttpRequest();
			// 定义xhr对象的请求响应事件
			xhr.onreadystatechange = function() {
				switch(xhr.readyState) {
					case 0:
						//alert("请求未初始化");

						break;
					case 1:

						//alert("请求启动，尚未发送");
						break;
					case 2:

						//alert("请求发送，尚未得到响应");
						break;
					case 3:

						//alert("请求开始响应，收到部分数据");
						break;
					case 4:
						if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
							var data = xhr.responseText;
							return options.callback(data);
						} else {
							alert("Request was unsuccessful : " + xhr.status + " " + xhr.statusText);
						}
						break;
				}
			};
			// post请求
			xhr.open("POST", options.url, true);
			// 不支持FormData的浏览器的处理 
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			//			if(typeof FormData == "undefined") {
			//			}

			var postData = postDataFormat(options.params);
			xhr.send(postData);
		}
	};

	this.YYDXHR = _plugin_api;

})();