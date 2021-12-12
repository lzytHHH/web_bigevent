$(function() {
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空本地存储的token
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
          });
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status !== 0) {
                return layui.layer.msg('获取失败')
            }
            //渲染用户头像
            remderAvatar(res.data)
        }
        /* complete: function(res) {
            //complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //清空token
                localStorage.removeItem('token')
                //强制跳转到登录页
                location.href = '/login.html'
            }
        } */
    })
}

//渲染用户头像
function remderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染头像
    if(user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}