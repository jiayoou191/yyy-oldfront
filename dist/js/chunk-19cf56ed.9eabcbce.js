(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19cf56ed"],{"9b30":function(t,n,o){"use strict";o.r(n);var e=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",[o("el-dropdown",{attrs:{placement:"bottom"},on:{command:t.handleCommand}},[o("span",{ref:"dropdown",staticClass:"el-dropdown-link"},[t._v(" "+t._s(t.dropName)+" "),o("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.dataSource,(function(n,e){return o("div",{key:e},[o("el-dropdown-item",{staticClass:"setDropDownItem",attrs:{command:n.name}},[t._v(t._s(t.$t("dropdown."+n.name)))])],1)})),0)],1)],1)},a=[],r={props:{dropName:{type:String,default:""},dataSource:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{handleCommand:function(t){this.$emit("onClick",t)},linkDownload:function(t){window.open(t,"_blank")}},mounted:function(){console.log("path:","/"==this.$route.path),"/"==this.$route.path||"/newLogin"==this.$route.path?this.$refs.dropdown.setAttribute("class","el-dropdown-link"):this.$refs.dropdown.setAttribute("class","el-dropdown-link-noHome")}},d=r,s=(o("a4a7"),o("2877")),i=Object(s["a"])(d,e,a,!1,null,"c1c19812",null);n["default"]=i.exports},a4a7:function(t,n,o){"use strict";var e=o("e9ed"),a=o.n(e);a.a},e9ed:function(t,n,o){}}]);