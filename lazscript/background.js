// 请求数据
var backEvent = {
    // 获取用户登录状态
    checkLoginStatus: function (call) {
        var statusData = {
            status: false
        };
        $.ajax({
            url: "https://www.bigseller.com/getUserAccount.json",
            type: "POST",
            async: true,
            dataType: "json",
            success: function(data) {
                if (+data.code === 0) {
                    statusData.puid = data.data && data.data.puid;
                    statusData.status = true;
                }
                typeof call === 'function' && call(statusData);
            },
            error: function () {
                typeof call === 'function' && call(statusData);
            }
        });
    },
    //获取采集页面
    getHtml: function(data, call){
        var url = data.url,
            try_times = data.try_times ,
            callback = data.callback,
            sync = data.sync;

        $.ajax({
            url: url,
            type: "GET",
            async: sync,
            timeout: 5000,
            data: {},
            success: function (data) {
                typeof(data) == "object" && (data = JSON.stringify(data));
                call({html: data});
            },
            complete: function (XMLHttpRequest, status) {
                if (status === 'timeout') {
                    try_times >= 1 ? call({html: ""}) :
                        setTimeout(function () {
                            var dataNew = {
                                url: url,
                                try_times: try_times + 1,
                                callback: callback
                            };
                            backEvent.getHtml(dataNew, call);
                        }, 3000);
                } else if (status === 'parsererror') {
                    var data = XMLHttpRequest.responseText;
                    call({html: data});
                } else if (status === 'error') {
                    call({html: ""});
                }
            }
        });
    },

    //去后台采集
    postHtml: function(data, call) {
        data = $.extend({
            url: '',
            try_times: 0, // 重试开始次数，会重试到1
            sync: true,
            params: {},
            timeOut: 0
        }, data || {}) ;

        if (data.url === '') return call({});

        $.ajax({
            url: data.url,
            type: 'POST',
            timeout: data.timeOut,
            async: data.sync,
            data: data.params,
            dataType: 'json',
            success: function(data) {
                call(data);
            },
            complete: function(XMLHttpRequest, status) {
                if (status === 'timeout') {
                    data.try_times >= 1
                        ? call({})
                        : setTimeout(function() {
                            data.try_times++;
                            backEvent.postHtml(data, call);
                        });
                } else if (status === 'parsererror') {
                    call({});
                } else if (status === 'error') {
                    call({});
                }
            }
        });
    },
    //获取数据
    getData: function(data, call){
        var url = data.url,
            try_times = data.try_times ,
            callback = data.callback;

        //console.log(params);
        $.ajax({
            url: url,
            type: "GET",
            timeout: 60000,
            data: {},
            async:false,
            success: function (data) {
                typeof(data) == "object" && (data = JSON.stringify(data));
                call({html: data});
            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    try_times >= 3 ? call({html: ""}) :
                        setTimeout(function () {
                            var dataNew = {
                                url: url,
                                try_times: try_times + 1,
                                callback: callback
                            };
                            backEvent.getData(dataNew, call)
                        }, 5000);
                } else if (status == 'parsererror') {
                    var data = XMLHttpRequest.responseText;
                    call({html: data});
                } else if (status == 'error') {
                    call({html: ""});
                }
            }
        });
    }
};

// 监听其他脚本发送的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request && request.sign === 'signBigSeller') {
        if (request.action === 'checkLoginStatus') {
            backEvent.checkLoginStatus(sendResponse);
            return true
        } else if (request.action === 'getHtml') {
            backEvent.getHtml(request.data, sendResponse);
            return true
        } else if (request.action === 'postHtml') {
            backEvent.postHtml(request.data, sendResponse);
            return true
        } else if (request.action === 'getData') {
            backEvent.getData(request.data, sendResponse);
            return true
        }
    }
});

// background.js
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    // sendResponse返回响应
    if (request === 'installed') {
        sendResponse({
            type: 'success',
            msg: 'Hello, I am chrome extension~'
        });
    }
});
