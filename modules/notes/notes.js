"use strict";(function(){var e=[].slice;String.prototype.autoLink=function(){var t,n,i,o,s,a,r;return s=1<=arguments.length?e.call(arguments,0):[],a=/(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi,0<s.length?(o=s[0],t=o.callback,i=function(){var e;e=[];for(n in o)r=o[n],"callback"!==n&&e.push(" "+n+"='"+r+"'");return e}().join(""),this.replace(a,function(e,n,o){return e=("function"==typeof t?t(o):void 0)||"<a href='"+o+"'"+i+">"+o+"</a>",""+n+e})):this.replace(a,"$1<a href='$2'>$2</a>")}}).call(this),function(){function e(){if(window.getSelection){var e=window.getSelection();if(e.getRangeAt&&e.rangeCount){for(var t=[],n=0,i=e.rangeCount;n<i;++n)t.push(e.getRangeAt(n));return t}}else if(document.selection&&document.selection.createRange)return document.selection.createRange();return null}function t(e){if(e)if(window.getSelection){var t=window.getSelection();t.removeAllRanges();for(var n=0,i=e.length;n<i;++n)t.addRange(e[n])}else document.selection&&e.select&&e.select()}function n(){var e,t,n=$(".notes-content")[0];(e=document.createRange()).selectNodeContents(n),e.collapse(!1),(t=window.getSelection()).removeAllRanges(),t.addRange(e)}var i={};infinity.modules.notes=new Vue({el:"#notes",data:{notes:infinity.get("infinity-notes"),current:0,onEdting:!1,selectText:"",linkUrl:"",selection:"",isInsertLink:!1,loadImage:"",loadingImage:!1,uploadImageSrc:"",uploadAjax:null,isInsertImage:!1,font:{big:{"12px":"14px","14px":"16px","16px":"18px","18px":"20px","20px":"20px"},small:{"12px":"12px","14px":"12px","16px":"14px","18px":"16px","20px":"18px"}},fontsize:infinity.setting("notesFontSize"),leftzoom:infinity.get("infinity-settings").settingLeftSlideZoom/100},created:function(){var e=this;$(".notes-content").html(e.notes[e.current].text),$(".notes-content").on("click","a",function(e){e.preventDefault();var t=$(this).attr("href");window.open(t,"_blank")}),$(".notes-new-out").on("animationend",function(e){$(this).hide(),$(".notes-new-out").removeClass("notes-new-animation")}),$(".notes-box").on("transitionend",function(e){event.target.className.indexOf("sildeBox")>=0&&(e.target.className.indexOf("slide-show")>=0?($(".notes-content")[0].focus(),n()):$(".notes-box").hide())}),$(".notes-content").on("keydown",function(e){if(9==e.keyCode){e.preventDefault();var t=this.selectionStart,n=this.selectionEnd,i=window.getSelection().toString();i="    "+i.replace(/\n/g,"\n    "),this.value=this.value.substring(0,t)+i+this.value.substring(n),this.setSelectionRange(t+"    ".length,t+i.length)}}),$(document).on("click",".notes-cover",function(t){t.preventDefault(),e.hide()}),infinity.onMessage("updateNotesView",function(t){chrome.tabs.getCurrent(function(o){o.id!=t.tabid&&(i={},e.current=0,e.notes=infinity.get("infinity-notes"),$(".notes-content").html(e.notes[e.current].text),n())})}),e.debounceSend=$.debounce(500,!1,function(){chrome.tabs.getCurrent(function(e){infinity.sendMessage("notesChange",{tabid:e.id})})}),$(document).on("transitionend",".notes-head-body",function(e){e.preventDefault(),e.target.className.indexOf("notes-head-body")>=0&&e.target.className.indexOf("notes-head-body-show")})},methods:{show:function(){$(".notes-cover,.notes-box").show(),$(".notes-box").addClass("slide-show"),setTimeout(function(){$(".notes-head-body").addClass("notes-head-body-show slide-box-shadow")},180)},hide:function(){var e=this;$(".notes-cover").hide(),$(".notes-head-body").removeClass("notes-head-body-show slide-box-shadow"),setTimeout(function(){$(".notes-box").removeClass("slide-show")},180),e.hideSetLink()},write:function(e){e.preventDefault();var t=this,n=$(".notes-content").html();i={};var o=infinity.get("infinity-notes");o[t.current].time=(new Date).getTime(),o[t.current].text=n.autoLink(),t.notes=o,infinity.set("infinity-notes",t.notes),t.debounceSend()},newNote:function(){var e=this,t={time:(new Date).getTime(),text:""};i={};var n=infinity.get("infinity-notes");n.unshift(t),e.notes=n,infinity.set("infinity-notes",n),e.current=0,$(".notes-content").html(""),$(".notes-new-out").css("display","flex"),$(".notes-new-out").removeClass("notes-new-animation"),e.debounceSend(),setTimeout(function(){$(".notes-new-out").addClass("notes-new-animation"),$(".notes-content")[0].focus()},300)},transHtml:function(e,t){for(var n=/<img.*?(?:>|\/>)/gi,i=/<\/p>/gi,o=(e=e.replace(i,"</p>\n")).match(n),s=0;s<o.length;s++){var a=$(o[s]).attr("src");e=e.replace(o[s],'<p>\n{{{"infinity-src":"'+a+'"}}}\n</p>')}for(var r=/\n/gi,c=$("<div>"+e+"</div>").text(),l=/{{{"infinity-src":".*"}}}/gi,u=c.match(l),s=0;s<u.length;s++){var f='<img src="'+JSON.parse(u[s].replace("{{","").replace("}}",""))["infinity-src"]+'">';c=c.replace(u[s],f)}return c=c.replace(r,"<br>").autoLink(),$.trim(c)},paste:function(e){var t=this;e.preventDefault();try{var n=e.clipboardData.getData("text/html"),i=t.transHtml(n,e)}catch(t){try{var o=/\n/gi;i=(i=e.clipboardData.getData("text/plain")).replace(o,"<br>"),i=(i=$.trim(i)).autoLink()}catch(e){i=""}}document.execCommand("insertHtml",!1,i)},changeCurrent:function(e,t){var o=this;if(t.target.className.indexOf("notes-delete")<0)o.current=e,$(".notes-content").html(o.notes[o.current].text),$(".notes-content")[0].focus(),n();else{i={};var s=infinity.get("infinity-notes");s.splice(e,1),o.notes=s,e<o.current&&(o.current-=1),infinity.set("infinity-notes",s),chrome.tabs.getCurrent(function(e){infinity.sendMessage("notesChange",{tabid:e.id})}),1==o.notes.length&&(o.onEdting=!1),$(".notes-content")[0].focus(),n()}},backuprange:function(){try{var e=this,t=window.getSelection();e.focusRange=t.getRangeAt(0),e.focusRange.setEnd(e.focusRange.startContainer,e.focusRange.startOffset)}catch(e){void 0}},restorerange:function(){try{var e=this,t=window.getSelection();t.removeAllRanges(),t.addRange(e.focusRange)}catch(e){}},setCanInsert:function(){this.backuprange()},onSetLink:function(){var t=this;t.isInsertImage=!1,$(".notes-insert-out").css("display","flex");var n=window.getSelection();""==n?(t.isInsertLink=!0,$(".notes-link-text").removeAttr("disabled"),$(".notes-link-text")[0].focus()):(t.isInsertLink=!1,$(".notes-link-text").attr("disabled","true")),t.selectText=n.toString(),t.selection=e()},setLink:function(){var e=this;t(e.selection),""!=e.selectText?""!=e.linkUrl?(e.isInsertLink?(e.restorerange(),document.execCommand("insertHTML",!1,"<a href='"+e.linkUrl+"'>"+e.selectText+"</a>")):""==e.linkUrl||document.execCommand("createLink",!1,e.linkUrl),e.hideSetLink()):infinity.with("info",function(e){e.show(infinity.i18n("empty_for_remove_or_null"),!0)}):infinity.with("info",function(e){e.show(infinity.i18n("link_text_can_not_be_null"),!0)})},hideSetLink:function(){$(".notes-insert-out").hide(),this.linkUrl="",this.selectText=""},formatTime:function(e){try{return new Date(e).toLocaleString()}catch(e){return""}},formatDate:function(e){var t={},n=new Date(e).toLocaleDateString(),o=/\//gi;return n=n.replace(o,"-"),t.time=n,i.hasOwnProperty(n)?t.isShow=!1:(i[n]=n,t.isShow=!0),t},formatTitle:function(e){try{var t=$("<div>"+e+"</div>").text().substr(0,100);return""==$.trim(t)?infinity.i18n("no_title"):t}catch(e){return infinity.i18n("no_title")}},editNotes:function(){var e=this;e.onEdting=!e.onEdting},clearFileValue:function(e){e.target.value="",infinity.getUserInfo().isLogin||(infinity.with("info",function(e){e.show(infinity.i18n("login_to_insert_image"),!0)}),e.preventDefault())},uploadImage:function(e){var t=this,n=e.srcElement.files[0],i=new FileReader;i.readAsDataURL(n),i.onload=function(e){t.loadImage=e.target.result,t.loadingImage=!0,t.isInsertImage=!0,$(".notes-insert-out").css("display","flex"),t.onUploadImg(t.loadImage)}},onUploadImg:function(e){var t=this,n=infinity.getUserInfo(),i=n.uid,o=n.secret;t.uploadAjax=$.ajax({url:infinity.url+"user/save-user-upload-img-in-notes?uid="+i+"&secret="+o,type:"POST",dataType:"json",data:{img:e},timeout:3e4}).done(function(e){if(200==e.status){var n=new Image;n.src=e.src+"?imageView2/2/w/700",n.onload=function(){t.loadingImage=!1,t.uploadImageSrc=e.src+"?imageView2/2/w/700",n=null}}}).fail(function(){infinity.with("info",function(e){e.show(infinity.i18n("image_upload_failed_please_check_network"),!0,function(){t.hideSetLink()})})}).always(function(e){})},hideUploadImage:function(){var e=this;e.uploadAjax&&e.uploadAjax.abort(),e.hideSetLink()},setImage:function(){var e=this;e.restorerange(),document.execCommand("insertImage",!1,e.uploadImageSrc),e.hideSetLink()},fontSize:function(e){var t=this,n=infinity.setting("notesFontSize"),i=t.font[e][n];infinity.setting("notesFontSize",i),t.fontsize=i}}})}();