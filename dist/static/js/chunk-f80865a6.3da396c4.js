(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f80865a6"],{"070e":function(A,t,e){},"0966":function(A,t){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlAAAADqCAYAAABtLHt/AAAEG0lEQVR4Xu3WoQ0AMAzAsP7/dMsHJoXbMBdkFgCAZN4AAMCfgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAAkYECAIgMFABAZKAAACIDBQAQGSgAgMhAAQBEBgoAIDJQAACRgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAAkYECAIgMFABAZKAAACIDBQAQGSgAgMhAAQBEBgoAIDJQAACRgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAAkYECAIgMFABAZKAAACIDBQAQGSgAgMhAAQBEBgoAIDJQAACRgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAAkYECAIgMFABAZKAAACIDBQAQGSgAgMhAAQBEBgoAIDJQAACRgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAAkYECAIgMFABAZKAAACIDBQAQGSgAgMhAAQBEBgoAIDJQAACRgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAAkYECAIgMFABAZKAAACIDBQAQGSgAgMhAAQBEBgoAIDJQAACRgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAAkYECAIgMFABAZKAAACIDBQAQGSgAgMhAAQBEBgoAIDJQAACRgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAAkYECAIgMFABAZKAAACIDBQAQGSgAgMhAAQBEBgoAIDJQAACRgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAAkYECAIgMFABAZKAAACIDBQAQGSgAgMhAAQBEBgoAIDJQAACRgQIAiAwUAEBkoAAAIgMFABAZKACAyEABAEQGCgAgMlAAAJGBAgCIDBQAQGSgAAAiAwUAEBkoAIDIQAEARAYKACAyUAAA0QEamInVy4pRpgAAAABJRU5ErkJggg=="},"101b":function(A,t,e){"use strict";var i=e("070e"),a=e.n(i);a.a},"29f0":function(A,t,e){},"4a2d":function(A,t,e){},"5cec":function(A,t,e){"use strict";e.r(t);var i=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("div",{staticClass:"body"},[e("div",{staticClass:"func"},[e("button",{staticClass:"cta",on:{click:A.refreshCards}},[e("span",[A._v("Update")]),e("svg",{attrs:{viewBox:"0 0 13 10",height:"10px",width:"15px"}},[e("path",{attrs:{d:"M1,5 L11,5"}}),e("polyline",{attrs:{points:"8 1 12 5 8 9"}})])]),e("SearchBar",{on:{"search-input":A.handleSearch},model:{value:A.searchQuery,callback:function(t){A.searchQuery=t},expression:"searchQuery"}})],1),A.loading?e("div",{staticClass:"jiggly-wrapper"},[e("JigglyComponent")],1):A._e(),A.loading?A._e():e("div",{staticClass:"card-container"},A._l(A.filteredCards,(function(t,i){return e("card-component",{key:i,attrs:{imageUrl:t.url,title:t.name,description:t.score,offset:1,index:i},on:{"card-clicked":A.showDialog}})})),1),!A.loading&&A.images.length>A.cardsPerPage?e("el-pagination",{staticClass:"pagination",attrs:{background:"",layout:"prev, pager, next","current-page":A.currentPage,"page-size":A.cardsPerPage,total:A.filteredCards_back.length},on:{"current-change":A.handlePageChange}}):A._e(),A.isDialogVisible?e("CardDialog",{staticClass:"dialog-animation",attrs:{card:A.selectedCard},on:{"close-dialog":A.closeDialog}}):A._e()],1)},a=[],n=(e("4de4"),e("a630"),e("caad"),e("d81d"),e("fb6a"),e("b0c0"),e("a9e3"),e("b680"),e("d3b7"),e("2532"),e("3ca3"),e("ddb0"),e("d97f")),s=e("ec16"),r=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("el-col",{attrs:{span:6,offset:A.offset}},[e("el-card",{staticClass:"card",attrs:{"body-style":{padding:"0px"}}},[e("div",{staticClass:"image-container"},[e("img",{staticClass:"image",attrs:{src:A.imageUrl}})]),e("div",{staticStyle:{padding:"14px"}},[e("span",{staticClass:"title"},[A._v(A._s(A.title))]),e("div",{staticClass:"rating-container"},[A._l(5,(function(t){return e("span",{key:t,staticClass:"star",class:{filled:t<=A.fullStars}},[A._v(" ★ ")])})),A.hasHalfStar?e("span",{staticClass:"star half"},[A._v(" ★ ")]):A._e()],2),e("div",{staticClass:"bottom clearfix"},[e("time",{staticClass:"time"},[A._v(A._s(A.description))]),e("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:A.handleClick}},[A._v("click")])],1)])])],1)},c=[],o=(e("a4d3"),e("e01a"),{props:{imageUrl:{type:String,required:!0},title:{type:String,required:!0},description:{type:String,required:!0},offset:{type:Number,default:0},index:{type:Number,required:!0}},computed:{rating:function(){var A=parseFloat(this.description);return isNaN(A)?0:Math.round(A)},fullStars:function(){return Math.floor(this.rating)},hasHalfStar:function(){return this.rating%1>=.5}},methods:{handleClick:function(){this.$emit("card-clicked",{index:this.index,title:this.title})}}}),l=o,u=(e("101b"),e("0c7c")),g=Object(u["a"])(l,r,c,!1,null,"79c2bb6a",null),d=g.exports,h=e("cebe"),C=e.n(h),f=e("9eb3"),p={components:{SearchBar:n["a"],CardDialog:s["a"],CardComponent:d,JigglyComponent:f["a"]},data:function(){return{loading:!1,currentPage:1,cardsPerPage:9,searchQuery:"",images:Array.from({length:9},(function(){return{id:null,name:"test",price:2,score:3,introduction:"it is a test",business_id:1,url:e("0966")}})),currentIndex:4,isDialogVisible:!1,selectedCard:null}},mounted:function(){var A=this;this.loadCards(),setTimeout((function(){A.loading=!1}),1e3)},beforeRouteUpdate:function(A,t,e){this.loadCards(),e()},computed:{filteredCards:function(){return this.searchQuery?this.images:this.paginatedCards},filteredCards_back:function(){var A=this;return this.searchQuery?this.images.filter((function(t){return t.name.toLowerCase().includes(A.searchQuery.toLowerCase())})):this.images},paginatedCards:function(){var A=(this.currentPage-1)*this.cardsPerPage,t=A+this.cardsPerPage;return this.images.slice(A,t)}},methods:{handlePageChange:function(A){this.currentPage=A},loadCards:function(){var A=this;this.loading=!0,this.searchQuery?C.a.get("http://47.93.172.156:8081/commodity/search",{keyword:this.searchQuery}).then((function(t){var e=t.data;if(e&&Array.isArray(e.ids)){var i=e.ids,a=i.map((function(A){return fetch(" http://47.93.172.156:8081/commodity/find/".concat(A)).then((function(A){return A.json()}))}));Promise.all(a).then((function(t){A.images=t.map((function(A,t){return{id:A.id,index:t+1,name:A.name||"test",price:A.price||3,score:parseFloat(Number(A.score).toFixed(1))||"未评分",introduction:A.introduction||"it is a test",business_id:A.business_id||1,url:A.homepage}})),A.images=A.images.filter((function(t){return t.name.toLowerCase().includes(A.searchQuery.toLowerCase())})),A.currentPage=1})).catch((function(A){}))}})).catch((function(A){})):fetch("http://47.93.172.156:8081/commodity/all").then((function(A){return A.json()})).then((function(t){if(t&&Array.isArray(t.ids)){var e=t.ids.reverse(),i=e.map((function(A){return fetch(" http://47.93.172.156:8081/commodity/find/".concat(A)).then((function(A){return A.json()}))}));Promise.all(i).then((function(t){A.images=t.map((function(A,t){return{id:A.id,index:t+1,name:A.name||"test",price:A.price||3,score:parseFloat(Number(A.score).toFixed(1))||"未评分",introduction:A.introduction||"it is a test",business_id:A.business_id||1,url:A.homepage}})),A.currentPage=1})).catch((function(A){}))}})).catch((function(A){}))},setActive:function(A){this.currentIndex=A},refreshCards:function(){var A=this;this.searchQuery="";var t=this.$el.querySelector('input[type="text"]');t&&(t.value=""),this.loadCards(),setTimeout((function(){A.loading=!1}),800)},handleSearch:function(A){var t=this;this.searchQuery=A,this.searchQuery&&(this.loadCards(),setTimeout((function(){t.loading=!1}),800))},showDialog:function(A){this.selectedCard=this.images[A.index+(this.currentPage-1)*this.cardsPerPage],this.isDialogVisible=!0},closeDialog:function(){this.isDialogVisible=!1,this.selectedCard=null}}},B=p,Q=(e("6cf1"),Object(u["a"])(B,i,a,!1,null,"2697ecec",null)),m=Q.exports;t["default"]=m},"6cf1":function(A,t,e){"use strict";var i=e("4a2d"),a=e.n(i);a.a},"9bf22":function(A,t,e){"use strict";var i=e("29f0"),a=e.n(i);a.a},d97f:function(A,t,e){"use strict";var i=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("div",{staticClass:"search-bar-container",class:{active:!A.isActive}},[e("img",{staticClass:"magnifier",attrs:{src:"https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/magnifier-512.png",alt:"magnifier"},on:{click:A.toggleSearch}}),e("input",{directives:[{name:"model",rawName:"v-model",value:A.inputValue,expression:"inputValue"}],staticClass:"input",attrs:{type:"text",placeholder:"Search ...",disabled:!A.isActive},domProps:{value:A.inputValue},on:{input:[function(t){t.target.composing||(A.inputValue=t.target.value)},A.onInputChange]}})])},a=[],n={name:"SearchBar",props:{modelValue:{type:String,default:""}},data:function(){return{inputValue:this.modelValue,isActive:!1}},watch:{inputValue:function(A){this.$emit("update:modelValue",A)},modelValue:function(A){this.inputValue=A}},methods:{toggleSearch:function(){this.isActive=!this.isActive,this.isActive||(this.inputValue="",this.$emit("update:modelValue",""))},clearSearch:function(){this.inputValue="",this.$emit("update:modelValue","")},onInputChange:function(){this.$emit("search-input",this.inputValue)}}},s=n,r=(e("9bf22"),e("0c7c")),c=Object(r["a"])(s,i,a,!1,null,"4b1b5740",null);t["a"]=c.exports}}]);