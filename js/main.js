function favorite(e, s, o) {
    is_login ? ("undefined" == typeof o && (o = "add"), $(".btn-favorite-" + e).prop("disabled", !0), $(".bp-btn-like").prop("disabled", !0), $.ajax({
        url: base_url + "ajax/user_favorite",
        method: "POST",
        data: {
            movie_id: e,
            action: o
        },
        dataType: "json",
        success: function(o) {
            $(".btn-favorite-" + e).removeAttr("disabled"), $(".bp-btn-like").removeAttr("disabled"), 1 == o.status && (1 == s ? ($("#message-content").html(o.message), $("#pop-alert").modal("show"), "user" == window.location.pathname.split("/")[1] && $("[data-movie-id=" + e + "]").addClass("ml-item-remove")) : ($("#favorite-alert").show(), $("#favorite-message").html(o.message), setTimeout(function() {
                $("#favorite-alert").hide()
            }, 5e3), $("#button-favorite").html(o.content), $(".popover-like").hide()))
        }
    })) : $("#pop-login").modal("show")
}

function goRequestPage(e) {
    is_login ? window.location.href = e : $("#pop-login").modal("show")
}

function clearNotify() {
    var e = confirm("Are you sure delete all notify?");
    e && $.ajax({
        url: base_url + "ajax/user_clear_notify",
        method: "POST",
        dataType: "json",
        success: function(e) {
            1 == e.status && window.location.reload()
        }
    })
}

function loadNotify() {
    0 == $("#list-notify .notify-item").length && $.ajax({
        url: base_url + "ajax/user_load_notify",
        type: "GET",
        dataType: "json",
        success: function(e) {
            1 == e.status && ($("#notify-loading").remove(), $("#list-notify").html(e.html), e.notify_unread > 0 ? $(".feed-number").text(e.notify_unread) : $(".feed-number").text(""))
        }
    })
}

function ajaxContentBox(e) {
    $("div#" + e + " #content-box").is(":empty") && $.ajax({
        url: base_url + "ajax/get_content_box/" + e,
        type: "GET",
        dataType: "json",
        success: function(e) {
            switch (e.type) {
                case "topview-today":
                    $("#topview-today #content-box").html(e.content);
                    break;
                case "top-favorite":
                    $("#top-favorite #content-box").html(e.content);
                    break;
                case "top-rating":
                    $("#top-rating #content-box").html(e.content);
                    break;
                case "top-imdb":
                    $("#top-imdb #content-box").html(e.content)
            }
        }
    })
}

function updateMovieView(e) {
    $.cookie("view-" + e) || $.ajax({
        url: base_url + "ajax/movie_update_view",
        type: "POST",
        dataType: "json",
        data: {
            id: e
        },
        success: function() {
            var s = new Date,
                o = 2;
            s.setTime(s.getTime() + 60 * o * 1e3), $.cookie("view-" + e, !0, {
                expires: s,
                path: "/"
            })
        }
    })
}

function validateEmail(e) {
    var s = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return e.length > 0 && s.test(e)
}

function subscribe() {
    if (!$.cookie("subscribed")) {
        $("#error-email-subs").hide();
        var e = $("input[name=email]").val();
        "" == e.trim() ? ($("#error-email-subs").text("Please enter your email."), $("#error-email-subs").show()) : validateEmail(e) ? ($("#subscribe-submit").prop("disabled", !0), $("#subscribe-loading").show(), $.ajax({
            url: base_url + "site/subscribe",
            type: "POST",
            dataType: "json",
            data: {
                email: e
            },
            success: function(e) {
                1 == e.status && ($("#pop-subc").modal("hide"), $.cookie("subscribed", 1, {
                    expires: 365,
                    path: "/"
                }), $.cookie("subscribe", 1, {
                    expires: 365,
                    path: "/"
                })), $("#subscribe-loading").hide(), $("#subscribe-submit").removeAttr("disabled")
            }
        })) : ($("#error-email-subs").text("Please enter a valid email."), $("#error-email-subs").show())
    }
}

