(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-73682f28"],{3503:function(t,e,i){"use strict";var a=i("a908"),s=i.n(a);s.a},a7987:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"body"},[i("div",{staticClass:"func"},[i("button",{staticClass:"cta_left",on:{click:t.triggerDeleteMode}},[i("span",[t._v(t._s(t.deleteMode?"View":"Delete"))]),i("svg",{attrs:{viewBox:"0 0 13 10",height:"10px",width:"15px"}},[i("path",{attrs:{d:"M1,5 L11,5"}}),i("polyline",{attrs:{points:"8 1 12 5 8 9"}})])])]),t.loading?i("div",{staticClass:"jiggly-wrapper"},[i("JigglyComponent")],1):t._e(),t.loading?t._e():i("div",{staticClass:"card-container"},t._l(t.filteredCards,(function(e,a){return i("card-component",{key:a,attrs:{imageUrl:e.url,title:e.name,description:e.score,offset:1,index:a},on:{"card-clicked":t.showDialog}})})),1),t.isDialogVisible?i("CardDialog",{staticClass:"dialog-animation",attrs:{card:t.selectedCard},on:{"close-dialog":t.closeDialog}}):t._e(),t.showDeleteDialog?i("div",{staticClass:"delete-dialog"},[i("div",{staticClass:"dialog-content"},[i("h3",[t._v("Confirm Deletion")]),i("p",[t._v("确定要删除这个帖子吗?")]),i("div",{staticClass:"dialog-actions"},[i("button",{staticClass:"confirm-btn",on:{click:t.confirmDeleteCard}},[t._v("Yes")]),i("button",{staticClass:"cancel-btn",on:{click:t.cancelDeleteCard}},[t._v("No")])])])]):t._e()],1)},s=[],n=(i("4de4"),i("caad"),i("d81d"),i("fb6a"),i("b0c0"),i("a9e3"),i("b680"),i("d3b7"),i("2532"),i("3ca3"),i("ddb0"),i("ec16")),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-col",{attrs:{span:6,offset:t.offset}},[i("el-card",{staticClass:"card",attrs:{"body-style":{padding:"0px"}}},[i("div",{staticClass:"image-container"},[i("img",{staticClass:"image",attrs:{src:t.imageUrl}})]),i("div",{staticStyle:{padding:"14px"}},[i("span",{staticClass:"title"},[t._v(t._s(t.title))]),i("div",{staticClass:"rating-container"},[t._l(5,(function(e){return i("span",{key:e,staticClass:"star",class:{filled:e<=t.fullStars}},[t._v(" ★ ")])})),t.hasHalfStar?i("span",{staticClass:"star half"},[t._v(" ★ ")]):t._e()],2),i("div",{staticClass:"bottom clearfix"},[i("time",{staticClass:"time"},[t._v(t._s(t.description))]),i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:t.handleClick}},[t._v("click")])],1)])])],1)},c=[],o=(i("a4d3"),i("e01a"),{props:{imageUrl:{type:String,required:!0},title:{type:String,required:!0},description:{type:String,required:!0},offset:{type:Number,default:0},index:{type:Number,required:!0}},computed:{rating:function(){var t=parseFloat(this.description);return isNaN(t)?0:Math.round(t)},fullStars:function(){return Math.floor(this.rating)},hasHalfStar:function(){return this.rating%1>=.5}},methods:{handleClick:function(){this.$emit("card-clicked",{index:this.index,title:this.title})}}}),l=o,d=(i("ea43"),i("0c7c")),u=Object(d["a"])(l,r,c,!1,null,"342f11c4",null),h=u.exports,f=i("cebe"),g=i.n(f),m=i("9eb3"),p={components:{JigglyComponent:m["a"],CardDialog:n["a"],CardComponent:h},data:function(){return{loading:!1,currentPage:1,cardsPerPage:100,searchQuery:"",images:[],currentIndex:4,isDialogVisible:!1,selectedCard:null,deleteMode:!1,showDeleteDialog:!1}},mounted:function(){this.loadCards()},beforeRouteUpdate:function(t,e,i){this.loadCards(),i()},computed:{filteredCards:function(){var t=this;return this.searchQuery?this.images.filter((function(e){return e.name.toLowerCase().includes(t.searchQuery.toLowerCase())})):this.paginatedCards},paginatedCards:function(){var t=(this.currentPage-1)*this.cardsPerPage,e=t+this.cardsPerPage;return this.images.slice(t,e)}},methods:{loadCards:function(){var t=this;this.loading=!0,this.searchQuery?g.a.get("http://47.93.172.156:8081/commodity/search",{keyword:this.searchQuery}).then((function(e){var i=e.data;if(i&&Array.isArray(i.ids)){var a=i.ids,s=a.map((function(t){return fetch(" http://47.93.172.156:8081/commodity/find/".concat(t)).then((function(t){return t.json()}))}));Promise.all(s).then((function(e){t.images=e.map((function(t,e){return{id:t.id,index:e+1,name:t.name||"test",price:t.price||3,score:parseFloat(Number(t.score).toFixed(1))||"未评分",introduction:t.introduction||"it is a test",business_id:t.business_id||1,url:t.homepage}})),t.currentPage=1})).catch((function(t){}))}})).catch((function(t){})):(fetch("http://47.93.172.156:8081/commodity/business/".concat(sessionStorage.getItem("id"))).then((function(t){return t.json()})).then((function(e){if(e&&Array.isArray(e.ids)){var i=e.ids,a=i.map((function(t){return fetch(" http://47.93.172.156:8081/commodity/find/".concat(t)).then((function(t){return t.json()}))}));Promise.all(a).then((function(e){t.images=e.map((function(t,e){return{id:t.id,index:e+1,name:t.name||"test",price:t.price||3,score:parseFloat(Number(t.score).toFixed(1))||"未评分",introduction:t.introduction||"it is a test",business_id:t.business_id||1,url:t.homepage}})),t.currentPage=1})).catch((function(t){}))}})).catch((function(t){})),setTimeout((function(){t.loading=!1}),800))},setActive:function(t){this.currentIndex=t},triggerDeleteMode:function(){this.deleteMode=!this.deleteMode},confirmDeleteCard:function(){var t=this,e=this.selectedCard.id;fetch("http://47.93.172.156:8081/commodity/delete/".concat(e),{method:"DELETE"}).then((function(i){i.ok&&(t.images=t.images.filter((function(t){return t.id!==e})),t.showDeleteDialog=!1,t.selectedCard=null)})).catch((function(t){}))},cancelDeleteCard:function(){this.showDeleteDialog=!1,this.selectedCard=null},refreshCards:function(){this.searchQuery="";var t=this.$el.querySelector('input[type="text"]');t&&(t.value=""),this.loadCards()},handleSearch:function(t){this.searchQuery=t,this.searchQuery&&this.loadCards()},showDialog:function(t){this.selectedCard=this.images[t.index],this.deleteMode?this.showDeleteDialog=!0:this.isDialogVisible=!0},closeDialog:function(){this.isDialogVisible=!1,this.selectedCard=null}}},C=p,v=(i("3503"),Object(d["a"])(C,a,s,!1,null,"f2e1993c",null));e["default"]=v.exports},a908:function(t,e,i){},bee6:function(t,e,i){},ea43:function(t,e,i){"use strict";var a=i("bee6"),s=i.n(a);s.a}}]);