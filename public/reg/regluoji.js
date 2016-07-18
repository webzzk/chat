/**
 * Created by evanz on 2016/7/5.
 */
$(function(){
    $("#submit").click(function () {
        var json = {
            'username': $('input[name=username]').val(),
            'userpwd': $('input[name=userpwd]').val()
        };
        $.post('/doregist', json)
            .done(function (data) {
                var compiled = _.template($("#warning").html());
                switch (data) {
                    case "0":
                        $('#success').modal();
                        window.location.href = "/";
                        break;
                    case "1":
                        $("#warnWarp").html(compiled({text: '用户名已经被占用,请重新输入'}));
                        $("input[name=username]").val("").focus();
                        break;
                    case "2":
                        $("#warnWarp").html(compiled({text: '服务器端错误，请联系管理员'}));
                        break;
                    case "3":
                        $("#warnWarp").html(compiled({text: '请输入账户或密码'}));
                        break;
                }
            })
    })

})