function subscribe_home() {
    if (!$.cookie("subscribed")) {
        $("#error-email-subs").hide(), $("#success-subs").hide();
        var e = $("input[name=email-home]").val();
        "" == e.trim() ? ($("#error-email-subs").text("Please enter your email."), $("#error-email-subs").show()) : validateEmail(e) ? ($("#subscribe-submit-home").prop("disabled", !0), $.ajax({
            url: base_url + "site/subscribe",
            type: "POST",
            dataType: "json",
            data: {
                email: e
            },
            success: function(e) {
                1 == e.status ? ($("#success-subs").text("Thank you for subscribing!"), $("#success-subs").show(), $.cookie("subscribed", 1, {
                    expires: 365,
                    path: "/"
                }), $.cookie("subscribe", 1, {
                    expires: 365,
                    path: "/"
                })) : ($("#error-email-subs").text("Subscribe failed."), $("#error-email-subs").show()), $("#subscribe-submit-home").removeAttr("disabled")
            }
        })) : ($("#error-email-subs").text("Please enter a valid email."), $("#error-email-subs").show())
    }
}

function subscribe_footer() {
    if (!$.cookie("subscribed")) {
        $("#error-email-subs-footer").hide(), $("#success-subs-footer").hide();
        var e = $("input[name=email-footer]").val();
        "" == e.trim() ? ($("#error-email-subs-footer").text("Please enter your email."), $("#error-email-subs-footer").show()) : validateEmail(e) ? ($("#subscribe-submit-footer").prop("disabled", !0), $.ajax({
            url: base_url + "site/subscribe",
            type: "POST",
            dataType: "json",
            data: {
                email: e
            },
            success: function(e) {
                1 == e.status ? ($("#success-subs-footer").text("Thank you for subscribing!"), $("#success-subs-footer").show(), $.cookie("subscribed", 1, {
                    expires: 365,
                    path: "/"
                }), $.cookie("subscribe", 1, {
                    expires: 365,
                    path: "/"
                })) : ($("#error-email-subs-footer").text("Subscribe failed."), $("#error-email-subs-footer").show()), $("#subscribe-submit-footer").removeAttr("disabled")
            }
        })) : ($("#error-email-subs-footer").text("Please enter a valid email."), $("#error-email-subs-footer").show())
    }
}

function isCookieEnabled() {
    var e = !!navigator.cookieEnabled;
    return "undefined" != typeof navigator.cookieEnabled || e || (document.cookie = "testcookie", e = -1 != document.cookie.indexOf("testcookie")), e
}

