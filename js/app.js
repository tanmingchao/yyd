var host = {};
//host.ip = '192.168.1.105';
//host.api = "http://192.168.1.105/api";
//host.resource = "http://192.168.1.105/Image";

host.ip = '192.168.1.105';
host.api = "接口地址";
host.resource = "资源文件服务器地址（如图片，视频等）";

var isDebug = true;

/**
 * 	使用App.apiFunction
 */
(function() {
	var _plugin_api = {
		/**
		 * ajax get方法
		 * @param {Object} options:{toUrl:'/controller/action',callback:function(res){}}
		 */
		fnGet: function(options) {
			var toUrl = options.toUrl;
			var success = function(res, d) {
				return options.callback(res);
			}
			var error = function(xhr, type, errorThrown) {
				console.info(errorThrown);
				return options.callback(type);
			}

			mui.ajax(
				host.api + toUrl, {
					dataType: 'json',
					type: 'get',
					timeout: 20000,
					headers: {
						'Content-Type': 'application/json'
					},
					success: success,
					error: error
				});
		},
		/**
		 * ajax post方法
		 * @param {Object} options：{toUrl:'/controller/action',params:{},callback:function(res){}}
		 */
		fnPost: function(options) {
			var toUrl = options.toUrl;
			var success = function(res) {
				return options.callback(res);
			}
			var error = function(xhr, type, errorThrown) {
				console.info('---post result start---');
				console.info(JSON.stringify(xhr));
				console.info(JSON.stringify(type));
				console.info(JSON.stringify(errorThrown));
				console.info('---post result end---');
				return options.callback(null);
			}
			mui.ajax(host.api + toUrl, {
				data: options.params,
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 20000, //超时时间设置为10秒；
				headers: {
					'Content-Type': options.contextType || 'application/json'
				},
				success: success,
				error: error
			});
		},
		/**
		 * 获取用户位置信息
		 * {"coordsType":"wgs84",
		 * 	"coords":{
		 * 			"latitude":32.1557337299057,"longitude":118.7305406419672,"accuracy":1414,"altitude":20.33320999145508,"heading":null,"speed":null,"altitudeAccuracy":10},
		 * "timestamp":1495788223623.718}
		 */
		fnLocation: function() {
			var localStr = plus.storage.getItem("location");
			if(localStr && localStr != "") {
				var local = JSON.parse(localStr);
				return local;
			}
			return null;
		},
		/**
		 * 	获取登录用户信息(JSON结果)
		 */
		fnGetUser: function() {
			var user = plus.storage.getItem('user');
			if(user && user != '')
				return JSON.parse(user);
			return null;
		},
		fnShowWaiting: function(message) {
			try {
				plus.nativeUI.showWaiting(message || '加载中..');
			} catch(e) {
				//TODO handle the exception
			}
		},
		fnCloseWaiting: function() {
			try {
				plus.nativeUI.closeWaiting();
			} catch(e) {
				//TODO handle the exception
			}
		}

	};
	this.App = _plugin_api;
})();