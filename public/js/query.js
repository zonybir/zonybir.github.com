(function(window){
	function query(str){
		if(typeof str !== 'string') return;
		else{
			this.context=str=str.replace(/\s{2,}/g,' ').replace(/^\s|\s$/,'').replace(/\s?,\s?/,',');
			var sel=this.sel=document.querySelectorAll(str);
			for(var i=0,len=sel.length;i<len;i++) this[i]=sel[i];			
		}
	};
	query.prototype={
		context:'',
		sel:null,
		each:function(arr,fn){
			for (var i in arr){
				if (typeof arr[i] !== 'function' && typeof arr[i] !== 'number') fn.call(arr[i],i,arr[i]);
			}
		},
		css:function(obj){
			var t=this;
			t.each(t.sel,function(i,ele){
				t.each(obj,function(j,sty){
					ele.style[j]=sty;
				})
			})
			return this;
		},
		styleText:function(str){
			var _t=this;
			if(typeof str === 'string') _t.each(_t.sel,function(i,ele){ele.style.cssText=str || '';})
			else if(!str) return _t.sel[0].style.cssText; 
		},
		hasClass:function(ele,cls){
			return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		},
		addClass:function(cls){
			var t=this;
			this.each(this.sel,function(i,ele){
				if(!t.hasClass(ele,cls)) ele.className=ele.className.replace(/\s+/g,' ')+' '+cls;
			})
			return this;
		},
		removeClass:function(cls){
			var t=this;
			this.each(t.sel,function(i,ele){
				if (t.hasClass(ele,cls)) {
					var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
					ele.className=ele.className.replace(reg,' ').replace(/\s+/,' ');
				}
			})
		},
		eq:function(index){
			this.sel=this.sel[index];
		},
		event:function(type,target,handler){
			if(target.addEventListener) target.addEventListener(type,handler,false);
			else if(target.attachEvent) target.attachEvent('on'+type,function(event){handler.call(target,event);})
		}
	};
	query.fn=query.prototype;
	//手机端 滑动事件
	query.fn.touch=function(type,callback){
		var x,y,t=this,body=document.querySelectorAll('body')[0];		
		function addTouch(dir,target){
			this.dir=dir;
			this.target=target;
		}
		addTouch.prototype={
			status:false,
			init:function(){
				var _t=this;
				t.event('touchstart',_t.target,function(event){
					event = event || window.event;
					event.preventDefault();
					event.cancelable=true;
					event=event.touches[0];
					_t.x=event.pageX;
					_t.y=event.pageY;
				})
				t.event('touchmove',_t.target,function(event){
					if(_t.status) return;
					event = event || window.event;
					event.preventDefault();
					event.cancelable=true;
					event=event.touches[0];
					var bx=event.pageX -_t.x,
					by=event.pageY-_t.y;
					if (Math.abs(bx) >=30 || Math.abs(by)>=30){
						_t.directive(bx,by);
						_t.status=true;
					}
					
				})
				t.event('touchend',_t.target,function(){_t.status=false;})
			},
			directive:function(bx,by){
				if(Math.abs(bx) > Math.abs(by)){
					if (this.dir == 'left' && bx<0) callback();
					else if (this.dir == 'right' && bx >0) callback();
				}else{
					if(this.dir == 'up' && by <0) callback();
					else if(this.dir == 'down' && by >0) callback();
				}
			}
		}
		t.each(t.sel,function(i,ele){
			var a=new addTouch(type,ele);
			a.init();
		})
	}
	//pc 端通用事件注册
	query.fn.addevent=function(type,callback){
		this.each(this.sel,function(i,ele){
			var a=ele;
			if(a.addEventListener)	a.addEventListener(type,callback,false);
			else if(a.attachEvent)	a.attachEvent('on'+type,function(event){return callback.call(a,event);})
		})
	}
	window.$=function(str){return new query(str)};
}(window))