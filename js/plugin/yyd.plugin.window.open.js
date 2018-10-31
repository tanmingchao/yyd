/**
 * 	打开新窗口
 * 	使用 Open.apiFunction;
 */
(function() {

	var _plugin_apis = {

		/**
		 * 	打开新窗口(无参数)
		 * @param {Object} options:{url:'',id:''}
		 */
		fnOpen: function(options) {
			if(options.url && options.id)
				mui.openWindow({
					url: options.url, //"./views/ucenter/password/forgetpwd.html",
					id: options.id, //'forgetpwd.html',
					preload: true,
					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					show: {
						aniShow: options.aniShow || 'pop-in'
					},
					styles: {
						popGesture: 'hide'
					},
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
					}
				});
		},

		/**
		 * 	打开新窗口（有参数）
		 * @param {Object} options:{url:'',id:'',extras:{key:value,key1:value1}}
		 */
		fnOpenEx: function(options) {
			if(options.url && options.id && options.extras)
				mui.openWindow({
					url: options.url, //"./views/ucenter/password/forgetpwd.html",
					id: options.id, //'forgetpwd.html',
					preload: true,
					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					show: {
						aniShow: options.aniShow || 'pop-in'
					},
					styles: {
						popGesture: 'hide'
					},
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
					},
					extras: options.extras
				});
		}
	};
	this.Open = _plugin_apis;
})();