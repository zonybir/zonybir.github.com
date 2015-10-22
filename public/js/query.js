(function(window){
	function query(str){
		if(typeof str !== 'string') return;
		else{
			this.context=str=str.replace(/\s{2,}/g,' ').replace(/^\s|\s$/,'').replace(/\s?,\s?/,',');
			var sel=this.sel=document.querySelectorAll(str);
			//for(var i=0,len=this.sel.length;i<len;i++) query.push(sel[i]);
			alert(sel);
			
		}
	}
	query.prototype={
		context:'',
		sel:null,
		each:function(arr,fn){
			for (var i=0,len=arr.length;i<len;i++)	fn.call(arr[i],i,arri[i]);
		},
		style:function(obj){

		}
	}
	window.$=function(str){return new query(str)};
}(window))