/**
 * 计算当前应用占用的缓存大小
 * 使用 Calculate.apiFunction
 */
(function($, doc) {
	var _plugin_api = {
		/**
		 * 计算缓存大小
		 * @param {Object} fnCallback:回调函数，参数值为当前的缓存大小,Android - 2.2+ (支持) and iOS - 4.3+ (支持)
		 */
		fnCalculate: function(fnCallback) {
			plus.cache.calculate(function(size) {
				return fnCallback(size);
			});
		},
		/**
		 * 	清除缓存
		 * @param {Object} fnCallback
		 */
		fnClear: function(fnCallback) {
			plus.cache.clear(function() {
				return fnCallback();
			});
		}
	};
	this.Calculate = _plugin_api;
})(mui, document);