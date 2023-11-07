YUI.add("moodle-editor_ousupsub-editor",function(a,d){var n,s,i,e="editor_ousupsub_content",c="editor_ousupsub_content_wrap",h=".editor_ousupsub_content",t="editor_ousupsub_toolbar",p="editor_ousupsub";function o(){o.superclass.constructor.apply(this,arguments)}function r(){}function u(){}function l(){l.superclass.constructor.apply(this,arguments)}a.extend(o,a.Base,{BLOCK_TAGS:["address","article","aside","audio","blockquote","canvas","dd","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","noscript","ol","output","p","pre","section","table","tfoot","ul","video"],PLACEHOLDER_CLASS:"ousupsub-tmp-class",ALL_NODES_SELECTOR:"[style],font[face]",FONT_FAMILY:"fontFamily",_wrapper:null,editor:null,toolbar:null,textarea:null,textareaLabel:null,plugins:null,_eventHandles:null,_tabFocus:null,_maxUndos:40,_undoStack:null,_redoStack:null,initializer:function(){this.textarea=a.one(document.getElementById(this.get("elementid"))),this.textarea&&(a.M.editor_ousupsub.addEditorReference(this.get("elementid"),this),this._eventHandles=[],this._wrapper=a.Node.create('<div class="'+p+'"></div>'),this.editor=a.Node.create('<div id="'+this.get("elementid")+'editable" contenteditable="true" autocapitalize="none" autocorrect="off" role="textbox" spellcheck="false" aria-live="off" class="'+e+'"></div>'),this.textareaLabel=a.one('[for="'+this.get("elementid")+'"]'),this.textareaLabel&&(this.textareaLabel.generateID(),this.editor.setAttribute("aria-labelledby",this.textareaLabel.get("id"))),this.setupToolbar(),this.setupTemplateEditor(),this.disableCssStyling(),document.queryCommandSupported("DefaultParagraphSeparator")&&document.execCommand("DefaultParagraphSeparator",!1,"p"),this.textarea.get("parentNode").insert(this._wrapper,this.textarea),this.textarea.hide(),this.updateFromTextArea(),this.setupTextareaNavigation(),this._preventEnter(),this.publishEvents(),this.setupSelectionWatchers(),this.setupAutomaticPolling(),this.setupPlugins())},destructor:function(){a.Array.each(this.plugins,function(e,t){e.destroy(),this.plugins[t]=undefined},this),new a.EventHandle(this._eventHandles).detach(),this.textarea.show(),this._wrapper.remove(!0),a.M.editor_ousupsub.removeEditorReference(this.get("elementid"),this)},focus:function(){return this.editor.focus(),this},publishEvents:function(){return this.publish("change",{broadcast:!0,preventable:!0}),this.publish("pluginsloaded",{fireOnce:!0}),this.publish("ousupsub:selectionchanged",{prefix:"ousupsub"}),this},setupAutomaticPolling:function(){return this._registerEventHandle(this.editor.on(["keyup","cut"],this.updateOriginal,this)),this._registerEventHandle(this.editor.on(["keypress","delete"],this.cleanEditorHTMLSimple,this)),this._registerEventHandle(this.editor.on("paste",this.pasteCleanup,this)),this._registerEventHandle(this.editor.on("drop",this.updateOriginalDelayed,this)),this},updateOriginalDelayed:function(){return setTimeout(a.bind(this.updateOriginal,this),0),this},setupPlugins:function(){var e,t,i,s,n;for(t in this.plugins={},e=this.get("plugins"))if((i=e[t]).plugins)for(s in i.plugins)"superscript"===(n=i.plugins[s]).name?this.plugins.superscript=new a.M.editor_ousupsub.EditorPlugin({name:"superscript",group:i.group,editor:this.editor,toolbar:this.toolbar,host:this,exec:"superscript",tags:"sup",keys:["94"],icon:"e/superscript",keyDescription:"Shift + ^ or Up arrow"}):"subscript"===n.name&&(this.plugins.subscript=new a.M.editor_ousupsub.EditorPlugin({name:"subscript",group:i.group,editor:this.editor,toolbar:this.toolbar,host:this,exec:"subscript",tags:"sub",keys:["95"],icon:"e/subscript",keyDescription:"Shift + _ or Down arrow"}));return this._undoStack=[],this._redoStack=[],this.plugins.undo=new a.M.editor_ousupsub.EditorPlugin({name:"undo",group:i.group,editor:this.editor,toolbar:this.toolbar,host:this,keys:["90"],callback:this._undoHandler}),this.plugins.redo=new a.M.editor_ousupsub.EditorPlugin({name:"redo",group:i.group,editor:this.editor,toolbar:this.toolbar,host:this,keys:["89"],callback:this._redoHandler}),this.on("pluginsloaded",function(){this._addToUndo(this._getHTML()),this.on("ousupsub:selectionchanged",this._changeListener,this)},this),this._updateButtonsStates(),this.setupUndoHandlers(),this.fire("pluginsloaded"),this},setupUndoHandlers:function(){return this._registerEventHandle(this._wrapper.delegate("key",this._undoHandler,"down:90+ctrl","."+e,this)),this._registerEventHandle(this._wrapper.delegate("key",this._redoHandler,"down:89+ctrl","."+e,this)),this},pluginEnabled:function(e){return!!this.plugins[e]},enablePlugins:function(e){this._setPluginState(!0,e)},disablePlugins:function(e){this._setPluginState(!1,e)},_setPluginState:function(e,t){var i=e?"enableButtons":"disableButtons";t?this.plugins[t][i]():a.Object.each(this.plugins,function(e){e[i]()},this)},_registerEventHandle:function(e){this._eventHandles.push(e)},setupToolbar:function(){return this.toolbar=a.Node.create('<div class="'+t+'" role="toolbar" aria-live="off"></div>'),this._wrapper.appendChild(this.toolbar),this.textareaLabel&&this.toolbar.setAttribute("aria-labelledby",this.textareaLabel.get("id")),this.setupToolbarNavigation(),this},setupToolbarNavigation:function(){return this._wrapper.delegate("key",this.toolbarKeyboardNavigation,"down:37,39","."+t,this),this._wrapper.delegate("focus",function(e){this._setTabFocus(e.currentTarget)},"."+t+" button",this),this},toolbarKeyboardNavigation:function(e){e.preventDefault();var t=this.toolbar.all("button"),i=1,s=e.target.ancestor("button",!0);37===e.keyCode&&(i=-1),(e=this._findFirstFocusable(t,s,i))&&(e.focus(),this._setTabFocus(e))},_findFirstFocusable:function(e,t,i){var s,n,o=0,r=e.indexOf(t);for(r<-1&&(r=0);o<e.size();)if((r+=i)<0?r=e.size()-1:r>=e.size()&&(r=0),o++,!(s=e.item(r)).hasAttribute("hidden")&&!s.hasAttribute("disabled")&&!s.ancestor(".ousupsub_group").hasAttribute("hidden")){n=s;break}return n},checkTabFocus:function(){var e;return this._tabFocus&&(!(
this._tabFocus.hasAttribute("disabled")||this._tabFocus.hasAttribute("hidden")||this._tabFocus.ancestor(".ousupsub_group").hasAttribute("hidden"))||(e=this._findFirstFocusable(this.toolbar.all("button"),this._tabFocus,-1))&&(this._tabFocus.compareTo(document.activeElement)&&e.focus(),this._setTabFocus(e))),this},_setTabFocus:function(e){return this._tabFocus&&this._tabFocus.setAttribute("tabindex","-1"),this._tabFocus=e,this._tabFocus.setAttribute("tabindex",0),this.toolbar.setAttribute("aria-activedescendant",this._tabFocus.generateID()),this},disableCssStyling:function(){try{document.execCommand("styleWithCSS",0,!1)}catch(e){try{document.execCommand("useCSS",0,!0)}catch(t){try{document.execCommand("styleWithCSS",!1,!1)}catch(i){}}}},setupTemplateEditor:function(){var t,e,i,s,n=a.Node.create('<div class="'+c+'"></div>');n.appendChild(this.editor),this._wrapper.appendChild(n),i=6*this.textarea.getAttribute("cols")+41+"px",this.editor.setStyle("width",i),this.editor.setStyle("minWidth",i),this.editor.setStyle("maxWidth",i),i=this.textarea.getAttribute("rows"),i=(t=6*i+13)-6+"px",this.editor.setStyle("height",e=t-10+"px"),this.editor.setStyle("minHeight",e),this.editor.setStyle("maxHeight",e),this.editor.setStyle("line-height",i),n.setStyle("minHeight",i=1+t+"px"),this.textareaLabel.setStyle("display","inline-block"),this.textareaLabel.setStyle("margin",0),this.textareaLabel.setStyle("height",i),this.textareaLabel.setStyle("minHeight",i),this.textareaLabel.setStyle("maxheight",i),this.textareaLabel.hasClass("accesshide")?(this.textareaLabel.removeClass("accesshide"),this.textareaLabel.setStyle("visibility","hidden"),this._wrapper.setStyle("margin-left",-parseInt(this.textareaLabel.get("offsetWidth")))):(this.textareaLabel.getDOMNode().parentNode.style.paddingBottom=e,this.textareaLabel.setStyle("vertical-align","bottom")),n="#"+(s=this).get("elementid").replace(/:/g,"\\:")+"editable",a.on("contentready",function(){s.textareaLabel.setStyle("line-height",s.editor.getComputedStyle("line-height"));var e=1+t+parseInt(s.toolbar.get("offsetHeight"));s._wrapper.setStyle("height",e),s._wrapper.setStyle("minHeight",e),s._wrapper.setStyle("maxHeight",e),a.UA.ie&&"hidden"===s.textareaLabel.getComputedStyle("visibility")&&s._wrapper.setStyle("vertical-align",parseInt(s.toolbar.get("offsetHeight"))-1+"px")},n)},_getEmptyContent:function(){return""},updateFromTextArea:function(){this.editor.setHTML(""),this.editor.append(this.textarea.get("value")),this.cleanEditorHTML(),""===this.editor.getHTML()&&this.editor.setHTML(this._getEmptyContent())},updateOriginal:function(){var e=this.textarea.get("value"),t=this.getCleanHTML();return""===t&&this.isActive()&&(t=this._getEmptyContent()),e!==(t=(t=this._removeUnicodeCharacters(t)).trim())&&(this.textarea.set("value",t),this.fire("change")),this},setupTextareaNavigation:function(){return this._registerEventHandle(this._wrapper.delegate("key",this.textareaKeyboardNavigation,"down:38,40","."+e,this)),this._registerEventHandle(this._wrapper.delegate("key",this.textareaKeyboardNavigation,"press:94, 95","."+e,this)),this},textareaKeyboardNavigation:function(e){var t;e.preventDefault(),YUI.Env.UA.android||this.isActive()||this.focus(),t="",38===(e=(e=window.event||e).keyCode||e.charCode)||94===e?t="superscript":40!==e&&95!==e||(t="subscript"),t&&this._applyTextCommand(t,1)},_preventEnter:function(){var e="keypress";(a.UA.webkit||a.UA.ie)&&(e="keydown"),this.editor.on(e,function(e){e=window.event||e;13===e.keyCode&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},this)},_addToRedo:function(e){this._redoStack.push(e)},_addToUndo:function(e,t){for(void 0===t&&(t=!1),this._undoStack[this._undoStack.length-1]!==e&&(this._undoStack.push(e),t&&(this._redoStack=[]));this._undoStack.length>this._maxUndos;)this._undoStack.shift()},_getHTML:function(){return this.getCleanHTML()},_getRedo:function(){return this._redoStack.pop()},_getUndo:function(e){if(1===this._undoStack.length)return this._undoStack[0];var t=this._undoStack.pop();return t===e&&(t=this._undoStack.pop()),0===this._undoStack.length&&this._addToUndo(t),t},_restoreValue:function(e){this.editor.setHTML(e),this._addToUndo(e)},_updateButtonsStates:function(){1<this._undoStack.length?this.enablePlugins("undo"):this.disablePlugins("undo"),0<this._redoStack.length?this.enablePlugins("redo"):this.disablePlugins("redo")},_undoHandler:function(e){e.preventDefault();var e=this._getHTML(),t=this._getUndo(e);e!==t&&(this._restoreValue(t),this._addToRedo(e)),this._updateButtonsStates()},_redoHandler:function(e){e.preventDefault();var e=this._getHTML(),t=this._getRedo();t!==undefined&&e!==t&&this._restoreValue(t),this._updateButtonsStates()},_changeListener:function(e){e.event&&-1!==e.event.type.indexOf("key")&&39!==e.event.keyCode&&37!==e.event.keyCode&&40!==e.event.keyCode&&38!==e.event.keyCode||(this._addToUndo(this._getHTML(),!0),this._updateButtonsStates())}},{NS:"editor_ousupsub",ATTRS:{elementid:{value:null,writeOnce:!0},contextid:{value:null,writeOnce:!0},plugins:{value:{},writeOnce:!0}}}),a.augment(o,a.EventTarget),a.namespace("M.editor_ousupsub").Editor=o,r.ATTRS={},r.prototype={getCleanHTML:function(){var e,t=this.editor.cloneNode(!0);return a.each(t.all('[id^="yui"]'),function(e){e.removeAttribute("id")}),t.all(".ousupsub_control").remove(!0),""===(t=t.get("innerHTML"))||"<br>"===t?"":(0===t.indexOf("")&&(e=t.length-("".length+"".length),t=t.substr("".length,e)),this._cleanHTML(t))},cleanEditorHTML:function(){return this.editor.set("innerHTML",this._cleanHTML(this.editor.get("innerHTML"))),this},cleanEditorHTMLSimple:function(){var e=window.rangy.saveSelection();return this.editor.set("innerHTML",this._cleanHTMLSimple(this.editor.get("innerHTML"))),window.rangy.restoreSelection(e,!0),this},_cleanHTMLSimple:function(e){return this._filterContentWithRules(e,[{regex:/<span(?![^>]*?rangySelectionBoundary[^>]*?)[^>]*>(.+)<\/span>/gi,replace:"$1"}])},_cleanHTML:function(e){return this._filterContentWithRules(e,[{
regex:/<p[^>]*>(&nbsp;|\s)*<\/p>/gi,replace:""},{regex:/<sup[^>]*(&nbsp;|\s)*>/gi,replace:"<sup>"},{regex:/<sub[^>]*(&nbsp;|\s)*>/gi,replace:"<sub>"},{regex:/&nbsp;/gi,replace:" "},{regex:/<\/sup>(\s*)+<sup>/gi,replace:"$1"},{regex:/<\/sub>(\s*)+<sub>/gi,replace:"$1"},{regex:/<sup>(\s*)+/gi,replace:"$1<sup>"},{regex:/<sub>(\s*)+/gi,replace:"$1<sub>"},{regex:/(\s*)+<\/sup>/gi,replace:"</sup>$1"},{regex:/(\s*)+<\/sub>/gi,replace:"</sub>$1"},{regex:/<br>/gi,replace:""},{regex:/<style[^>]*>[\s\S]*?<\/style>/gi,replace:""},{regex:/<!--(?![\s\S]*?-->)/gi,replace:""},{regex:/<script[^>]*>[\s\S]*?<\/script>/gi,replace:""},{regex:/<\/?(?:br|title|meta|style|std|font|html|body|link|a|ul|li|ol)[^>]*?>/gi,replace:""},{regex:/<\/?(?:b|i|u|ul|ol|li|img)[^>]*?>/gi,replace:""},{regex:/<\/?(?:abbr|address|area|article|aside|audio|base|bdi|bdo|blockquote)[^>]*?>/gi,replace:""},{regex:/<\/?(?:button|canvas|caption|cite|code|col|colgroup|content|data)[^>]*?>/gi,replace:""},{regex:/<\/?(?:datalist|dd|decorator|del|details|dialog|dfn|div|dl|dt|element)[^>]*?>/gi,replace:""},{regex:/<\/?(?:em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5)[^>]*?>/gi,replace:""},{regex:/<\/?(?:h6|header|hgroup|hr|iframe|input|ins|kbd|keygen|label|legend)[^>]*?>/gi,replace:""},{regex:/<\/?(?:main|map|mark|menu|menuitem|meter|nav|noscript|object|optgroup)[^>]*?>/gi,replace:""},{regex:/<\/?(?:option|output|p|param|pre|progress|q|rp|rt|rtc|ruby|samp)[^>]*?>/gi,replace:""},{regex:/<\/?(?:section|select|script|shadow|small|source|std|strong|summary)[^>]*?>/gi,replace:""},{regex:/<\/?(?:svg|table|tbody|td|template|textarea|time|tfoot|th|thead|tr|track)[^>]*?>/gi,replace:""},{regex:/<\/?(?:var|wbr|video)[^>]*?>/gi,replace:""},{regex:/<\/?(?:acronym|applet|basefont|big|blink|center|dir|frame|frameset|isindex)[^>]*?>/gi,replace:""},{regex:/<\/?(?:listing|noembed|plaintext|spacer|strike|tt|xmp)[^>]*?>/gi,replace:""},{regex:/<\/?(?:jsl|nobr)[^>]*?>/gi,replace:""},{regex:/<span(?![^>]*?rangySelectionBoundary[^>]*?)[^>]*>[\s\S]*?([\s\S]*?)<\/span>/gi,replace:"$1"},{regex:/<span(?![^>]*?rangySelectionBoundary[^>]*?)[^>]*>(&nbsp;|\s)*<\/span>/gi,replace:""},{regex:/<span(?![^>]*?rangySelectionBoundary[^>]*?)[^>]*>[\s\S]*?([\s\S]*?)<\/span>/gi,replace:"$1"},{regex:/<sup[^>]*>(&nbsp;|\s)*<\/sup>/gi,replace:""},{regex:/<sub[^>]*>(&nbsp;|\s)*<\/sub>/gi,replace:""},{regex:/<xmlns.*?>(.*?)<\/xmlns.*?>/gi,replace:"$1"}])},cleanEditorHTMLEmptySupAndSubTags:function(){var e=window.rangy.saveSelection(),t=this.editor.get("innerHTML"),t=this._cleanEditorHTMLEmptySupAndSubTags(t),t=this._removeUnicodeCharacters(t);return this.editor.set("innerHTML",t),window.rangy.restoreSelection(e,!0),this},_cleanEditorHTMLEmptySupAndSubTags:function(e){return this._filterContentWithRules(e,[{regex:/<su[bp][^>]*>(&#65279;|\s)*<\/su[bp]>/gi,replace:""}])},_filterContentWithRules:function(e,t){for(var i=0,i=0;i<t.length;i++)e=e.replace(t[i].regex,t[i].replace);return e},pasteCleanup:function(e){var t,i,s,n;if("paste"!==e.type)return this.updateOriginalDelayed(),!0;if((t=e._event)&&t.clipboardData&&t.clipboardData.getData){if(i=!1,n=t.clipboardData.types)if("function"==typeof n.contains)i=n.contains("text/html");else{if("function"!=typeof n.indexOf)return this.fallbackPasteCleanupDelayed(),!0;if(!(i=-1<n.indexOf("text/html"))&&(-1<n.indexOf("com.apple.webarchive")||-1<n.indexOf("com.apple.iWork.TSPNativeData")))return this.fallbackPasteCleanupDelayed(),!0}else i=!1;if(i){try{s=t.clipboardData.getData("text/html")}catch(o){return this.fallbackPasteCleanupDelayed(),!0}return e.preventDefault(),s=this._cleanPasteHTML(s),n=window.rangy.saveSelection(),this.insertContentAtFocusPoint(s),window.rangy.restoreSelection(n),window.rangy.getSelection().collapseToEnd(),this.updateOriginal(),this._normaliseTextarea(),!1}return this.fallbackPasteCleanupDelayed(),!0}return this.fallbackPasteCleanupDelayed(),!0},fallbackPasteCleanup:function(){var e=window.rangy.saveSelection(),t=this.editor.get("innerHTML");return this.editor.set("innerHTML",this._cleanPasteHTML(t)),this.updateOriginal(),window.rangy.restoreSelection(e,!0),this},fallbackPasteCleanupDelayed:function(){return setTimeout(a.bind(this.fallbackPasteCleanup,this),0),this},_cleanPasteHTML:function(e){var t;return e&&0!==e.length?(e=this._filterContentWithRules(e,[{regex:/<\s*\/html\s*>([\s\S]+)$/gi,replace:""},{regex:/<!--\[if[\s\S]*?endif\]-->/gi,replace:""},{regex:/<!--(Start|End)Fragment-->/gi,replace:""},{regex:/<xml[^>]*>[\s\S]*?<\/xml>/gi,replace:""},{regex:/<\?xml[^>]*>[\s\S]*?<\\\?xml>/gi,replace:""},{regex:/<\/?\w+:[^>]*>/gi,replace:""}]),0!==(e=this._cleanHTML(e)).length&&e.match(/\S/)?((t=document.createElement("div")).innerHTML=e,e=t.innerHTML,t.innerHTML="",e=this._filterContentWithRules(e,[{regex:/(<[^>]*?style\s*?=\s*?"[^>"]*?)(?:[\s]*MSO[-:][^>;"]*;?)+/gi,replace:"$1"},{regex:/(<[^>]*?class\s*?=\s*?"[^>"]*?)(?:[\s]*MSO[_a-zA-Z0-9\-]*)+/gi,replace:"$1"},{regex:/(<[^>]*?class\s*?=\s*?"[^>"]*?)(?:[\s]*Apple-[_a-zA-Z0-9\-]*)+/gi,replace:"$1"},{regex:/<a [^>]*?name\s*?=\s*?"OLE_LINK\d*?"[^>]*?>\s*?<\/a>/gi,replace:""}]),this._cleanHTML(e)):e):""},_applyTextCommand:function(e,t){var i;if(t){if("superscript"===(i=this.getCursorTag())&&e===i||"subscript"===i&&e===i)return;if("superscript"===i&&"subscript"===e?e="superscript":"subscript"===i&&"superscript"===e&&(e="subscript"),!this.pluginEnabled(e))return}document.execCommand(e,!1,null),(t=window.rangy.getSelection()).isCollapsed&&(this.cleanEditorHTMLEmptySupAndSubTags(),e=this.insertContentAtFocusPoint("<"+(i="superscript"===e?"sup":"sub")+">\ufeff&#65279;</"+i+">"),(i=window.rangy.createRange()).selectNode(e._node.childNodes[0]),this.setSelection([i]),t.rangeCount&&t.collapseToEnd()),this._normaliseTextarea(),this.cleanEditorHTMLSimple(),this.saveSelection(),this.updateOriginal()},getCursorTag:function(){var e="text",t=window.rangy.getSelection(),i=t.focusNode.nodeName.toLowerCase(),s=t.focusNode.parentNode.nodeName.toLowerCase(),n="";
return t.focusNode.childNodes&&t.focusNode.childNodes[t.focusOffset-1]&&(n=t.focusNode.childNodes[t.focusOffset-1].nodeName.toLowerCase()),"sup"===i||"sup"===s||"sup"===n?e="superscript":"sub"!==i&&"sub"!==s&&"sub"!==n||(e="subscript"),e},_normaliseTextarea:function(){var e,t,i=window.rangy.saveSelection(),s=this._getEditorNode();for(this._removeSingleNodesByName(s,"br"),e=["p","b","i","u","ul","ol","li"],t=0;t<e.length;t++)this._removeNodesByName(s,e[t]);this._normaliseTagInTextarea("sup"),this._normaliseTagInTextarea("sub"),this._removeNodesByName(s,"span"),window.rangy.restoreSelection(i,!0),s.normalize()},_normaliseTagInTextarea:function(e){for(var t,i,s=[],n=this._getEditorNode(),o=!1,s=this._copyArray(n.querySelectorAll(e),s),r=0;r<s.length;r++)o=!1,(t=(i=s[r]).parentNode)!==n&&(!(o=t.firstChild===i&&t.lastChild===i&&t.nodeName.toLowerCase()===e?!0:o)&&i&&t.nodeName.toLowerCase()===e&&(o=!0,this._splitParentNode(t,e)),this._removeNodesByName(i,e),o&&this._removeNodesByName(t,e));for(s=[],s=this._copyArray(n.querySelectorAll(e),s),r=0;r<s.length;r++)(i=s[r]).previousSibling&&i.previousSibling.nodeName.toLowerCase()===e&&this._mergeNodes(i,i.previousSibling)},_mergeNodes:function(e,t){for(var i=[],s=e.childNodes,n=0;n<s.length;n++)i.push(s.item(n));for(n=0;n<i.length;n++)t.appendChild(i[n]);this._removeNode(e)},_splitParentNode:function(e,t){for(var i,s,n=[],o=[],n=this._copyArray(e.childNodes,n),r=0;r<n.length;r++)for(o=[],(i=n[r]).nodeName.toLowerCase()===t?o=this._copyArray(i.childNodes,o):(o[0]=document.createElement(t),o[0].appendChild(i)),s=0;s<o.length;s++)e.parentNode.insertBefore(o[s],e)},_copyArray:function(e,t){for(var i=0;i<e.length;i++)t.push(e[i]);return t},_removeNodesByName:function(e,t){var i,s,n=e.nodeName.toLowerCase()===t,o=[],r=e.childNodes;for("span"===e.nodeName.toLowerCase()&&-1<e.id.indexOf("selectionBoundary_")&&(n=!1),o=this._copyArray(r,o),s=0;s<o.length;s++)(i=o[s]).childNodes&&i.childNodes.length&&this._removeNodesByName(i,t),n&&e.parentNode.insertBefore(i,e);n&&this._removeNode(e)},_removeSingleNodesByName:function(e,t){var i,s,n;if(e.childNodes)for(s=this._copyArray(e.childNodes,[]),n=0;n<s.length;n++)(i=s[n]).childNodes&&i.childNodes.length&&this._removeSingleNodesByName(i,t),i.nodeName.toLowerCase()===t&&this._removeNode(i)},_removeNode:function(e){return e.remove?e.remove():e.parentNode.removeChild(e)},_getEditor:function(e){return e=e||this.get("host"),this},_getEditorNode:function(e){return this._getEditor(e).editor._node},_removeUnicodeCharacters:function(e){for(var t=[],i=0;i<e.length;i++)"65279"!=e.charCodeAt(i)&&t.push(e.charAt(i));return t.join("")}},a.Base.mix(a.M.editor_ousupsub.Editor,[r]),u.ATTRS={},u.prototype={_selections:null,_lastSelection:null,_focusFromClick:!1,setupSelectionWatchers:function(){return this._registerEventHandle(this.on("ousupsub:selectionchanged",this.saveSelection,this)),this._registerEventHandle(this.editor.on("focus",this.restoreSelection,this)),this._registerEventHandle(this.editor.on("mousedown",function(){this._focusFromClick=!0},this)),this._registerEventHandle(this.editor.on("blur",function(){this._focusFromClick=!1,this.updateOriginal()},this)),this._registerEventHandle(this.editor.on(["keyup","focus"],function(e){setTimeout(a.bind(this._hasSelectionChanged,this,e),0)},this)),this._registerEventHandle(this.editor.on("gesturemoveend",function(e){setTimeout(a.bind(this._hasSelectionChanged,this,e),0)},{standAlone:!0},this)),this},isActive:function(){var e=window.rangy.createRange(),t=window.rangy.getSelection();return!!t.rangeCount&&(!(!document.activeElement||!this.editor.compareTo(document.activeElement)&&!this.editor.contains(document.activeElement))&&(e.selectNode(this.editor.getDOMNode()),e.intersectsRange(t.getRangeAt(0))))},getSelectionFromNode:function(e){var t=window.rangy.createRange();return t.selectNode(e.getDOMNode()),[t]},saveSelection:function(){this.isActive()&&(this._selections=this.getSelection())},restoreSelection:function(){this._focusFromClick||this._selections&&this.setSelection(this._selections),this._focusFromClick=!1},getSelection:function(){return window.rangy.getSelection().getAllRanges()},selectionContainsNode:function(e){return window.rangy.getSelection().containsNode(e.getDOMNode(),!0)},selectionFilterMatches:function(t,e,i){var s,n,o,r;return void 0===i&&(i=!0),e=e||this.getSelectedNodes(),s=0<e.size(),n=!1,o=this.editor,r=function(e){return e===o},!!o.one(t)&&(e.each(function(e){i?s&&e.ancestor(t,!0,r)||(s=!1):!n&&e.ancestor(t,!0,r)&&(n=!0)},this),i?s:n)},getSelectedNodes:function(){var e,t,i,s=new a.NodeList,n=window.rangy.getSelection(),n=n.rangeCount?n.getRangeAt(0):window.rangy.createRange();for(n.collapsed&&n.commonAncestorContainer!==this.editor.getDOMNode()&&n.commonAncestorContainer!==a.config.doc&&(n=n.cloneRange()).selectNode(n.commonAncestorContainer),e=n.getNodes(),i=0;i<e.length;i++)t=a.one(e[i]),this.editor.contains(t)&&s.push(t);return s},_hasSelectionChanged:function(e){var t=window.rangy.getSelection(),i=!1,t=t.rangeCount?t.getRangeAt(0):window.rangy.createRange();return this._lastSelection&&!this._lastSelection.equals(t)?(i=!0,this._fireSelectionChanged(e)):(this._lastSelection=t,i)},_fireSelectionChanged:function(e){this.fire("ousupsub:selectionchanged",{event:e,selectedNodes:this.getSelectedNodes()})},getSelectionParentNode:function(){var e=window.rangy.getSelection();return!!e.rangeCount&&e.getRangeAt(0).commonAncestorContainer},setSelection:function(e){window.rangy.getSelection().setRanges(e)},insertContentAtFocusPoint:function(e){var t,i=window.rangy.getSelection(),e=a.Node.create(e);return(t=i.rangeCount?i.getRangeAt(0):t)&&(t.deleteContents(),t.insertNode(e.getDOMNode())),e}},a.Base.mix(a.M.editor_ousupsub.Editor,[u]),n="disabled",s="highlight",i="_group",a.extend(l,a.Base,{name:null,exec:null,editor:null,toolbar:null,_eventHandles:null,buttons:null,buttonNames:null,buttonStates:null,DISABLED:0,ENABLED:1,_buttonHandlers:null,
_primaryKeyboardShortcut:null,_highlightQueue:null,initializer:function(e){this.name=e.name,this.exec=e.exec,this.toolbar=e.toolbar,this.editor=e.editor,this.buttons={},this.buttonNames=[],this.buttonStates={},this._primaryKeyboardShortcut=[],this._buttonHandlers=[],this._menuHideHandlers=[],this._highlightQueue={},this._eventHandles=[],this.addButton(e)},destructor:function(){new a.EventHandle(this._eventHandles).detach()},markUpdated:function(){return this.get("host").saveSelection(),this.get("host").updateOriginal()},registerEventHandle:function(e){this._eventHandles.push(e)},addButton:function(t){var e,i,s=this.get("group"),n=this.name,o="ousupsub_"+n+"_button",r=this.get("host");return t.exec&&(o=o+"_"+t.exec),t.buttonName?o=o+"_"+t.buttonName:t.buttonName=t.exec||n,t.buttonClass=o,(t=this._normalizeIcon(t)).title||(t.title="pluginname"),n=M.util.get_string(n,"editor_ousupsub"),e="",t.iconurl&&(e='<img class="icon" aria-hidden="true" role="presentation" width="16" height="16" src="'+t.iconurl+'" />'),(e=a.Node.create('<button type="button" class="'+o+'" tabindex="-1">'+e+"</button>")).setAttribute("title",n),s.append(e),this.toolbar.getAttribute("aria-activedescendant")||(e.setAttribute("tabindex","0"),this.toolbar.setAttribute("aria-activedescendant",e.generateID()),this.get("host")._tabFocus=e),t.callback||(t.callback=this._applyTextCommand),t.callback=a.rbind(this._callbackWrapper,this,t.callback),this._buttonHandlers.push(this.toolbar.delegate("click",t.callback,"."+o,this)),t.keys&&("undefined"!=typeof t.keyDescription&&(this._primaryKeyboardShortcut[o]=t.keyDescription),this._addKeyboardListener(t.callback,t.keys,o),this._primaryKeyboardShortcut[o]&&e.setAttribute("title",M.util.get_string("plugin_title_shortcut","editor_ousupsub",{title:n,shortcut:this._primaryKeyboardShortcut[o]}))),t.tags&&(i=!0,"boolean"==typeof t.tagMatchRequiresAll&&(i=t.tagMatchRequiresAll),this._buttonHandlers.push(r.on(["ousupsub:selectionchanged","change"],function(e){"undefined"!=typeof this._highlightQueue[t.buttonName]&&clearTimeout(this._highlightQueue[t.buttonName]),this._highlightQueue[t.buttonName]=setTimeout(a.bind(function(e){r.selectionFilterMatches(t.tags,e.selectedNodes,i)?this.highlightButtons(t.buttonName):this.unHighlightButtons(t.buttonName)},this,e),0)},this))),this.buttonNames.push(t.buttonName),this.buttons[t.buttonName]=e,this.buttonStates[t.buttonName]=this.ENABLED,e},_normalizeCallback:function(e,t){return e._callbackNormalized||(t=t||{},e._callback=e.callback||t.callback,e.callback=a.rbind(this._callbackWrapper,this,this._applyTextCommand,e.callbackArgs),e._callbackNormalized=!0),e},_normalizeIcon:function(e){return e.icon&&!e.iconurl&&(e.iconComponent||(e.iconComponent="core"),e.iconurl=M.util.image_url(e.icon,e.iconComponent)),e},_callbackWrapper:function(e,t,i){var s;if(e.preventDefault(),this.isEnabled()&&(!(s=e.currentTarget.ancestor("button",!0))||!s.hasAttribute(n)))return YUI.Env.UA.android||this.get("host").isActive()||this.get("host").focus(),this.get("host").saveSelection(),s=[e,i],this.get("host").restoreSelection(),t.apply(this,s)},_addKeyboardListener:function(i,e,t){var s,n="key",o=h;if(a.Lang.isArray(e))return a.Array.each(e,function(e){this._addKeyboardListener(i,e,t)},this),this;e="object"==typeof e?(e.eventtype&&(n=e.eventtype),e.container&&(o=e.container),s=e.keyCodes,i):(s=e,"undefined"==typeof this._primaryKeyboardShortcut[t]&&(this._primaryKeyboardShortcut[t]=this._getDefaultMetaKeyDescription(e)),a.bind(function(e,t){i.apply(this,[t])},this,[""])),this._buttonHandlers.push(this.editor.delegate(n,e,s,o,this))},_eventUsesExactKeyModifiers:function(e,t){var i,s;return"key"===t.type&&(s=-1<a.Array.indexOf(e,"alt"),i=t.altKey&&s||!t.altKey&&!s,s=-1<a.Array.indexOf(e,"ctrl"),i=i&&(t.ctrlKey&&s||!t.ctrlKey&&!s),s=-1<a.Array.indexOf(e,"meta"),i=i&&(t.metaKey&&s||!t.metaKey&&!s),s=-1<a.Array.indexOf(e,"shift"),i&&(t.shiftKey&&s||!t.shiftKey&&!s))},isEnabled:function(){return a.Object.some(this.buttonStates,function(e){return e===this.ENABLED},this)},disableButtons:function(e){return this._setButtonState(!1,e)},enableButtons:function(e){return this._setButtonState(!0,e)},_setButtonState:function(t,e){var i=t?"removeAttribute":"setAttribute";return e?this.buttons[e]&&(this.buttons[e][i](n,n),this.buttonStates[e]=t?this.ENABLED:this.DISABLED):a.Array.each(this.buttonNames,function(e){this.buttons[e][i](n,n),this.buttonStates[e]=t?this.ENABLED:this.DISABLED},this),this.get("host").checkTabFocus(),this},highlightButtons:function(e){return this._changeButtonHighlight(!0,e)},unHighlightButtons:function(e){return this._changeButtonHighlight(!1,e)},_changeButtonHighlight:function(e,t){var i=e?"addClass":"removeClass";return t?this.buttons[t]&&this.buttons[t][i](s):a.Object.each(this.buttons,function(e){e[i](s)},this),this},_getDefaultMetaKey:function(){return"macintosh"===a.UA.os?"meta":"ctrl"},_getDefaultMetaKeyDescription:function(e){return"macintosh"===a.UA.os?M.util.get_string("editor_command_keycode","editor_ousupsub",String.fromCharCode(e).toLowerCase()):M.util.get_string("editor_control_keycode","editor_ousupsub",String.fromCharCode(e).toLowerCase())},_getKeyEvent:function(){return"down:"},_applyTextCommand:function(e){e&&"key"===e.type||this._getEditor()._applyTextCommand(this.exec,0)},_getEditor:function(e){return e=e||this.get("host")},_getEditorNode:function(e){return this._getEditor(e).editor._node}},{NAME:"editorPlugin",ATTRS:{host:{writeOnce:!0},group:{writeOnce:!0,getter:function(e){var t=this.toolbar.one(".ousupsub_group."+e+i);return t||(t=a.Node.create('<div class="ousupsub_group '+e+i+'"></div>'),this.toolbar.append(t)),t}}}}),a.namespace("M.editor_ousupsub").EditorPlugin=l,a.M.editor_ousupsub=a.M.editor_ousupsub||{},(M=M||{}).editor_ousupsub=M.editor_ousupsub||{},M.editor_ousupsub._instances=M.editor_ousupsub._instances||{},a.M.editor_ousupsub.addEditorReference=function(e,t){return"undefined"==typeof M.editor_ousupsub._instances[e]&&(
M.editor_ousupsub._instances[e]=t),a.M.editor_ousupsub},a.M.editor_ousupsub.createEditorSimple=function(e,t){var i=[];"both"!==t&&"superscript"!==t||i.push({name:"superscript",params:[]}),"both"!==t&&"subscript"!==t||i.push({name:"subscript",params:[]}),a.M.editor_ousupsub.createEditor({elementid:e,content_css:"",contextid:0,language:"en",directionality:"ltr",plugins:[{group:"style1",plugins:i}],pageHash:""})},a.M.editor_ousupsub.createEditor=function(e){e=new a.M.editor_ousupsub.Editor(e);return a.M.editor_ousupsub.fire("editor_ousupsub:created",{id:e.get("elementid"),instance:e}),e},a.M.editor_ousupsub.getEditor=function(e){return M.editor_ousupsub._instances[e]},a.M.editor_ousupsub.removeEditor=function(e){var t=a.M.editor_ousupsub.getEditor(e);return t&&(t.destroy(),this.fire("editor_ousupsub:removed",{id:e})),a.M.editor_ousupsub},a.M.editor_ousupsub.removeEditorReference=function(e){a.M.editor_ousupsub.getEditor(e)&&delete M.editor_ousupsub._instances[e]},a.M.editor_ousupsub.addMethod=function(e,n){this[e],a.M.editor_ousupsub[e]=function(){var i=[],s=arguments;return a.Object.each(M.editor_ousupsub._instances,function(e){var t=n.apply(e,s);t!==undefined&&t!==e&&(i[i.length]=t)}),i.length?i:this}},a.augment(a.M.editor_ousupsub,a.EventTarget),a.Array.each(["saveSelection","updateFromTextArea","updateOriginal","cleanEditorHTML","destroy"],function(e){a.M.editor_ousupsub.addMethod(e,a.M.editor_ousupsub.Editor.prototype[e])})},"@VERSION@",{requires:["base","node","event","event-custom","moodle-editor_ousupsub-rangy"]});