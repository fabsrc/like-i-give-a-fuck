kango.Timer=function(){};kango.Timer.prototype={setInterval:function(a,b){return window.setInterval(a,b)},clearInterval:function(a){return window.clearInterval(a)},setTimeout:function(a,b){return window.setTimeout(a,b)},clearTimeout:function(a){return window.clearTimeout(a)}};kango.registerModule(kango.getDefaultModuleRegistrar("timer",kango.Timer));
