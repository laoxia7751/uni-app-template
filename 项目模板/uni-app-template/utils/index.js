import Request from './request'
import Api from './api'

/* request */
const Ajax = new Request();
Ajax.setConfig((config) => { /* 设置全局配置 */
console.log(config);
	config.baseUrl = Api.apiHost;
	config.header = {
		'Content-Type': 'json'
	}
	return config
})

/* 请求之前拦截器 */
Ajax.interceptor.request((config, cancel) => { 
	config.header = {
		...config.header,
		// b: 1
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config;
})

/* 请求之后拦截器 */
Ajax.interceptor.response((response) => { 
	return response;
})


export const getData = (start) => {
    return Ajax.get(Api.apiList.test, { start: 0, count: 10 })
}


