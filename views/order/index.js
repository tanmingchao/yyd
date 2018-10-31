(function($, doc) {
	var activeType,
		pageIndex = 1,
		pageSize = 10,
		totalRows = 1,
		isFirstLoad = true;
	$.init({
		pullRefresh: {
			container: "#orderlist", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			down: {
				height: 50, //可选,默认50.触发下拉刷新拖动距离,
				auto: true, //可选,默认false.自动下拉刷新一次
				contentdown: "", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
				callback: afterDownCallback //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			},
			up: {
				height: 50, //可选.默认50.触发上拉加载拖动距离
				auto: false, //可选,默认false.自动上拉加载一次
				contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: afterUpCallback //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			}
		}
	});
	var field = {};
	$.plusReady(function() {
		field
		toOrderDetail();
		fnOrderStatusTap();

	});
	//跳转到详细页面 
	function toOrderDetail() {
		mui('#scroll-order-list').on('tap', '.order-item', function() {
			var orderKey = this.getAttribute('data-key');
			Open.fnOpenEx({
				url: './detail.html',
				id: 'order_detail.html',
				extras: {
					orderKey: orderKey
				}
			});
		}, false);
	}

	function fnOrderStatusTap() {
		mui('#order-status-ctrl').on('tap', 'a.mui-control-item', function() {
			var type = this.getAttribute('data-key');
			fnClear(type);
			if(activeType != type) {
				activeType = type
				fnBindData(function(obj) {
					fnInitHtml(obj.data);
				});
			}
		}, false);
	}

	function afterDownCallback() {
		setTimeout(function() {
			fnClear();
			fnBindData(function(obj) {
				fnInitHtml(obj.data);
			});
			mui('#orderlist').pullRefresh().endPulldownToRefresh();
		}, 1000);
	}

	function afterUpCallback() {
		setTimeout(function() {
			if(pageIndex * pageSize < totalRows) {
				pageIndex = pageIndex + 1;
				//获取下一页数据
				fnBindData(function(obj) {
					if(obj && obj.data && obj.data.length > 0)
						//						orderListVM.orderListDto.push.apply(orderListVM.orderListDto, obj.data);
						fnInitHtml(obj.data);
				});
			} else {
				plus.nativeUI.toast('别拽了，没有更多数据了..');
			}

			mui('#orderlist').pullRefresh().endPullupToRefresh();
		}, 1000);
	}

	function fnInitHtml(dataArr) {
		if(dataArr && dataArr.length > 0) {
			var parentNode = doc.querySelector('#scroll-order-list');
			dataArr.forEach(function(order, index, input) {
				var node = doc.createElement('div');
				node.setAttribute('data-key', order.PrimaryKey);
				node.setAttribute('class', 'order-item yyd-flex yyd-flex-1 yyd-column yyd-bg-white yyd-padding-10  yyd-magrin-top-8');
				var html = "";
				html += '<div class="yyd-flex yyd-column">';
				html += '		<div class="yyd-flex yyd-row fnt-14 yyd-justify-content-space-between" style="padding: 6px 10px;">';
				html += '				<span><span class="yyd-fnt-323232">订单号</span>【' + order.OrderNo + '】</span>';

				var clazz = "";
				if(order.OrderStatus == '待执行')
					clazz = 'wait';
				if(order.OrderStatus == '进行中')
					clazz = 'going';
				if(order.OrderStatus == '被锁定')
					clazz = 'question';
				if(order.OrderStatus == '已放弃')
					clazz = 'quit';
				if(order.OrderStatus == '已完成')
					clazz = 'finished';

				html += '				<span class="status ' + clazz + '">';
				html += order.OrderStatus;
				html += '				</span>';
				html += '		</div>';
				html += '		<div class="yyd-flex yyd-flex-1 yyd-row yyd-boder-top-efeff4 fnt-13 yyd-justify-content-space-between" style="padding: 6px 10px 2px 10px;">';

				var payClazz = '';
				var payStr = '';
				if(order.PayBond > 0) {
					payClazz = 'haspay';
					payStr = '已缴纳';
				}
				if((order.PayBond == 0 || order.PayBond == 0.00)) {
					payClazz = 'hasNoPay';
					payStr = '未缴纳';
				}

				html += '			<span class="yyd-fnt-323232 yyd-flex-1">保证金￥' + order.PayBond + '<span class="' + payClazz + '">&nbsp;[' + payStr + ']</span></span>';
				html += '			<span class="">x' + order.Demand.PlayTimeRange + '小时</span>';
				html += '		</div>';
				html += '		<div class="yyd-flex yyd-flex-1 yyd-row fnt-13 yyd-justify-content-space-between" style="padding: 2px 10px 2px 10px; ">';
				html += '			<span class="yyd-fnt-323232">' + order.CreateTime + '</span>';
				html += '			<span class="baochou">';
				var status = '已到账';
				if(order.OrderStatus != '已完成') {
					status = '未到账';
				}
				html += '				报酬：<span class="fnt-16">￥' + order.Demand.ServerFee + '</span><span class="color-333333">(' + status + ')</span>';
				html += '			</span>';
				html += '		</div>';
				html += '</div>';
				node.innerHTML = html;
				parentNode.appendChild(node);
			});
		}
	}

	/**
	 * 获取数据 
	 * @param {Object} fnCallback
	 */
	function fnBindData(fnCallback) {
		App.fnShowWaiting('加载中...');
		if(activeType == -2)
			activeType = null;
		var prms = {
			OrderNo: '',
			CustomerKey: App.fnGetUser().PrimaryKey,
			DemandKey: null,
			OrderStatus: activeType,
			CreateTimeRange: null,
			PageIndex: pageIndex,
			PageSize: pageSize
		};
		App.fnPost({
			toUrl: '/DemandOrder/GetDemandOrderList',
			params: prms,
			callback: function(res) {
				console.info(res);
				App.fnCloseWaiting();
				var obj = JSON.parse(res);
				if(isFirstLoad) {
					totalRows = obj.Data.totalRows;
					isFirstLoad = false;
				}
				plus.nativeUI.toast('加载' + obj.Data.data.length + '条数据');
				return fnCallback(obj.Data);
			}
		})
	}

	function fnClear(menuKey) {
		if(activeType != menuKey) {
			//清除子元素
			var parentNode = document.querySelector('#orderlist');
			var items = parentNode.querySelectorAll('.order-item');
			if(items && items.length > 0) {
				for(var i = 0; i < items.length; i++) {
					items[i].remove();
				}
			}
			//还原查询分页参数
			pageIndex = 1;
			totalRows = 0;
		}
	}

})(mui, document);