/**
 * 	时间格式化
 * 	使用 Formatter.apiFunction;
 */
(function() {
	var _plugin_apis = {

		/**
		 * 	将当前时间转换成 X月前 X天前  X小时前，X分钟前
		 * @param {Object} yyyyMMddHHmmss : 2017-12-12 12:12:12 
		 */
		fnFormatter: function(yyyyMMddHHmmss) {
			//转换成时间戳
			var timestamp = Date.parse(yyyyMMddHHmmss.replace(/-/gi, "/"));

			var second = 1000; //1000毫秒等于1秒
			var minute = second * 60;
			var hour = minute * 60;
			var day = hour * 24;
			var halfamonth = day * 15;
			var month = day * 30;
			var now = new Date().getTime();
			var diffValue = now - timestamp;
			if(diffValue < 0) {
				return;
			}
			var monthC = diffValue / month;
			var weekC = diffValue / (7 * day);
			var dayC = diffValue / day;
			var hourC = diffValue / hour;
			var minC = diffValue / minute;
			var secondC = diffValue / second;

			if(monthC >= 1) {
				result = "" + parseInt(monthC) + "月前";
			} else if(weekC >= 1) {
				result = "" + parseInt(weekC) + "周前";
			} else if(dayC >= 1) {
				result = "" + parseInt(dayC) + "天前";
			} else if(hourC >= 1) {
				result = "" + parseInt(hourC) + "小时前";
			} else if(minC >= 1) {
				result = "" + parseInt(minC) + "分钟前";
			} else if(secondC >= 1)
				result = "" + parseInt(secondC) + "秒前";

			return result;
		},

		/**
		 * 	获取当前时间   格式 ： yyyy-MM-dd HH:mm:ss
		 */
		fnGetNow: function() {
			var date = new Date();
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
				" " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
			return currentdate;
		},

		/**
		 * 时间大小对比,开始时间>=结束时间 返回false,否则返回true
		 * @param {Object} beginTime
		 * @param {Object} endTime
		 */
		fnCompareToEnd: function(beginTime, endTime) {
			var d1 = new Date(beginTime.replace(/\-/g, "\/"));
			var d2 = new Date(endTime.replace(/\-/g, "\/"));

			return !(beginDate != "" && endDate != "" && d1 >= d2);
		},
		/**
		 * 	输入时间与当前时间大小比较 是否大于当前时间 
		 * 如果>返回false,如果不大于返回 true
		 * @param {Object} time
		 */
		fnCompareToNow: function(time) {
			var d1 = new Date(time.replace(/\-/g, "\/"));
			var d2 = new Date(getNowFormatDate().replace(/\-/g, "\/"));
			return !(d1 >= d2);
		}
	};

	this.Formatter = _plugin_apis;
})();