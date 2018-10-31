(function($, doc) {
	var field = {},
		CustomerDto;
	$.init();
	$.plusReady(function() {
		field.SettingBtn = doc.querySelector('.fnSetting');
		field.signBtn = doc.querySelector('.sign-btn');
		field.userhead = doc.querySelector('.userhead');
		field.ulevel = doc.querySelector('.ulevel');
		field.uname = doc.querySelector('.uname');
		field.score_field = doc.querySelector('.score_field');
		field.yue_field = doc.querySelector('.yue_field');

		fnSetting();
		fnInitUserInfo();

	});

	function fnInitUserInfo() {
		CustomerDto = App.fnGetUser();
		field.userhead.setAttribute('src', CustomerDto.HeadImageUrl);
		field.ulevel.innerText = CustomerDto.CustomerLevel;
		field.uname.innerText = CustomerDto.CustomerNickName;
		field.score_field.innerText = '我的积分：' + CustomerDto.Score;
		field.yue_field.innerText = '账户余额：' + CustomerDto.AccountBalance;
	}

	function fnSetting() { //跳转到设置页面
		field.SettingBtn.addEventListener('tap', function() {
			Open.fnOpen({
				url: './setting/index.html',
				id: 'setting_index.html'
			});
		}, false);
	}

})(mui, document);