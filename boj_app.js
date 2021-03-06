var App = function() {
    var e = ["wait", "rejudge-wait", "compile", "judging", "ac", "pe", "wa", "tle", "mle", "ole", "rte", "ce", "del", "del", "compile", "pac"]
      , t = ["기다리는 중", "재채점을 기다리는 중", "채점 준비 중", "채점 중", "맞았습니다!!", "출력 형식이 잘못되었습니다", "틀렸습니다", "시간 초과", "메모리 초과", "출력 초과", "런타임 에러", "컴파일 에러", "채점 불가", "삭제된 제출", "%(remain)초 후 채점 시작", "맞았습니다!!"]
      , o = ["Pending", "Pending Rejudge", "Prepare for Judge", "Judging", "Accepted", "Presentation Error", "Wrong Answer", "Time Limit Exceeded", "Memory Limit Exceeded", "Output Limit Exceeded", "Runtime Error", "Compilation Error", "Unavailable", "Deleted", "%d", "Partially Accepted"]
      , a = null;
    function r() {
        $(".real-time-update").each(function() {
            var a = $(this)
              , e = parseInt($(this).attr("data-timestamp"))
              , r = moment.unix(e)
              , t = $(this).attr("data-method");
            if ("from-now" == t)
                setInterval(function() {
                    var e, t, o;
                    a.text((e = r,
                    (o = moment()).isBefore(e) ? 0 != (t = Math.floor(e.diff(o, "years", !0))) ? t + "년 후" : 0 != (t = Math.floor(e.diff(o, "months", !0))) ? t + "달 후" : 0 != (t = Math.floor(e.diff(o, "days", !0))) ? t + "일 후" : 0 != (t = Math.floor(e.diff(o, "hours", !0))) ? t + "시간 후" : 0 != (t = Math.floor(e.diff(o, "minutes", !0))) ? t + "분 후" : 0 != (t = Math.floor(e.diff(o, "seconds", !0))) ? t + "초 후" : "방금 전" : 0 != (t = Math.floor(o.diff(e, "years", !0))) ? t + "년 전" : 0 != (t = Math.floor(o.diff(e, "months", !0))) ? t + "달 전" : 0 != (t = Math.floor(o.diff(e, "days", !0))) ? t + "일 전" : 0 != (t = Math.floor(o.diff(e, "hours", !0))) ? t + "시간 전" : 0 != (t = Math.floor(o.diff(e, "minutes", !0))) ? t + "분 전" : 0 != (t = Math.floor(o.diff(e, "seconds", !0))) ? t + "초 전" : "방금 전"))
                }, 1e3);
            else if ("contest" == t) {
                var o = moment.unix(parseInt($(this).attr("data-timestamp-start")));
                setInterval(function() {
                    a.text(function(e, t) {
                        var o = moment()
                          , a = !1
                          , r = t;
                        o.isBefore(e) && (a = !0,
                        r = e);
                        var i = 1
                          , n = Math.floor(o.diff(r, "seconds"));
                        if (0 == (i = 0 == n ? 0 : n < 0 ? -1 : 1))
                            return a ? (location.reload(),
                            "방금 전 시작") : "방금 전 종료";
                        i < 0 && (n = -n);
                        var s = "";
                        i < 0 && (s = a ? "시작까지 " : "종료까지 ");
                        var l = [];
                        return 0 < n % 60 && l.push(n % 60 + "초"),
                        0 < (n = Math.floor(n / 60)) % 60 && l.push(n % 60 + "분"),
                        0 < (n = Math.floor(n / 60)) % 24 && l.push(n % 24 + "시간"),
                        0 < (n = Math.floor(n / 24)) && (0 < n % 30 && (0 <= i && (l = []),
                        l.push(n % 30 + "일")),
                        0 < (n = Math.floor(n / 30)) % 12 && (l = []).push(n % 12 + "달"),
                        0 < (n = Math.floor(n / 12)) && (l = []).push(n + "년")),
                        0 < l.length ? (l.reverse(),
                        s += 0 < i ? l[0] + " " : l.join(" "),
                        0 < i && (s += a ? " 전 시작" : " 전 종료"),
                        s) : a ? "방금 전 시작" : "방금 전 종료"
                    }(o, r))
                }, 1e3)
            }
        })
    }
    return {
        init: function() {
            $(".carousel").carousel({
                interval: 15e3,
                pause: "hover"
            }),
            $(".tooltips").tooltip(),
            $(".tooltips-show").tooltip("show"),
            $(".tooltips-hide").tooltip("hide"),
            $(".tooltips-toggle").tooltip("toggle"),
            $(".tooltips-destroy").tooltip("destroy"),
            $(".popovers").popover(),
            $(".popovers-show").popover("show"),
            $(".popovers-hide").popover("hide"),
            $(".popovers-toggle").popover("toggle"),
            $(".popovers-destroy").popover("destroy"),
            $("li.search").click(function(e) {
                e.preventDefault(),
                $(".search-btn").hasClass("fa-search") ? ($(".search-open").fadeIn(500),
                $(".search-btn").removeClass("fa-search"),
                $(".search-btn").addClass("fa-times"),
                $("#header-search").focus()) : ($(".search-open").fadeOut(500),
                $(".search-btn").addClass("fa-search"),
                $(".search-btn").removeClass("fa-times"))
            }),
            $("#header-search").keyup(function(e) {
                13 == e.keyCode && 0 < $(this).val().length && (window.location.href = "/search#q=" + $(this).val())
            }),
            $(".list-toggle").on("click", function() {
                $(this).toggleClass("active")
            }),
            $(window).scroll(function() {
                100 < $(window).scrollTop() ? $(".header-fixed .header-sticky").addClass("header-fixed-shrink") : $(".header-fixed .header-sticky").removeClass("header-fixed-shrink")
            }),
            $(document).on("click", ".mega-menu .dropdown-menu", function(e) {
                e.stopPropagation()
            }),
            moment.locale("ko"),
            moment.updateLocale("ko", {
                relativeTime: {
                    s: "%d초",
                    ss: "%d초",
                    m: "%d분",
                    mm: "%d분",
                    h: "%d시간",
                    hh: "%d시간",
                    d: "%d일",
                    dd: "%d일",
                    M: "%d달",
                    MM: "%d달",
                    y: "%d년",
                    yy: "%d년"
                }
            }),
            moment.relativeTimeThreshold("s", 59),
            moment.relativeTimeThreshold("m", 59),
            moment.relativeTimeThreshold("h", 23),
            moment.relativeTimeThreshold("d", 28),
            moment.relativeTimeThreshold("M", 12),
            r(),
            $(".footer .copyright #no-acm-icpc").text("이 사이트는 ACM 또는 ACM-ICPC 대회와 무관하며, ACM으로부터 승인이나 지원을 받지 않고 있습니다.")
        },
        clearAlert: function(e) {
            !function(e) {
                e = e || "ajax-result";
                var t = $("." + e);
                t.length && t.html("")
            }(e)
        },
        makeAlert: function(e, t, o, a, r) {
            !function(e, t, o, a, r) {
                e = e || "ajax-result",
                t = t || "success",
                o = o || "",
                a = a || 0,
                r = r || {};
                var i = $("." + e);
                if (0 === i.length) {
                    var n = $('<div class="col-md-12"></div>');
                    i = $('<div class="' + e + '"></div>'),
                    n.append(i),
                    $("div.container.content > div.row").prepend(n)
                }
                0 < a && i.append($('<div class="margin-bottom-' + a + '"></div>'));
                var s = $('<div class="alert alert-dismissable fade in"></div>');
                for (var l in s.addClass("alert-" + t),
                r)
                    s.attr(l, r[l]);
                s.append('<button class="close" type="button" data-dismiss="alert" aria-hidden="true">&times;</button'),
                s.append('<div class="alert-body">' + o + "</div>"),
                i.append(s)
            }(a, e, t, o, r)
        },
        result_colors: function() {
            return e
        },
        result_names: function(e) {
            return 0 == e ? t : o
        },
        pusher: function(o, e) {
            var t;
            return null === a && ((a = new Pusher("a2cb611847131e062b32",{
                cluster: "ap1",
                encrypted: !0
            })).connection.bind("error", function(e) {
                if (4004 === e.error.data.code) {
                    var t = "실시간 채점 현황이 불가능합니다.<br>새로고침을 통해 채점 결과를 확인하세요.";
                    1 == o && (t = "Realtime result update is unavailable.<br>Reload this page to get judged result."),
                    new Noty({
                        text: t,
                        timeout: !1,
                        type: "error",
                        layout: "topRight"
                    }).show()
                }
            }),
            1 == e && (t = o,
            window.setTimeout(function() {
                if (a) {
                    a.disconnect(),
                    a = null;
                    var e = '<div class="text-center">실시간 채점 현황이 꺼졌습니다. 실시간 채점 결과를 받아보려면 새로고침을 눌러주세요.</div>';
                    1 == t && (e = '<div class="text-center">Realtime result update is unavailable.<br>Reload this page to enable realtime update.</div>'),
                    new Noty({
                        text: e,
                        timeout: !1,
                        type: "error",
                        layout: "top"
                    }).show()
                }
            }, 216e5))),
            a
        },
        trackOutboundLink: function(e) {
            var t;
            t = e,
            gtag("event", "click", {
                event_category: "outbound",
                event_label: t,
                transport_type: "beacon",
                event_callback: function() {
                    document.location = t
                }
            })
        }
    }
}();

