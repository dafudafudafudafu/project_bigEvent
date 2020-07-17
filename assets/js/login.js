$(function(){
    // 点击切换登录和注册页面
    $('#link_reg').on('click',function(){
        $('.reg-box').show();
        $('.login-boX').hide();
    })
    $('#link_login').on('click',function(){
        $('.reg-box').hide();
        $('.login-boX').show();
    })

    // 自定义校验规则
    // 从layui中获取form对象
    var form = layui.form;
    // 从layui中获取layer对象 layer.msg 提示框
    var layer = layui.layer;
    // 通过form.verify自定义校验规则
    form.verify({
        // 自定义pwd校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须是6-12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val();
            if(pwd !== value){
                return layer.msg(res.message)
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 阻止表单默认跳转
        e.preventDefault();
        // 获取表单数据
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
          }
        // 发送post请求
        $.post('/api/reguser',data,function(res){
          if(res.status !== 0) return layer.msg(res.message);
          layer.msg('注册成功！请登录！');
        //   手动调用click事件跳转套登录页面
        $('#link_login').click();
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) layer.msg('登录失败！');
                layer.msg('登录成功！');
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token',res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }

        })
    })

})