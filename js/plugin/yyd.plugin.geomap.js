/**
 * 	谷歌地图插件	plus内置 地图插件
 * 	使用： GeoMap.apiFunction;
 */
(function() {
	//默认参数-方法，需要的是一个回调函数
	var _default_callback = function(res) {};
	//插件 api方法
	var _plugins_api = {
		/**
		 * 获取当前位置
		 * @param {Object} fnCallback
		 * 	position:{"coordsType":"wgs84","address":{"district":"赣榆区","country":"中国","province":"江苏省","city":"连云港市","street":"赣榆区"},"addresses":"尚门河村","coords":{"latitude":34.83523368770731,"longitude":118.9307718449083,"accuracy":165,"altitude":15.99515914916992,"heading":null,"speed":null,"altitudeAccuracy":10},"timestamp":1502356561110.939}
		 */
		fnGetPosition: function(fnCallback) {
			var self = this;
			plus.geolocation.getCurrentPosition(function(position) {
				return fnCallback({ data: JSON.stringify(position), code: 'ok' });
			}, function(e) {
				return fnCallback({ data: e.message, code: 'error' });
			}, {
				geocode: true, //是否解析地址信息address
				enableHighAccuracy: true //是否高精度获取位置信息，需要耗费更多资源和响应时间
			});
		}
	};
	this.GeoMap = _plugins_api;
})();