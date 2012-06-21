var XRegExp;if(XRegExp){throw Error("can't load XRegExp twice in the same frame")}(function(d){XRegExp=function(w,r){var q=[],u=XRegExp.OUTSIDE_CLASS,x=0,p,s,v,t,y;if(XRegExp.isRegExp(w)){if(r!==d){throw TypeError("can't supply flags when constructing one RegExp from another")}return j(w)}if(g){throw Error("can't call the XRegExp constructor within token definition functions")}r=r||"";p={hasNamedCapture:false,captureNames:[],hasFlag:function(z){return r.indexOf(z)>-1},setFlag:function(z){r+=z}};while(x<w.length){s=o(w,x,u,p);if(s){q.push(s.output);x+=(s.match[0].length||1)}else{if(v=l.exec.call(i[u],w.slice(x))){q.push(v[0]);x+=v[0].length}else{t=w.charAt(x);if(t==="["){u=XRegExp.INSIDE_CLASS}else{if(t==="]"){u=XRegExp.OUTSIDE_CLASS}}q.push(t);x++}}}y=RegExp(q.join(""),l.replace.call(r,h,""));y._xregexp={source:w,captureNames:p.hasNamedCapture?p.captureNames:null};return y};XRegExp.version="1.5.1";XRegExp.INSIDE_CLASS=1;XRegExp.OUTSIDE_CLASS=2;var c=/\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g,h=/[^gimy]+|([\s\S])(?=[\s\S]*\1)/g,n=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,g=false,k=[],l={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},a=l.exec.call(/()??/,"")[1]===d,f=function(){var p=/^/g;l.test.call(p,"");return !p.lastIndex}(),b=RegExp.prototype.sticky!==d,i={};i[XRegExp.INSIDE_CLASS]=/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/;i[XRegExp.OUTSIDE_CLASS]=/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/;XRegExp.addToken=function(s,r,q,p){k.push({pattern:j(s,"g"+(b?"y":"")),handler:r,scope:q||XRegExp.OUTSIDE_CLASS,trigger:p||null})};XRegExp.cache=function(r,p){var q=r+"/"+(p||"");return XRegExp.cache[q]||(XRegExp.cache[q]=XRegExp(r,p))};XRegExp.copyAsGlobal=function(p){return j(p,"g")};XRegExp.escape=function(p){return p.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};XRegExp.execAt=function(t,s,u,r){var p=j(s,"g"+((r&&b)?"y":"")),q;p.lastIndex=u=u||0;q=p.exec(t);if(r&&q&&q.index!==u){q=null}if(s.global){s.lastIndex=q?p.lastIndex:0}return q};XRegExp.freezeTokens=function(){XRegExp.addToken=function(){throw Error("can't run addToken after freezeTokens")}};XRegExp.isRegExp=function(p){return Object.prototype.toString.call(p)==="[object RegExp]"};XRegExp.iterate=function(u,t,v,s){var p=j(t,"g"),r=-1,q;while(q=p.exec(u)){if(t.global){t.lastIndex=p.lastIndex}v.call(s,q,++r,u,t);if(p.lastIndex===q.index){p.lastIndex++}}if(t.global){t.lastIndex=0}};XRegExp.matchChain=function(q,p){return function r(s,x){var v=p[x].regex?p[x]:{regex:p[x]},u=j(v.regex,"g"),w=[],t;for(t=0;t<s.length;t++){XRegExp.iterate(s[t],u,function(y){w.push(v.backref?(y[v.backref]||""):y[0])})}return((x===p.length-1)||!w.length)?w:r(w,x+1)}([q],0)};RegExp.prototype.apply=function(q,p){return this.exec(p[0])};RegExp.prototype.call=function(p,q){return this.exec(q)};RegExp.prototype.exec=function(u){var s,r,q,p;if(!this.global){p=this.lastIndex}s=l.exec.apply(this,arguments);if(s){if(!a&&s.length>1&&m(s,"")>-1){q=RegExp(this.source,l.replace.call(e(this),"g",""));l.replace.call((u+"").slice(s.index),q,function(){for(var v=1;v<arguments.length-2;v++){if(arguments[v]===d){s[v]=d}}})}if(this._xregexp&&this._xregexp.captureNames){for(var t=1;t<s.length;t++){r=this._xregexp.captureNames[t-1];if(r){s[r]=s[t]}}}if(!f&&this.global&&!s[0].length&&(this.lastIndex>s.index)){this.lastIndex--}}if(!this.global){this.lastIndex=p}return s};RegExp.prototype.test=function(r){var q,p;if(!this.global){p=this.lastIndex}q=l.exec.call(this,r);if(q&&!f&&this.global&&!q[0].length&&(this.lastIndex>q.index)){this.lastIndex--}if(!this.global){this.lastIndex=p}return !!q};String.prototype.match=function(q){if(!XRegExp.isRegExp(q)){q=RegExp(q)}if(q.global){var p=l.match.apply(this,arguments);q.lastIndex=0;return p}return q.exec(this)};String.prototype.replace=function(s,t){var u=XRegExp.isRegExp(s),r,q,v,p;if(u){if(s._xregexp){r=s._xregexp.captureNames}if(!s.global){p=s.lastIndex}}else{s=s+""}if(Object.prototype.toString.call(t)==="[object Function]"){q=l.replace.call(this+"",s,function(){if(r){arguments[0]=new String(arguments[0]);for(var w=0;w<r.length;w++){if(r[w]){arguments[0][r[w]]=arguments[w+1]}}}if(u&&s.global){s.lastIndex=arguments[arguments.length-2]+arguments[0].length}return t.apply(null,arguments)})}else{v=this+"";q=l.replace.call(v,s,function(){var w=arguments;return l.replace.call(t+"",c,function(y,x,B){if(x){switch(x){case"$":return"$";case"&":return w[0];case"`":return w[w.length-1].slice(0,w[w.length-2]);case"'":return w[w.length-1].slice(w[w.length-2]+w[0].length);default:var z="";x=+x;if(!x){return y}while(x>w.length-3){z=String.prototype.slice.call(x,-1)+z;x=Math.floor(x/10)}return(x?w[x]||"":"$")+z}}else{var A=+B;if(A<=w.length-3){return w[A]}A=r?m(r,B):-1;return A>-1?w[A+1]:y}})})}if(u){if(s.global){s.lastIndex=0}else{s.lastIndex=p}}return q};String.prototype.split=function(u,p){if(!XRegExp.isRegExp(u)){return l.split.apply(this,arguments)}var w=this+"",r=[],v=0,t,q;if(p===d||+p<0){p=Infinity}else{p=Math.floor(+p);if(!p){return[]}}u=XRegExp.copyAsGlobal(u);while(t=u.exec(w)){if(u.lastIndex>v){r.push(w.slice(v,t.index));if(t.length>1&&t.index<w.length){Array.prototype.push.apply(r,t.slice(1))}q=t[0].length;v=u.lastIndex;if(r.length>=p){break}}if(u.lastIndex===t.index){u.lastIndex++}}if(v===w.length){if(!l.test.call(u,"")||q){r.push("")}}else{r.push(w.slice(v))}return r.length>p?r.slice(0,p):r};function j(r,q){if(!XRegExp.isRegExp(r)){throw TypeError("type RegExp expected")}var p=r._xregexp;r=XRegExp(r.source,e(r)+(q||""));if(p){r._xregexp={source:p.source,captureNames:p.captureNames?p.captureNames.slice(0):null}}return r}function e(p){return(p.global?"g":"")+(p.ignoreCase?"i":"")+(p.multiline?"m":"")+(p.extended?"x":"")+(p.sticky?"y":"")}function o(v,u,w,p){var r=k.length,y,s,x;g=true;try{while(r--){x=k[r];if((w&x.scope)&&(!x.trigger||x.trigger.call(p))){x.pattern.lastIndex=u;s=x.pattern.exec(v);if(s&&s.index===u){y={output:x.handler.call(p,s,w),match:s};break}}}}catch(q){throw q}finally{g=false}return y}function m(s,q,r){if(Array.prototype.indexOf){return s.indexOf(q,r)}for(var p=r||0;p<s.length;p++){if(s[p]===q){return p}}return -1}XRegExp.addToken(/\(\?#[^)]*\)/,function(p){return l.test.call(n,p.input.slice(p.index+p[0].length))?"":"(?:)"});XRegExp.addToken(/\((?!\?)/,function(){this.captureNames.push(null);return"("});XRegExp.addToken(/\(\?<([$\w]+)>/,function(p){this.captureNames.push(p[1]);this.hasNamedCapture=true;return"("});XRegExp.addToken(/\\k<([\w$]+)>/,function(q){var p=m(this.captureNames,q[1]);return p>-1?"\\"+(p+1)+(isNaN(q.input.charAt(q.index+q[0].length))?"":"(?:)"):q[0]});XRegExp.addToken(/\[\^?]/,function(p){return p[0]==="[]"?"\\b\\B":"[\\s\\S]"});XRegExp.addToken(/^\(\?([imsx]+)\)/,function(p){this.setFlag(p[1]);return""});XRegExp.addToken(/(?:\s+|#.*)+/,function(p){return l.test.call(n,p.input.slice(p.index+p[0].length))?"":"(?:)"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("x")});XRegExp.addToken(/\./,function(){return"[\\s\\S]"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("s")})})();