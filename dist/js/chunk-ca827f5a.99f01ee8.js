(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ca827f5a"],{"05ce":function(t,e,r){"use strict";var n=r("a0bd"),a=r.n(n);a.a},"16f4":function(t,e,r){t.exports=r.p+"img/404.c65f410f.png"},2877:function(t,e,r){"use strict";function n(t,e,r,n,a,s,i,c){var o,u="function"===typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=r,u._compiled=!0),n&&(u.functional=!0),s&&(u._scopeId="data-v-"+s),i?(o=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},u._ssrRegister=o):a&&(o=c?function(){a.call(this,this.$root.$options.shadowRoot)}:a),o)if(u.functional){u._injectStyles=o;var l=u.render;u.render=function(t,e){return o.call(e),l(t,e)}}else{var d=u.beforeCreate;u.beforeCreate=d?[].concat(d,o):[o]}return{exports:t,options:u}}r.d(e,"a",(function(){return n}))},"480e":function(t,e,r){"use strict";var n=r("c38f"),a=r.n(n);a.a},"8a9b":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"order-done"},[t.doneOrderList.length>0?n("div",{staticClass:"order-list"},t._l(t.doneOrderList,(function(t){return n("OrderItem",{key:t.id,attrs:{data:t}})})),1):t._e(),0==t.doneOrderList.length?n("div",{staticClass:"no-order"},[n("img",{staticClass:"no-order-image",attrs:{src:r("16f4"),alt:"暂时没有订单"}}),n("p",{staticClass:"tip"},[t._v(t._s(t.$t("message.massage11")))])]):t._e()])},a=[],s=r("c21a"),i={components:{OrderItem:s["a"]},methods:{fetchOrderList:function(){this.$emit("fetchOrderList")}}},c=i,o=(r("480e"),r("2877")),u=Object(o["a"])(c,n,a,!1,null,"267014d8",null);e["default"]=u.exports},"99c5":function(t,e,r){"use strict";r.d(e,"e",(function(){return s})),r.d(e,"a",(function(){return i})),r.d(e,"c",(function(){return c})),r.d(e,"b",(function(){return o})),r.d(e,"d",(function(){return u}));r("96cf");var n=r("1da1"),a=r("bd6f"),s=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(a["a"])({url:"/api/order/post_order",data:{planId:e}});case 3:return r=t.sent,t.abrupt("return",r);case 7:return t.prev=7,t.t0=t["catch"](0),console.log(t.t0),t.abrupt("return",null);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),i=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(a["a"])({url:"/api/order/cancel",data:{orderId:e}});case 3:return r=t.sent,t.abrupt("return",r);case 7:return t.prev=7,t.t0=t["catch"](0),console.log(t.t0),t.abrupt("return",null);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),c=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(a["a"])({url:"/api/order/querybyuser"});case 3:return e=t.sent,t.abrupt("return",e);case 7:return t.prev=7,t.t0=t["catch"](0),console.log(t.t0),t.abrupt("return",null);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),o=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(a["a"])({url:"/api/order/querybyid",data:{orderId:e}});case 3:return r=t.sent,t.abrupt("return",r);case 7:return t.prev=7,t.t0=t["catch"](0),console.log(t.t0),t.abrupt("return",null);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),u=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(a["a"])({url:"/api/plan/querybyid",data:{planId:e}});case 3:return r=t.sent,t.abrupt("return",r);case 7:return t.prev=7,t.t0=t["catch"](0),console.log(t.t0),t.abrupt("return",null);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},a0bd:function(t,e,r){},c21a:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.detail?r("div",{staticClass:"order-item"},[r("div",{staticClass:"header"},[r("p",[r("span",{staticClass:"time"},[r("span",{staticClass:"em"},[t._v("创建时间:")]),t._v(" "+t._s(t._f("formatDate")(t.data.createTime)))]),r("span",{staticClass:"number"},[r("span",{staticClass:"em"},[t._v("订单编号:")]),t._v(" "+t._s(t.detail.plan.serial))])]),r("p",[r("span",{staticClass:"em"},[t._v("订单状态:")]),r("span",{staticClass:"theme"},[t._v(t._s(t._f("formatOrderStatus")(t.data.status)))])])]),r("div",{staticClass:"content"},[r("div",{staticClass:"content__left"},[r("div",{staticClass:"goods-info"},[r("i",{staticClass:"el-icon-goods icon"}),r("div",{staticClass:"detail"},[t._l(t.detail.itemList,(function(e,n){return r("p",{key:n},[t._v(" "+t._s(e.name)+" · "+t._s(e.weight)+"kg · "+t._s(e.volume)+"m³ ")])})),t.boxInfo?r("p",[t._v(" 装箱方案: "),t._l(t.boxInfo,(function(e,n){return[r("span",{key:n},[t._v(t._s(t._f("uppercase")(t.BOXS[n].name))+" * "+t._s(e)+" ")])]}))],2):t._e()],2)]),t.transportRoute?r("div",{staticClass:"route-info"},[r("i",{staticClass:"el-icon-location-outline icon"}),r("div",{staticClass:"detail"},[r("p",[t._v(" "+t._s(t._f("capitalize")(t.$t("country."+t.transportRoute.polCountry)))+"·"+t._s(t._f("capitalize")(t.$t("port."+t.transportRoute.pol)))+" - "+t._s(t._f("capitalize")(t.$t("country."+t.transportRoute.podCountry)))+"·"+t._s(t._f("capitalize")(t.$t("port."+t.transportRoute.pod)))+" ")]),r("p",[t._v("运输方式：陆运+"+t._s(t.TRANSPACKTYPES[t.detail.plan.transPackType]))])])]):t._e(),t.TRANSPACKS.EXPRESS==t.detail.plan.transPackType?r("div",{staticClass:"route-info"},[r("i",{staticClass:"el-icon-location-outline icon"}),r("div",{staticClass:"detail"},[r("p",[t._v("提货地址："+t._s(t.detail.query.startAddress.address))]),r("p",[t._v("送货地址："+t._s(t.detail.query.endAddress.address))]),r("p",[t._v("运输方式："+t._s(t.TRANSPACKTYPES[t.detail.plan.transPackType]))])])]):t._e()]),r("div",{staticClass:"sep"}),r("div",{staticClass:"content__middle"},[r("p",{staticClass:"price"},[t._v("CNY:")]),r("p",[t._v(t._s(t._f("currency")(t.detail.plan.count,"",0)))])]),r("div",{staticClass:"sep"}),r("div",{staticClass:"content__right"},[t.data.status==t.ORDER_STATUS_INIT?[r("router-link",{attrs:{to:"/order/booking/"+t.data.id,target:"_blank"}},[r("el-button",{attrs:{type:"primary"}},[t._v("填写委托书")])],1)]:t._e(),t.data.status!=t.ORDER_STATUS_CANCEL&&t.data.status!=t.ORDER_STATUS_DONE?r("el-button",{staticClass:"cancel-button",attrs:{type:"text"},on:{click:function(e){return t.cancelOrder(t.data.id)}}},[t._v("取消订单")]):t._e(),r("router-link",{attrs:{to:"/mine/order/detail/"+t.data.id}},[r("el-button",{attrs:{type:"text"}},[t._v("查看详情")])],1)],2)])]):t._e()},a=[],s=(r("96cf"),r("1da1")),i=r("99c5"),c=r("6ffa"),o={props:["data"],data:function(){return{detail:null,ORDER_STATUS_INIT:c["e"],ORDER_STATUS_DONE:c["d"],ORDER_STATUS_CANCEL:c["c"],ORDER_STATUS_BOOKING:c["b"]}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["d"])(t.data.planId);case 2:r=e.sent,0===r.code&&(t.detail=r.data);case 4:case"end":return e.stop()}}),e)})))()},computed:{transportRoute:function(){return this.detail&&this.detail.plan&&this.detail.plan.transportRoute?this.detail.plan.transportRoute:null},boxInfo:function(){return this.detail&&this.detail.plan&&this.detail.plan.packing&&this.detail.plan.packing.boxInfo?JSON.parse(this.detail.plan.packing.boxInfo):null}},methods:{cancelOrder:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.$confirm("此操作将永久取消该订单?","提示",{type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(i["a"])(t);case 2:n=r.sent,0==n.code&&(e.$emit("fetchOrderList"),e.$message.success("取消订单成功"));case 4:case"end":return r.stop()}}),r)})))).catch((function(){console.log(1)}));case 1:case"end":return r.stop()}}),r)})))()}}},u=o,l=(r("05ce"),r("2877")),d=Object(l["a"])(u,n,a,!1,null,"d01bb810",null);e["a"]=d.exports},c38f:function(t,e,r){}}]);