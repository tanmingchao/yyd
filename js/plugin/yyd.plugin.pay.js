/**
 * 	游友代 支付方法
 * 	使用  YYDPay.apiFunction
 */
(function($) {
	var _plugin_apis = {
		/**
		 * 获取支付通道
		 * @param {Object} fnCallback：获取到支持的 支付通道，
		 */
		fnGetChannels: function(fnCallback) {
			plus.payment.getChannels(function(channels) {
				var content = document.getElementById('dcontent');
				var info = document.getElementById('info');
				var newChannelArr = [];
				for(var i in channels) {
					var channel = channels[i];
					if(channel.id == 'qhpay' || channel.id == 'qihoo') { // 过滤掉不支持的支付通道：暂不支持360相关支付
						continue;
					}
					newChannelArr.push({
						id: channel.id,
						description: channel.description,
						serviceReady: channel.serviceReady,
						channel: channel
					});
				}
				return fnCallback({
					code: 'ok',
					data: newChannelArr
				});
			}, function(e) {
				return fnCallback({
					code: 'error',
					data: e.message
				});
			});
		},
		/**
		 * 检测系统是否安装了指定的支付方式（这里只检测 alipay）
		 * @param {Object} payChannel	支付通道
		 */
		fnCheckPayServiceInstallStatus: function(payChannel) {
			if(!payChannel.serviceReady) {
				var txt = null;
				switch(payChannel.id) {
					case 'alipay':
						txt = '检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
						break;
					default:
						txt = '系统未安装“' + payChannel.description + '”服务，无法完成支付，是否立即安装？';
						break;
				}
				plus.nativeUI.confirm(txt, function(e) {
					if(e.index == 0) {
						payChannel.installService();
					}
				}, payChannel.description);
			}
		},
		/**
		 * 请求提交支付订单，并返回订单信息
		 * @param {Object} options:{ url:'',params:{},callback:function(res){}}
		 */
		//		fnRequestOrder: function(options) {
		//			YYDXHR.fnPost({
		//				url: options.url,
		//				params: options.params,
		//				callback: function(res) {
		//					if(res.code == 'ok') {
		//						return options.callback({
		//							code: 'ok',
		//							data: res.data
		//						});
		//
		//					} else {
		//						console.info('----- 请求订单失败 -----');
		//						console.info(xhr.status);
		//						return options.callback({
		//							code: 'error',
		//							data: '获取订单信息失败'
		//						});
		//					}
		//				}
		//			})
		//		},
		/**
		 * 	（注意，一定要注意：这是应用内支付的获取订单方式）请求IAP支付订单  ,IAP支付在调用plus.payment.request方法支付前须先向服务器请求获取商品的详细信息，否则会支付失败。
		 * @param {Object} commodityKeyArr:: ( Array[ String ] ) 必选 请求商品的标识
		 * @param {Object} fnCallback：支付回调函数
		 */
		//		fnRequestOrderIAP: function(commodityKeyArr, payChannel, fnCallback) {
		//			plus.nativeUI.showWaiting('检测支付环境...');
		//			payChannel.requestOrder(commodityKeyArr, function(e) { //commodityKeyArr: ( Array[ String ] ) 必选 请求商品的标识
		//				plus.nativeUI.closeWaiting();
		//				console.log('requestOrder success: ' + JSON.stringify(e));
		//				return fnCallback({
		//					code: 'ok',
		//					data: JSON.stringify(e)
		//				});
		//			}, function(e) {
		//				console.log('requestOrder failed: ' + JSON.stringify(e));
		//				plus.nativeUI.alert('订单支付失败，错误信息：' + JSON.stringify(e));
		//				plus.nativeUI.closeWaiting();
		//				return fnCallback({
		//					code: 'error',
		//					data: JSON.stringify(e)
		//				});
		//			});
		//		},
		/**
		 * 	支付 	IAP支付在调用plus.payment.request方法支付前须先向服务器请求获取商品的详细信息，否则会支付失败。
		 * @param {Object} payChannel支付通道
		 * @param {Object} fnCallback 支付回调
		 * 
		 */
		fnPay: function(payChannel, orderInfo, fnCallback) {
			plus.nativeUI.showWaiting('支付中..', {
				style: "black",
				background: "rgba(0,0,0,0)"
			});
			plus.payment.request(payChannel, orderInfo, function(result) {
				plus.nativeUI.closeWaiting();
				return fnCallback({
					code: 'ok',
					data: '支付完成'
				});
			}, function(e) {
				plus.nativeUI.closeWaiting();
				console.error("错误信息：" + JSON.stringify(e));
				plus.nativeUI.alert("错误信息：" + e.message, null, "支付失败：" + e.code);
				return fnCallback({
					code: 'error',
					data: '支付失败'
				})
			});
		}

	};
	this.YYDPay = _plugin_apis;
})(mui);

//						plus.payment.request(pays[id], order, function(result) {
//
//							console.info('----- 支付成功 -----');
//							console.info(JSON.stringify(result));
//							console.info('-----   -----');
//
//							plus.nativeUI.alert('支付成功：感谢你的支持，我们会继续努力完善产品。', function() {
//								return fnCallback({
//									code: 'ok',
//									data: 'ok'
//								})
//							}, '捐赠');
//						}, function(e) {
//							console.info('----- 支付失败 -----');
//							console.info('错误信息：[' + e.code + ']：' + e.message);
//							console.info('-----   -----');
//							return fnCallback({
//								code: 'error',
//								data: e.code + ',' + e.message
//							});
//						});