function searchMovie() {
    var e = $("input[name=keyword]").val();
    "" !== e.trim() && (e = e.replace(/(<([^>]+)>)/gi, "").replace(/[`~!@#$%^&*()_|\=?;:'",.<>\{\}\[\]\\\/]/gi, ""), e = e.split(" ").join("+"), window.location.href = base_url + "movie/search/" + e)
}

function searchMovieHome() {
    var e = $("input[name=keyword-home]").val();
    "" !== e.trim() && (e = e.replace(/(<([^>]+)>)/gi, "").replace(/[`~!@#$%^&*()_|\=?;:'",.<>\{\}\[\]\\\/]/gi, ""), e = e.split(" ").join("+"), window.location.href = base_url + "movie/search/" + e)
}
var domains = ["gomovies.dev", "gostream.dev", "123movieshd.to", "web1.gomovies.to", "web2.gomovies.to", "web3.gomovies.to", "web4.gomovies.to", "web5.gomovies.to", "web6.gomovies.to", "memovies.ru", "gomovies.to", "gomovies.cloud", "gomovies.tech", "movio.ga", "gomovies.pet", "gomovies.com.ru", "gomovies.is", "gostream.is", "gostream.to"];
domains.indexOf(document.domain) < 0 && (window.location.href = "https://gomovies.is" + window.location.pathname);
var base_url = "//" + document.domain + "/";
$.cookie("user_geo_2") || $.getJSON("//" + document.domain + "/site/user_geo", function(e) {
    "US" == e.country || "GB" == e.country || "AU" == e.country || "CA" == e.country || "DE" == e.country || "DK" == e.country || "SE" == e.country || "MC" == e.country ? $.cookie("user_geo_2", 1, {
        expires: 1
    }) : $.cookie("user_geo_2", 0, {
        expires: 1
    }), console.log(e)
});
var is_login = !1,
    s7euu24fblrg914z = "x6a4moj7q8xq6dk5";
$(document).ready(function() {
    function e() {
        $(this).find(".sub-container").css("display", "block")
    }

    function s() {
        $(this).find(".sub-container").css("display", "none")
    }
    $.ajax({
        url: base_url + "ajax/load_login_status",
        type: "GET",
        dataType: "json",
        success: function(e) {
            $("#top-user").html(e.content), 1 == e.is_login && (is_login = !0)
        }
    }), $("#search a.box-title").click(function() {
        $("#search .box").toggleClass("active")
    }), $(".mobile-menu").click(function() {
        $("#menu,.mobile-menu").toggleClass("active"), $("#search, .mobile-search").removeClass("active")
    }), $(".mobile-search").click(function() {
        $("#search,.mobile-search").toggleClass("active"), $("#menu, .mobile-menu").removeClass("active")
    }), $(".filter-toggle").click(function() {
        $("#filter").toggleClass("active"), $(".filter-toggle").toggleClass("active")
    }), $(".bp-btn-light").click(function() {
        $(".bp-btn-light, #overlay, #media-player, #content-embed, #comment-area").toggleClass("active")
    }), $("#overlay").click(function() {
        $(".bp-btn-light, #overlay, #media-player, #content-embed, #comment-area").removeClass("active")
    }), $(".bp-btn-auto").click(function() {
        $(".bp-btn-auto").toggleClass("active")
    }), $("#toggle, .cac-close").click(function() {
        $("#comment").toggleClass("active")
    }), $(".top-menu> li").bind("mouseover", e), $(".top-menu> li").bind("mouseout", s);
    var o = 0;
    $(window).on("scroll", function() {
        $(window).scrollTop() < o ? "fixed" != $("header").css("position") && ($("header").css({
            position: "fixed",
            top: -$("header").outerHeight(),
            backgroundColor: "#fff"
        }), $("header").animate({
            top: "0px"
        }, 500), $("#main").css("padding-top", $("header").outerHeight())) : ($("header").css({
            position: "relative",
            top: "0px"
        }), $("#main").css("padding-top", "0px")), o = $(window).scrollTop()
    }), $(function() {
        function e() {
            var e = $(this),
                s = e.find(".modal-dialog");
            e.css("display", "block"), s.css("margin-top", Math.max(0, ($(window).height() - s.height()) / 2))
        }
        $(".modal").on("show.bs.modal", e), $(window).on("resize", function() {
            $(".modal:visible").each(e)
        })
    });
    var t = !0;
    $("#search-suggest-menu").mouseover(function() {
        t = !1
    }), $("#search-suggest-menu").mouseout(function() {
        t = !0
    }), $("input[name=keyword]").keyup(function() {
        var e = $(this).val();
        e.trim().length > 2 ? $.ajax({
            url: base_url + "ajax/suggest_search",
            type: "POST",
            dataType: "json",
            data: {
                keyword: e
            },
            success: function(e) {
                $("#search-suggest-menu").html(e.content), "" !== e.content.trim() ? $("#search-suggest-menu").show() : $("#search-suggest-menu").hide()
            }
        }) : $("#search-suggest-menu").hide()
    }), $("input[name=keyword]").blur(function() {
        t && $("#search-suggest-menu").hide()
    }), $("input[name=keyword]").focus(function() {
        "" !== $("#search-suggest-menu").html() && $("#search-suggest-menu").show()
    }), $("input[name=keyword]").keypress(function(e) {
        13 == e.which && searchMovie()
    });
    var i = !0;
    $("#search-suggest-home").mouseover(function() {
        i = !1
    }), $("#search-suggest-home").mouseout(function() {
        i = !0
    }), $("input[name=keyword-home]").keyup(function() {
        var e = $(this).val();
        e.trim().length > 2 ? $.ajax({
            url: base_url + "ajax/suggest_search",
            type: "POST",
            dataType: "json",
            data: {
                keyword: e
            },
            success: function(e) {
                $("#search-suggest-home").html(e.content), "" !== e.content.trim() ? $("#search-suggest-home").show() : $("#search-suggest-home").hide()
            }
        }) : $("#search-suggest-home").hide()
    }), $("input[name=keyword-home]").blur(function() {
        i && $("#search-suggest-home").hide()
    }), $("input[name=keyword-home]").focus(function() {
        "" !== $("#search-suggest-home").html() && $("#search-suggest-home").show()
    }), $("input[name=keyword-home]").keypress(function(e) {
        13 == e.which && searchMovieHome()
    }), $("#login-form").submit(function(e) {
        $("#login-submit").prop("disabled", !0), $("#login-loading").show();
        var s = $(this).serializeArray(),
            o = $(this).attr("action");
        $.ajax({
            url: o,
            type: "POST",
            data: s,
            dataType: "json",
            success: function(e) {
                e.status ? (is_login = !0, $("#top-user").html(e.html), $("#pop-login").modal("hide")) : ($("#error-message").show(), $("#error-message").text(e.message), $("#login-submit").removeAttr("disabled"), $("#login-loading").hide())
            }
        }), e.preventDefault()
    }), $("#register-form").submit(function(e) {
        var s = $("#username").val(),
            o = md5(s + s7euu24fblrg914z);
        $("#register-submit").prop("disabled", !0), $("#register-loading").show();
        var t = $(this).serializeArray();
        t.push({
            name: "token",
            value: o
        });
        var i = $(this).attr("action");
        $.ajax({
            url: i,
            type: "POST",
            data: t,
            dataType: "json",
            success: function(e) {
                if ($(".error-block").hide(), e.status) is_login = !0, $("#top-user").html(e.html), $("#pop-register").modal("hide");
                else {
                    for (var s in e.messages) $("#error-" + s).show(), $("#error-" + s).text(e.messages[s]);
                    $("#register-submit").removeAttr("disabled"), $("#register-loading").hide(), grecaptcha.reset()
                }
            }
        }), e.preventDefault()
    }), $("#forgot-form").submit(function(e) {
        $("#forgot-submit").prop("disabled", !0), $("#forgot-loading").show();
        var s = $(this).serializeArray();
        $.ajax({
            url: base_url + "user/forgotPassword",
            type: "POST",
            data: s,
            dataType: "json",
            success: function(e) {
                0 == e.status && ($("#forgot-error-message").show(), $("#forgot-error-message").text(e.message)), 1 == e.status && ($("#forgot-success-message").show(), $("#forgot-success-message").text(e.message)), $("#forgot-submit").removeAttr("disabled"), $("#forgot-loading").hide()
            }
        }), e.preventDefault()
    }), $("#request-form").submit(function(e) {
        var s = $("#movie_name").val(),
            o = md5(s + s7euu24fblrg914z);
        $("#request-submit").prop("disabled", !0), $("#request-loading").show();
        var t = $(this).serializeArray();
        t.push({
            name: "token",
            value: o
        });
        var i = $(this).attr("action");
        $.ajax({
            url: i,
            type: "POST",
            data: t,
            dataType: "json",
            success: function(e) {
                if ($(".error-block").hide(), 0 == e.status)
                    for (var s in e.messages) $("#error-" + s).show(), $("#error-" + s).text(e.messages[s]);
                1 == e.status && ($("#message-success").show(), setTimeout(function() {
                    $("#message-success").hide()
                }, 5e3), document.getElementById("request-form").reset()), $("#request-submit").removeAttr("disabled"), $("#request-loading").hide(), grecaptcha.reset()
            }
        }), e.preventDefault()
    })
}), $("#donate-gift-card-form").submit(function(e) {
    var s = $(this).serializeArray(),
        o = $(this).attr("action");
    $.ajax({
        url: o,
        type: "POST",
        data: s,
        dataType: "json",
        success: function(e) {
            if ($(".error-block").hide(), 0 == e.status)
                for (var s in e.messages) $("#error-" + s).show(), $("#error-" + s).text(e.messages[s]);
            1 == e.status && ($("#message-success").show(), setTimeout(function() {
                $("#message-success").hide()
            }, 5e3), document.getElementById("donate-gift-card-form").reset())
        }
    }), e.preventDefault()
}), $.cookie("subscribe") || setTimeout(function() {
    $("#pop-subc").modal("show"), $.cookie("subscribe", 1, {
        expires: 1,
        path: "/"
    })
}, 1e4), $.cookie("subscribed") || $("#subs-block-home").show();
jQuery.browser.mobile || $(".jt").qtip({
    content: {
        text: function(t, e) {
            $.ajax({
                url: e.elements.target.attr("data-url"),
                type: "GET",
                success: function(t, i) {
                    e.set("content.text", t)
                }
            })
        },
        title: function(t, e) {
            return $(this).attr("title")
        }
    },
    position: {
        my: "top left",
        at: "top right",
        viewport: $(window),
        effect: !1,
        target: "mouse",
        adjust: {
            mouse: !1
        },
        show: {
            effect: !1
        }
    },
    hide: {
        fixed: !0
    },
    style: {
        classes: "qtip-light qtip-bootstrap",
        width: 320
    }
}), $("img.lazy").lazyload({
    effect: "fadeIn"
});