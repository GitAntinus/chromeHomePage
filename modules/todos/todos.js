"use strict";infinity.modules.todos=new Vue({el:"#todos-box",data:{input:"",todos:[],showRemind:!1,leftzoom:infinity.get("infinity-settings").settingLeftSlideZoom/100},created:function(){var t=this;infinity.onMessage("todoChanged",function(){infinityView.setToDonumbers(),t.init()}),infinity.onMessage("updateTodosView",function(){t.init()}),$("#todos-box").on("transitionend",function(o){o.target.className.indexOf("sildeBox")>=0&&(o.target.className.indexOf("slide-show")>=0?(t.isInit||(t.init(),t.isInit=!0),$(".todos-input")[0].focus(),$(".todos-splash").hide(),$(".todos-content").show()):($("#todos-box").hide(),$(".todos-content").removeClass("infinity-fadeIn-8")))}),$(document).on("click","#todos-cover",function(o){o.preventDefault(),t.hide()})},methods:{show:function(){$("#todos-cover,#todos-box").show(),$("#todos-box").addClass("slide-show slide-box-shadow")},hide:function(){$("#todos-box").removeClass("slide-show slide-box-shadow"),$("#todos-cover").hide()},init:function(){var t=infinity.get("infinity-todos");this.todos=t},addTodos:function(t){if(t.preventDefault(),""==this.input)return!1;var o={text:this.input,done:!1,time:(new Date).getTime()};this.todos.unshift(o),this.input="";var i=this.todos;infinity.set("infinity-todos",i),infinity.sendMessage("todosChange",this.countTodos)},doit:function(t,o){o.preventDefault();var i=this;t.done=!t.done,infinity.set("infinity-todos",i.todos),infinity.sendMessage("todosChange",this.countTodos)},cancelRemind:function(){},clearDone:function(){var t=this;t.todos=t.todos.filter(function(t){return!t.done}),infinity.set("infinity-todos",t.todos),infinity.sendMessage("todosChange",this.countTodos)},remove:function(t){var o=this,i=o.todos.indexOf(t);o.todos.splice(i,1),infinity.set("infinity-todos",o.todos),infinity.sendMessage("todosChange",this.countTodos)}},computed:{countTodos:function(){return Vue.filter("filterBy")(this.todos,!1,"done").length},countDones:function(){return Vue.filter("filterBy")(this.todos,!0,"done").length}}});