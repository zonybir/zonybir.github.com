(function(window){
	function query(str){
		if(typeof str !== 'string') return;
		else{
			this.context=str=str.replace(/\s{2,}/g,' ').replace(/^\s|\s$/,'').replace(/\s?,\s?/,',');
			var sel=this.sel=document.querySelectorAll(str);
			//for(var i=0,len=this.sel.length;i<len;i++) query.push(sel[i]);
			for(var i=0,len=sel.length;i<len;i++){
				this[i]=sel[i];
			}
			
		}
	};
	query.prototype={
		context:'',
		sel:null,
		each:function(arr,fn){
			for (var i=0,len=arr.length;i<len;i++)	fn.call(arr[i],i,arr[i]);
		},
		style:function(obj){

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
		t.event('touchstart',body,function(event){
			event=event || window.event;
			event=event.touches[0];
			x=event.pageX;
			y=event.pageY;
			
			//alert(event.pageY);
		});
		t.event('touchend',body,function(event){
			event = event || window.event;
			event=event.touches[0];
			var dire=event.pageY-y;
			if (type == 'down' && dire >= 30){
				t.each(t.sel,function(i,ele){
					callback.call(ele,i,ele);
				})
			}else if(type == 'up' && dire <= -30){
				t.each(t.sel,function(i,ele){
					callback.call(ele,i,ele);
				})
			}
		})
	}
	//pc 端通用时间注册
	query.fn.addevent=function(type,callback){
		this.each(this.sel,function(i,ele){
			var a=ele;
			if(a.addEventListener)	a.addEventListener(type,callback,false);
			else if(a.attachEvent)	a.attachEvent('on'+type,function(event){return callback.call(a,event);})
		})
	}
	window.$=function(str){return new query(str)};
}(window))