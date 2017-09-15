"use strict";infinity.modules["my-wallpaper"]=new Vue({el:"#my-wallpaper",data:{bgColors:["#dddddd","#F44336","#ff9800","#ffeb3b","#4caf50","#00bcd4","#2196f3","#673ab7","transparent"],colorNum:-1,bgColorData:infinity.get("infinity-bg"),settings:infinity.get("infinity-settings"),bgchoiceColor:"transparent",wallpaperSource:infinity.setting("wallpaperSource"),feedbackhref:"https://infinity.mikecrm.com/x5tPd5V",version:null,userSupportFeedbackHref:"",lang:infinity.lang},created:function(){var i=this;infinity.onMessage("settingBgColorDone",function(){i.bgColorData=infinity.get("infinity-bg"),i.changeThisNum()}),infinity.onMessage("bgOpacityChangeDone",function(){i.settings=infinity.get("infinity-settings")}),infinity.onMessage("settingEveryWallpaperDone",function(){i.settings=infinity.get("infinity-settings")}),i.wallpaperSource=infinity.setting("wallpaperSource"),infinity.onMessage("changeWallpaperSourceDone",function(){i.wallpaperSource=infinity.setting("wallpaperSource")}),infinity.onMessage("reSetting",function(){i.settings=infinity.get("infinity-settings"),i.wallpaperSource=infinity.setting("wallpaperSource"),i.bgColorData=infinity.get("infinity-bg")}),chrome.management.get(chrome.runtime.id,function(n){i.version=n.version})},ready:function(){this.changeThisNum(),this.feedbackhrefGO(),this.initColor(),infinity.isZh()?this.userSupportFeedbackHref="https://infinity.mikecrm.com/x5tPd5V":this.userSupportFeedbackHref="https://sv.mikecrm.com/ZUvHLJa"},methods:{nextEverydayWallpaper:function(){try{infinity.with("info",function(i){i.show(infinity.i18n("searching_next_wallpaper_please_wait"),!0)}),chrome.extension.getBackgroundPage().bgWallpaper.getNewWallpaper()}catch(i){void 0}},feedbackhrefGO:function(){infinity.isZh()||(this.feedbackhref="https://sv.mikecrm.com/ZUvHLJa")},settingChange:function(i){infinity.sendMessage("onSettingChange",{option:i})},feedback:function(){infinity.isZh()?window.open("https://infinity.mikecrm.com/x5tPd5V"):window.open("https://sv.mikecrm.com/ZUvHLJa")},changeWallpaperSource:function(){infinity.with("wallpaper-source",function(i){i.show()})},openWallpaperLibrary:function(){infinity.with("wallpaper",function(i){i.showLibrary()})},clearFileValue:function(i){i.target.value=""},selectLocalImage:function(i){try{var n=i.currentTarget.files[0],t=window.URL.createObjectURL(n);infinity.with("wallpaper",function(i){i.showLocal(t)})}catch(i){}},rate:function(){var i="https://chrome.google.com/webstore/detail/infinity-new-tab/"+infinity.extId+"/reviews?utm_source=infinity-rate";window.open(i,"_blank")},tucao:function(){window.open("https://forum.infinitynewtab.com/d/16-infinity","_blank")},changeThisNum:function(){var i=this.bgColorData.type,n=this.bgColorData.color;if("color"==i){var t=this.bgColors.indexOf(n);-1!=t?this.colorNum=t:"#fff"==(n=n.toLowerCase())||"#ffffff"==n||"rgb(255,255,255)"==n?this.colorNum=0:(this.colorNum=this.bgColors.length-1,this.bgchoiceColor=n)}else this.colorNum=-1},setbgColor:function(i,n,t){n&&(0==t&&(n="#fff"),loadWallpaper(!0,n),infinity.sendMessage("setWallpaper",{type:"color",src:null,color:n})),this.colorNum=t},initColor:function(){var i=this.bgColorData.color;-1==this.bgColors.indexOf(i)&&(this.bgColors[this.bgColors.length-1]=i)},callbackSetBgColor:function(i){loadWallpaper(!0,i)},sendBgColorMessage:function(i){infinity.sendMessage("setWallpaper",{type:"color",img:"",color:i}),this.bgColors[this.bgColors.length-1]=i},callbackCancelColor:function(){var i=infinity.get("infinity-bg").color,n=this.bgColors.indexOf(i);if(void 0,"transparent"!=i)-1!=n&&(this.colorNum=n,this.callbackSetBgColor(i)),"#fff"!=i.toLowerCase()&&"#ffffff"!=i.toLowerCase()||(this.colorNum=0);else{var t=infinity.get("infinity-bg").src;loadWallpaper(!1,t)}},initPickColor:function(i,n){var t={callbackFn:infinity.modules["my-wallpaper"].callbackSetBgColor,callbackBgFn:infinity.modules["my-wallpaper"].sendBgColorMessage,calllbackCancel:this.callbackCancelColor,color:this.bgColors[this.bgColors.length-1],zoom:this.settings.settingLeftSlideZoom};this.setbgColor(i,"",n),infinity.modules.main.pickColor(i,t)},bgOpacityInput:function(){$(".home-bg-cover").css("background-color","rgba(0,0,0,"+this.settings.bgOpacity/100+")")},bgOpcityChangeDone:function(){infinity.sendMessage("bgOpacityChange",this.settings.bgOpacity)},transferData:function(){chrome.tabs.create({url:window.location.origin+"/trans-old-data/transfer-data-from-old-version.html"},function(){})}}});