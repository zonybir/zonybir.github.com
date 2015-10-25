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

		}
	};
	query.fn=query.prototype;
	//手机端 滑动事件
	query.fn.event=function(type,callback){
		this.each(this.sel,function(i,ele){
			var a=ele;
			if(a.addEventListener)	a.addEventListener(type,callback,false);
			else if(a.attachEvent)	a.attachEvent('on'+type,function(event){return callback.call(a,event);})
		})
	}
	window.$=function(str){return new query(str)};
}(window))