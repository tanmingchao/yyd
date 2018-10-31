/**
 * 拨打电话 使用 PhoneCall.fnApiFunction
 * @param {Object} $：mui
 */
(function($) {
	var _plugin_api = {
		/**
		 * 	拨号
		 * @param {Object} number：手机号码
		 */
		fnCall: function(number) {
			if(plus.os.name == "Android") {
				var Intent = plus.android.importClass("android.content.Intent");
				var Uri = plus.android.importClass("android.net.Uri");
				var main = plus.android.runtimeMainActivity();
				var uri = Uri.parse("tel:" + number);
				var call = new Intent("android.intent.action.CALL", uri);
				main.startActivity(call);
			} else {
				//plus.device.dial(number, false);
				var UIAPP = plus.ios.importClass("UIApplication");
				var NSURL = plus.ios.importClass("NSURL");

				var app = UIAPP.sharedApplication();

				app.openURL(NSURL.URLWithString("tel://" + number));
			}
		}
	};

	this.PhoneCall = _plugin_api;
})(mui);