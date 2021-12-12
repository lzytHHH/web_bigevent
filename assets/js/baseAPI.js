$.ajaxPrefilter(function(options) {
    //统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    //统一为有权限的接口设置headers请求头
    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete回调函数
    options.complete = function(res) {
        //complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清空token
            localStorage.removeItem('token')
            //强制跳转到登录页
            location.href = '/login.html'
        }
    }
})