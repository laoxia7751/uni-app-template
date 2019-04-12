
const ajax = (opt) => {
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'GET';
	opt.header = opt.header || {
		"Content-Type": "json"
	};
	opt.success = opt.success || function () {};
	uni.request({
		url: opt.url,
		data: opt.data,
		method: opt.method,
		header: opt.header,
		dataType: 'json',
		success: function (res) {
			opt.success(res);
		},
		fail: function (fail) {
			
			uni.showToast({
				title: '请稍后重试'
			});
		}
	})
}

export {
    ajax
}