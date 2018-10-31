;
(function($, doc) {
	//当前激活的 menu key
	var activeMenuKey = null;
	var pageIndex = 1,
		totalRows = 0,
		pageSize = 10,
		isFirstLoad = true;

	$.init({
		pullRefresh: {
			container: "#gameTypeScrollWrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			down: {
				style:'circle',
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

	function afterDownCallback() {
		setTimeout(function() {
			fnClear();
			fnBindData(function(obj) {
				bindHtml(obj.data);
			});
			mui('#gameTypeScrollWrapper').pullRefresh().endPulldownToRefresh();
		}, 1000);
	}

	function afterUpCallback() {
		setTimeout(function() {
			if(pageIndex * pageSize < totalRows) {
				pageIndex = pageIndex + 1;
				//获取下一页数据
				fnBindData(function(obj) {
					if(obj && obj.data && obj.data.length > 0)
						bindHtml(obj.data);
				});
			} else {
				plus.nativeUI.toast('别拽了，没有更多数据了..');
			}

			mui('#gameTypeScrollWrapper').pullRefresh().endPullupToRefresh();
		}, 1000);
	}

	var field = {};
	$.plusReady(function() {
		field.TypeMenuContainer = doc.querySelector('#gameTypeScroll');
		field.DemandListContainer = doc.querySelector('#demand-list');
//		fnInitTypes();
		itemTapEvent();
	});

	function bindHtml(dataArr) {
		if(dataArr && dataArr.length > 0) {
			var parentNode = document.querySelector('#demand-list');
			dataArr.forEach(function(item, index, input) {
				var html = '';
				var node = document.createElement('div');
				node.setAttribute('data-pkey', item.PrimaryKey);
				node.setAttribute('class', 'item yyd-flex yyd-flex-1 yyd-column yyd-bg-white yyd-padding-8-10 yyd-magrin-bottom-8');
				node.style.paddingBottom = 0;

				html += '		<div class="yyd-flex yyd-flex-1 yyd-row" style="padding: 4px 0px;">';
				html += '			<img class="show-img" src="' + item.CurrentGameAccountInfoUrl + '" />';
				html += '			<div class="yyd-flex yyd-flex-1 yyd-column task-content" style="padding: 0px 10px;">';
				html += '				<span id="">' + item.DemandContent + '</span>';
				html += '				<span class="yyd-flex task-createtime"> 发布：' + item.CreateTime + ' </span>';
				html += '			</div>';
				html += '		</div>';
				html += '		<div class="yyd-flex yyd-align-item-center yyd-justify-content-center yyd-boder-top-efeff4" style="padding: 8px 0px;">';
				html += '			<div class="remark yyd-flex yyd-flex-1 yyd-row yyd-justify-content-space-between" style="color: #CCCCCC;font-size: 12px;">';
				html += '				<div class="yyd-flex-1">';
				html += '					<span class="task-bond-fee yyd-flex-1">保证金<a>￥' + item.PayBond + '</a></span>';
				html += '					<span class="task-fee yyd-flex-1">时长<a>' + item.PlayTimeRange + '小时</a></span>';
				html += '				</div>';
				html += '				<span class="task-fee">报酬<a style="font-weight: bold;color: red;font-weight: bold;font-size: 16px;">￥' + item.ServerFee + '</a></span>';
				html += '			</div>';
				html += '		</div>';
				node.innerHTML = html;
				parentNode.appendChild(node);
			});
		}
	}

	/**
	 * 初始化头部分类
	 */
//	function fnInitTypes() {
//		App.fnGet({
//			toUrl: '/GameType/GetAllType',
//			callback: function(res) {
//				var obj = JSON.parse(res);
//				if(obj.ResultType == 3 && obj.Data && obj.Data.length > 0) {
//					plus.storage.setItem('gameType', JSON.stringify(obj.Data));
//					var typesHtml = '';
//					var active = 'mui-active';
//					obj.Data.forEach(function(item, index, input) {
//						active = index != 0 ? '' : active;
//						var node = document.createElement('a');
//						node.setAttribute('data-key', item.PrimaryKey);
//						node.setAttribute('class', 'mui-control-item type-item ' + active);
//						node.innerText = item.GameName;
//						field.TypeMenuContainer.appendChild(node); 
//					});
//				}
//			}
//		});
//		//绑定点击事件
//		mui('#gameTypeScroll').on('tap', 'a.type-item', function() {
//			var type_pkey = this.getAttribute('data-key');
//			fnClear(type_pkey);
//			if(activeMenuKey != type_pkey) {
//				activeMenuKey = type_pkey;
//				fnBindData(function(obj) {
//					totalRows = obj.totalRows;
//					bindHtml(obj.data);
//				});
//			}
//		});
//	}

	function itemTapEvent() {
		mui('#demand-list').on('tap', 'div.item', function() {
			var pkey = this.getAttribute('data-pkey');
			Open.fnOpenEx({
				url: '../demand/detail/detail.html',
				id: 'demand_detail.html',
				aniShow: 'fade-in',
				extras: {
					pkey: pkey
				}
			});
		});
	}

	/**
	 * 获取数据 
	 * @param {Object} fnCallback
	 */
	function fnBindData(fnCallback) {
		App.fnShowWaiting('加载中...');
		var prms = {
			ServerFeePayStatus: 1,
			GameTypeKey: activeMenuKey,
			PageIndex: pageIndex,
			PageSize: pageSize
		};

		App.fnPost({
			toUrl: '/Demand/GetDemandList',
			params: prms,
			callback: function(res) {
				App.fnCloseWaiting();
				var obj = JSON.parse(res);
				if(obj.Data && obj.Data.data)
					obj.Data.data.forEach(function(item, index, input) {
						item.CurrentGameAccountInfoUrl = item.CurrentGameAccountInfoUrl.split(',')[0];
						input[index] = item;
					});
				if(isFirstLoad) {
					isFirstLoad = false;
					totalRows = obj.Data.totalRows;
				}
				plus.nativeUI.toast('加载' + obj.Data.data.length + '条数据');
				return fnCallback(obj.Data);
			}
		})
	}

	function fnClear(menuKey) {
		if(menuKey == null || activeMenuKey != menuKey) {
			//清除子元素
			var parentNode = document.querySelector('#demand-list');
			var items = parentNode.querySelectorAll('.item');
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