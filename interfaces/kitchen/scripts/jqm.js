/*! jQuery Mobile vGit Build: SHA1: c2d61e2e592c67519d9a9ed0ba796fa44787e136 <> Date: Tue Sep 25 10:38:12 2012 -0700 jquerymobile.com | jquery.org/license !*/
(function (a, b, c) {
    typeof define == "function" && define.amd ? define(["jquery"], function (d) {
        return c(d, a, b), d.mobile
    }) : c(a.jQuery, a, b)
})(this, document, function (a, b, c, d) {
    (function (a, b, d) {
        var e = {};
        a.mobile = a.extend({}, {version:"1.2.0", ns:"", subPageUrlKey:"ui-page", activePageClass:"ui-page-active", activeBtnClass:"ui-btn-active", focusClass:"ui-focus", ajaxEnabled:!0, hashListeningEnabled:!0, linkBindingEnabled:!0, defaultPageTransition:"fade", maxTransitionWidth:!1, minScrollBack:250, touchOverflowEnabled:!1, defaultDialogTransition:"pop", pageLoadErrorMessage:"Error Loading Page", pageLoadErrorMessageTheme:"e", phonegapNavigationEnabled:!1, autoInitializePage:!0, pushStateEnabled:!0, ignoreContentEnabled:!1, orientationChangeEnabled:!0, buttonMarkup:{hoverDelay:200}, keyCode:{ALT:18, BACKSPACE:8, CAPS_LOCK:20, COMMA:188, COMMAND:91, COMMAND_LEFT:91, COMMAND_RIGHT:93, CONTROL:17, DELETE:46, DOWN:40, END:35, ENTER:13, ESCAPE:27, HOME:36, INSERT:45, LEFT:37, MENU:93, NUMPAD_ADD:107, NUMPAD_DECIMAL:110, NUMPAD_DIVIDE:111, NUMPAD_ENTER:108, NUMPAD_MULTIPLY:106, NUMPAD_SUBTRACT:109, PAGE_DOWN:34, PAGE_UP:33, PERIOD:190, RIGHT:39, SHIFT:16, SPACE:32, TAB:9, UP:38, WINDOWS:91}, silentScroll:function (d) {
            a.type(d) !== "number" && (d = a.mobile.defaultHomeScroll), a.event.special.scrollstart.enabled = !1, setTimeout(function () {
                b.scrollTo(0, d), a(c).trigger("silentscroll", {x:0, y:d})
            }, 20), setTimeout(function () {
                a.event.special.scrollstart.enabled = !0
            }, 150)
        }, nsNormalizeDict:e, nsNormalize:function (b) {
            if (!b)return;
            return e[b] || (e[b] = a.camelCase(a.mobile.ns + b))
        }, getInheritedTheme:function (a, b) {
            var c = a[0], d = "", e = /ui-(bar|body|overlay)-([a-z])\b/, f, g;
            while (c) {
                f = c.className || "";
                if (f && (g = e.exec(f)) && (d = g[2]))break;
                c = c.parentNode
            }
            return d || b || "a"
        }, closestPageData:function (a) {
            return a.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("page")
        }, enhanceable:function (a) {
            return this.haveParents(a, "enhance")
        }, hijackable:function (a) {
            return this.haveParents(a, "ajax")
        }, haveParents:function (b, c) {
            if (!a.mobile.ignoreContentEnabled)return b;
            var d = b.length, e = a(), f, g, h;
            for (var i = 0; i < d; i++) {
                g = b.eq(i), h = !1, f = b[i];
                while (f) {
                    var j = f.getAttribute ? f.getAttribute("data-" + a.mobile.ns + c) : "";
                    if (j === "false") {
                        h = !0;
                        break
                    }
                    f = f.parentNode
                }
                h || (e = e.add(g))
            }
            return e
        }, getScreenHeight:function () {
            return b.innerHeight || a(b).height()
        }}, a.mobile), a.fn.jqmData = function (b, c) {
            var e;
            return typeof b != "undefined" && (b && (b = a.mobile.nsNormalize(b)), arguments.length < 2 || c === d ? e = this.data(b) : e = this.data(b, c)), e
        }, a.jqmData = function (b, c, d) {
            var e;
            return typeof c != "undefined" && (e = a.data(b, c ? a.mobile.nsNormalize(c) : c, d)), e
        }, a.fn.jqmRemoveData = function (b) {
            return this.removeData(a.mobile.nsNormalize(b))
        }, a.jqmRemoveData = function (b, c) {
            return a.removeData(b, a.mobile.nsNormalize(c))
        }, a.fn.removeWithDependents = function () {
            a.removeWithDependents(this)
        }, a.removeWithDependents = function (b) {
            var c = a(b);
            (c.jqmData("dependents") || a()).remove(), c.remove()
        }, a.fn.addDependents = function (b) {
            a.addDependents(a(this), b)
        }, a.addDependents = function (b, c) {
            var d = a(b).jqmData("dependents") || a();
            a(b).jqmData("dependents", a.merge(d, c))
        }, a.fn.getEncodedText = function () {
            return a("<div/>").text(a(this).text()).html()
        }, a.fn.jqmEnhanceable = function () {
            return a.mobile.enhanceable(this)
        }, a.fn.jqmHijackable = function () {
            return a.mobile.hijackable(this)
        };
        var f = a.find, g = /:jqmData\(([^)]*)\)/g;
        a.find = function (b, c, d, e) {
            return b = b.replace(g, "[data-" + (a.mobile.ns || "") + "$1]"), f.call(this, b, c, d, e)
        }, a.extend(a.find, f), a.find.matches = function (b, c) {
            return a.find(b, null, null, c)
        }, a.find.matchesSelector = function (b, c) {
            return a.find(c, null, null, [b]).length > 0
        }
    })(a, this), function (a, b) {
        var c = 0, d = Array.prototype.slice, e = a.cleanData;
        a.cleanData = function (b) {
            for (var c = 0, d; (d = b[c]) != null; c++)try {
                a(d).triggerHandler("remove")
            } catch (f) {
            }
            e(b)
        }, a.widget = function (b, c, d) {
            var e, f, g, h, i = b.split(".")[0];
            b = b.split(".")[1], e = i + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e] = function (b) {
                return!!a.data(b, e)
            }, a[i] = a[i] || {}, f = a[i][b], g = a[i][b] = function (a, b) {
                if (!this._createWidget)return new g(a, b);
                arguments.length && this._createWidget(a, b)
            }, a.extend(g, f, {version:d.version, _proto:a.extend({}, d), _childConstructors:[]}), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function (b, e) {
                a.isFunction(e) && (d[b] = function () {
                    var a = function () {
                        return c.prototype[b].apply(this, arguments)
                    }, d = function (a) {
                        return c.prototype[b].apply(this, a)
                    };
                    return function () {
                        var b = this._super, c = this._superApply, f;
                        return this._super = a, this._superApply = d, f = e.apply(this, arguments), this._super = b, this._superApply = c, f
                    }
                }())
            }), g.prototype = a.widget.extend(h, {widgetEventPrefix:b}, d, {constructor:g, namespace:i, widgetName:b, widgetBaseClass:e, widgetFullName:e}), f ? (a.each(f._childConstructors, function (b, c) {
                var d = c.prototype;
                a.widget(d.namespace + "." + d.widgetName, g, c._proto)
            }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g)
        }, a.widget.extend = function (c) {
            var e = d.call(arguments, 1), f = 0, g = e.length, h, i;
            for (; f < g; f++)for (h in e[f])i = e[f][h], e[f].hasOwnProperty(h) && i !== b && (c[h] = a.isPlainObject(i) ? a.widget.extend({}, c[h], i) : i);
            return c
        }, a.widget.bridge = function (c, e) {
            var f = e.prototype.widgetFullName;
            a.fn[c] = function (g) {
                var h = typeof g == "string", i = d.call(arguments, 1), j = this;
                return g = !h && i.length ? a.widget.extend.apply(null, [g].concat(i)) : g, h ? this.each(function () {
                    var d, e = a.data(this, f);
                    if (!e)return a.error("cannot call methods on " + c + " prior to initialization; " + "attempted to call method '" + g + "'");
                    if (!a.isFunction(e[g]) || g.charAt(0) === "_")return a.error("no such method '" + g + "' for " + c + " widget instance");
                    d = e[g].apply(e, i);
                    if (d !== e && d !== b)return j = d && d.jquery ? j.pushStack(d.get()) : d, !1
                }) : this.each(function () {
                    var b = a.data(this, f);
                    b ? b.option(g || {})._init() : new e(g, this)
                }), j
            }
        }, a.Widget = function (a, b) {
        }, a.Widget._childConstructors = [], a.Widget.prototype = {widgetName:"widget", widgetEventPrefix:"", defaultElement:"<div>", options:{disabled:!1, create:null}, _createWidget:function (b, d) {
            d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetName, this), a.data(d, this.widgetFullName, this), this._on({remove:"destroy"}), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        }, _getCreateOptions:a.noop, _getCreateEventData:a.noop, _create:a.noop, _init:a.noop, destroy:function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        }, _destroy:a.noop, widget:function () {
            return this.element
        }, option:function (c, d) {
            var e = c, f, g, h;
            if (arguments.length === 0)return a.widget.extend({}, this.options);
            if (typeof c == "string") {
                e = {}, f = c.split("."), c = f.shift();
                if (f.length) {
                    g = e[c] = a.widget.extend({}, this.options[c]);
                    for (h = 0; h < f.length - 1; h++)g[f[h]] = g[f[h]] || {}, g = g[f[h]];
                    c = f.pop();
                    if (d === b)return g[c] === b ? null : g[c];
                    g[c] = d
                } else {
                    if (d === b)return this.options[c] === b ? null : this.options[c];
                    e[c] = d
                }
            }
            return this._setOptions(e), this
        }, _setOptions:function (a) {
            var b;
            for (b in a)this._setOption(b, a[b]);
            return this
        }, _setOption:function (a, b) {
            return this.options[a] = b, a === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        }, enable:function () {
            return this._setOption("disabled", !1)
        }, disable:function () {
            return this._setOption("disabled", !0)
        }, _on:function (b, c) {
            c ? (b = a(b), this.bindings = this.bindings.add(b)) : (c = b, b = this.element);
            var d = this;
            a.each(c, function (c, e) {
                function f() {
                    if (d.options.disabled === !0 || a(this).hasClass("ui-state-disabled"))return;
                    return(typeof e == "string" ? d[e] : e).apply(d, arguments)
                }

                typeof e != "string" && (f.guid = e.guid = e.guid || f.guid || a.guid++);
                var g = c.match(/^(\w+)\s*(.*)$/), h = g[1] + d.eventNamespace, i = g[2];
                i ? d.widget().delegate(i, h, f) : b.bind(h, f)
            })
        }, _off:function (a, b) {
            b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b)
        }, _delay:function (a, b) {
            function c() {
                return(typeof a == "string" ? d[a] : a).apply(d, arguments)
            }

            var d = this;
            return setTimeout(c, b || 0)
        }, _hoverable:function (b) {
            this.hoverable = this.hoverable.add(b), this._on(b, {mouseenter:function (b) {
                a(b.currentTarget).addClass("ui-state-hover")
            }, mouseleave:function (b) {
                a(b.currentTarget).removeClass("ui-state-hover")
            }})
        }, _focusable:function (b) {
            this.focusable = this.focusable.add(b), this._on(b, {focusin:function (b) {
                a(b.currentTarget).addClass("ui-state-focus")
            }, focusout:function (b) {
                a(b.currentTarget).removeClass("ui-state-focus")
            }})
        }, _trigger:function (b, c, d) {
            var e, f, g = this.options[b];
            d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
            if (f)for (e in f)e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
        }}, a.each({show:"fadeIn", hide:"fadeOut"}, function (b, c) {
            a.Widget.prototype["_" + b] = function (d, e, f) {
                typeof e == "string" && (e = {effect:e});
                var g, h = e ? e === !0 || typeof e == "number" ? c : e.effect || c : b;
                e = e || {}, typeof e == "number" && (e = {duration:e}), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && (a.effects.effect[h] || a.uiBackCompat !== !1 && a.effects[h]) ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
                    a(this)[b](), f && f.call(d[0]), c()
                })
            }
        }), a.uiBackCompat !== !1 && (a.Widget.prototype._getCreateOptions = function () {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        })
    }(a), function (a, b) {
        a.widget("mobile.widget", {_createWidget:function () {
            a.Widget.prototype._createWidget.apply(this, arguments), this._trigger("init")
        }, _getCreateOptions:function () {
            var c = this.element, d = {};
            return a.each(this.options, function (a) {
                var e = c.jqmData(a.replace(/[A-Z]/g, function (a) {
                    return"-" + a.toLowerCase()
                }));
                e !== b && (d[a] = e)
            }), d
        }, enhanceWithin:function (b, c) {
            this.enhance(a(this.options.initSelector, a(b)), c)
        }, enhance:function (b, c) {
            var d, e, f = a(b), g = this;
            f = a.mobile.enhanceable(f), c && f.length && (d = a.mobile.closestPageData(f), e = d && d.keepNativeSelector() || "", f = f.not(e)), f[this.widgetName]()
        }, raise:function (a) {
            throw"Widget [" + this.widgetName + "]: " + a
        }})
    }(a), function (a, b) {
        a.extend(a.mobile, {loadingMessageTextVisible:d, loadingMessageTheme:d, loadingMessage:d, showPageLoadingMsg:function (b, c, d) {
            a.mobile.loading("show", b, c, d)
        }, hidePageLoadingMsg:function () {
            a.mobile.loading("hide")
        }, loading:function () {
            this.loaderWidget.loader.apply(this.loaderWidget, arguments)
        }});
        var c = "ui-loader", e = a("html"), f = a(b);
        a.widget("mobile.loader", {options:{theme:"a", textVisible:!1, html:"", text:"loading"}, defaultHtml:"<div class='" + c + "'>" + "<span class='ui-icon ui-icon-loading'></span>" + "<h1></h1>" + "</div>", fakeFixLoader:function () {
            var b = a("." + a.mobile.activeBtnClass).first();
            this.element.css({top:a.support.scrollTop && f.scrollTop() + f.height() / 2 || b.length && b.offset().top || 100})
        }, checkLoaderPosition:function () {
            var b = this.element.offset(), c = f.scrollTop(), d = a.mobile.getScreenHeight();
            if (b.top < c || b.top - c > d)this.element.addClass("ui-loader-fakefix"), this.fakeFixLoader(), f.unbind("scroll", this.checkLoaderPosition).bind("scroll", this.fakeFixLoader)
        }, resetHtml:function () {
            this.element.html(a(this.defaultHtml).html())
        }, show:function (b, g, h) {
            var i, j, k, l;
            this.resetHtml(), a.type(b) === "object" ? (l = a.extend({}, this.options, b), b = l.theme || a.mobile.loadingMessageTheme) : (l = this.options, b = b || a.mobile.loadingMessageTheme || l.theme), j = g || a.mobile.loadingMessage || l.text, e.addClass("ui-loading");
            if (a.mobile.loadingMessage !== !1 || l.html)a.mobile.loadingMessageTextVisible !== d ? i = a.mobile.loadingMessageTextVisible : i = l.textVisible, this.element.attr("class", c + " ui-corner-all ui-body-" + b + " ui-loader-" + (i || g || b.text ? "verbose" : "default") + (l.textonly || h ? " ui-loader-textonly" : "")), l.html ? this.element.html(l.html) : this.element.find("h1").text(j), this.element.appendTo(a.mobile.pageContainer), this.checkLoaderPosition(), f.bind("scroll", a.proxy(this.checkLoaderPosition, this))
        }, hide:function () {
            e.removeClass("ui-loading"), a.mobile.loadingMessage && this.element.removeClass("ui-loader-fakefix"), a(b).unbind("scroll", a.proxy(this.fakeFixLoader, this)), a(b).unbind("scroll", a.proxy(this.checkLoaderPosition, this))
        }}), f.bind("pagecontainercreate", function () {
            a.mobile.loaderWidget = a.mobile.loaderWidget || a(a.mobile.loader.prototype.defaultHtml).loader()
        })
    }(a, this), function (a, b, c, d) {
        function x(a) {
            while (a && typeof a.originalEvent != "undefined")a = a.originalEvent;
            return a
        }

        function y(b, c) {
            var e = b.type, f, g, i, k, l, m, n, o, p;
            b = a.Event(b), b.type = c, f = b.originalEvent, g = a.event.props, e.search(/^(mouse|click)/) > -1 && (g = j);
            if (f)for (n = g.length, k; n;)k = g[--n], b[k] = f[k];
            e.search(/mouse(down|up)|click/) > -1 && !b.which && (b.which = 1);
            if (e.search(/^touch/) !== -1) {
                i = x(f), e = i.touches, l = i.changedTouches, m = e && e.length ? e[0] : l && l.length ? l[0] : d;
                if (m)for (o = 0, p = h.length; o < p; o++)k = h[o], b[k] = m[k]
            }
            return b
        }

        function z(b) {
            var c = {}, d, f;
            while (b) {
                d = a.data(b, e);
                for (f in d)d[f] && (c[f] = c.hasVirtualBinding = !0);
                b = b.parentNode
            }
            return c
        }

        function A(b, c) {
            var d;
            while (b) {
                d = a.data(b, e);
                if (d && (!c || d[c]))return b;
                b = b.parentNode
            }
            return null
        }

        function B() {
            r = !1
        }

        function C() {
            r = !0
        }

        function D() {
            v = 0, p.length = 0, q = !1, C()
        }

        function E() {
            B()
        }

        function F() {
            G(), l = setTimeout(function () {
                l = 0, D()
            }, a.vmouse.resetTimerDuration)
        }

        function G() {
            l && (clearTimeout(l), l = 0)
        }

        function H(b, c, d) {
            var e;
            if (d && d[b] || !d && A(c.target, b))e = y(c, b), a(c.target).trigger(e);
            return e
        }

        function I(b) {
            var c = a.data(b.target, f);
            if (!q && (!v || v !== c)) {
                var d = H("v" + b.type, b);
                d && (d.isDefaultPrevented() && b.preventDefault(), d.isPropagationStopped() && b.stopPropagation(), d.isImmediatePropagationStopped() && b.stopImmediatePropagation())
            }
        }

        function J(b) {
            var c = x(b).touches, d, e;
            if (c && c.length === 1) {
                d = b.target, e = z(d);
                if (e.hasVirtualBinding) {
                    v = u++, a.data(d, f, v), G(), E(), o = !1;
                    var g = x(b).touches[0];
                    m = g.pageX, n = g.pageY, H("vmouseover", b, e), H("vmousedown", b, e)
                }
            }
        }

        function K(a) {
            if (r)return;
            o || H("vmousecancel", a, z(a.target)), o = !0, F()
        }

        function L(b) {
            if (r)return;
            var c = x(b).touches[0], d = o, e = a.vmouse.moveDistanceThreshold, f = z(b.target);
            o = o || Math.abs(c.pageX - m) > e || Math.abs(c.pageY - n) > e, o && !d && H("vmousecancel", b, f), H("vmousemove", b, f), F()
        }

        function M(a) {
            if (r)return;
            C();
            var b = z(a.target), c;
            H("vmouseup", a, b);
            if (!o) {
                var d = H("vclick", a, b);
                d && d.isDefaultPrevented() && (c = x(a).changedTouches[0], p.push({touchID:v, x:c.clientX, y:c.clientY}), q = !0)
            }
            H("vmouseout", a, b), o = !1, F()
        }

        function N(b) {
            var c = a.data(b, e), d;
            if (c)for (d in c)if (c[d])return!0;
            return!1
        }

        function O() {
        }

        function P(b) {
            var c = b.substr(1);
            return{setup:function (d, f) {
                N(this) || a.data(this, e, {});
                var g = a.data(this, e);
                g[b] = !0, k[b] = (k[b] || 0) + 1, k[b] === 1 && t.bind(c, I), a(this).bind(c, O), s && (k.touchstart = (k.touchstart || 0) + 1, k.touchstart === 1 && t.bind("touchstart", J).bind("touchend", M).bind("touchmove", L).bind("scroll", K))
            }, teardown:function (d, f) {
                --k[b], k[b] || t.unbind(c, I), s && (--k.touchstart, k.touchstart || t.unbind("touchstart", J).unbind("touchmove", L).unbind("touchend", M).unbind("scroll", K));
                var g = a(this), h = a.data(this, e);
                h && (h[b] = !1), g.unbind(c, O), N(this) || g.removeData(e)
            }}
        }

        var e = "virtualMouseBindings", f = "virtualTouchID", g = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "), h = "clientX clientY pageX pageY screenX screenY".split(" "), i = a.event.mouseHooks ? a.event.mouseHooks.props : [], j = a.event.props.concat(i), k = {}, l = 0, m = 0, n = 0, o = !1, p = [], q = !1, r = !1, s = "addEventListener"in c, t = a(c), u = 1, v = 0, w;
        a.vmouse = {moveDistanceThreshold:10, clickDistanceThreshold:10, resetTimerDuration:1500};
        for (var Q = 0; Q < g.length; Q++)a.event.special[g[Q]] = P(g[Q]);
        s && c.addEventListener("click", function (b) {
            var c = p.length, d = b.target, e, g, h, i, j, k;
            if (c) {
                e = b.clientX, g = b.clientY, w = a.vmouse.clickDistanceThreshold, h = d;
                while (h) {
                    for (i = 0; i < c; i++) {
                        j = p[i], k = 0;
                        if (h === d && Math.abs(j.x - e) < w && Math.abs(j.y - g) < w || a.data(h, f) === j.touchID) {
                            b.preventDefault(), b.stopPropagation();
                            return
                        }
                    }
                    h = h.parentNode
                }
            }
        }, !0)
    }(a, b, c), function (a, b) {
        var d = {touch:"ontouchend"in c};
        a.mobile = a.mobile || {}, a.mobile.support = a.mobile.support || {}, a.extend(a.support, d), a.extend(a.mobile.support, d)
    }(a), function (a, b, d) {
        function j(b, c, d) {
            var e = d.type;
            d.type = c, a.event.handle.call(b, d), d.type = e
        }

        a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function (b, c) {
            a.fn[c] = function (a) {
                return a ? this.bind(c, a) : this.trigger(c)
            }, a.attrFn && (a.attrFn[c] = !0)
        });
        var e = a.mobile.support.touch, f = "touchmove scroll", g = e ? "touchstart" : "mousedown", h = e ? "touchend" : "mouseup", i = e ? "touchmove" : "mousemove";
        a.event.special.scrollstart = {enabled:!0, setup:function () {
            function g(a, c) {
                d = c, j(b, d ? "scrollstart" : "scrollstop", a)
            }

            var b = this, c = a(b), d, e;
            c.bind(f, function (b) {
                if (!a.event.special.scrollstart.enabled)return;
                d || g(b, !0), clearTimeout(e), e = setTimeout(function () {
                    g(b, !1)
                }, 50)
            })
        }}, a.event.special.tap = {tapholdThreshold:750, setup:function () {
            var b = this, d = a(b);
            d.bind("vmousedown", function (e) {
                function i() {
                    clearTimeout(h)
                }

                function k() {
                    i(), d.unbind("vclick", l).unbind("vmouseup", i), a(c).unbind("vmousecancel", k)
                }

                function l(a) {
                    k(), f === a.target && j(b, "tap", a)
                }

                if (e.which && e.which !== 1)return!1;
                var f = e.target, g = e.originalEvent, h;
                d.bind("vmouseup", i).bind("vclick", l), a(c).bind("vmousecancel", k), h = setTimeout(function () {
                    j(b, "taphold", a.Event("taphold", {target:f}))
                }, a.event.special.tap.tapholdThreshold)
            })
        }}, a.event.special.swipe = {scrollSupressionThreshold:30, durationThreshold:1e3, horizontalDistanceThreshold:30, verticalDistanceThreshold:75, setup:function () {
            var b = this, c = a(b);
            c.bind(g, function (b) {
                function j(b) {
                    if (!f)return;
                    var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b;
                    g = {time:(new Date).getTime(), coords:[c.pageX, c.pageY]}, Math.abs(f.coords[0] - g.coords[0]) > a.event.special.swipe.scrollSupressionThreshold && b.preventDefault()
                }

                var e = b.originalEvent.touches ? b.originalEvent.touches[0] : b, f = {time:(new Date).getTime(), coords:[e.pageX, e.pageY], origin:a(b.target)}, g;
                c.bind(i, j).one(h, function (b) {
                    c.unbind(i, j), f && g && g.time - f.time < a.event.special.swipe.durationThreshold && Math.abs(f.coords[0] - g.coords[0]) > a.event.special.swipe.horizontalDistanceThreshold && Math.abs(f.coords[1] - g.coords[1]) < a.event.special.swipe.verticalDistanceThreshold && f.origin.trigger("swipe").trigger(f.coords[0] > g.coords[0] ? "swipeleft" : "swiperight"), f = g = d
                })
            })
        }}, a.each({scrollstop:"scrollstart", taphold:"tap", swipeleft:"swipe", swiperight:"swipe"}, function (b, c) {
            a.event.special[b] = {setup:function () {
                a(this).bind(c, a.noop)
            }}
        })
    }(a, this), function (a, c) {
        a.extend(a.support, {orientation:"orientation"in b && "onorientationchange"in b})
    }(a), function (a) {
        a.event.special.throttledresize = {setup:function () {
            a(this).bind("resize", c)
        }, teardown:function () {
            a(this).unbind("resize", c)
        }};
        var b = 250, c = function () {
            f = (new Date).getTime(), g = f - d, g >= b ? (d = f, a(this).trigger("throttledresize")) : (e && clearTimeout(e), e = setTimeout(c, b - g))
        }, d = 0, e, f, g
    }(a), function (a, b) {
        function o() {
            var a = g();
            a !== h && (h = a, d.trigger(e))
        }

        var d = a(b), e = "orientationchange", f, g, h, i, j, k = {0:!0, 180:!0};
        if (a.support.orientation) {
            var l = b.innerWidth || a(b).width(), m = b.innerHeight || a(b).height(), n = 50;
            i = l > m && l - m > n, j = k[b.orientation];
            if (i && j || !i && !j)k = {"-90":!0, 90:!0}
        }
        a.event.special.orientationchange = a.extend({}, a.event.special.orientationchange, {setup:function () {
            if (a.support.orientation && !a.event.special.orientationchange.disabled)return!1;
            h = g(), d.bind("throttledresize", o)
        }, teardown:function () {
            if (a.support.orientation && !a.event.special.orientationchange.disabled)return!1;
            d.unbind("throttledresize", o)
        }, add:function (a) {
            var b = a.handler;
            a.handler = function (a) {
                return a.orientation = g(), b.apply(this, arguments)
            }
        }}), a.event.special.orientationchange.orientation = g = function () {
            var d = !0, e = c.documentElement;
            return a.support.orientation ? d = k[b.orientation] : d = e && e.clientWidth / e.clientHeight < 1.1, d ? "portrait" : "landscape"
        }, a.fn[e] = function (a) {
            return a ? this.bind(e, a) : this.trigger(e)
        }, a.attrFn && (a.attrFn[e] = !0)
    }(a, this), function (a, d) {
        var e = a(b), f = a("html");
        a.mobile.media = function () {
            var b = {}, d = a("<div id='jquery-mediatest'></div>"), e = a("<body>").append(d);
            return function (a) {
                if (!(a in b)) {
                    var g = c.createElement("style"), h = "@media " + a + " { #jquery-mediatest { position:absolute; } }";
                    g.type = "text/css", g.styleSheet ? g.styleSheet.cssText = h : g.appendChild(c.createTextNode(h)), f.prepend(e).prepend(g), b[a] = d.css("position") === "absolute", e.add(g).remove()
                }
                return b[a]
            }
        }()
    }(a), function (a, d) {
        function e(a) {
            var b = a.charAt(0).toUpperCase() + a.substr(1), c = (a + " " + h.join(b + " ") + b).split(" ");
            for (var e in c)if (g[c[e]] !== d)return!0
        }

        function m(a, b, d) {
            var e = c.createElement("div"), f = function (a) {
                return a.charAt(0).toUpperCase() + a.substr(1)
            }, g = function (a) {
                return"-" + a.charAt(0).toLowerCase() + a.substr(1) + "-"
            }, i = function (c) {
                var d = g(c) + a + ": " + b + ";", h = f(c), i = h + f(a);
                e.setAttribute("style", d), !e.style[i] || (k = !0)
            }, j = d ? [d] : h, k;
            for (var l = 0; l < j.length; l++)i(j[l]);
            return!!k
        }

        function n() {
            var b = "transform-3d";
            return m("perspective", "10px", "moz") || a.mobile.media("(-" + h.join("-" + b + "),(-") + "-" + b + "),(" + b + ")")
        }

        function o() {
            var b = location.protocol + "//" + location.host + location.pathname + "ui-dir/", c = a("head base"), d = null, e = "", g, h;
            return c.length ? e = c.attr("href") : c = d = a("<base>", {href:b}).appendTo("head"), g = a("<a href='testurl' />").prependTo(f), h = g[0].href, c[0].href = e || location.pathname, d && d.remove(), h.indexOf(b) === 0
        }

        function p() {
            var a = c.createElement("x"), d = c.documentElement, e = b.getComputedStyle, f;
            return"pointerEvents"in a.style ? (a.style.pointerEvents = "auto", a.style.pointerEvents = "x", d.appendChild(a), f = e && e(a, "").pointerEvents === "auto", d.removeChild(a), !!f) : !1
        }

        function q() {
            var a = c.createElement("div");
            return typeof a.getBoundingClientRect != "undefined"
        }

        var f = a("<body>").prependTo("html"), g = f[0].style, h = ["Webkit", "Moz", "O"], i = "palmGetResource"in b, j = b.opera, k = b.operamini && {}.toString.call(b.operamini) === "[object OperaMini]", l = b.blackberry && !e("-webkit-transform");
        a.extend(a.mobile, {browser:{}}), a.mobile.browser.ie = function () {
            var a = 3, b = c.createElement("div"), d = b.all || [];
            do b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->"; while (d[0]);
            return a > 4 ? a : !a
        }(), a.extend(a.support, {cssTransitions:"WebKitTransitionEvent"in b || m("transition", "height 100ms linear") && !j, pushState:"pushState"in history && "replaceState"in history, mediaquery:a.mobile.media("only all"), cssPseudoElement:!!e("content"), touchOverflow:!!e("overflowScrolling"), cssTransform3d:n(), boxShadow:!!e("boxShadow") && !l, scrollTop:("pageXOffset"in b || "scrollTop"in c.documentElement || "scrollTop"in f[0]) && !i && !k, dynamicBaseTag:o(), cssPointerEvents:p(), boundingRect:q()}), f.remove();
        var r = function () {
            var a = b.navigator.userAgent;
            return a.indexOf("Nokia") > -1 && (a.indexOf("Symbian/3") > -1 || a.indexOf("Series60/5") > -1) && a.indexOf("AppleWebKit") > -1 && a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)
        }();
        a.mobile.gradeA = function () {
            return(a.support.mediaquery || a.mobile.browser.ie && a.mobile.browser.ie >= 7) && (a.support.boundingRect || a.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null)
        }, a.mobile.ajaxBlacklist = b.blackberry && !b.WebKitPoint || k || r, r && a(function () {
            a("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet")
        }), a.support.boxShadow || a("html").addClass("ui-mobile-nosupport-boxshadow")
    }(a), function (a, b) {
        a.widget("mobile.page", a.mobile.widget, {options:{theme:"c", domCache:!1, keepNativeDefault:":jqmData(role='none'), :jqmData(role='nojs')"}, _create:function () {
            var a = this;
            if (a._trigger("beforecreate") === !1)return!1;
            a.element.attr("tabindex", "0").addClass("ui-page ui-body-" + a.options.theme).bind("pagebeforehide",function () {
                a.removeContainerBackground()
            }).bind("pagebeforeshow", function () {
                a.setContainerBackground()
            })
        }, removeContainerBackground:function () {
            a.mobile.pageContainer.removeClass("ui-overlay-" + a.mobile.getInheritedTheme(this.element.parent()))
        }, setContainerBackground:function (b) {
            this.options.theme && a.mobile.pageContainer.addClass("ui-overlay-" + (b || this.options.theme))
        }, keepNativeSelector:function () {
            var b = this.options, c = b.keepNative && a.trim(b.keepNative);
            return c && b.keepNative !== b.keepNativeDefault ? [b.keepNative, b.keepNativeDefault].join(", ") : b.keepNativeDefault
        }})
    }(a), function (a, b, d) {
        function k(a) {
            return a = a || location.href, "#" + a.replace(/^[^#]*#?(.*)$/, "$1")
        }

        var e = "hashchange", f = c, g, h = a.event.special, i = f.documentMode, j = "on" + e in b && (i === d || i > 7);
        a.fn[e] = function (a) {
            return a ? this.bind(e, a) : this.trigger(e)
        }, a.fn[e].delay = 50, h[e] = a.extend(h[e], {setup:function () {
            if (j)return!1;
            a(g.start)
        }, teardown:function () {
            if (j)return!1;
            a(g.stop)
        }}), g = function () {
            function n() {
                var c = k(), d = m(h);
                c !== h ? (l(h = c, d), a(b).trigger(e)) : d !== h && (location.href = location.href.replace(/#.*/, "") + d), g = setTimeout(n, a.fn[e].delay)
            }

            var c = {}, g, h = k(), i = function (a) {
                return a
            }, l = i, m = i;
            return c.start = function () {
                g || n()
            }, c.stop = function () {
                g && clearTimeout(g), g = d
            }, a.browser.msie && !j && function () {
                var b, d;
                c.start = function () {
                    b || (d = a.fn[e].src, d = d && d + k(), b = a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function () {
                        d || l(k()), n()
                    }).attr("src", d || "javascript:0").insertAfter("body")[0].contentWindow, f.onpropertychange = function () {
                        try {
                            event.propertyName === "title" && (b.document.title = f.title)
                        } catch (a) {
                        }
                    })
                }, c.stop = i, m = function () {
                    return k(b.location.href)
                }, l = function (c, d) {
                    var g = b.document, h = a.fn[e].domain;
                    c !== d && (g.title = f.title, g.open(), h && g.write('<script>document.domain="' + h + '"</script>'), g.close(), b.location.hash = c)
                }
            }(), c
        }()
    }(a, this), function (a, b, c) {
        var d = function (d) {
            return d === c && (d = !0), function (c, e, f, g) {
                var h = new a.Deferred, i = e ? " reverse" : "", j = a.mobile.urlHistory.getActive(), k = j.lastScroll || a.mobile.defaultHomeScroll, l = a.mobile.getScreenHeight(), m = a.mobile.maxTransitionWidth !== !1 && a(b).width() > a.mobile.maxTransitionWidth, n = !a.support.cssTransitions || m || !c || c === "none" || Math.max(a(b).scrollTop(), k) > a.mobile.getMaxScrollForTransition(), o = " ui-page-pre-in", p = function () {
                    a.mobile.pageContainer.toggleClass("ui-mobile-viewport-transitioning viewport-" + c)
                }, q = function () {
                    a.event.special.scrollstart.enabled = !1, b.scrollTo(0, k), setTimeout(function () {
                        a.event.special.scrollstart.enabled = !0
                    }, 150)
                }, r = function () {
                    g.removeClass(a.mobile.activePageClass + " out in reverse " + c).height("")
                }, s = function () {
                    d ? g.animationComplete(t) : t(), g.height(l + a(b).scrollTop()).addClass(c + " out" + i)
                }, t = function () {
                    g && d && r(), u()
                }, u = function () {
                    f.css("z-index", -10), f.addClass(a.mobile.activePageClass + o), a.mobile.focusPage(f), f.height(l + k), q(), f.css("z-index", ""), n || f.animationComplete(v), f.removeClass(o).addClass(c + " in" + i), n && v()
                }, v = function () {
                    d || g && r(), f.removeClass("out in reverse " + c).height(""), p(), a(b).scrollTop() !== k && q(), h.resolve(c, e, f, g, !0)
                };
                return p(), g && !n ? s() : t(), h.promise()
            }
        }, e = d(), f = d(!1), g = function () {
            return a.mobile.getScreenHeight() * 3
        };
        a.mobile.defaultTransitionHandler = e, a.mobile.transitionHandlers = {"default":a.mobile.defaultTransitionHandler, sequential:e, simultaneous:f}, a.mobile.transitionFallbacks = {}, a.mobile._maybeDegradeTransition = function (b) {
            return b && !a.support.cssTransform3d && a.mobile.transitionFallbacks[b] && (b = a.mobile.transitionFallbacks[b]), b
        }, a.mobile.getMaxScrollForTransition = a.mobile.getMaxScrollForTransition || g
    }(a, this), function (a, d) {
        function u(b) {
            !!i && (!i.closest("." + a.mobile.activePageClass).length || b) && i.removeClass(a.mobile.activeBtnClass), i = null
        }

        function v() {
            m = !1, l.length > 0 && a.mobile.changePage.apply(null, l.pop())
        }

        function z(b, c, d, e) {
            c && c.data("page")._trigger("beforehide", null, {nextPage:b}), b.data("page")._trigger("beforeshow", null, {prevPage:c || a("")}), a.mobile.hidePageLoadingMsg(), d = a.mobile._maybeDegradeTransition(d);
            var f = a.mobile.transitionHandlers[d || "default"] || a.mobile.defaultTransitionHandler, g = f(d, e, b, c);
            return g.done(function () {
                c && c.data("page")._trigger("hide", null, {nextPage:b}), b.data("page")._trigger("show", null, {prevPage:c || a("")})
            }), g
        }

        function A() {
            var b = a("." + a.mobile.activePageClass), c = parseFloat(b.css("padding-top")), d = parseFloat(b.css("padding-bottom")), e = parseFloat(b.css("border-top-width")), f = parseFloat(b.css("border-bottom-width"));
            b.css("min-height", s() - c - d - e - f)
        }

        function B(b, c) {
            c && b.attr("data-" + a.mobile.ns + "role", c), b.page()
        }

        function C(a) {
            while (a) {
                if (typeof a.nodeName == "string" && a.nodeName.toLowerCase() === "a")break;
                a = a.parentNode
            }
            return a
        }

        function D(b) {
            var c = a(b).closest(".ui-page").jqmData("url"), d = q.hrefNoHash;
            if (!c || !h.isPath(c))c = d;
            return h.makeUrlAbsolute(c, d)
        }

        var e = a(b), f = a("html"), g = a("head"), h = {urlParseRE:/^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/, getLocation:function (a) {
            var b = a ? this.parseUrl(a) : location, c = this.parseUrl(a || location.href).hash;
            return c = c === "#" ? "" : c, b.protocol + "//" + b.host + b.pathname + b.search + c
        }, parseLocation:function () {
            return this.parseUrl(this.getLocation())
        }, parseUrl:function (b) {
            if (a.type(b) === "object")return b;
            var c = h.urlParseRE.exec(b || "") || [];
            return{href:c[0] || "", hrefNoHash:c[1] || "", hrefNoSearch:c[2] || "", domain:c[3] || "", protocol:c[4] || "", doubleSlash:c[5] || "", authority:c[6] || "", username:c[8] || "", password:c[9] || "", host:c[10] || "", hostname:c[11] || "", port:c[12] || "", pathname:c[13] || "", directory:c[14] || "", filename:c[15] || "", search:c[16] || "", hash:c[17] || ""}
        }, makePathAbsolute:function (a, b) {
            if (a && a.charAt(0) === "/")return a;
            a = a || "", b = b ? b.replace(/^\/|(\/[^\/]*|[^\/]+)$/g, "") : "";
            var c = b ? b.split("/") : [], d = a.split("/");
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                switch (f) {
                    case".":
                        break;
                    case"..":
                        c.length && c.pop();
                        break;
                    default:
                        c.push(f)
                }
            }
            return"/" + c.join("/")
        }, isSameDomain:function (a, b) {
            return h.parseUrl(a).domain === h.parseUrl(b).domain
        }, isRelativeUrl:function (a) {
            return h.parseUrl(a).protocol === ""
        }, isAbsoluteUrl:function (a) {
            return h.parseUrl(a).protocol !== ""
        }, makeUrlAbsolute:function (a, b) {
            if (!h.isRelativeUrl(a))return a;
            b === d && (b = q);
            var c = h.parseUrl(a), e = h.parseUrl(b), f = c.protocol || e.protocol, g = c.protocol ? c.doubleSlash : c.doubleSlash || e.doubleSlash, i = c.authority || e.authority, j = c.pathname !== "", k = h.makePathAbsolute(c.pathname || e.filename, e.pathname), l = c.search || !j && e.search || "", m = c.hash;
            return f + g + i + k + l + m
        }, addSearchParams:function (b, c) {
            var d = h.parseUrl(b), e = typeof c == "object" ? a.param(c) : c, f = d.search || "?";
            return d.hrefNoSearch + f + (f.charAt(f.length - 1) !== "?" ? "&" : "") + e + (d.hash || "")
        }, convertUrlToDataUrl:function (a) {
            var c = h.parseUrl(a);
            return h.isEmbeddedPage(c) ? c.hash.split(n)[0].replace(/^#/, "") : h.isSameDomain(c, q) ? c.hrefNoHash.replace(q.domain, "").split(n)[0] : b.decodeURIComponent(a)
        }, get:function (a) {
            return a === d && (a = h.parseLocation().hash), h.stripHash(a).replace(/[^\/]*\.[^\/*]+$/, "")
        }, getFilePath:function (b) {
            var c = "&" + a.mobile.subPageUrlKey;
            return b && b.split(c)[0].split(n)[0]
        }, set:function (a) {
            location.hash = a
        }, isPath:function (a) {
            return/\//.test(a)
        }, clean:function (a) {
            return a.replace(q.domain, "")
        }, stripHash:function (a) {
            return a.replace(/^#/, "")
        }, cleanHash:function (a) {
            return h.stripHash(a.replace(/\?.*$/, "").replace(n, ""))
        }, isHashValid:function (a) {
            return/^#[^#]+$/.test(a)
        }, isExternal:function (a) {
            var b = h.parseUrl(a);
            return b.protocol && b.domain !== p.domain ? !0 : !1
        }, hasProtocol:function (a) {
            return/^(:?\w+:)/.test(a)
        }, isFirstPageUrl:function (b) {
            var c = h.parseUrl(h.makeUrlAbsolute(b, q)), e = c.hrefNoHash === p.hrefNoHash || r && c.hrefNoHash === q.hrefNoHash, f = a.mobile.firstPage, g = f && f[0] ? f[0].id : d;
            return e && (!c.hash || c.hash === "#" || g && c.hash.replace(/^#/, "") === g)
        }, isEmbeddedPage:function (a) {
            var b = h.parseUrl(a);
            return b.protocol !== "" ? b.hash && (b.hrefNoHash === p.hrefNoHash || r && b.hrefNoHash === q.hrefNoHash) : /^#/.test(b.href)
        }, isPermittedCrossDomainRequest:function (b, c) {
            return a.mobile.allowCrossDomainPages && b.protocol === "file:" && c.search(/^https?:/) !== -1
        }}, i = null, j = {stack:[], activeIndex:0, getActive:function () {
            return j.stack[j.activeIndex]
        }, getPrev:function () {
            return j.stack[j.activeIndex - 1]
        }, getNext:function () {
            return j.stack[j.activeIndex + 1]
        }, addNew:function (a, b, c, d, e) {
            j.getNext() && j.clearForward(), j.stack.push({url:a, transition:b, title:c, pageUrl:d, role:e}), j.activeIndex = j.stack.length - 1
        }, clearForward:function () {
            j.stack = j.stack.slice(0, j.activeIndex + 1)
        }, directHashChange:function (b) {
            var c, e, f, g = this.getActive();
            a.each(j.stack, function (a, d) {
                decodeURIComponent(b.currentUrl) === decodeURIComponent(d.url) && (c = a < j.activeIndex, e = !c, f = a)
            }), this.activeIndex = f !== d ? f : this.activeIndex, c ? (b.either || b.isBack)(!0) : e && (b.either || b.isForward)(!1)
        }, ignoreNextHashChange:!1}, k = "[tabindex],a,button:visible,select:visible,input", l = [], m = !1, n = "&ui-state=dialog", o = g.children("base"), p = h.parseLocation(), q = o.length ? h.parseUrl(h.makeUrlAbsolute(o.attr("href"), p.href)) : p, r = p.hrefNoHash !== q.hrefNoHash, s = a.mobile.getScreenHeight, t = a.support.dynamicBaseTag ? {element:o.length ? o : a("<base>", {href:q.hrefNoHash}).prependTo(g), set:function (a) {
            t.element.attr("href", h.makeUrlAbsolute(a, q))
        }, reset:function () {
            t.element.attr("href", q.hrefNoHash)
        }} : d;
        a.mobile.back = function () {
            var a = b.navigator;
            this.phonegapNavigationEnabled && a && a.app && a.app.backHistory ? a.app.backHistory() : b.history.back()
        }, a.mobile.focusPage = function (a) {
            var b = a.find("[autofocus]"), c = a.find(".ui-title:eq(0)");
            if (b.length) {
                b.focus();
                return
            }
            c.length ? c.focus() : a.focus()
        };
        var w = !0, x, y;
        x = function () {
            if (!w)return;
            var b = a.mobile.urlHistory.getActive();
            if (b) {
                var c = e.scrollTop();
                b.lastScroll = c < a.mobile.minScrollBack ? a.mobile.defaultHomeScroll : c
            }
        }, y = function () {
            setTimeout(x, 100)
        }, e.bind(a.support.pushState ? "popstate" : "hashchange", function () {
            w = !1
        }), e.one(a.support.pushState ? "popstate" : "hashchange", function () {
            w = !0
        }), e.one("pagecontainercreate", function () {
            a.mobile.pageContainer.bind("pagechange", function () {
                w = !0, e.unbind("scrollstop", y), e.bind("scrollstop", y)
            })
        }), e.bind("scrollstop", y), a.mobile._maybeDegradeTransition = a.mobile._maybeDegradeTransition || function (a) {
            return a
        }, a.fn.animationComplete = function (b) {
            return a.support.cssTransitions ? a(this).one("webkitAnimationEnd animationend", b) : (setTimeout(b, 0), a(this))
        }, a.mobile.path = h, a.mobile.base = t, a.mobile.urlHistory = j, a.mobile.dialogHashKey = n, a.mobile.allowCrossDomainPages = !1, a.mobile.getDocumentUrl = function (b) {
            return b ? a.extend({}, p) : p.href
        }, a.mobile.getDocumentBase = function (b) {
            return b ? a.extend({}, q) : q.href
        }, a.mobile._bindPageRemove = function () {
            var b = a(this);
            !b.data("page").options.domCache && b.is(":jqmData(external-page='true')") && b.bind("pagehide.remove", function () {
                var b = a(this), c = new a.Event("pageremove");
                b.trigger(c), c.isDefaultPrevented() || b.removeWithDependents()
            })
        }, a.mobile.loadPage = function (b, c) {
            var e = a.Deferred(), f = a.extend({}, a.mobile.loadPage.defaults, c), g = null, i = null, j = function () {
                var b = a.mobile.activePage && D(a.mobile.activePage);
                return b || q.hrefNoHash
            }, k = h.makeUrlAbsolute(b, j());
            f.data && f.type === "get" && (k = h.addSearchParams(k, f.data), f.data = d), f.data && f.type === "post" && (f.reloadPage = !0);
            var l = h.getFilePath(k), m = h.convertUrlToDataUrl(k);
            f.pageContainer = f.pageContainer || a.mobile.pageContainer, g = f.pageContainer.children("[data-" + a.mobile.ns + "url='" + m + "']"), g.length === 0 && m && !h.isPath(m) && (g = f.pageContainer.children("#" + m).attr("data-" + a.mobile.ns + "url", m).jqmData("url", m));
            if (g.length === 0)if (a.mobile.firstPage && h.isFirstPageUrl(l))a.mobile.firstPage.parent().length && (g = a(a.mobile.firstPage)); else if (h.isEmbeddedPage(l))return e.reject(k, c), e.promise();
            if (g.length) {
                if (!f.reloadPage)return B(g, f.role), e.resolve(k, c, g), e.promise();
                i = g
            }
            var n = f.pageContainer, o = new a.Event("pagebeforeload"), r = {url:b, absUrl:k, dataUrl:m, deferred:e, options:f};
            n.trigger(o, r);
            if (o.isDefaultPrevented())return e.promise();
            if (f.showLoadMsg)var s = setTimeout(function () {
                a.mobile.showPageLoadingMsg()
            }, f.loadMsgDelay), u = function () {
                clearTimeout(s), a.mobile.hidePageLoadingMsg()
            };
            return t && t.reset(), !a.mobile.allowCrossDomainPages && !h.isSameDomain(p, k) ? e.reject(k, c) : a.ajax({url:l, type:f.type, data:f.data, dataType:"html", success:function (d, j, n) {
                var o = a("<div></div>"), p = d.match(/<title[^>]*>([^<]*)/) && RegExp.$1, q = new RegExp("(<[^>]+\\bdata-" + a.mobile.ns + "role=[\"']?page[\"']?[^>]*>)"), s = new RegExp("\\bdata-" + a.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?");
                q.test(d) && RegExp.$1 && s.test(RegExp.$1) && RegExp.$1 && (b = l = h.getFilePath(a("<div>" + RegExp.$1 + "</div>").text())), t && t.set(l), o.get(0).innerHTML = d, g = o.find(":jqmData(role='page'), :jqmData(role='dialog')").first(), g.length || (g = a("<div data-" + a.mobile.ns + "role='page'>" + d.split(/<\/?body[^>]*>/gmi)[1] + "</div>")), p && !g.jqmData("title") && (~p.indexOf("&") && (p = a("<div>" + p + "</div>").text()), g.jqmData("title", p));
                if (!a.support.dynamicBaseTag) {
                    var v = h.get(l);
                    g.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function () {
                        var b = a(this).is("[href]") ? "href" : a(this).is("[src]") ? "src" : "action", c = a(this).attr(b);
                        c = c.replace(location.protocol + "//" + location.host + location.pathname, ""), /^(\w+:|#|\/)/.test(c) || a(this).attr(b, v + c)
                    })
                }
                g.attr("data-" + a.mobile.ns + "url", h.convertUrlToDataUrl(l)).attr("data-" + a.mobile.ns + "external-page", !0).appendTo(f.pageContainer), g.one("pagecreate", a.mobile._bindPageRemove), B(g, f.role), k.indexOf("&" + a.mobile.subPageUrlKey) > -1 && (g = f.pageContainer.children("[data-" + a.mobile.ns + "url='" + m + "']")), f.showLoadMsg && u(), r.xhr = n, r.textStatus = j, r.page = g, f.pageContainer.trigger("pageload", r), e.resolve(k, c, g, i)
            }, error:function (b, d, g) {
                t && t.set(h.get()), r.xhr = b, r.textStatus = d, r.errorThrown = g;
                var i = new a.Event("pageloadfailed");
                f.pageContainer.trigger(i, r);
                if (i.isDefaultPrevented())return;
                f.showLoadMsg && (u(), a.mobile.showPageLoadingMsg(a.mobile.pageLoadErrorMessageTheme, a.mobile.pageLoadErrorMessage, !0), setTimeout(a.mobile.hidePageLoadingMsg, 1500)), e.reject(k, c)
            }}), e.promise()
        }, a.mobile.loadPage.defaults = {type:"get", data:d, reloadPage:!1, role:d, showLoadMsg:!1, pageContainer:d, loadMsgDelay:50}, a.mobile.changePage = function (b, e) {
            if (m) {
                l.unshift(arguments);
                return
            }
            var f = a.extend({}, a.mobile.changePage.defaults, e);
            f.pageContainer = f.pageContainer || a.mobile.pageContainer, f.fromPage = f.fromPage || a.mobile.activePage;
            var g = f.pageContainer, i = new a.Event("pagebeforechange"), k = {toPage:b, options:f};
            g.trigger(i, k);
            if (i.isDefaultPrevented())return;
            b = k.toPage, m = !0;
            if (typeof b == "string") {
                a.mobile.loadPage(b, f).done(function (b, c, d, e) {
                    m = !1, c.duplicateCachedPage = e, a.mobile.changePage(d, c)
                }).fail(function (a, b) {
                    m = !1, u(!0), v(), f.pageContainer.trigger("pagechangefailed", k)
                });
                return
            }
            b[0] === a.mobile.firstPage[0] && !f.dataUrl && (f.dataUrl = p.hrefNoHash);
            var o = f.fromPage, q = f.dataUrl && h.convertUrlToDataUrl(f.dataUrl) || b.jqmData("url"), r = q, s = h.getFilePath(q), t = j.getActive(), w = j.activeIndex === 0, x = 0, y = c.title, A = f.role === "dialog" || b.jqmData("role") === "dialog";
            if (o && o[0] === b[0] && !f.allowSamePageTransition) {
                m = !1, g.trigger("pagechange", k), f.fromHashChange && j.directHashChange({currentUrl:q, isBack:function () {
                }, isForward:function () {
                }});
                return
            }
            B(b, f.role), f.fromHashChange && j.directHashChange({currentUrl:q, isBack:function () {
                x = -1
            }, isForward:function () {
                x = 1
            }});
            try {
                c.activeElement && c.activeElement.nodeName.toLowerCase() !== "body" ? a(c.activeElement).blur() : a("input:focus, textarea:focus, select:focus").blur()
            } catch (C) {
            }
            var D = !1;
            A && t && (t.url.indexOf(n) > -1 && !a.mobile.activePage.is(".ui-dialog") && (f.changeHash = !1, D = !0), q = (t.url || "") + (D ? "" : n), j.activeIndex === 0 && q === j.initialDst && (q += n)), f.changeHash !== !1 && q && (j.ignoreNextHashChange = !0, h.set(q));
            var E = t ? b.jqmData("title") || b.children(":jqmData(role='header')").find(".ui-title").getEncodedText() : y;
            !!E && y === c.title && (y = E), b.jqmData("title") || b.jqmData("title", y), f.transition = f.transition || (x && !w ? t.transition : d) || (A ? a.mobile.defaultDialogTransition : a.mobile.defaultPageTransition), x || (D && (j.activeIndex = Math.max(0, j.activeIndex - 1)), j.addNew(q, f.transition, y, r, f.role)), c.title = j.getActive().title, a.mobile.activePage = b, f.reverse = f.reverse || x < 0, z(b, o, f.transition, f.reverse).done(function (c, d, e, h, i) {
                u(), f.duplicateCachedPage && f.duplicateCachedPage.remove(), i || a.mobile.focusPage(b), v(), g.trigger("pagechange", k)
            })
        }, a.mobile.changePage.defaults = {transition:d, reverse:!1, changeHash:!0, fromHashChange:!1, role:d, duplicateCachedPage:d, pageContainer:d, showLoadMsg:!0, dataUrl:d, fromPage:d, allowSamePageTransition:!1}, a.mobile.navreadyDeferred = a.Deferred(), a.mobile.navreadyDeferred.done(function () {
            a(c).delegate("form", "submit", function (b) {
                var c = a(this);
                if (!a.mobile.ajaxEnabled || c.is(":jqmData(ajax='false')") || !c.jqmHijackable().length)return;
                var d = c.attr("method"), e = c.attr("target"), f = c.attr("action");
                f || (f = D(c), f === q.hrefNoHash && (f = p.hrefNoSearch)), f = h.makeUrlAbsolute(f, D(c));
                if (h.isExternal(f) && !h.isPermittedCrossDomainRequest(p, f) || e)return;
                a.mobile.changePage(f, {type:d && d.length && d.toLowerCase() || "get", data:c.serialize(), transition:c.jqmData("transition"), reverse:c.jqmData("direction") === "reverse", reloadPage:!0}), b.preventDefault()
            }), a(c).bind("vclick", function (b) {
                if (b.which > 1 || !a.mobile.linkBindingEnabled)return;
                var c = C(b.target);
                if (!a(c).jqmHijackable().length)return;
                c && h.parseUrl(c.getAttribute("href") || "#").hash !== "#" && (u(!0), i = a(c).closest(".ui-btn").not(".ui-disabled"), i.addClass(a.mobile.activeBtnClass))
            }), a(c).bind("click", function (c) {
                if (!a.mobile.linkBindingEnabled)return;
                var e = C(c.target), f = a(e), g;
                if (!e || c.which > 1 || !f.jqmHijackable().length)return;
                g = function () {
                    b.setTimeout(function () {
                        u(!0)
                    }, 200)
                };
                if (f.is(":jqmData(rel='back')"))return a.mobile.back(), !1;
                var i = D(f), j = h.makeUrlAbsolute(f.attr("href") || "#", i);
                if (!a.mobile.ajaxEnabled && !h.isEmbeddedPage(j)) {
                    g();
                    return
                }
                if (j.search("#") !== -1) {
                    j = j.replace(/[^#]*#/, "");
                    if (!j) {
                        c.preventDefault();
                        return
                    }
                    h.isPath(j) ? j = h.makeUrlAbsolute(j, i) : j = h.makeUrlAbsolute("#" + j, p.hrefNoHash)
                }
                var k = f.is("[rel='external']") || f.is(":jqmData(ajax='false')") || f.is("[target]"), l = k || h.isExternal(j) && !h.isPermittedCrossDomainRequest(p, j);
                if (l) {
                    g();
                    return
                }
                var m = f.jqmData("transition"), n = f.jqmData("direction") === "reverse" || f.jqmData("back"), o = f.attr("data-" + a.mobile.ns + "rel") || d;
                a.mobile.changePage(j, {transition:m, reverse:n, role:o, link:f}), c.preventDefault()
            }), a(c).delegate(".ui-page", "pageshow.prefetch", function () {
                var b = [];
                a(this).find("a:jqmData(prefetch)").each(function () {
                    var c = a(this), d = c.attr("href");
                    d && a.inArray(d, b) === -1 && (b.push(d), a.mobile.loadPage(d, {role:c.attr("data-" + a.mobile.ns + "rel")}))
                })
            }), a.mobile._handleHashChange = function (c) {
                var e = h.stripHash(c), f = a.mobile.urlHistory.stack.length === 0 ? "none" : d, g = new a.Event("navigate"), i = {transition:f, changeHash:!1, fromHashChange:!0};
                0 === j.stack.length && (j.initialDst = e), a.mobile.pageContainer.trigger(g);
                if (g.isDefaultPrevented())return;
                if (!a.mobile.hashListeningEnabled || j.ignoreNextHashChange) {
                    j.ignoreNextHashChange = !1;
                    return
                }
                if (j.stack.length > 1 && e.indexOf(n) > -1 && j.initialDst !== e) {
                    if (!a.mobile.activePage.is(".ui-dialog")) {
                        j.directHashChange({currentUrl:e, isBack:function () {
                            a.mobile.back()
                        }, isForward:function () {
                            b.history.forward()
                        }});
                        return
                    }
                    j.directHashChange({currentUrl:e, either:function (b) {
                        var c = a.mobile.urlHistory.getActive();
                        e = c.pageUrl, a.extend(i, {role:c.role, transition:c.transition, reverse:b})
                    }})
                }
                e ? (e = typeof e == "string" && !h.isPath(e) ? h.makeUrlAbsolute("#" + e, q) : e, e === h.makeUrlAbsolute("#" + j.initialDst, q) && j.stack.length && j.stack[0].url !== j.initialDst.replace(n, "") && (e = a.mobile.firstPage), a.mobile.changePage(e, i)) : a.mobile.changePage(a.mobile.firstPage, i)
            }, e.bind("hashchange", function (b, c) {
                a.mobile._handleHashChange(h.parseLocation().hash)
            }), a(c).bind("pageshow", A), a(b).bind("throttledresize", A)
        })
    }(a), function (a, b) {
        var e = {}, f = e, g = a(b), h = a.mobile.path.parseLocation(), i = a.Deferred(), j = a.Deferred();
        a(c).ready(a.proxy(j, "resolve")), a(c).one("mobileinit", a.proxy(i, "resolve")), a.extend(e, {initialFilePath:function () {
            return h.pathname + h.search
        }(), hashChangeTimeout:200, hashChangeEnableTimer:d, initialHref:h.hrefNoHash, state:function () {
            return{hash:a.mobile.path.parseLocation().hash || "#" + f.initialFilePath, title:c.title, initialHref:f.initialHref}
        }, resetUIKeys:function (b) {
            var c = a.mobile.dialogHashKey, d = "&" + a.mobile.subPageUrlKey, e = b.indexOf(c);
            return e > -1 ? b = b.slice(0, e) + "#" + b.slice(e) : b.indexOf(d) > -1 && (b = b.split(d).join("#" + d)), b
        }, nextHashChangePrevented:function (b) {
            a.mobile.urlHistory.ignoreNextHashChange = b, f.onHashChangeDisabled = b
        }, onHashChange:function (b) {
            if (f.onHashChangeDisabled)return;
            var d, e, g = a.mobile.path.parseLocation().hash, h = a.mobile.path.isPath(g), i = h ? a.mobile.path.getLocation() : a.mobile.getDocumentUrl();
            g = h ? g.replace("#", "") : g, e = f.state(), d = a.mobile.path.makeUrlAbsolute(g, i), h && (d = f.resetUIKeys(d)), history.replaceState(e, c.title, d)
        }, onPopState:function (b) {
            var c = b.originalEvent.state, d, e, g;
            c && (clearTimeout(f.hashChangeEnableTimer), f.nextHashChangePrevented(!1), a.mobile._handleHashChange(c.hash), f.nextHashChangePrevented(!0), f.hashChangeEnableTimer = setTimeout(function () {
                f.nextHashChangePrevented(!1)
            }, f.hashChangeTimeout))
        }, init:function () {
            g.bind("hashchange", f.onHashChange), g.bind("popstate", f.onPopState), location.hash === "" && history.replaceState(f.state(), c.title, a.mobile.path.getLocation())
        }}), a.when(j, i, a.mobile.navreadyDeferred).done(function () {
            a.mobile.pushStateEnabled && a.support.pushState && e.init()
        })
    }(a, this), function (a, b, c) {
        a.mobile.transitionFallbacks.flip = "fade"
    }(a, this), function (a, b, c) {
        a.mobile.transitionFallbacks.flow = "fade"
    }(a, this), function (a, b, c) {
        a.mobile.transitionFallbacks.pop = "fade"
    }(a, this), function (a, b, c) {
        a.mobile.transitionHandlers.slide = a.mobile.transitionHandlers.simultaneous, a.mobile.transitionFallbacks.slide = "fade"
    }(a, this), function (a, b, c) {
        a.mobile.transitionFallbacks.slidedown = "fade"
    }(a, this), function (a, b, c) {
        a.mobile.transitionFallbacks.slidefade = "fade"
    }(a, this), function (a, b, c) {
        a.mobile.transitionFallbacks.slideup = "fade"
    }(a, this), function (a, b, c) {
        a.mobile.transitionFallbacks.turn = "fade"
    }(a, this), function (a, b) {
        a.mobile.page.prototype.options.degradeInputs = {color:!1, date:!1, datetime:!1, "datetime-local":!1, email:!1, month:!1, number:!1, range:"number", search:"text", tel:!1, time:!1, url:!1, week:!1}, a(c).bind("pagecreate create", function (b) {
            var c = a.mobile.closestPageData(a(b.target)), d;
            if (!c)return;
            d = c.options, a(b.target).find("input").not(c.keepNativeSelector()).each(function () {
                var b = a(this), c = this.getAttribute("type"), e = d.degradeInputs[c] || "text";
                if (d.degradeInputs[c]) {
                    var f = a("<div>").html(b.clone()).html(), g = f.indexOf(" type=") > -1, h = g ? /\s+type=["']?\w+['"]?/ : /\/?>/, i = ' type="' + e + '" data-' + a.mobile.ns + 'type="' + c + '"' + (g ? "" : ">");
                    b.replaceWith(f.replace(h, i))
                }
            })
        })
    }(a), function (a, b, d) {
        a.widget("mobile.dialog", a.mobile.widget, {options:{closeBtnText:"Close", overlayTheme:"a", initSelector:":jqmData(role='dialog')"}, _create:function () {
            var b = this, c = this.element, d = a("<a href='#' data-" + a.mobile.ns + "icon='delete' data-" + a.mobile.ns + "iconpos='notext'>" + this.options.closeBtnText + "</a>"), e = a("<div/>", {role:"dialog", "class":"ui-dialog-contain ui-corner-all ui-overlay-shadow"});
            c.addClass("ui-dialog ui-overlay-" + this.options.overlayTheme), c.wrapInner(e).children().find(":jqmData(role='header')").prepend(d).end().children(":first-child").addClass("ui-corner-top").end().children(":last-child").addClass("ui-corner-bottom"), d.bind("click", function () {
                b.close()
            }), c.bind("vclick submit",function (b) {
                var c = a(b.target).closest(b.type === "vclick" ? "a" : "form"), d;
                c.length && !c.jqmData("transition") && (d = a.mobile.urlHistory.getActive() || {}, c.attr("data-" + a.mobile.ns + "transition", d.transition || a.mobile.defaultDialogTransition).attr("data-" + a.mobile.ns + "direction", "reverse"))
            }).bind("pagehide",function (b, c) {
                a(this).find("." + a.mobile.activeBtnClass).not(".ui-slider-bg").removeClass(a.mobile.activeBtnClass)
            }).bind("pagebeforeshow", function () {
                b._isCloseable = !0, b.options.overlayTheme && b.element.page("removeContainerBackground").page("setContainerBackground", b.options.overlayTheme)
            })
        }, close:function () {
            var b;
            this._isCloseable && (this._isCloseable = !1, a.mobile.hashListeningEnabled ? a.mobile.back() : (b = a.mobile.urlHistory.getPrev().url, a.mobile.path.isPath(b) || (b = a.mobile.path.makeUrlAbsolute("#" + b)), a.mobile.changePage(b, {changeHash:!1, fromHashChange:!0})))
        }}), a(c).delegate(a.mobile.dialog.prototype.options.initSelector, "pagecreate", function () {
            a.mobile.dialog.prototype.enhance(this)
        })
    }(a, this), function (a, b) {
        a.mobile.page.prototype.options.backBtnText = "Back", a.mobile.page.prototype.options.addBackBtn = !1, a.mobile.page.prototype.options.backBtnTheme = null, a.mobile.page.prototype.options.headerTheme = "a", a.mobile.page.prototype.options.footerTheme = "a", a.mobile.page.prototype.options.contentTheme = null, a(c).bind("pagecreate", function (b) {
            var c = a(b.target), d = c.data("page").options, e = c.jqmData("role"), f = d.theme;
            a(":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')", c).jqmEnhanceable().each(function () {
                var b = a(this), g = b.jqmData("role"), h = b.jqmData("theme"), i = h || d.contentTheme || e === "dialog" && f, j, k, l, m;
                b.addClass("ui-" + g);
                if (g === "header" || g === "footer") {
                    var n = h || (g === "header" ? d.headerTheme : d.footerTheme) || f;
                    b.addClass("ui-bar-" + n).attr("role", g === "header" ? "banner" : "contentinfo"), g === "header" && (j = b.children("a, button"), k = j.hasClass("ui-btn-left"), l = j.hasClass("ui-btn-right"), k = k || j.eq(0).not(".ui-btn-right").addClass("ui-btn-left").length, l = l || j.eq(1).addClass("ui-btn-right").length), d.addBackBtn && g === "header" && a(".ui-page").length > 1 && c.jqmData("url") !== a.mobile.path.stripHash(location.hash) && !k && (m = a("<a href='javascript:void(0);' class='ui-btn-left' data-" + a.mobile.ns + "rel='back' data-" + a.mobile.ns + "icon='arrow-l'>" + d.backBtnText + "</a>").attr("data-" + a.mobile.ns + "theme", d.backBtnTheme || n).prependTo(b)), b.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({role:"heading", "aria-level":"1"})
                } else g === "content" && (i && b.addClass("ui-body-" + i), b.attr("role", "main"))
            })
        })
    }(a), function (a, b) {
        a.fn.fieldcontain = function (a) {
            return this.addClass("ui-field-contain ui-body ui-br").contents().filter(function () {
                return this.nodeType === 3 && !/\S/.test(this.nodeValue)
            }).remove()
        }, a(c).bind("pagecreate create", function (b) {
            a(":jqmData(role='fieldcontain')", b.target).jqmEnhanceable().fieldcontain()
        })
    }(a), function (a, b) {
        a.fn.grid = function (b) {
            return this.each(function () {
                var c = a(this), d = a.extend({grid:null}, b), e = c.children(), f = {solo:1, a:2, b:3, c:4, d:5}, g = d.grid, h;
                if (!g)if (e.length <= 5)for (var i in f)f[i] === e.length && (g = i); else g = "a", c.addClass("ui-grid-duo");
                h = f[g], c.addClass("ui-grid-" + g), e.filter(":nth-child(" + h + "n+1)").addClass("ui-block-a"), h > 1 && e.filter(":nth-child(" + h + "n+2)").addClass("ui-block-b"), h > 2 && e.filter(":nth-child(" + h + "n+3)").addClass("ui-block-c"), h > 3 && e.filter(":nth-child(" + h + "n+4)").addClass("ui-block-d"), h > 4 && e.filter(":nth-child(" + h + "n+5)").addClass("ui-block-e")
            })
        }
    }(a), function (a, b) {
        a(c).bind("pagecreate create", function (b) {
            a(":jqmData(role='nojs')", b.target).addClass("ui-nojs")
        })
    }(a), function (a, b) {
        function d(a) {
            var b;
            while (a) {
                b = typeof a.className == "string" && a.className + " ";
                if (b && b.indexOf("ui-btn ") > -1 && b.indexOf("ui-disabled ") < 0)break;
                a = a.parentNode
            }
            return a
        }

        a.fn.buttonMarkup = function (d) {
            var f = this, g = function (b, c) {
                j.setAttribute("data-" + a.mobile.ns + b, c), i.jqmData(b, c)
            };
            d = d && a.type(d) === "object" ? d : {};
            for (var h = 0; h < f.length; h++) {
                var i = f.eq(h), j = i[0], k = a.extend({}, a.fn.buttonMarkup.defaults, {icon:d.icon !== b ? d.icon : i.jqmData("icon"), iconpos:d.iconpos !== b ? d.iconpos : i.jqmData("iconpos"), theme:d.theme !== b ? d.theme : i.jqmData("theme") || a.mobile.getInheritedTheme(i, "c"), inline:d.inline !== b ? d.inline : i.jqmData("inline"), shadow:d.shadow !== b ? d.shadow : i.jqmData("shadow"), corners:d.corners !== b ? d.corners : i.jqmData("corners"), iconshadow:d.iconshadow !== b ? d.iconshadow : i.jqmData("iconshadow"), mini:d.mini !== b ? d.mini : i.jqmData("mini")}, d), l = "ui-btn-inner", m = "ui-btn-text", n, o, p, q, r, s;
                a.each(k, g), i.jqmData("rel") === "popup" && i.attr("href") && (j.setAttribute("aria-haspopup", !0), j.setAttribute("aria-owns", j.getAttribute("href"))), s = a.data(j.tagName === "INPUT" || j.tagName === "BUTTON" ? j.parentNode : j, "buttonElements"), s ? (j = s.outer, i = a(j), p = s.inner, q = s.text, a(s.icon).remove(), s.icon = null) : (p = c.createElement(k.wrapperEls), q = c.createElement(k.wrapperEls)), r = k.icon ? c.createElement("span") : null, e && !s && e(), k.theme || (k.theme = a.mobile.getInheritedTheme(i, "c")), n = "ui-btn ui-btn-up-" + k.theme, n += k.shadow ? " ui-shadow" : "", n += k.corners ? " ui-btn-corner-all" : "", k.mini !== b && (n += k.mini === !0 ? " ui-mini" : " ui-fullsize"), k.inline !== b && (n += k.inline === !0 ? " ui-btn-inline" : " ui-btn-block"), k.icon && (k.icon = "ui-icon-" + k.icon, k.iconpos = k.iconpos || "left", o = "ui-icon " + k.icon, k.iconshadow && (o += " ui-icon-shadow")), k.iconpos && (n += " ui-btn-icon-" + k.iconpos, k.iconpos === "notext" && !i.attr("title") && i.attr("title", i.getEncodedText())), l += k.corners ? " ui-btn-corner-all" : "", k.iconpos && k.iconpos === "notext" && !i.attr("title") && i.attr("title", i.getEncodedText()), s && i.removeClass(s.bcls || ""), i.removeClass("ui-link").addClass(n), p.className = l, q.className = m, s || p.appendChild(q);
                if (r) {
                    r.className = o;
                    if (!s || !s.icon)r.innerHTML = "&#160;", p.appendChild(r)
                }
                while (j.firstChild && !s)q.appendChild(j.firstChild);
                s || j.appendChild(p), s = {bcls:n, outer:j, inner:p, text:q, icon:r}, a.data(j, "buttonElements", s), a.data(p, "buttonElements", s), a.data(q, "buttonElements", s), r && a.data(r, "buttonElements", s)
            }
            return this
        }, a.fn.buttonMarkup.defaults = {corners:!0, shadow:!0, iconshadow:!0, wrapperEls:"span"};
        var e = function () {
            var b = a.mobile.buttonMarkup.hoverDelay, f, g;
            a(c).bind({"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart":function (c) {
                var e, h = a(d(c.target)), i = c.originalEvent && /^touch/.test(c.originalEvent.type), j = c.type;
                if (h.length) {
                    e = h.attr("data-" + a.mobile.ns + "theme");
                    if (j === "vmousedown")i ? f = setTimeout(function () {
                        h.removeClass("ui-btn-up-" + e).addClass("ui-btn-down-" + e)
                    }, b) : h.removeClass("ui-btn-up-" + e).addClass("ui-btn-down-" + e); else if (j === "vmousecancel" || j === "vmouseup")h.removeClass("ui-btn-down-" + e).addClass("ui-btn-up-" + e); else if (j === "vmouseover" || j === "focus")i ? g = setTimeout(function () {
                        h.removeClass("ui-btn-up-" + e).addClass("ui-btn-hover-" + e)
                    }, b) : h.removeClass("ui-btn-up-" + e).addClass("ui-btn-hover-" + e); else if (j === "vmouseout" || j === "blur" || j === "scrollstart")h.removeClass("ui-btn-hover-" + e + " ui-btn-down-" + e).addClass("ui-btn-up-" + e), f && clearTimeout(f), g && clearTimeout(g)
                }
            }, "focusin focus":function (b) {
                a(d(b.target)).addClass(a.mobile.focusClass)
            }, "focusout blur":function (b) {
                a(d(b.target)).removeClass(a.mobile.focusClass)
            }}), e = null
        };
        a(c).bind("pagecreate create", function (b) {
            a(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a", b.target).jqmEnhanceable().not("button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").buttonMarkup()
        })
    }(a), function (a, b) {
        a.widget("mobile.collapsible", a.mobile.widget, {options:{expandCueText:" click to expand contents", collapseCueText:" click to collapse contents", collapsed:!0, heading:"h1,h2,h3,h4,h5,h6,legend", theme:null, contentTheme:null, inset:!0, mini:!1, initSelector:":jqmData(role='collapsible')"}, _create:function () {
            var c = this.element, d = this.options, e = c.addClass("ui-collapsible"), f = c.children(d.heading).first(), g = c.jqmData("collapsed-icon") || d.collapsedIcon, h = c.jqmData("expanded-icon") || d.expandedIcon, i = e.wrapInner("<div class='ui-collapsible-content'></div>").children(".ui-collapsible-content"), j = c.closest(":jqmData(role='collapsible-set')").addClass("ui-collapsible-set");
            f.is("legend") && (f = a("<div role='heading'>" + f.html() + "</div>").insertBefore(f), f.next().remove()), j.length ? (d.theme || (d.theme = j.jqmData("theme") || a.mobile.getInheritedTheme(j, "c")), d.contentTheme || (d.contentTheme = j.jqmData("content-theme")), d.collapsedIcon || (d.collapsedIcon = j.jqmData("collapsed-icon")), d.expandedIcon || (d.expandedIcon = j.jqmData("expanded-icon")), d.iconPos || (d.iconPos = j.jqmData("iconpos")), j.jqmData("inset") !== b ? d.inset = j.jqmData("inset") : d.inset = !0, d.mini || (d.mini = j.jqmData("mini"))) : d.theme || (d.theme = a.mobile.getInheritedTheme(c, "c")), !d.inset || e.addClass("ui-collapsible-inset"), i.addClass(d.contentTheme ? "ui-body-" + d.contentTheme : ""), g = c.jqmData("collapsed-icon") || d.collapsedIcon || "plus", h = c.jqmData("expanded-icon") || d.expandedIcon || "minus", f.insertBefore(i).addClass("ui-collapsible-heading").append("<span class='ui-collapsible-heading-status'></span>").wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a").first().buttonMarkup({shadow:!1, corners:!1, iconpos:c.jqmData("iconpos") || d.iconPos || "left", icon:g, mini:d.mini, theme:d.theme}), !d.inset || f.find("a").first().add(".ui-btn-inner", c).addClass("ui-corner-top ui-corner-bottom"), e.bind("expand collapse",function (b) {
                if (!b.isDefaultPrevented()) {
                    var c = a(this), k = b.type === "collapse", l = d.contentTheme;
                    b.preventDefault(), f.toggleClass("ui-collapsible-heading-collapsed", k).find(".ui-collapsible-heading-status").text(k ? d.expandCueText : d.collapseCueText).end().find(".ui-icon").toggleClass("ui-icon-" + h, !k).toggleClass("ui-icon-" + g, k || h === g).end().find("a").first().removeClass(a.mobile.activeBtnClass), c.toggleClass("ui-collapsible-collapsed", k), i.toggleClass("ui-collapsible-content-collapsed", k).attr("aria-hidden", k), l && !!d.inset && (!j.length || e.jqmData("collapsible-last")) && (f.find("a").first().add(f.find(".ui-btn-inner")).toggleClass("ui-corner-bottom", k), i.toggleClass("ui-corner-bottom", !k)), i.trigger("updatelayout")
                }
            }).trigger(d.collapsed ? "collapse" : "expand"), f.bind("tap",function (b) {
                f.find("a").first().addClass(a.mobile.activeBtnClass)
            }).bind("click", function (a) {
                var b = f.is(".ui-collapsible-heading-collapsed") ? "expand" : "collapse";
                e.trigger(b), a.preventDefault(), a.stopPropagation()
            })
        }}), a(c).bind("pagecreate create", function (b) {
            a.mobile.collapsible.prototype.enhanceWithin(b.target)
        })
    }(a), function (a, b) {
        a.widget("mobile.collapsibleset", a.mobile.widget, {options:{initSelector:":jqmData(role='collapsible-set')"}, _create:function () {
            var c = this.element.addClass("ui-collapsible-set"), d = this.options;
            d.theme || (d.theme = a.mobile.getInheritedTheme(c, "c")), d.contentTheme || (d.contentTheme = c.jqmData("content-theme")), c.jqmData("inset") !== b && (d.inset = c.jqmData("inset")), d.inset = d.inset !== b ? d.inset : !0, c.jqmData("collapsiblebound") || c.jqmData("collapsiblebound", !0).bind("expand collapse",function (b) {
                var c = b.type === "collapse", e = a(b.target).closest(".ui-collapsible"), f = e.data("collapsible");
                e.jqmData("collapsible-last") && !!d.inset && (e.find(".ui-collapsible-heading").first().find("a").first().toggleClass("ui-corner-bottom", c).find(".ui-btn-inner").toggleClass("ui-corner-bottom", c), e.find(".ui-collapsible-content").toggleClass("ui-corner-bottom", !c))
            }).bind("expand", function (b) {
                var c = a(b.target).closest(".ui-collapsible");
                c.parent().is(":jqmData(role='collapsible-set')") && c.siblings(".ui-collapsible").trigger("collapse")
            })
        }, _init:function () {
            var a = this.element, b = a.children(":jqmData(role='collapsible')"), c = b.filter(":jqmData(collapsed='false')");
            this.refresh(), c.trigger("expand")
        }, refresh:function () {
            var b = this.element, c = this.options, d = b.children(":jqmData(role='collapsible')");
            a.mobile.collapsible.prototype.enhance(d.not(".ui-collapsible")), !c.inset || (d.each(function () {
                a(this).jqmRemoveData("collapsible-last").find(".ui-collapsible-heading").find("a").first().removeClass("ui-corner-top ui-corner-bottom").find(".ui-btn-inner").removeClass("ui-corner-top ui-corner-bottom")
            }), d.first().find("a").first().addClass("ui-corner-top").find(".ui-btn-inner").addClass("ui-corner-top"), d.last().jqmData("collapsible-last", !0).find("a").first().addClass("ui-corner-bottom").find(".ui-btn-inner").addClass("ui-corner-bottom"))
        }}), a(c).bind("pagecreate create", function (b) {
            a.mobile.collapsibleset.prototype.enhanceWithin(b.target)
        })
    }(a), function (a, b) {
        a.widget("mobile.navbar", a.mobile.widget, {options:{iconpos:"top", grid:null, initSelector:":jqmData(role='navbar')"}, _create:function () {
            var c = this.element, d = c.find("a"), e = d.filter(":jqmData(icon)").length ? this.options.iconpos : b;
            c.addClass("ui-navbar ui-mini").attr("role", "navigation").find("ul").jqmEnhanceable().grid({grid:this.options.grid}), d.buttonMarkup({corners:!1, shadow:!1, inline:!0, iconpos:e}), c.delegate("a", "vclick", function (b) {
                a(b.target).hasClass("ui-disabled") || (d.removeClass(a.mobile.activeBtnClass), a(this).addClass(a.mobile.activeBtnClass))
            }), c.closest(".ui-page").bind("pagebeforeshow", function () {
                d.filter(".ui-state-persist").addClass(a.mobile.activeBtnClass)
            })
        }}), a(c).bind("pagecreate create", function (b) {
            a.mobile.navbar.prototype.enhanceWithin(b.target)
        })
    }(a), function (a, b) {
        var d = {};
        a.widget("mobile.listview", a.mobile.widget, {options:{theme:null, countTheme:"c", headerTheme:"b", dividerTheme:"b", splitIcon:"arrow-r", splitTheme:"b", inset:!1, initSelector:":jqmData(role='listview')"}, _create:function () {
            var a = this, b = "";
            b += a.options.inset ? " ui-listview-inset ui-corner-all ui-shadow " : "", a.element.addClass(function (a, c) {
                return c + " ui-listview " + b
            }), a.refresh(!0)
        }, _removeCorners:function (a, b) {
            var c = "ui-corner-top ui-corner-tr ui-corner-tl", d = "ui-corner-bottom ui-corner-br ui-corner-bl";
            a = a.add(a.find(".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb")), b === "top" ? a.removeClass(c) : b === "bottom" ? a.removeClass(d) : a.removeClass(c + " " + d)
        }, _refreshCorners:function (a) {
            var b, c, d, e;
            b = this.element.children("li"), c = a || b.filter(":visible").length === 0 ? b.not(".ui-screen-hidden") : b.filter(":visible"), b.filter(".ui-li-last").removeClass("ui-li-last"), this.options.inset ? (this._removeCorners(b), d = c.first().addClass("ui-corner-top"), d.add(d.find(".ui-btn-inner").not(".ui-li-link-alt span:first-child")).addClass("ui-corner-top").end().find(".ui-li-link-alt, .ui-li-link-alt span:first-child").addClass("ui-corner-tr").end().find(".ui-li-thumb").not(".ui-li-icon").addClass("ui-corner-tl"), e = c.last().addClass("ui-corner-bottom ui-li-last"), e.add(e.find(".ui-btn-inner")).find(".ui-li-link-alt").addClass("ui-corner-br").end().find(".ui-li-thumb").not(".ui-li-icon").addClass("ui-corner-bl")) : c.last().addClass("ui-li-last"), a || this.element.trigger("updatelayout")
        }, _findFirstElementByTagName:function (a, b, c, d) {
            var e = {};
            e[c] = e[d] = !0;
            while (a) {
                if (e[a.nodeName])return a;
                a = a[b]
            }
            return null
        }, _getChildrenByTagName:function (b, c, d) {
            var e = [], f = {};
            f[c] = f[d] = !0, b = b.firstChild;
            while (b)f[b.nodeName] && e.push(b), b = b.nextSibling;
            return a(e)
        }, _addThumbClasses:function (b) {
            var c, d, e = b.length;
            for (c = 0; c < e; c++)d = a(this._findFirstElementByTagName(b[c].firstChild, "nextSibling", "img", "IMG")), d.length && (d.addClass("ui-li-thumb"), a(this._findFirstElementByTagName(d[0].parentNode, "parentNode", "li", "LI")).addClass(d.is(".ui-li-icon") ? "ui-li-has-icon" : "ui-li-has-thumb"))
        }, refresh:function (b) {
            this.parentPage = this.element.closest(".ui-page"), this._createSubPages();
            var d = this.options, e = this.element, f = this, g = e.jqmData("dividertheme") || d.dividerTheme, h = e.jqmData("splittheme"), i = e.jqmData("spliticon"), j = this._getChildrenByTagName(e[0], "li", "LI"), k = !!a.nodeName(e[0], "ol"), l = !a.support.cssPseudoElement, m = e.attr("start"), n = {}, o, p, q, r, s, t, u, v, w, x, y, z, A, B;
            k && l && e.find(".ui-li-dec").remove(), k && (m || m === 0 ? l ? u = parseFloat(m) : (v = parseFloat(m) - 1, e.css("counter-reset", "listnumbering " + v)) : l && (u = 1)), d.theme || (d.theme = a.mobile.getInheritedTheme(this.element, "c"));
            for (var C = 0, D = j.length; C < D; C++) {
                o = j.eq(C), p = "ui-li";
                if (b || !o.hasClass("ui-li")) {
                    q = o.jqmData("theme") || d.theme, r = this._getChildrenByTagName(o[0], "a", "A");
                    var E = o.jqmData("role") === "list-divider";
                    r.length && !E ? (y = o.jqmData("icon"), o.buttonMarkup({wrapperEls:"div", shadow:!1, corners:!1, iconpos:"right", icon:r.length > 1 || y === !1 ? !1 : y || "arrow-r", theme:q}), y !== !1 && r.length === 1 && o.addClass("ui-li-has-arrow"), r.first().removeClass("ui-link").addClass("ui-link-inherit"), r.length > 1 && (p += " ui-li-has-alt", s = r.last(), t = h || s.jqmData("theme") || d.splitTheme, B = s.jqmData("icon"), s.appendTo(o).attr("title", s.getEncodedText()).addClass("ui-li-link-alt").empty().buttonMarkup({shadow:!1, corners:!1, theme:q, icon:!1, iconpos:"notext"}).find(".ui-btn-inner").append(a(c.createElement("span")).buttonMarkup({shadow:!0, corners:!0, theme:t, iconpos:"notext", icon:B || y || i || d.splitIcon})))) : E ? (p += " ui-li-divider ui-bar-" + g, o.attr("role", "heading"), k && (m || m === 0 ? l ? u = parseFloat(m) : (w = parseFloat(m) - 1, o.css("counter-reset", "listnumbering " + w)) : l && (u = 1))) : p += " ui-li-static ui-btn-up-" + q
                }
                k && l && p.indexOf("ui-li-divider") < 0 && (x = p.indexOf("ui-li-static") > 0 ? o : o.find(".ui-link-inherit"), x.addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>" + u++ + ". </span>")), n[p] || (n[p] = []), n[p].push(o[0])
            }
            for (p in n)a(n[p]).addClass(p).children(".ui-btn-inner").addClass(p);
            e.find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(".ui-li-aside").each(function () {
                var b = a(this);
                b.prependTo(b.parent())
            }).end().find(".ui-li-count").each(function () {
                a(this).closest("li").addClass("ui-li-has-count")
            }).addClass("ui-btn-up-" + (e.jqmData("counttheme") || this.options.countTheme) + " ui-btn-corner-all"), this._addThumbClasses(j), this._addThumbClasses(e.find(".ui-link-inherit")), this._refreshCorners(b), this._trigger("afterrefresh")
        }, _idStringEscape:function (a) {
            return a.replace(/[^a-zA-Z0-9]/g, "-")
        }, _createSubPages:function () {
            var b = this.element, c = b.closest(".ui-page"), e = c.jqmData("url"), f = e || c[0][a.expando], g = b.attr("id"), h = this.options, i = "data-" + a.mobile.ns, j = this, k = c.find(":jqmData(role='footer')").jqmData("id"), l;
            typeof d[f] == "undefined" && (d[f] = -1), g = g || ++d[f], a(b.find("li>ul, li>ol").toArray().reverse()).each(function (c) {
                var d = this, f = a(this), j = f.attr("id") || g + "-" + c, m = f.parent(), n = a(f.prevAll().toArray().reverse()), p = n.length ? n : a("<span>" + a.trim(m.contents()[0].nodeValue) + "</span>"), q = p.first().getEncodedText(), r = (e || "") + "&" + a.mobile.subPageUrlKey + "=" + j, s = f.jqmData("theme") || h.theme, t = f.jqmData("counttheme") || b.jqmData("counttheme") || h.countTheme, u, v;
                l = !0, u = f.detach().wrap("<div " + i + "role='page' " + i + "url='" + r + "' " + i + "theme='" + s + "' " + i + "count-theme='" + t + "'><div " + i + "role='content'></div></div>").parent().before("<div " + i + "role='header' " + i + "theme='" + h.headerTheme + "'><div class='ui-title'>" + q + "</div></div>").after(k ? a("<div " + i + "role='footer' " + i + "id='" + k + "'>") : "").parent().appendTo(a.mobile.pageContainer), u.page(), v = m.find("a:first"), v.length || (v = a("<a/>").html(p || q).prependTo(m.empty())), v.attr("href", "#" + r)
            }).listview();
            if (l && c.is(":jqmData(external-page='true')") && c.data("page").options.domCache === !1) {
                var m = function (b, d) {
                    var f = d.nextPage, g, h = new a.Event("pageremove");
                    d.nextPage && (g = f.jqmData("url"), g.indexOf(e + "&" + a.mobile.subPageUrlKey) !== 0 && (j.childPages().remove(), c.trigger(h), h.isDefaultPrevented() || c.removeWithDependents()))
                };
                c.unbind("pagehide.remove").bind("pagehide.remove", m)
            }
        }, childPages:function () {
            var b = this.parentPage.jqmData("url");
            return a(":jqmData(url^='" + b + "&" + a.mobile.subPageUrlKey + "')")
        }}), a(c).bind("pagecreate create", function (b) {
            a.mobile.listview.prototype.enhanceWithin(b.target)
        })
    }(a), function (a, b) {
        a.mobile.listview.prototype.options.autodividers = !1, a.mobile.listview.prototype.options.autodividersSelector = function (a) {
            var b = a.text() || null;
            return b ? (b = b.slice(0, 1).toUpperCase(), b) : null
        }, a(c).delegate("ul,ol", "listviewcreate", function () {
            var b = a(this), d = b.data("listview");
            if (!d || !d.options.autodividers)return;
            var e = function () {
                b.find("li:jqmData(role='list-divider')").remove();
                var e = b.find("li"), f = null, g, h;
                for (var i = 0; i < e.length; i++) {
                    g = e[i], h = d.options.autodividersSelector(a(g));
                    if (h && f !== h) {
                        var j = c.createElement("li");
                        j.appendChild(c.createTextNode(h)), j.setAttribute("data-" + a.mobile.ns + "role", "list-divider"), g.parentNode.insertBefore(j, g)
                    }
                    f = h
                }
            }, f = function () {
                b.unbind("listviewafterrefresh", f), e(), d.refresh(), b.bind("listviewafterrefresh", f)
            };
            f()
        })
    }(a), function (a, b) {
        a.widget("mobile.checkboxradio", a.mobile.widget, {options:{theme:null, initSelector:"input[type='checkbox'],input[type='radio']"}, _create:function () {
            var d = this, e = this.element, f = function (a, b) {
                return a.jqmData(b) || a.closest("form, fieldset").jqmData(b)
            }, g = a(e).closest("label"), h = g.length ? g : a(e).closest("form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')").find("label").filter("[for='" + e[0].id + "']").first(), i = e[0].type, j = f(e, "mini"), k = i + "-on", l = i + "-off", m = e.parents(":jqmData(type='horizontal')").length ? b : l, n = f(e, "iconpos"), o = m ? "" : " " + a.mobile.activeBtnClass, p = "ui-" + k + o, q = "ui-" + l, r = "ui-icon-" + k, s = "ui-icon-" + l;
            if (i !== "checkbox" && i !== "radio")return;
            a.extend(this, {label:h, inputtype:i, checkedClass:p, uncheckedClass:q, checkedicon:r, uncheckedicon:s}), this.options.theme || (this.options.theme = a.mobile.getInheritedTheme(this.element, "c")), h.buttonMarkup({theme:this.options.theme, icon:m, shadow:!1, mini:j, iconpos:n});
            var t = c.createElement("div");
            t.className = "ui-" + i, e.add(h).wrapAll(t), h.bind({vmouseover:function (b) {
                a(this).parent().is(".ui-disabled") && b.stopPropagation()
            }, vclick:function (a) {
                if (e.is(":disabled")) {
                    a.preventDefault();
                    return
                }
                return d._cacheVals(), e.prop("checked", i === "radio" && !0 || !e.prop("checked")), e.triggerHandler("click"), d._getInputSet().not(e).prop("checked", !1), d._updateAll(), !1
            }}), e.bind({vmousedown:function () {
                d._cacheVals()
            }, vclick:function () {
                var b = a(this);
                b.is(":checked") ? (b.prop("checked", !0), d._getInputSet().not(b).prop("checked", !1)) : b.prop("checked", !1), d._updateAll()
            }, focus:function () {
                h.addClass(a.mobile.focusClass)
            }, blur:function () {
                h.removeClass(a.mobile.focusClass)
            }}), this.refresh()
        }, _cacheVals:function () {
            this._getInputSet().each(function () {
                a(this).jqmData("cacheVal", this.checked)
            })
        }, _getInputSet:function () {
            return this.inputtype === "checkbox" ? this.element : this.element.closest("form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')").find("input[name='" + this.element[0].name + "'][type='" + this.inputtype + "']")
        }, _updateAll:function () {
            var b = this;
            this._getInputSet().each(function () {
                var c = a(this);
                (this.checked || b.inputtype === "checkbox") && c.trigger("change")
            }).checkboxradio("refresh")
        }, refresh:function () {
            var a = this.element[0], b = this.label, c = b.find(".ui-icon");
            a.checked ? (b.addClass(this.checkedClass).removeClass(this.uncheckedClass), c.addClass(this.checkedicon).removeClass(this.uncheckedicon)) : (b.removeClass(this.checkedClass).addClass(this.uncheckedClass), c.removeClass(this.checkedicon).addClass(this.uncheckedicon)), a.disabled ? this.disable() : this.enable()
        }, disable:function () {
            this.element.prop("disabled", !0).parent().addClass("ui-disabled")
        }, enable:function () {
            this.element.prop("disabled", !1).parent().removeClass("ui-disabled")
        }}), a(c).bind("pagecreate create", function (b) {
            a.mobile.checkboxradio.prototype.enhanceWithin(b.target, !0)
        })
    }(a), function (a, b) {
        a.widget("mobile.button", a.mobile.widget, {options:{theme:null, icon:null, iconpos:null, corners:!0, shadow:!0, iconshadow:!0, initSelector:"button, [type='button'], [type='submit'], [type='reset']"}, _create:function () {
            var d = this.element, e, f = this.options, g, h, i = f.inline || d.jqmData("inline"), j = f.mini || d.jqmData("mini"), k = "", l;
            if (d[0].tagName === "A") {
                d.hasClass("ui-btn") || d.buttonMarkup();
                return
            }
            this.options.theme || (this.options.theme = a.mobile.getInheritedTheme(this.element, "c")), !~d[0].className.indexOf("ui-btn-left") || (k = "ui-btn-left"), !~d[0].className.indexOf("ui-btn-right") || (k = "ui-btn-right");
            if (d.attr("type") === "submit" || d.attr("type") === "reset")k ? k += " ui-submit" : k = "ui-submit";
            a("label[for='" + d.attr("id") + "']").addClass("ui-submit"), this.button = a("<div></div>")[d.html() ? "html" : "text"](d.html() || d.val()).insertBefore(d).buttonMarkup({theme:f.theme, icon:f.icon, iconpos:f.iconpos, inline:i, corners:f.corners, shadow:f.shadow, iconshadow:f.iconshadow, mini:j}).addClass(k).append(d.addClass("ui-btn-hidden")), e = this.button, g = d.attr("type"), h = d.attr("name"), g !== "button" && g !== "reset" && h && d.bind("vclick", function () {
                l === b && (l = a("<input>", {type:"hidden", name:d.attr("name"), value:d.attr("value")}).insertBefore(d), a(c).one("submit", function () {
                    l.remove(), l = b
                }))
            }), d.bind({focus:function () {
                e.addClass(a.mobile.focusClass)
            }, blur:function () {
                e.removeClass(a.mobile.focusClass)
            }}), this.refresh()
        }, enable:function () {
            return this.element.attr("disabled", !1), this.button.removeClass("ui-disabled").attr("aria-disabled", !1), this._setOption("disabled", !1)
        }, disable:function () {
            return this.element.attr("disabled", !0), this.button.addClass("ui-disabled").attr("aria-disabled", !0), this._setOption("disabled", !0)
        }, refresh:function () {
            var b = this.element;
            b.prop("disabled") ? this.disable() : this.enable(), a(this.button.data("buttonElements").text)[b.html() ? "html" : "text"](b.html() || b.val())
        }}), a(c).bind("pagecreate create", function (b) {
            a.mobile.button.prototype.enhanceWithin(b.target, !0)
        })
    }(a), function (a, b) {
        a.fn.controlgroup = function (b) {
            function c(a, b) {
                a.removeClass("ui-btn-corner-all ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-controlgroup-last ui-shadow").eq(0).addClass(b[0]).end().last().addClass(b[1]).addClass("ui-controlgroup-last")
            }

            return this.each(function () {
                var d = a(this), e = a.extend({direction:d.jqmData("type") || "vertical", shadow:!1, excludeInvisible:!0, mini:d.jqmData("mini")}, b), f = d.children("legend"), g = d.children(".ui-controlgroup-label"), h = d.children(".ui-controlgroup-controls"), i = e.direction === "horizontal" ? ["ui-corner-left", "ui-corner-right"] : ["ui-corner-top", "ui-corner-bottom"], j = d.find("input").first().attr("type");
                h.length && h.contents().unwrap(), d.wrapInner("<div class='ui-controlgroup-controls'></div>"), f.length ? (a("<div role='heading' class='ui-controlgroup-label'>" + f.html() + "</div>").insertBefore(d.children(0)), f.remove()) : g.length && d.prepend(g), d.addClass("ui-corner-all ui-controlgroup ui-controlgroup-" + e.direction), c(d.find(".ui-btn" + (e.excludeInvisible ? ":visible" : "")).not(".ui-slider-handle"), i), c(d.find(".ui-btn-inner"), i), e.shadow && d.addClass("ui-shadow"), e.mini && d.addClass("ui-mini")
            })
        }
    }(a), function (a, b) {
        a(c).bind("pagecreate create", function (b) {
            a(b.target).find("a").jqmEnhanceable().not(".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")
        })
    }(a), function (a, d) {
        function e(a, b, c, d) {
            var e = d;
            return a < b ? e = c + (a - b) / 2 : e = Math.min(Math.max(c, d - b / 2), c + a - b), e
        }

        function f() {
            var c = a(b);
            return{x:c.scrollLeft(), y:c.scrollTop(), cx:b.innerWidth || c.width(), cy:b.innerHeight || c.height()}
        }

        a.widget("mobile.popup", a.mobile.widget, {options:{theme:null, overlayTheme:null, shadow:!0, corners:!0, transition:"none", positionTo:"origin", tolerance:null, initSelector:":jqmData(role='popup')", closeLinkSelector:"a:jqmData(rel='back')", closeLinkEvents:"click.popup", navigateEvents:"navigate.popup", closeEvents:"navigate.popup pagebeforechange.popup", history:!a.mobile.browser.ie}, _eatEventAndClose:function (a) {
            return a.preventDefault(), a.stopImmediatePropagation(), this.close(), !1
        }, _resizeScreen:function () {
            var a = this._ui.container.outerHeight(!0);
            this._ui.screen.removeAttr("style"), a > this._ui.screen.height() && this._ui.screen.height(a)
        }, _handleWindowKeyUp:function (b) {
            if (this._isOpen && b.keyCode === a.mobile.keyCode.ESCAPE)return this._eatEventAndClose(b)
        }, _maybeRefreshTimeout:function () {
            var b = f();
            if (this._resizeData) {
                if (b.x === this._resizeData.winCoords.x && b.y === this._resizeData.winCoords.y && b.cx === this._resizeData.winCoords.cx && b.cy === this._resizeData.winCoords.cy)return!1;
                clearTimeout(this._resizeData.timeoutId)
            }
            return this._resizeData = {timeoutId:setTimeout(a.proxy(this, "_resizeTimeout"), 200), winCoords:b}, !0
        }, _resizeTimeout:function () {
            this._maybeRefreshTimeout() || (this._trigger("beforeposition"), this._ui.container.removeClass("ui-selectmenu-hidden").offset(this._placementCoords(this._desiredCoords(d, d, "window"))), this._resizeScreen(), this._resizeData = null, this._orientationchangeInProgress = !1)
        }, _handleWindowResize:function (a) {
            this._isOpen && this._maybeRefreshTimeout()
        }, _handleWindowOrientationchange:function (a) {
            this._orientationchangeInProgress || (this._ui.container.addClass("ui-selectmenu-hidden").removeAttr("style"), this._orientationchangeInProgress = !0)
        }, _create:function () {
            var c = {screen:a("<div class='ui-screen-hidden ui-popup-screen'></div>"), placeholder:a("<div style='display: none;'><!-- placeholder --></div>"), container:a("<div class='ui-popup-container ui-selectmenu-hidden'></div>")}, e = this.element.closest(".ui-page"), f = this.element.attr("id"), g = this;
            this.options.history = this.options.history && a.mobile.ajaxEnabled && a.mobile.hashListeningEnabled, e.length === 0 && (e = a("body")), this.options.container = this.options.container || a.mobile.pageContainer, e.append(c.screen), c.container.insertAfter(c.screen), c.placeholder.insertAfter(this.element), f && (c.screen.attr("id", f + "-screen"), c.container.attr("id", f + "-popup"), c.placeholder.html("<!-- placeholder for " + f + " -->")), c.container.append(this.element), this.element.addClass("ui-popup"), a.extend(this, {_page:e, _ui:c, _fallbackTransition:"", _currentTransition:!1, _prereqs:null, _isOpen:!1, _tolerance:null, _resizeData:null, _orientationchangeInProgress:!1, _globalHandlers:[
                {src:a(b), handler:{orientationchange:a.proxy(this, "_handleWindowOrientationchange"), resize:a.proxy(this, "_handleWindowResize"), keyup:a.proxy(this, "_handleWindowKeyUp")}}
            ]}), a.each(this.options, function (a, b) {
                g.options[a] = d, g._setOption(a, b, !0)
            }), c.screen.bind("vclick", a.proxy(this, "_eatEventAndClose")), a.each(this._globalHandlers, function (a, b) {
                b.src.bind(b.handler)
            })
        }, _applyTheme:function (a, b, c) {
            var d = (a.attr("class") || "").split(" "), e = !0, f = null, g, h = String(b);
            while (d.length > 0) {
                f = d.pop(), g = (new RegExp("^ui-" + c + "-([a-z])$")).exec(f);
                if (g && g.length > 1) {
                    f = g[1];
                    break
                }
                f = null
            }
            b !== f && (a.removeClass("ui-" + c + "-" + f), b !== null && b !== "none" && a.addClass("ui-" + c + "-" + h))
        }, _setTheme:function (a) {
            this._applyTheme(this.element, a, "body")
        }, _setOverlayTheme:function (a) {
            this._applyTheme(this._ui.screen, a, "overlay"), this._isOpen && this._ui.screen.addClass("in")
        }, _setShadow:function (a) {
            this.element.toggleClass("ui-overlay-shadow", a)
        }, _setCorners:function (a) {
            this.element.toggleClass("ui-corner-all", a)
        }, _applyTransition:function (b) {
            this._ui.container.removeClass(this._fallbackTransition), b && b !== "none" && (this._fallbackTransition = a.mobile._maybeDegradeTransition(b), this._ui.container.addClass(this._fallbackTransition))
        }, _setTransition:function (a) {
            this._currentTransition || this._applyTransition(a)
        }, _setTolerance:function (b) {
            var c = {t:30, r:15, b:30, l:15};
            if (b) {
                var d = String(b).split(",");
                a.each(d, function (a, b) {
                    d[a] = parseInt(b, 10)
                });
                switch (d.length) {
                    case 1:
                        isNaN(d[0]) || (c.t = c.r = c.b = c.l = d[0]);
                        break;
                    case 2:
                        isNaN(d[0]) || (c.t = c.b = d[0]), isNaN(d[1]) || (c.l = c.r = d[1]);
                        break;
                    case 4:
                        isNaN(d[0]) || (c.t = d[0]), isNaN(d[1]) || (c.r = d[1]), isNaN(d[2]) || (c.b = d[2]), isNaN(d[3]) || (c.l = d[3]);
                        break;
                    default:
                }
            }
            this._tolerance = c
        }, _setOption:function (b, c) {
            var e, f = "_set" + b.charAt(0).toUpperCase() + b.slice(1);
            this[f] !== d && this[f](c), e = ["initSelector", "closeLinkSelector", "closeLinkEvents", "navigateEvents", "closeEvents", "history", "container"], a.mobile.widget.prototype._setOption.apply(this, arguments), a.inArray(b, e) === -1 && this.element.attr("data-" + (a.mobile.ns || "") + b.replace(/([A-Z])/, "-$1").toLowerCase(), c)
        }, _placementCoords:function (a) {
            var b = f(), d = {x:this._tolerance.l, y:b.y + this._tolerance.t, cx:b.cx - this._tolerance.l - this._tolerance.r, cy:b.cy - this._tolerance.t - this._tolerance.b}, g, h;
            this._ui.container.css("max-width", d.cx), g = {cx:this._ui.container.outerWidth(!0), cy:this._ui.container.outerHeight(!0)}, h = {x:e(d.cx, g.cx, d.x, a.x), y:e(d.cy, g.cy, d.y, a.y)}, h.y = Math.max(0, h.y);
            var i = c.documentElement, j = c.body, k = Math.max(i.clientHeight, j.scrollHeight, j.offsetHeight, i.scrollHeight, i.offsetHeight);
            return h.y -= Math.min(h.y, Math.max(0, h.y + g.cy - k)), {left:h.x, top:h.y}
        }, _createPrereqs:function (b, c, d) {
            var e = this, f;
            f = {screen:a.Deferred(), container:a.Deferred()}, f.screen.then(function () {
                f === e._prereqs && b()
            }), f.container.then(function () {
                f === e._prereqs && c()
            }), a.when(f.screen, f.container).done(function () {
                f === e._prereqs && (e._prereqs = null, d())
            }), e._prereqs = f
        }, _animate:function (b) {
            this._ui.screen.removeClass(b.classToRemove).addClass(b.screenClassToAdd), b.prereqs.screen.resolve(), b.transition && b.transition !== "none" ? (b.applyTransition && this._applyTransition(b.transition), this._ui.container.animationComplete(a.proxy(b.prereqs.container, "resolve")).addClass(b.containerClassToAdd).removeClass(b.classToRemove)) : b.prereqs.container.resolve()
        }, _desiredCoords:function (b, c, d) {
            var e = null, g, h = f();
            if (d && d !== "origin")if (d === "window")b = h.cx / 2 + h.x, c = h.cy / 2 + h.y; else {
                try {
                    e = a(d)
                } catch (i) {
                    e = null
                }
                e && (e.filter(":visible"), e.length === 0 && (e = null))
            }
            e && (g = e.offset(), b = g.left + e.outerWidth() / 2, c = g.top + e.outerHeight() / 2);
            if (a.type(b) !== "number" || isNaN(b))b = h.cx / 2 + h.x;
            if (a.type(c) !== "number" || isNaN(c))c = h.cy / 2 + h.y;
            return{x:b, y:c}
        }, _openPrereqsComplete:function () {
            var a = this;
            a._ui.container.addClass("ui-popup-active"), a._isOpen = !0, a._resizeScreen(), setTimeout(function () {
                a._ui.container.attr("tabindex", "0").focus(), a._trigger("afteropen")
            })
        }, _open:function (c) {
            var d, e, f = function () {
                var a = b, c = navigator.userAgent, d = c.match(/AppleWebKit\/([0-9\.]+)/), e = !!d && d[1], f = c.match(/Android (\d+(?:\.\d+))/), g = !!f && f[1], h = c.indexOf("Chrome") > -1;
                return f !== null && g === "4.0" && e && e > 534.13 && !h ? !0 : !1
            }();
            c = c || {}, e = c.transition || this.options.transition, this._trigger("beforeposition"), d = this._placementCoords(this._desiredCoords(c.x, c.y, c.positionTo || this.options.positionTo || "origin")), this._createPrereqs(a.noop, a.noop, a.proxy(this, "_openPrereqsComplete")), e ? (this._currentTransition = e, this._applyTransition(e)) : e = this.options.transition, this.options.theme || this._setTheme(this._page.jqmData("theme") || a.mobile.getInheritedTheme(this._page, "c")), this._ui.screen.removeClass("ui-screen-hidden"), this._ui.container.removeClass("ui-selectmenu-hidden").offset(d), this.options.overlayTheme && f && this.element.closest(".ui-page").addClass("ui-popup-open"), this._animate({additionalCondition:!0, transition:e, classToRemove:"", screenClassToAdd:"in", containerClassToAdd:"in", applyTransition:!1, prereqs:this._prereqs})
        }, _closePrereqScreen:function () {
            this._ui.screen.removeClass("out").addClass("ui-screen-hidden")
        }, _closePrereqContainer:function () {
            this._ui.container.removeClass("reverse out").addClass("ui-selectmenu-hidden").removeAttr("style")
        }, _closePrereqsDone:function () {
            var b = this, c = b.options;
            b._ui.container.removeAttr("tabindex"), c.container.unbind(c.closeEvents), b.element.undelegate(c.closeLinkSelector, c.closeLinkEvents), a.mobile.popup.active = d, b._trigger("afterclose")
        }, _close:function () {
            this._ui.container.removeClass("ui-popup-active"), this._page.removeClass("ui-popup-open"), this._isOpen = !1, this._createPrereqs(a.proxy(this, "_closePrereqScreen"), a.proxy(this, "_closePrereqContainer"), a.proxy(this, "_closePrereqsDone")), this._animate({additionalCondition:this._ui.screen.hasClass("in"), transition:this._currentTransition || this.options.transition, classToRemove:"in", screenClassToAdd:"out", containerClassToAdd:"reverse out", applyTransition:!0, prereqs:this._prereqs})
        }, _destroy:function () {
            var b = this;
            b._close(), b._setTheme("none"), b.element.insertAfter(b._ui.placeholder).removeClass("ui-popup ui-overlay-shadow ui-corner-all"), b._ui.screen.remove(), b._ui.container.remove(), b._ui.placeholder.remove(), a.each(b._globalHandlers, function (b, c) {
                a.each(c.handler, function (a, b) {
                    c.src.unbind(a, b)
                })
            })
        }, _bindContainerClose:function () {
            var b = this;
            b.options.container.one(b.options.closeEvents, a.proxy(b._close, b))
        }, open:function (b) {
            var c = this, e = this.options, f, g, h, i, j, k;
            if (a.mobile.popup.active)return;
            a.mobile.popup.active = this;
            if (!e.history) {
                c._open(b), c._bindContainerClose(), c.element.delegate(e.closeLinkSelector, e.closeLinkEvents, function (a) {
                    return c._close(), !1
                });
                return
            }
            g = a.mobile.dialogHashKey, h = a.mobile.activePage, i = h.is(".ui-dialog"), f = a.mobile.urlHistory.getActive().url, j = f.indexOf(g) > -1 && !i, k = a.mobile.urlHistory;
            if (j) {
                c._open(b), c._bindContainerClose();
                return
            }
            f.indexOf(g) === -1 && !i ? f = f + g : f = a.mobile.path.parseLocation().hash + g, k.activeIndex === 0 && f === k.initialDst && (f += g), e.container.one(e.navigateEvents, function (a) {
                a.preventDefault(), c._open(b), c._bindContainerClose()
            }), k.ignoreNextHashChange = i, k.addNew(f, d, d, d, "dialog"), a.mobile.path.set(f)
        }, close:function () {
            if (!a.mobile.popup.active)return;
            this.options.history ? a.mobile.back() : this._close()
        }}), a.mobile.popup.handleLink = function (b) {
            var c = b.closest(":jqmData(role='page')"), d = c.length === 0 ? a("body") : c, e = a(a.mobile.path.parseUrl(b.attr("href")).hash, d[0]), f;
            e.data("popup") && (f = b.offset(), e.popup("open", {x:f.left + b.outerWidth() / 2, y:f.top + b.outerHeight() / 2, transition:b.jqmData("transition"), positionTo:b.jqmData("position-to"), link:b})), setTimeout(function () {
                b.removeClass(a.mobile.activeBtnClass)
            }, 300)
        }, a(c).bind("pagebeforechange", function (b, c) {
            c.options.role === "popup" && (a.mobile.popup.handleLink(c.options.link), b.preventDefault())
        }), a(c).bind("pagecreate create", function (b) {
            a.mobile.popup.prototype.enhanceWithin(b.target, !0)
        })
    }(a), function (a) {
        var b = a("meta[name=viewport]"), c = b.attr("content"), d = c + ",maximum-scale=1, user-scalable=no", e = c + ",maximum-scale=10, user-scalable=yes", f = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(c);
        a.mobile.zoom = a.extend({}, {enabled:!f, locked:!1, disable:function (c) {
            !f && !a.mobile.zoom.locked && (b.attr("content", d), a.mobile.zoom.enabled = !1, a.mobile.zoom.locked = c || !1)
        }, enable:function (c) {
            !f && (!a.mobile.zoom.locked || c === !0) && (b.attr("content", e), a.mobile.zoom.enabled = !0, a.mobile.zoom.locked = !1)
        }, restore:function () {
            f || (b.attr("content", c), a.mobile.zoom.enabled = !0)
        }})
    }(a), function (a, d) {
        a.widget("mobile.textinput", a.mobile.widget, {options:{theme:null, preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1, initSelector:"input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type])", clearSearchButtonText:"clear text", disabled:!1}, _create:function () {
            function m() {
                setTimeout(function () {
                    l.toggleClass("ui-input-clear-hidden", !e.val())
                }, 0)
            }

            var d = this, e = this.element, f = this.options, g = f.theme || a.mobile.getInheritedTheme(this.element, "c"), h = " ui-body-" + g, i = e.jqmData("mini") === !0, j = i ? " ui-mini" : "", k, l;
            a("label[for='" + e.attr("id") + "']").addClass("ui-input-text"), k = e.addClass("ui-input-text ui-body-" + g), typeof e[0].autocorrect != "undefined" && !a.support.touchOverflow && (e[0].setAttribute("autocorrect", "off"), e[0].setAttribute("autocomplete", "off")), e.is("[type='search'],:jqmData(type='search')") ? (k = e.wrap("<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield" + h + j + "'></div>").parent(), l = a("<a href='#' class='ui-input-clear' title='" + f.clearSearchButtonText + "'>" + f.clearSearchButtonText + "</a>").bind("click",function (a) {
                e.val("").focus().trigger("change"), l.addClass("ui-input-clear-hidden"), a.preventDefault()
            }).appendTo(k).buttonMarkup({icon:"delete", iconpos:"notext", corners:!0, shadow:!0, mini:i}), m(), e.bind("paste cut keyup focus change blur", m)) : e.addClass("ui-corner-all ui-shadow-inset" + h + j), e.focus(function () {
                k.addClass(a.mobile.focusClass)
            }).blur(function () {
                k.removeClass(a.mobile.focusClass)
            }).bind("focus",function () {
                f.preventFocusZoom && a.mobile.zoom.disable(!0)
            }).bind("blur", function () {
                f.preventFocusZoom && a.mobile.zoom.enable(!0)
            });
            if (e.is("textarea")) {
                var n = 15, o = 100, p;
                this._keyup = function () {
                    var a = e[0].scrollHeight, b = e[0].clientHeight;
                    b < a && e.height(a + n)
                }, e.keyup(function () {
                    clearTimeout(p), p = setTimeout(d._keyup, o)
                }), this._on(a(c), {pagechange:"_keyup"}), a.trim(e.val()) && this._on(a(b), {load:"_keyup"})
            }
            e.attr("disabled") && this.disable()
        }, disable:function () {
            var a;
            return this.element.attr("disabled", !0).is("[type='search'], :jqmData(type='search')") ? a = this.element.parent() : a = this.element, a.addClass("ui-disabled"), this._setOption("disabled", !0)
        }, enable:function () {
            var a;
            return this.element.attr("disabled", !1).is("[type='search'], :jqmData(type='search')") ? a = this.element.parent() : a = this.element, a.removeClass("ui-disabled"), this._setOption("disabled", !1)
        }}), a(c).bind("pagecreate create", function (b) {
            a.mobile.textinput.prototype.enhanceWithin(b.target, !0)
        })
    }(a), function (a, b) {
        a.mobile.listview.prototype.options.filter = !1, a.mobile.listview.prototype.options.filterPlaceholder = "Filter items...", a.mobile.listview.prototype.options.filterTheme = "c";
        var d = function (a, b, c) {
            return a.toString().toLowerCase().indexOf(b) === -1
        };
        a.mobile.listview.prototype.options.filterCallback = d, a(c).delegate(":jqmData(role='listview')", "listviewcreate", function () {
            var b = a(this), c = b.data("listview");
            if (!c.options.filter)return;
            var e = a("<form>", {"class":"ui-listview-filter ui-bar-" + c.options.filterTheme, role:"search"}), f = a("<input>", {placeholder:c.options.filterPlaceholder}).attr("data-" + a.mobile.ns + "type", "search").jqmData("lastval", "").bind("keyup change",function () {
                var e = a(this), f = this.value.toLowerCase(), g = null, h = e.jqmData("lastval") + "", i = !1, j = "", k, l = c.options.filterCallback !== d;
                c._trigger("beforefilter", "beforefilter", {input:this}), e.jqmData("lastval", f), l || f.length < h.length || f.indexOf(h) !== 0 ? g = b.children() : g = b.children(":not(.ui-screen-hidden)");
                if (f) {
                    for (var m = g.length - 1; m >= 0; m--)k = a(g[m]), j = k.jqmData("filtertext") || k.text(), k.is("li:jqmData(role=list-divider)") ? (k.toggleClass("ui-filter-hidequeue", !i), i = !1) : c.options.filterCallback(j, f, k) ? k.toggleClass("ui-filter-hidequeue", !0) : i = !0;
                    g.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden", !1), g.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden", !0).toggleClass("ui-filter-hidequeue", !1)
                } else g.toggleClass("ui-screen-hidden", !1);
                c._refreshCorners()
            }).appendTo(e).textinput();
            c.options.inset && e.addClass("ui-listview-filter-inset"), e.bind("submit",function () {
                return!1
            }).insertBefore(b)
        })
    }(a), function (a, d) {
        a.widget("mobile.slider", a.mobile.widget, {widgetEventPrefix:"slide", options:{theme:null, trackTheme:null, disabled:!1, initSelector:"input[type='range'], :jqmData(type='range'), :jqmData(role='slider')", mini:!1}, _create:function () {
            var e = this, f = this.element, g = a.mobile.getInheritedTheme(f, "c"), h = this.options.theme || g, i = this.options.trackTheme || g, j = f[0].nodeName.toLowerCase(), k = j === "select" ? "ui-slider-switch" : "", l = f.attr("id"), m = a("[for='" + l + "']"), n = m.attr("id") || l + "-label", o = m.attr("id", n), p = function () {
                return j === "input" ? parseFloat(f.val()) : f[0].selectedIndex
            }, q = j === "input" ? parseFloat(f.attr("min")) : 0, r = j === "input" ? parseFloat(f.attr("max")) : f.find("option").length - 1, s = b.parseFloat(f.attr("step") || 1), t = this.options.inline || f.jqmData("inline") === !0 ? " ui-slider-inline" : "", u = this.options.mini || f.jqmData("mini") ? " ui-slider-mini" : "", v = c.createElement("a"), w = a(v), x = c.createElement("div"), y = a(x), z = f.jqmData("highlight") && j !== "select" ? function () {
                var b = c.createElement("div");
                return b.className = "ui-slider-bg " + a.mobile.activeBtnClass + " ui-btn-corner-all", a(b).prependTo(y)
            }() : !1, A;
            this._type = j, v.setAttribute("href", "#"), x.setAttribute("role", "application"), x.className = ["ui-slider ", k, " ui-btn-down-", i, " ui-btn-corner-all", t, u].join(""), v.className = "ui-slider-handle", x.appendChild(v), w.buttonMarkup({corners:!0, theme:h, shadow:!0}).attr({role:"slider", "aria-valuemin":q, "aria-valuemax":r, "aria-valuenow":p(), "aria-valuetext":p(), title:p(), "aria-labelledby":n}), a.extend(this, {slider:y, handle:w, valuebg:z, dragging:!1, beforeStart:null, userModified:!1, mouseMoved:!1});
            if (j === "select") {
                var B = c.createElement("div");
                B.className = "ui-slider-inneroffset";
                for (var C = 0, D = x.childNodes.length; C < D; C++)B.appendChild(x.childNodes[C]);
                x.appendChild(B), w.addClass("ui-slider-handle-snapping"), A = f.find("option");
                for (var E = 0, F = A.length; E < F; E++) {
                    var G = E ? "a" : "b", H = E ? " " + a.mobile.activeBtnClass : " ui-btn-down-" + i, I = c.createElement("div"), J = c.createElement("span");
                    J.className = ["ui-slider-label ui-slider-label-", G, H, " ui-btn-corner-all"].join(""), J.setAttribute("role", "img"), J.appendChild(c.createTextNode(A[E].innerHTML)), a(J).prependTo(y)
                }
                e._labels = a(".ui-slider-label", y)
            }
            o.addClass("ui-slider"), f.addClass(j === "input" ? "ui-slider-input" : "ui-slider-switch").change(function () {
                e.mouseMoved || e.refresh(p(), !0)
            }).keyup(function () {
                e.refresh(p(), !0, !0)
            }).blur(function () {
                e.refresh(p(), !0)
            }), this._preventDocumentDrag = function (a) {
                if (e.dragging && !e.options.disabled)return e.mouseMoved = !0, j === "select" && w.removeClass("ui-slider-handle-snapping"), e.refresh(a), e.userModified = e.beforeStart !== f[0].selectedIndex, !1
            }, this._on(a(c), {vmousemove:this._preventDocumentDrag}), f.bind("vmouseup", a.proxy(e._checkedRefresh, e)), y.bind("vmousedown",function (a) {
                return e.options.disabled ? !1 : (e.dragging = !0, e.userModified = !1, e.mouseMoved = !1, j === "select" && (e.beforeStart = f[0].selectedIndex), e.refresh(a), e._trigger("start"), !1)
            }).bind("vclick", !1), this._sliderMouseUp = function () {
                if (e.dragging)return e.dragging = !1, j === "select" && (w.addClass("ui-slider-handle-snapping"), e.mouseMoved ? e.userModified ? e.refresh(e.beforeStart === 0 ? 1 : 0) : e.refresh(e.beforeStart) : e.refresh(e.beforeStart === 0 ? 1 : 0)), e.mouseMoved = !1, e._trigger("stop"), !1
            }, this._on(y.add(c), {vmouseup:this._sliderMouseUp}), y.insertAfter(f), j === "select" && this.handle.bind({focus:function () {
                y.addClass(a.mobile.focusClass)
            }, blur:function () {
                y.removeClass(a.mobile.focusClass)
            }}), this.handle.bind({vmousedown:function () {
                a(this).focus()
            }, vclick:!1, keydown:function (b) {
                var c = p();
                if (e.options.disabled)return;
                switch (b.keyCode) {
                    case a.mobile.keyCode.HOME:
                    case a.mobile.keyCode.END:
                    case a.mobile.keyCode.PAGE_UP:
                    case a.mobile.keyCode.PAGE_DOWN:
                    case a.mobile.keyCode.UP:
                    case a.mobile.keyCode.RIGHT:
                    case a.mobile.keyCode.DOWN:
                    case a.mobile.keyCode.LEFT:
                        b.preventDefault(), e._keySliding || (e._keySliding = !0, a(this).addClass("ui-state-active"))
                }
                switch (b.keyCode) {
                    case a.mobile.keyCode.HOME:
                        e.refresh(q);
                        break;
                    case a.mobile.keyCode.END:
                        e.refresh(r);
                        break;
                    case a.mobile.keyCode.PAGE_UP:
                    case a.mobile.keyCode.UP:
                    case a.mobile.keyCode.RIGHT:
                        e.refresh(c + s);
                        break;
                    case a.mobile.keyCode.PAGE_DOWN:
                    case a.mobile.keyCode.DOWN:
                    case a.mobile.keyCode.LEFT:
                        e.refresh(c - s)
                }
            }, keyup:function (b) {
                e._keySliding && (e._keySliding = !1, a(this).removeClass("ui-state-active"))
            }}), this.refresh(d, d, !0)
        }, _checkedRefresh:function () {
            this.value != this._value() && this.refresh(this._value())
        }, _value:function () {
            return this._type === "input" ? parseFloat(this.element.val()) : this.element[0].selectedIndex
        }, refresh:function (b, c, d) {
            (this.options.disabled || this.element.attr("disabled")) && this.disable(), this.value = this._value();
            var e = this.element, f, g = e[0].nodeName.toLowerCase(), h = g === "input" ? parseFloat(e.attr("min")) : 0, i = g === "input" ? parseFloat(e.attr("max")) : e.find("option").length - 1, j = g === "input" && parseFloat(e.attr("step")) > 0 ? parseFloat(e.attr("step")) : 1;
            if (typeof b == "object") {
                var k = b, l = 8;
                if (!this.dragging || k.pageX < this.slider.offset().left - l || k.pageX > this.slider.offset().left + this.slider.width() + l)return;
                f = Math.round((k.pageX - this.slider.offset().left) / this.slider.width() * 100)
            } else b == null && (b = g === "input" ? parseFloat(e.val() || 0) : e[0].selectedIndex), f = (parseFloat(b) - h) / (i - h) * 100;
            if (isNaN(f))return;
            f < 0 && (f = 0), f > 100 && (f = 100);
            var m = f / 100 * (i - h) + h, n = (m - h) % j, o = m - n;
            Math.abs(n) * 2 >= j && (o += n > 0 ? j : -j), m = parseFloat(o.toFixed(5)), m < h && (m = h), m > i && (m = i), this.handle.css("left", f + "%"), this.handle.attr({"aria-valuenow":g === "input" ? m : e.find("option").eq(m).attr("value"), "aria-valuetext":g === "input" ? m : e.find("option").eq(m).getEncodedText(), title:g === "input" ? m : e.find("option").eq(m).getEncodedText()}), this.valuebg && this.valuebg.css("width", f + "%");
            if (this._labels) {
                var p = this.handle.width() / this.slider.width() * 100, q = f && p + (100 - p) * f / 100, r = f === 100 ? 0 : Math.min(p + 100 - q, 100);
                this._labels.each(function () {
                    var b = a(this).is(".ui-slider-label-a");
                    a(this).width((b ? q : r) + "%")
                })
            }
            if (!d) {
                var s = !1;
                g === "input" ? (s = e.val() !== m, e.val(m)) : (s = e[0].selectedIndex !== m, e[0].selectedIndex = m), !c && s && e.trigger("change")
            }
        }, enable:function () {
            return this.element.attr("disabled", !1), this.slider.removeClass("ui-disabled").attr("aria-disabled", !1), this._setOption("disabled", !1)
        }, disable:function () {
            return this.element.attr("disabled", !0), this.slider.addClass("ui-disabled").attr("aria-disabled", !0), this._setOption("disabled", !0)
        }}), a(c).bind("pagecreate create", function (b) {
            a.mobile.slider.prototype.enhanceWithin(b.target, !0)
        })
    }(a), function (a, d) {
        a.widget("mobile.selectmenu", a.mobile.widget, {options:{theme:null, disabled:!1, icon:"arrow-d", iconpos:"right", inline:!1, corners:!0, shadow:!0, iconshadow:!0, overlayTheme:"a", hidePlaceholderMenuItems:!0, closeText:"Close", nativeMenu:!0, preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1, initSelector:"select:not( :jqmData(role='slider') )", mini:!1}, _button:function () {
            return a("<div/>")
        }, _setDisabled:function (a) {
            return this.element.attr("disabled", a), this.button.attr("aria-disabled", a), this._setOption("disabled", a)
        }, _focusButton:function () {
            var a = this;
            setTimeout(function () {
                a.button.focus()
            }, 40)
        }, _selectOptions:function () {
            return this.select.find("option")
        }, _preExtension:function () {
            var b = "";
            !~this.element[0].className.indexOf("ui-btn-left") || (b = " ui-btn-left"), !~this.element[0].className.indexOf("ui-btn-right") || (b = " ui-btn-right"), this.select = this.element.wrap("<div class='ui-select" + b + "'>"), this.selectID = this.select.attr("id"), this.label = a("label[for='" + this.selectID + "']").addClass("ui-select"), this.isMultiple = this.select[0].multiple, this.options.theme || (this.options.theme = a.mobile.getInheritedTheme(this.select, "c"))
        }, _create:function () {
            this._preExtension(), this._trigger("beforeCreate"), this.button = this._button();
            var c = this, d = this.options, e = d.inline || this.select.jqmData("inline"), f = d.mini || this.select.jqmData("mini"), g = d.icon ? d.iconpos || this.select.jqmData("iconpos") : !1, h = this.select[0].selectedIndex === -1 ? 0 : this.select[0].selectedIndex, i = this.button.insertBefore(this.select).buttonMarkup({theme:d.theme, icon:d.icon, iconpos:g, inline:e, corners:d.corners, shadow:d.shadow, iconshadow:d.iconshadow, mini:f});
            this.setButtonText(), d.nativeMenu && b.opera && b.opera.version && i.addClass("ui-select-nativeonly"), this.isMultiple && (this.buttonCount = a("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").hide().appendTo(i.addClass("ui-li-has-count"))), (d.disabled || this.element.attr("disabled")) && this.disable(), this.select.change(function () {
                c.refresh()
            }), this.build()
        }, build:function () {
            var b = this;
            this.select.appendTo(b.button).bind("vmousedown",function () {
                b.button.addClass(a.mobile.activeBtnClass)
            }).bind("focus",function () {
                b.button.addClass(a.mobile.focusClass)
            }).bind("blur",function () {
                b.button.removeClass(a.mobile.focusClass)
            }).bind("focus vmouseover",function () {
                b.button.trigger("vmouseover")
            }).bind("vmousemove",function () {
                b.button.removeClass(a.mobile.activeBtnClass)
            }).bind("change blur vmouseout",function () {
                b.button.trigger("vmouseout").removeClass(a.mobile.activeBtnClass)
            }).bind("change blur", function () {
                b.button.removeClass("ui-btn-down-" + b.options.theme)
            }), b.button.bind("vmousedown",function () {
                b.options.preventFocusZoom && a.mobile.zoom.disable(!0)
            }).bind("mouseup", function () {
                b.options.preventFocusZoom && setTimeout(function () {
                    a.mobile.zoom.enable(!0)
                }, 0)
            })
        }, selected:function () {
            return this._selectOptions().filter(":selected")
        }, selectedIndices:function () {
            var a = this;
            return this.selected().map(function () {
                return a._selectOptions().index(this)
            }).get()
        }, setButtonText:function () {
            var b = this, d = this.selected(), e = this.placeholder, f = a(c.createElement("span"));
            this.button.find(".ui-btn-text").html(function () {
                return d.length ? e = d.map(function () {
                    return a(this).text()
                }).get().join(", ") : e = b.placeholder, f.text(e).addClass(b.select.attr("class")).addClass(d.attr("class"))
            })
        }, setButtonCount:function () {
            var a = this.selected();
            this.isMultiple && this.buttonCount[a.length > 1 ? "show" : "hide"]().text(a.length)
        }, refresh:function () {
            this.setButtonText(), this.setButtonCount()
        }, open:a.noop, close:a.noop, disable:function () {
            this._setDisabled(!0), this.button.addClass("ui-disabled")
        }, enable:function () {
            this._setDisabled(!1), this.button.removeClass("ui-disabled")
        }}), a(c).bind("pagecreate create", function (b) {
            a.mobile.selectmenu.prototype.enhanceWithin(b.target, !0)
        })
    }(a), function (a, d) {
        var e = function (d) {
            var e = d.select, f = d.selectID, g = d.label, h = d.select.closest(".ui-page"), i = d._selectOptions(), j = d.isMultiple = d.select[0].multiple, k = f + "-button", l = f + "-menu", m = a("<div data-" + a.mobile.ns + "role='dialog' data-" + a.mobile.ns + "theme='" + d.options.theme + "' data-" + a.mobile.ns + "overlay-theme='" + d.options.overlayTheme + "'>" + "<div data-" + a.mobile.ns + "role='header'>" + "<div class='ui-title'>" + g.getEncodedText() + "</div>" + "</div>" + "<div data-" + a.mobile.ns + "role='content'></div>" + "</div>"), n = a("<div>", {"class":"ui-selectmenu"}).insertAfter(d.select).popup({theme:"a"}), o = a("<ul>", {"class":"ui-selectmenu-list", id:l, role:"listbox", "aria-labelledby":k}).attr("data-" + a.mobile.ns + "theme", d.options.theme).appendTo(n), p = a("<div>", {"class":"ui-header ui-bar-" + d.options.theme}).prependTo(n), q = a("<h1>", {"class":"ui-title"}).appendTo(p), r, s, t;
            d.isMultiple && (t = a("<a>", {text:d.options.closeText, href:"#", "class":"ui-btn-left"}).attr("data-" + a.mobile.ns + "iconpos", "notext").attr("data-" + a.mobile.ns + "icon", "delete").appendTo(p).buttonMarkup()), a.extend(d, {select:d.select, selectID:f, buttonId:k, menuId:l, thisPage:h, menuPage:m, label:g, selectOptions:i, isMultiple:j, theme:d.options.theme, listbox:n, list:o, header:p, headerTitle:q, headerClose:t, menuPageContent:r, menuPageClose:s, placeholder:"", build:function () {
                var b = this;
                b.refresh(), b.select.attr("tabindex", "-1").focus(function () {
                    a(this).blur(), b.button.focus()
                }), b.button.bind("vclick keydown", function (c) {
                    if (c.type === "vclick" || c.keyCode && (c.keyCode === a.mobile.keyCode.ENTER || c.keyCode === a.mobile.keyCode.SPACE))b.open(), c.preventDefault()
                }), b.list.attr("role", "listbox").bind("focusin",function (b) {
                    a(b.target).attr("tabindex", "0").trigger("vmouseover")
                }).bind("focusout",function (b) {
                    a(b.target).attr("tabindex", "-1").trigger("vmouseout")
                }).delegate("li:not(.ui-disabled, .ui-li-divider)", "click",function (c) {
                    var e = b.select[0].selectedIndex, f = b.list.find("li:not(.ui-li-divider)").index(this), g = b._selectOptions().eq(f)[0];
                    g.selected = b.isMultiple ? !g.selected : !0, b.isMultiple && a(this).find(".ui-icon").toggleClass("ui-icon-checkbox-on", g.selected).toggleClass("ui-icon-checkbox-off", !g.selected), (b.isMultiple || e !== f) && b.select.trigger("change"), b.isMultiple ? b.list.find("li:not(.ui-li-divider)").eq(f).addClass("ui-btn-down-" + d.options.theme).find("a").first().focus() : b.close(), c.preventDefault()
                }).keydown(function (b) {
                    var c = a(b.target), e = c.closest("li"), f, g;
                    switch (b.keyCode) {
                        case 38:
                            return f = e.prev().not(".ui-selectmenu-placeholder"), f.is(".ui-li-divider") && (f = f.prev()), f.length && (c.blur().attr("tabindex", "-1"), f.addClass("ui-btn-down-" + d.options.theme).find("a").first().focus()), !1;
                        case 40:
                            return g = e.next(), g.is(".ui-li-divider") && (g = g.next()), g.length && (c.blur().attr("tabindex", "-1"), g.addClass("ui-btn-down-" + d.options.theme).find("a").first().focus()), !1;
                        case 13:
                        case 32:
                            return c.trigger("click"), !1
                    }
                }), b.menuPage.bind("pagehide", function () {
                    b.list.appendTo(b.listbox), b._focusButton(), a.mobile._bindPageRemove.call(b.thisPage)
                }), b.listbox.bind("popupafterclose", function (a) {
                    b.close()
                }), b.isMultiple && b.headerClose.click(function () {
                    if (b.menuType === "overlay")return b.close(), !1
                }), b.thisPage.addDependents(this.menuPage)
            }, _isRebuildRequired:function () {
                var a = this.list.find("li"), b = this._selectOptions();
                return b.text() !== a.text()
            }, selected:function () {
                return this._selectOptions().filter(":selected:not( :jqmData(placeholder='true') )")
            }, refresh:function (b, c) {
                var d = this, e = this.element, f = this.isMultiple, g;
                (b || this._isRebuildRequired()) && d._buildList(), g = this.selectedIndices(), d.setButtonText(), d.setButtonCount(), d.list.find("li:not(.ui-li-divider)").removeClass(a.mobile.activeBtnClass).attr("aria-selected", !1).each(function (b) {
                    if (a.inArray(b, g) > -1) {
                        var c = a(this);
                        c.attr("aria-selected", !0), d.isMultiple ? c.find(".ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on") : c.is(".ui-selectmenu-placeholder") ? c.next().addClass(a.mobile.activeBtnClass) : c.addClass(a.mobile.activeBtnClass)
                    }
                })
            }, close:function () {
                if (this.options.disabled || !this.isOpen)return;
                var b = this;
                b.menuType === "page" ? a.mobile.back() : (b.listbox.popup("close"), b.list.appendTo(b.listbox), b._focusButton()), b.isOpen = !1
            }, open:function () {
                function o() {
                    var b = c.list.find("." + a.mobile.activeBtnClass + " a");
                    b.length === 0 && (b = c.list.find("li.ui-btn:not( :jqmData(placeholder='true') ) a")), b.first().focus().closest("li").addClass("ui-btn-down-" + d.options.theme)
                }

                if (this.options.disabled)return;
                var c = this, e = a(b), f = c.list.parent(), g = f.outerHeight(), h = f.outerWidth(), i = a("." + a.mobile.activePageClass), j = e.scrollTop(), k = c.button.offset().top, l = e.height(), n = e.width();
                c.button.addClass(a.mobile.activeBtnClass), setTimeout(function () {
                    c.button.removeClass(a.mobile.activeBtnClass)
                }, 300), g > l - 80 || !a.support.scrollTop ? (c.menuPage.appendTo(a.mobile.pageContainer).page(), c.menuPageContent = m.find(".ui-content"), c.menuPageClose = m.find(".ui-header a"), c.thisPage.unbind("pagehide.remove"), j === 0 && k > l && c.thisPage.one("pagehide", function () {
                    a(this).jqmData("lastScroll", k)
                }), c.menuPage.one("pageshow", function () {
                    o(), c.isOpen = !0
                }), c.menuType = "page", c.menuPageContent.append(c.list), c.menuPage.find("div .ui-title").text(c.label.text()), a.mobile.changePage(c.menuPage, {transition:a.mobile.defaultDialogTransition})) : (c.menuType = "overlay", c.listbox.one("popupafteropen", o).popup("open", {x:c.button.offset().left + c.button.outerWidth() / 2, y:c.button.offset().top + c.button.outerHeight() / 2}), c.isOpen = !0)
            }, _buildList:function () {
                var b = this, d = this.options, e = this.placeholder, f = !0, g = [], h = [], i = b.isMultiple ? "checkbox-off" : "false";
                b.list.empty().filter(".ui-listview").listview("destroy");
                var j = b.select.find("option"), k = j.length, l = this.select[0], m = "data-" + a.mobile.ns, n = m + "option-index", o = m + "icon", p = m + "role", q = m + "placeholder", r = c.createDocumentFragment(), s = !1, t;
                for (var u = 0; u < k; u++, s = !1) {
                    var v = j[u], w = a(v), x = v.parentNode, y = w.text(), z = c.createElement("a"), A = [];
                    z.setAttribute("href", "#"), z.appendChild(c.createTextNode(y));
                    if (x !== l && x.nodeName.toLowerCase() === "optgroup") {
                        var B = x.getAttribute("label");
                        if (B !== t) {
                            var C = c.createElement("li");
                            C.setAttribute(p, "list-divider"), C.setAttribute("role", "option"), C.setAttribute("tabindex", "-1"), C.appendChild(c.createTextNode(B)), r.appendChild(C), t = B
                        }
                    }
                    f && (!v.getAttribute("value") || y.length === 0 || w.jqmData("placeholder")) && (f = !1, s = !0, v.setAttribute(q, !0), d.hidePlaceholderMenuItems && A.push("ui-selectmenu-placeholder"), e || (e = b.placeholder = y));
                    var D = c.createElement("li");
                    v.disabled && (A.push("ui-disabled"), D.setAttribute("aria-disabled", !0)), D.setAttribute(n, u), D.setAttribute(o, i), s && D.setAttribute(q, !0), D.className = A.join(" "), D.setAttribute("role", "option"), z.setAttribute("tabindex", "-1"), D.appendChild(z), r.appendChild(D)
                }
                b.list[0].appendChild(r), !this.isMultiple && !e.length ? this.header.hide() : this.headerTitle.text(this.placeholder), b.list.listview()
            }, _button:function () {
                return a("<a>", {href:"#", role:"button", id:this.buttonId, "aria-haspopup":"true", "aria-owns":this.menuId})
            }})
        };
        a(c).bind("selectmenubeforecreate", function (b) {
            var c = a(b.target).data("selectmenu");
            !c.options.nativeMenu && c.element.parents(":jqmData(role='popup')").length === 0 && e(c)
        })
    }(a), function (a, d) {
        a.widget("mobile.fixedtoolbar", a.mobile.widget, {options:{visibleOnPageShow:!0, disablePageZoom:!0, transition:"slide", fullscreen:!1, tapToggle:!0, tapToggleBlacklist:"a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-popup", hideDuringFocus:"input, textarea, select", updatePagePadding:!0, trackPersistentToolbars:!0, supportBlacklist:function () {
            var a = b, c = navigator.userAgent, d = navigator.platform, e = c.match(/AppleWebKit\/([0-9]+)/), f = !!e && e[1], g = c.match(/Fennec\/([0-9]+)/), h = !!g && g[1], i = c.match(/Opera Mobi\/([0-9]+)/), j = !!i && i[1];
            return(d.indexOf("iPhone") > -1 || d.indexOf("iPad") > -1 || d.indexOf("iPod") > -1) && f && f < 534 || a.operamini && {}.toString.call(a.operamini) === "[object OperaMini]" || i && j < 7458 || c.indexOf("Android") > -1 && f && f < 533 || h && h < 6 || "palmGetResource"in b && f && f < 534 || c.indexOf("MeeGo") > -1 && c.indexOf("NokiaBrowser/8.5.0") > -1 ? !0 : !1
        }, initSelector:":jqmData(position='fixed')"}, _create:function () {
            var a = this, b = a.options, c = a.element, d = c.is(":jqmData(role='header')") ? "header" : "footer", e = c.closest(".ui-page");
            if (b.supportBlacklist()) {
                a.destroy();
                return
            }
            c.addClass("ui-" + d + "-fixed"), b.fullscreen ? (c.addClass("ui-" + d + "-fullscreen"), e.addClass("ui-page-" + d + "-fullscreen")) : e.addClass("ui-page-" + d + "-fixed"), a._addTransitionClass(), a._bindPageEvents(), a._bindToggleHandlers()
        }, _addTransitionClass:function () {
            var a = this.options.transition;
            a && a !== "none" && (a === "slide" && (a = this.element.is(".ui-header") ? "slidedown" : "slideup"), this.element.addClass(a))
        }, _bindPageEvents:function () {
            var c = this, d = c.options, e = c.element;
            e.closest(".ui-page").bind("pagebeforeshow",function () {
                d.disablePageZoom && a.mobile.zoom.disable(!0), d.visibleOnPageShow || c.hide(!0)
            }).bind("webkitAnimationStart animationstart updatelayout",function () {
                var a = this;
                d.updatePagePadding && c.updatePagePadding(a)
            }).bind("pageshow",function () {
                var e = this;
                c.updatePagePadding(e), d.updatePagePadding && a(b).bind("throttledresize." + c.widgetName, function () {
                    c.updatePagePadding(e)
                })
            }).bind("pagebeforehide", function (e, f) {
                d.disablePageZoom && a.mobile.zoom.enable(!0), d.updatePagePadding && a(b).unbind("throttledresize." + c.widgetName);
                if (d.trackPersistentToolbars) {
                    var g = a(".ui-footer-fixed:jqmData(id)", this), h = a(".ui-header-fixed:jqmData(id)", this), i = g.length && f.nextPage && a(".ui-footer-fixed:jqmData(id='" + g.jqmData("id") + "')", f.nextPage) || a(), j = h.length && f.nextPage && a(".ui-header-fixed:jqmData(id='" + h.jqmData("id") + "')", f.nextPage) || a();
                    if (i.length || j.length)i.add(j).appendTo(a.mobile.pageContainer), f.nextPage.one("pageshow", function () {
                        i.add(j).appendTo(this)
                    })
                }
            })
        }, _visible:!0, updatePagePadding:function (b) {
            var c = this.element, d = c.is(".ui-header");
            if (this.options.fullscreen)return;
            b = b || c.closest(".ui-page"), a(b).css("padding-" + (d ? "top" : "bottom"), c.outerHeight())
        }, _useTransition:function (c) {
            var d = a(b), e = this.element, f = d.scrollTop(), g = e.height(), h = e.closest(".ui-page").height(), i = a.mobile.getScreenHeight(), j = e.is(":jqmData(role='header')") ? "header" : "footer";
            return!c && (this.options.transition && this.options.transition !== "none" && (j === "header" && !this.options.fullscreen && f > g || j === "footer" && !this.options.fullscreen && f + i < h - g) || this.options.fullscreen)
        }, show:function (a) {
            var b = "ui-fixed-hidden", c = this.element;
            this._useTransition(a) ? c.removeClass("out " + b).addClass("in") : c.removeClass(b), this._visible = !0
        }, hide:function (a) {
            var b = "ui-fixed-hidden", c = this.element, d = "out" + (this.options.transition === "slide" ? " reverse" : "");
            this._useTransition(a) ? c.addClass(d).removeClass("in").animationComplete(function () {
                c.addClass(b).removeClass(d)
            }) : c.addClass(b).removeClass(d), this._visible = !1
        }, toggle:function () {
            this[this._visible ? "hide" : "show"]()
        }, _bindToggleHandlers:function () {
            var b = this, c = b.options, d = b.element;
            d.closest(".ui-page").bind("vclick",function (d) {
                c.tapToggle && !a(d.target).closest(c.tapToggleBlacklist).length && b.toggle()
            }).bind("focusin focusout", function (d) {
                screen.width < 500 && a(d.target).is(c.hideDuringFocus) && !a(d.target).closest(".ui-header-fixed, .ui-footer-fixed").length && b[d.type === "focusin" && b._visible ? "hide" : "show"]()
            })
        }, destroy:function () {
            this.element.removeClass("ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden"), this.element.closest(".ui-page").removeClass("ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen")
        }}), a(c).bind("pagecreate create", function (b) {
            a(b.target).jqmData("fullscreen") && a(a.mobile.fixedtoolbar.prototype.options.initSelector, b.target).not(":jqmData(fullscreen)").jqmData("fullscreen", !0), a.mobile.fixedtoolbar.prototype.enhanceWithin(b.target)
        })
    }(a), function (a, b) {
        function i(a) {
            d = a.originalEvent, h = d.accelerationIncludingGravity, e = Math.abs(h.x), f = Math.abs(h.y), g = Math.abs(h.z), !b.orientation && (e > 7 || (g > 6 && f < 8 || g < 8 && f > 6) && e > 5) ? c.enabled && c.disable() : c.enabled || c.enable()
        }

        if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1))return;
        var c = a.mobile.zoom, d, e, f, g, h;
        a(b).bind("orientationchange.iosorientationfix", c.enable).bind("devicemotion.iosorientationfix", i)
    }(a, this), function (a, b, d) {
        function h() {
            e.removeClass("ui-mobile-rendering")
        }

        var e = a("html"), f = a("head"), g = a(b);
        a(b.document).trigger("mobileinit");
        if (!a.mobile.gradeA())return;
        a.mobile.ajaxBlacklist && (a.mobile.ajaxEnabled = !1), e.addClass("ui-mobile ui-mobile-rendering"), setTimeout(h, 5e3), a.extend(a.mobile, {initializePage:function () {
            var b = a(":jqmData(role='page'), :jqmData(role='dialog')"), d = a.mobile.path.parseLocation().hash.replace("#", ""), e = c.getElementById(d);
            b.length || (b = a("body").wrapInner("<div data-" + a.mobile.ns + "role='page'></div>").children(0)), b.each(function () {
                var b = a(this);
                b.jqmData("url") || b.attr("data-" + a.mobile.ns + "url", b.attr("id") || location.pathname + location.search)
            }), a.mobile.firstPage = b.first(), a.mobile.pageContainer = b.first().parent().addClass("ui-mobile-viewport"), g.trigger("pagecontainercreate"), a.mobile.showPageLoadingMsg(), h(), !a.mobile.hashListeningEnabled || !a.mobile.path.isHashValid(location.hash) || !a(e).is(':jqmData(role="page")') && !a.mobile.path.isPath(d) && d !== a.mobile.dialogHashKey ? (a.mobile.path.isHashValid(location.hash) && (a.mobile.urlHistory.initialDst = d.replace("#", "")), a.mobile.changePage(a.mobile.firstPage, {transition:"none", reverse:!0, changeHash:!1, fromHashChange:!0})) : g.trigger("hashchange", [!0])
        }}), a.mobile.navreadyDeferred.resolve(), a(function () {
            b.scrollTo(0, 1), a.mobile.defaultHomeScroll = !a.support.scrollTop || a(b).scrollTop() === 1 ? 0 : 1, a.fn.controlgroup && a(c).bind("pagecreate create", function (b) {
                a(":jqmData(role='controlgroup')", b.target).jqmEnhanceable().controlgroup({excludeInvisible:!1})
            }), a.mobile.autoInitializePage && a.mobile.initializePage(), g.load(a.mobile.silentScroll), a.support.cssPointerEvents || a(c).delegate(".ui-disabled", "vclick", function (a) {
                a.preventDefault(), a.stopImmediatePropagation()
            })
        })
    }(a, this)
});