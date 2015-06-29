YUI.add("moodle-editor_ousupsub-editor",function(e,t){function s(){s.superclass.constructor.apply(this,arguments)}function o(){}function u(){}function a(){}function f(){}function l(){}function c(){}var n="moodle-editor_ousupsub-editor",r={CONTENT:"editor_ousupsub_content",CONTENTWRAPPER:"editor_ousupsub_content_wrap",TOOLBAR:"editor_ousupsub_toolbar",WRAPPER:"editor_ousupsub",HIGHLIGHT:"highlight"};e.extend(s,e.Base,{BLOCK_TAGS:["address","article","aside","audio","blockquote","canvas","dd","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","noscript","ol","output","p","pre","section","table","tfoot","ul","video"],PLACEHOLDER_CLASS:"ousupsub-tmp-class",ALL_NODES_SELECTOR:"[style],font[face]",FONT_FAMILY:"fontFamily",_wrapper:null,editor:null,textarea:null,textareaLabel:null,plugins:null,_eventHandles:null,initializer:function(){this.textarea=e.one(document.getElementById(this.get("elementid")));if(!this.textarea)return;YUI.M.editor_ousupsub.addEditorReference(this.get("elementid"),this),this._eventHandles=[],this._wrapper=e.Node.create('<div class="'+r.WRAPPER+'" />'),this.editor=e.Node.create('<div id="'+this.get("elementid")+'editable" '+'contenteditable="true" '+'autocapitalize="none" '+'autocorrect="off" '+'role="textbox" '+'spellcheck="false" '+'aria-live="off" '+'class="'+r.CONTENT+'" />'),this.textareaLabel=e.one('[for="'+this.get("elementid")+'"]'),this.textareaLabel&&(this.textareaLabel.generateID(),this.editor.setAttribute("aria-labelledby",this.textareaLabel.get("id"))),this.setupToolbar();var t=e.Node.create('<div class="'+r.CONTENTWRAPPER+'" />');t.appendChild(this.editor),this._wrapper.appendChild(t);var n=this.textarea.getAttribute("cols")*6+41+"px";this.editor.setStyle("width",n),this.editor.setStyle("minWidth",n),this.editor.setStyle("maxWidth",n);var i=this.textarea.getAttribute("rows"),s=i*6+13+"px";this.editor.setStyle("height",s),this.editor.setStyle("minHeight",s),this.editor.setStyle("maxHeight",s),s=i*6+17+"px",t.setStyle("height",s),t.setStyle("minHeight",s),t.setStyle("maxHeight",s),this.disableCssStyling(),document.queryCommandSupported("DefaultParagraphSeparator")&&document.execCommand("DefaultParagraphSeparator",!1,"p"),this.textarea.get("parentNode").insert(this._wrapper,this.textarea),this.textarea.hide(),this.updateFromTextArea(),this.setupTextareaNavigation(),this._preventEnter(),this.publishEvents(),this.setupSelectionWatchers(),this.setupAutomaticPolling(),this.setupPlugins()},destructor:function(){e.Array.each(this.plugins,function(e,t){e.destroy(),this.plugins[t]=undefined},this),(new e.EventHandle(this._eventHandles)).detach(),this.textarea.show(),this._wrapper.remove(!0),YUI.M.editor_ousupsub.removeEditorReference(this.get("elementid"),this)},focus:function(){return this.editor.focus(),this},publishEvents:function(){return this.publish("change",{broadcast:!0,preventable:!0}),this.publish("pluginsloaded",{fireOnce:!0}),this.publish("ousupsub:selectionchanged",{prefix:"ousupsub"}),this},setupAutomaticPolling:function(){return this._registerEventHandle(this.editor.on(["keyup","cut"],this.updateOriginal,this)),this._registerEventHandle(this.editor.on("paste",this.pasteCleanup,this)),this._registerEventHandle(this.editor.on("drop",this.updateOriginalDelayed,this)),this},updateOriginalDelayed:function(){return e.soon(e.bind(this.updateOriginal,this)),this},setupPlugins:function(){this.plugins={};var t=this.get("plugins"),n,r,i,s,o;for(n in t){r=t[n];if(!r.plugins)continue;for(i in r.plugins){s=r.plugins[i],o=e.mix({name:s.name,group:r.group,editor:this.editor,toolbar:this.toolbar,host:this},s);if(typeof e.M["ousupsub_"+s.name]=="undefined")continue;this.plugins[s.name]=new e.M["ousupsub_"+s.name].Button(o)}}return this.fire("pluginsloaded"),this},enablePlugins:function(e){this._setPluginState(!0,e)},disablePlugins:function(e){this._setPluginState(!1,e)},_setPluginState:function(t,n){var r="disableButtons";t&&(r="enableButtons"),n?this.plugins[n][r]():e.Object.each(this.plugins,function(e){e[r]()},this)},_registerEventHandle:function(e){this._eventHandles.push(e)}},{NS:"editor_ousupsub",ATTRS:{elementid:{value:null,writeOnce:!0},contextid:{value:null,writeOnce:!0},plugins:{value:{},writeOnce:!0}}}),e.augment(s,e.EventTarget),e.namespace("M.editor_ousupsub").Editor=s,e.namespace("M.editor_ousupsub.Editor").init=function(e){return YUI.M.editor_ousupsub.createEditor(e)},o.ATTRS={},o.prototype={_getEmptyContent:function(){return e.UA.ie&&e.UA.ie<10?"":""},updateFromTextArea:function(){this.editor.setHTML(""),this.editor.append(this.textarea.get("value")),this.cleanEditorHTML(),this.editor.getHTML()===""&&this.editor.setHTML(this._getEmptyContent())},updateOriginal:function(){var e=this.textarea.get("value"),t=this.getCleanHTML();return t===""&&this.isActive()&&(t=this._getEmptyContent()),e!==t&&(this.textarea.set("value",t),this.fire("change")),this},setupTextareaNavigation:function(){return this._registerEventHandle(this._wrapper.delegate("key",this.textareaKeyboardNavigation,"down:40,95","."+r.CONTENT,this)),this._registerEventHandle(this._wrapper.delegate("focus",function(e){this._setTabFocus(e.currentTarget)},"."+r.CONTENT,this)),this._registerEventHandle(this._wrapper.delegate("key",this.textareaKeyboardNavigation,"down:38,94","."+r.CONTENT,this)),this},textareaKeyboardNavigation:function(e){e.preventDefault(),!YUI.Env.UA.android&&!this.isActive()&&this.focus();var t="",n=1,r=window.event||e,i=r.keyCode?r.keyCode:r.charCode;if(i===38||i===94)t="superscript";else if(i===40||i===95)t="subscript";this._applyTextCommand(t,n)},_preventEnter:function(){var t="keypress";if(e.UA.webkit||e.UA.ie)t="keydown";this.editor.on(t,function(e){var t=window.event||e;if(t.keyCode===13){if(!t.preventDefault){t.returnValue=!1;return}t.preventDefault()}},this)}},e.Base.mix(e.M.editor_ousupsub.Editor,[o]),u.ATTRS={},u.prototype={getCleanHTML:function(){var t=this.editor.cloneNode(!0),n,r="",i="";e.each(t.all('[id^="yui"]'
),function(e){e.removeAttribute("id")}),t.all(".ousupsub_control").remove(!0),n=t.get("innerHTML");if(n===""||n==="<br>")return"";if(n.indexOf(r)===0){var s=n.length-(r.length+i.length);n=n.substr(r.length,s)}return this._cleanHTML(n)},cleanEditorHTML:function(){return this.editor.set("innerHTML",this._cleanHTML(this.editor.get("innerHTML"))),this},_cleanHTML:function(e){var t=[{regex:/<p[^>]*>(&nbsp;|\s)*<\/p>/gi,replace:""},{regex:/<sup[^>]*(&nbsp;|\s)*>/gi,replace:"<sup>"},{regex:/<sub[^>]*(&nbsp;|\s)*>/gi,replace:"<sub>"},{regex:/&nbsp;/gi,replace:" "},{regex:/<\/sup>(\s*)+<sup>/gi,replace:"$1"},{regex:/<\/sub>(\s*)+<sub>/gi,replace:"$1"},{regex:/<sup>(\s*)+/gi,replace:"$1<sup>"},{regex:/<sub>(\s*)+/gi,replace:"$1<sub>"},{regex:/(\s*)+<\/sup>/gi,replace:"</sup>$1"},{regex:/(\s*)+<\/sub>/gi,replace:"</sub>$1"},{regex:/<br>/gi,replace:""},{regex:/<style[^>]*>[\s\S]*?<\/style>/gi,replace:""},{regex:/<!--(?![\s\S]*?-->)/gi,replace:""},{regex:/<script[^>]*>[\s\S]*?<\/script>/gi,replace:""},{regex:/<\/?(?:br|title|meta|style|std|font|html|body|link|a|ul|li|ol)[^>]*?>/gi,replace:""},{regex:/<\/?(?:b|i|u|ul|ol|li|img)[^>]*?>/gi,replace:""},{regex:/<\/?(?:abbr|address|area|article|aside|audio|base|bdi|bdo|blockquote)[^>]*?>/gi,replace:""},{regex:/<\/?(?:button|canvas|caption|cite|code|col|colgroup|content|data)[^>]*?>/gi,replace:""},{regex:/<\/?(?:datalist|dd|decorator|del|details|dialog|dfn|div|dl|dt|element)[^>]*?>/gi,replace:""},{regex:/<\/?(?:em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5)[^>]*?>/gi,replace:""},{regex:/<\/?(?:h6|header|hgroup|hr|iframe|input|ins|kbd|keygen|label|legend)[^>]*?>/gi,replace:""},{regex:/<\/?(?:main|map|mark|menu|menuitem|meter|nav|noscript|object|optgroup)[^>]*?>/gi,replace:""},{regex:/<\/?(?:option|output|p|param|pre|progress|q|rp|rt|rtc|ruby|samp)[^>]*?>/gi,replace:""},{regex:/<\/?(?:section|select|script|shadow|small|source|std|strong|summary)[^>]*?>/gi,replace:""},{regex:/<\/?(?:svg|table|tbody|td|template|textarea|time|tfoot|th|thead|tr|track)[^>]*?>/gi,replace:""},{regex:/<\/?(?:var|wbr|video)[^>]*?>/gi,replace:""},{regex:/<\/?(?:acronym|applet|basefont|big|blink|center|dir|frame|frameset|isindex)[^>]*?>/gi,replace:""},{regex:/<\/?(?:listing|noembed|plaintext|spacer|strike|tt|xmp)[^>]*?>/gi,replace:""},{regex:/<\/?(?:jsl|nobr)[^>]*?>/gi,replace:""},{regex:/<span(?![^>]*?rangySelectionBoundary[^>]*?)[^>]*>[\s\S]*?([\s\S]*?)<\/span>/gi,replace:"$1"},{regex:/<span(?![^>]*?rangySelectionBoundary[^>]*?)[^>]*>(&nbsp;|\s)*<\/span>/gi,replace:""},{regex:/<span(?![^>]*?rangySelectionBoundary[^>]*?)[^>]*>[\s\S]*?([\s\S]*?)<\/span>/gi,replace:"$1"},{regex:/<sup[^>]*>(&nbsp;|\s)*<\/sup>/gi,replace:""},{regex:/<sub[^>]*>(&nbsp;|\s)*<\/sub>/gi,replace:""}];return this._filterContentWithRules(e,t)},_filterContentWithRules:function(e,t){var n=0;for(n=0;n<t.length;n++)e=e.replace(t[n].regex,t[n].replace);return e},pasteCleanup:function(e){if(e.type==="paste"){var t=e._event;if(t&&t.clipboardData&&t.clipboardData.getData){var n=t.clipboardData.types,r=!1;if(!n)r=!1;else if(typeof n.contains=="function")r=n.contains("text/html");else{if(typeof n.indexOf!="function")return this.fallbackPasteCleanupDelayed(),!0;r=n.indexOf("text/html")>-1;if(!r)if(n.indexOf("com.apple.webarchive")>-1||n.indexOf("com.apple.iWork.TSPNativeData")>-1)return this.fallbackPasteCleanupDelayed(),!0}if(r){var i;try{i=t.clipboardData.getData("text/html")}catch(s){return this.fallbackPasteCleanupDelayed(),!0}e.preventDefault(),i=this._cleanPasteHTML(i);var o=window.rangy.saveSelection();return this.insertContentAtFocusPoint(i),window.rangy.restoreSelection(o),window.rangy.getSelection().collapseToEnd(),this.updateOriginal(),this._normaliseTextarea(),!1}return this.fallbackPasteCleanupDelayed(),!0}return this.fallbackPasteCleanupDelayed(),!0}return this.updateOriginalDelayed(),!0},fallbackPasteCleanup:function(){var e=window.rangy.saveSelection(),t=this.editor.get("innerHTML");return this.editor.set("innerHTML",this._cleanPasteHTML(t)),this.updateOriginal(),window.rangy.restoreSelection(e),this},fallbackPasteCleanupDelayed:function(){return e.soon(e.bind(this.fallbackPasteCleanup,this)),this},_cleanPasteHTML:function(e){if(!e||e.length===0)return"";var t=[{regex:/<\s*\/html\s*>([\s\S]+)$/gi,replace:""},{regex:/<!--\[if[\s\S]*?endif\]-->/gi,replace:""},{regex:/<!--(Start|End)Fragment-->/gi,replace:""},{regex:/<xml[^>]*>[\s\S]*?<\/xml>/gi,replace:""},{regex:/<\?xml[^>]*>[\s\S]*?<\\\?xml>/gi,replace:""},{regex:/<\/?\w+:[^>]*>/gi,replace:""}];e=this._filterContentWithRules(e,t),e=this._cleanHTML(e);if(e.length===0||!e.match(/\S/))return e;var n=document.createElement("div");return n.innerHTML=e,e=n.innerHTML,n.innerHTML="",t=[{regex:/(<[^>]*?style\s*?=\s*?"[^>"]*?)(?:[\s]*MSO[-:][^>;"]*;?)+/gi,replace:"$1"},{regex:/(<[^>]*?class\s*?=\s*?"[^>"]*?)(?:[\s]*MSO[_a-zA-Z0-9\-]*)+/gi,replace:"$1"},{regex:/(<[^>]*?class\s*?=\s*?"[^>"]*?)(?:[\s]*Apple-[_a-zA-Z0-9\-]*)+/gi,replace:"$1"},{regex:/<a [^>]*?name\s*?=\s*?"OLE_LINK\d*?"[^>]*?>\s*?<\/a>/gi,replace:""}],e=this._filterContentWithRules(e,t),e=this._cleanHTML(e),e},_applyTextCommand:function(e,t){var n,r;if(t){r=this.getCursorTag();if(r==="superscript"&&e===r||r==="subscript"&&e===r)return;r==="superscript"&&e==="subscript"?e="superscript":r==="subscript"&&e==="superscript"&&(e="subscript")}document.execCommand(e,!1,null),n=rangy.getSelection();if(n.isCollapsed){r=e==="superscript"?"sup":"sub";var i=this.insertContentAtFocusPoint("<"+r+">\ufeff&#65279;</"+r+">"),s=rangy.createRange();s.selectNode(i._node.childNodes[0]),this.setSelection([s])}this._normaliseTextarea(),this.saveSelection(),this.updateOriginal()},getCursorTag:function(){var e="text",t=rangy.getSelection();if(t.focusNode.nodeName.toLowerCase()==="sup"||t.focusNode.parentNode.nodeName.toLowerCase()==="sup")e="superscript";else if(t.focusNode.nodeName.toLowerCase()==="sub"||t.focusNode.parentNode.nodeName.toLowerCase()==="sub")e="subscript";return e},_normaliseTextarea:function(){var e=
window.rangy.saveSelection(),t=this._getEditorNode();this._removeSingleNodesByName(t,"br");var n=["p","b","i","u","ul","ol","li"];for(var r=0;r<n.length;r++)this._removeNodesByName(t,n[r]);this._normaliseTagInTextarea("sup"),this._normaliseTagInTextarea("sub"),this._removeNodesByName(t,"span"),window.rangy.restoreSelection(e),t.normalize()},_normaliseTagInTextarea:function(e){var t=[],n=this._getEditorNode(),r,i=!1;t=this._copyArray(n.querySelectorAll(e),t);for(var s=0;s<t.length;s++){node=t[s],r=node.parentNode,i=!1;if(r===n)continue;r.firstChild===node&&r.lastChild===node&&r.nodeName.toLowerCase()===e&&(i=!0),!i&&node&&r.nodeName.toLowerCase()===e&&(i=!0,this._splitParentNode(r,e)),this._removeNodesByName(node,e),i&&this._removeNodesByName(r,e)}t=[],t=this._copyArray(n.querySelectorAll(e),t);for(s=0;s<t.length;s++){node=t[s];if(!node.previousSibling||node.previousSibling.nodeName.toLowerCase()!==e)continue;this._mergeNodes(node,node.previousSibling)}},_mergeNodes:function(e,t){var n=[],r=e.childNodes;for(var i=0;i<r.length;i++)n.push(r.item(i));for(i=0;i<n.length;i++)node=n[i],t.appendChild(node);this._removeNode(e)},_splitParentNode:function(e,t){var n=[],r,s=[];n=this._copyArray(e.childNodes,n);var o;for(i=0;i<n.length;i++){r=n[i],s=[],r.nodeName.toLowerCase()===t?s=this._copyArray(r.childNodes,s):(s[0]=document.createElement(t),s[0].appendChild(r));for(o=0;o<s.length;o++)e.parentNode.insertBefore(s[o],e)}},_copyArray:function(e,t){for(var n=0;n<e.length;n++)t.push(e[n]);return t},_removeNodesByName:function(e,t){var n,r=e.nodeName.toLowerCase()===t,i=[],s=e.childNodes;e.nodeName.toLowerCase()==="span"&&e.id.indexOf("selectionBoundary_")>-1&&(r=!1),i=this._copyArray(s,i);for(var o=0;o<i.length;o++){n=i[o],n.childNodes&&n.childNodes.length&&this._removeNodesByName(n,t);if(r){var u=e.parentNode;u.insertBefore(n,e)}}r&&this._removeNode(e)},_removeSingleNodesByName:function(e,t){if(!e.childNodes)return;var n,r=[];r=this._copyArray(e.childNodes,r);for(var i=0;i<r.length;i++)n=r[i],n.childNodes&&n.childNodes.length&&this._removeSingleNodesByName(n,t),n.nodeName.toLowerCase()===t&&this._removeNode(n)},_removeNode:function(e){return e.remove?e.remove():e.parentNode.removeChild(e)},_getEditor:function(e){return e||(e=this.get("host")),this},_getEditorNode:function(e){return this._getEditor(e).editor._node}},e.Base.mix(e.M.editor_ousupsub.Editor,[u]),a.ATTRS={},a.prototype={toolbar:null,openMenus:null,setupToolbar:function(){return this.toolbar=e.Node.create('<div class="'+r.TOOLBAR+'" role="toolbar" aria-live="off"/>'),this.openMenus=[],this._wrapper.appendChild(this.toolbar),this.textareaLabel&&this.toolbar.setAttribute("aria-labelledby",this.textareaLabel.get("id")),this}},e.Base.mix(e.M.editor_ousupsub.Editor,[a]),f.ATTRS={},f.prototype={_tabFocus:null,setupToolbarNavigation:function(){return this._registerEventHandle(this._wrapper.delegate("key",this.toolbarKeyboardNavigation,"down:37,39","."+r.TOOLBAR,this)),this._registerEventHandle(this._wrapper.delegate("focus",function(e){this._setTabFocus(e.currentTarget)},"."+r.TOOLBAR+" button",this)),this._registerEventHandle(this._wrapper.delegate("key",this.toolbarKeyboardNavigation,"up:38,40","."+r.TOOLBAR,this)),this},_supsub_key_press:function(e){switch(e.type){case"sup":this.writeSupString(e.target);break;case"sub":this.writeSubString(e.target)}e.preventDefault()},toolbarKeyboardNavigation:function(e){e.preventDefault();var t=this.toolbar.all("button"),n=1,r,i=e.target.ancestor("button",!0);e.keyCode===37&&(n=-1),r=this._findFirstFocusable(t,i,n),r&&(r.focus(),this._setTabFocus(r))},_findFirstFocusable:function(e,t,n){var r=0,i,s,o,u;u=e.indexOf(t),u<-1&&(u=0);while(r<e.size()){u+=n,u<0?u=e.size()-1:u>=e.size()&&(u=0),s=e.item(u),r++;if(s.hasAttribute("hidden")||s.hasAttribute("disabled"))continue;i=s.ancestor(".ousupsub_group");if(i.hasAttribute("hidden"))continue;o=s;break}return o},checkTabFocus:function(){return this._tabFocus&&(this._tabFocus.hasAttribute("disabled")||this._tabFocus.hasAttribute("hidden")||this._tabFocus.ancestor(".ousupsub_group").hasAttribute("hidden"))&&(button=this._findFirstFocusable(this.toolbar.all("button"),this._tabFocus,-1),button&&(this._tabFocus.compareTo(document.activeElement)&&button.focus(),this._setTabFocus(button))),this},_setTabFocus:function(e){return this._tabFocus&&this._tabFocus.setAttribute("tabindex","-1"),this._tabFocus=e,this._tabFocus.setAttribute("tabindex",0),this.toolbar.setAttribute("aria-activedescendant",this._tabFocus.generateID()),this}},e.Base.mix(e.M.editor_ousupsub.Editor,[f]),l.ATTRS={},l.prototype={_selections:null,_lastSelection:null,_focusFromClick:!1,setupSelectionWatchers:function(){return this._registerEventHandle(this.on("ousupsub:selectionchanged",this.saveSelection,this)),this._registerEventHandle(this.editor.on("focus",this.restoreSelection,this)),this._registerEventHandle(this.editor.on("mousedown",function(){this._focusFromClick=!0},this)),this._registerEventHandle(this.editor.on("blur",function(){this._focusFromClick=!1,this.updateOriginal()},this)),this._registerEventHandle(this.editor.on(["keyup","focus"],function(t){e.soon(e.bind(this._hasSelectionChanged,this,t))},this)),this._registerEventHandle(this.editor.on("gesturemoveend",function(t){e.soon(e.bind(this._hasSelectionChanged,this,t))},{standAlone:!0},this)),this},isActive:function(){var e=rangy.createRange(),t=rangy.getSelection();return t.rangeCount?!document.activeElement||!this.editor.compareTo(document.activeElement)&&!this.editor.contains(document.activeElement)?!1:(e.selectNode(this.editor.getDOMNode()),e.intersectsRange(t.getRangeAt(0))):!1},getSelectionFromNode:function(e){var t=rangy.createRange();return t.selectNode(e.getDOMNode()),[t]},saveSelection:function(){this.isActive()&&(this._selections=this.getSelection())},restoreSelection:function(){this._focusFromClick||this._selections&&this.setSelection(this._selections),this._focusFromClick=!1},getSelection:function(){return rangy.getSelection().getAllRanges
()},selectionContainsNode:function(e){return rangy.getSelection().containsNode(e.getDOMNode(),!0)},selectionFilterMatches:function(e,t,n){typeof n=="undefined"&&(n=!0),t||(t=this.getSelectedNodes());var r=t.size()>0,i=!1,s=this.editor,o=function(e){return e===s};return s.one(e)?(t.each(function(t){if(n){if(!r||!t.ancestor(e,!0,o))r=!1}else!i&&t.ancestor(e,!0,o)&&(i=!0)},this),n?r:i):!1},getSelectedNodes:function(){var t=new e.NodeList,n,r,i,s,o;r=rangy.getSelection(),r.rangeCount?i=r.getRangeAt(0):i=rangy.createRange(),i.collapsed&&i.commonAncestorContainer!==this.editor.getDOMNode()&&i.commonAncestorContainer!==e.config.doc&&(i=i.cloneRange(),i.selectNode(i.commonAncestorContainer)),n=i.getNodes();for(o=0;o<n.length;o++)s=e.one(n[o]),this.editor.contains(s)&&t.push(s);return t},_hasSelectionChanged:function(e){var t=rangy.getSelection(),n,r=!1;return t.rangeCount?n=t.getRangeAt(0):n=rangy.createRange(),this._lastSelection&&!this._lastSelection.equals(n)?(r=!0,this._fireSelectionChanged(e)):(this._lastSelection=n,r)},_fireSelectionChanged:function(e){this.fire("ousupsub:selectionchanged",{event:e,selectedNodes:this.getSelectedNodes()})},getSelectionParentNode:function(){var e=rangy.getSelection();return e.rangeCount?e.getRangeAt(0).commonAncestorContainer:!1},setSelection:function(e){var t=rangy.getSelection();t.setRanges(e)},insertContentAtFocusPoint:function(t){var n=rangy.getSelection(),r,i=e.Node.create(t);return n.rangeCount&&(r=n.getRangeAt(0)),r&&(r.deleteContents(),r.insertNode(i.getDOMNode())),i}},e.Base.mix(e.M.editor_ousupsub.Editor,[l]),c.ATTRS={},c.prototype={disableCssStyling:function(){try{document.execCommand("styleWithCSS",0,!1)}catch(e){try{document.execCommand("useCSS",0,!0)}catch(t){try{document.execCommand("styleWithCSS",!1,!1)}catch(n){}}}}},e.Base.mix(e.M.editor_ousupsub.Editor,[c])},"@VERSION@",{requires:["node","overlay","escape","event","event-simulate","event-custom","yui-throttle","moodle-editor_ousupsub-manager","moodle-editor_ousupsub-rangy","timers"]});
