var form = $("#searchForm");
var input = $("#searchInput");
var div = $("#resultDiv");
var btn = $("submitBtn");
var username;
var loaded = false;

form.on("submit", function (e) {
    
    e.preventDefault();
    username = input.val() || "susususutie";
    // console.log(username);
    $.getJSON("https://api.github.com/users/" + username).done(function (json) {
        var suHtml = `
        <div class="userImg">
                <img src="${json.avatar_url}" alt="用户头像">
            </div>
            <div class="mainInfo">
                <p>用户名：${json.login}</p>
                <p>昵称：${json.name}</p>
                <p>签名：${json.bio}</p>
            </div>
            <div class="secondInfo">
                <p>用户id：${json.id}</p>
                <p>注册日期：${json.created_at}</p>
            </div>
        `;
        div.html(suHtml);
        div.show();
    })
})

