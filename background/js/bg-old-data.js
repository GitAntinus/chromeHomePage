var bgOldData={oldId:"dbfmnekepjoapopniengjbcpnbljalfg",isInstall:!1,init:function(){var e=this;chrome.runtime.onInstalled.addListener(function(i){"install"==i.reason?e.isInstall=!0:i.reason,chrome.management.get(e.oldId,function(i){void 0,chrome.runtime.lastError?(void 0,e.isInstall&&(void 0,e.isInstall=!1,infinity.set("infinity-status",{isFirstLogin:!0}),chrome.tabs.create({url:"chrome://newtab/"}))):i&&i.enabled?e.isInstall&&(e.isInstall=!1,e.messageOld(function(){chrome.management.setEnabled(e.oldId,!1,function(e){}),infinity.set("infinity-status",{isFirstLogin:!0}),chrome.tabs.create({url:"chrome://newtab/"})})):e.isInstall&&(void 0,e.isInstall=!1,infinity.set("infinity-status",{isFirstLogin:!0}),chrome.tabs.create({url:"chrome://newtab/"}))})})},messageOld:function(e){var i=this,t=i.oldId;chrome.runtime.sendMessage(t,{getTargetData:!0},function(t){i.transOldData(t,function(i){if(!i)return infinity.init("infinity-status",{isFirstLogin:!0}),void chrome.tabs.create({url:"chrome://newtab/"});infinity.set("infinity-icons",i),bgIcon.setIconsFlat(),infinity.sendMessage("reloadIcon"),infinity.sendMessage("firstLogin"),e&&e()})})},transCustomIcon:function(e,i,t,n){var a=document.getElementById("iconCanvas"),o=a.getContext("2d"),s=infinity.iconSize;if(t)l=.56*s;else var l=s;var r=(s-l)/2;o.clearRect(0,0,s,s),a.width=s,a.height=s;var c=new Image;c.src=i,c.onload=function(){o.fillStyle=e,o.fillRect(0,0,s,s),o.drawImage(c,r,r,l,l);var i=a.toDataURL("image/png");n&&n(i)}},transOldData:function(e,i){var t=this;try{for(var n=e.icon,a=JSON.parse(e.setting),o=a.todostrue,s=a.todosfalse,l=[],r=0;r<s.length;r++){c={done:!0,time:(new Date).getTime(),text:s[r]};l.push(c)}for(r=0;r<o.length;r++){var c={done:!1,time:(new Date).getTime(),text:o[r]};l.push(c)}infinity.set("infinity-todos",l);for(var f=a.notes,m=[],r=0;r<f.length;r++){var d={text:f[r].text,time:(new Date).getTime()};m.push(d)}infinity.set("infinity-notes",m);for(var g=JSON.parse(n),y=_.flatten(g,!0),r=0;r<y.length;r++){var b=y[r];if("weather"==b.type&&(b.uid="eed2a9287b324510678cd5e714888e99",b.name=infinity.i18n("weather"),b.url="infinity://weather",b.src="https://infinityicon.infinitynewtab.com/user-share-icon/b6a95410ed77627337567fea2cbb157c.png?imageMogr2/thumbnail/"+infinity.iconSize+"x/format/webp/blur/1x0/quality/100|imageslim",b.imageType="image",delete b.bgColor,delete b.type,delete b.ico),"todos"==b.type&&(b.uid="c09f31db43d7faca5bf659fadad3967c",b.name=infinity.i18n("todos"),b.url="infinity://todos",b.src="https://infinityicon.infinitynewtab.com/user-share-icon/6e49210c084629259f22609980c48ecf.png?imageMogr2/thumbnail/"+infinity.iconSize+"x/format/webp/blur/1x0/quality/100|imageslim",b.imageType="image",delete b.bgColor,delete b.type,delete b.ico),"apps"==b.type&&(b.uid="4e0da886cc15213d558a4c51b2623089",b.name=infinity.i18n("chrome_apps"),b.url="infinity://chrome-apps",b.src="https://infinityicon.infinitynewtab.com/user-share-icon/63cf498c5b3d20beaa0b1f38bda717f9.png?imageMogr2/thumbnail/"+infinity.iconSize+"x/format/webp/blur/1x0/quality/100|imageslim",b.imageType="image",delete b.bgColor,delete b.type,delete b.ico),"notepad"==b.type&&(b.uid="ea5ac5d9e9e08c1d57ad413e9e38d376",b.name=infinity.i18n("notes"),b.url="infinity://notes",b.src="https://infinityicon.infinitynewtab.com/user-share-icon/006b88c07a2e87d5a61f3c969a70575c.png?imageMogr2/thumbnail/"+infinity.iconSize+"x/format/webp/blur/1x0/quality/100|imageslim",b.imageType="image",delete b.bgColor,delete b.type,delete b.ico),"bookmarks"==b.type&&(b.uid="96646a13688f5bfd0aaf4811a579aee1",b.name=infinity.i18n("bookmarks"),b.url="infinity://bookmarks",b.src="https://infinityicon.infinitynewtab.com/user-share-icon/31a36139ccf4b9b005ec55445bf833b0.png?imageMogr2/thumbnail/"+infinity.iconSize+"x/format/webp/blur/1x0/quality/100|imageslim",b.imageType="image",delete b.bgColor,delete b.type,delete b.ico),"history"==b.type&&(b.uid="4528cef4f8d66e661cb3143af733694e",b.name=infinity.i18n("history"),b.url="infinity://history",b.src="https://infinityicon.infinitynewtab.com/user-share-icon/faa06f85d37cdd552e2e57cb282ad0f7.png?imageMogr2/thumbnail/"+infinity.iconSize+"x/format/webp/blur/1x0/quality/100|imageslim",b.imageType="image",delete b.bgColor,delete b.type,delete b.ico),"setting"==b.type&&(b.uid="552fa3a378b29375843fa3d021cbe129",b.name=infinity.i18n("settings"),b.url="infinity://settings",b.src="https://infinityicon.infinitynewtab.com/user-share-icon/9622b98e90dd4f107d23481566095b34.png?imageMogr2/thumbnail/"+infinity.iconSize+"x/format/webp/blur/1x0/quality/100|imageslim",b.imageType="image",delete b.bgColor,delete b.type,delete b.ico),"ico"==b.type||"gmail"==b.type){b.uid="";var u=b.ico,p=u.indexOf("ouddn.com");if(p>0){var h=u.substr(p+9,u.length);b.src="https://infinityicon.infinitynewtab.com/"+h}else b.src=b.ico;b.imageType="image",delete b.bgColor,delete b.type,delete b.ico,delete b.iconid,delete b.title}}var w=0;function v(e){var n=y[w];if(n)"custom"==n.type?""==n.ico?(n.showText=n.title.substr(0,2),n.fontSize=32,n.imageType="color",w+=1,v()):t.transCustomIcon(n.bgColor,n.ico,!1,function(e){n.src=e,n.imageType="image",n.bgColor="transparent",n.showText="",delete n.bgColor,delete n.type,delete n.ico,delete n.iconid,delete n.title,w+=1,v()}):"app"==n.type?t.transCustomIcon("#ffffff",n.ico,!0,function(e){n.src=e,n.url="chrome-app://"+n.url.split("://")[1],n.imageType="image",delete n.bgColor,delete n.type,delete n.ico,delete n.iconid,delete n.title,w+=1,v()}):(w+=1,v());else{var a=_.chunk(y,10);i&&i(a)}}v()}catch(e){void 0,i&&i(!1)}}};