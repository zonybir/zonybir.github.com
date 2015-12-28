window.onload=function(){
	var d={
		single_cir:'',
		WH:0,
		WH:0,
		item:[],
		v:5,
		init:function(){
			var cir=document.createElement('div');
			this.WH=document.body.clientHeight || document.body.offsetHeight || window.screen.availHeight;
			this.WW=document.body.clientWidth || document.body.offsetWidth || window.screen.availWidth;
			$(cir).css({
				width:'80px',
				height:'80px',
				border:'2px solid #0f0',
				borderRadius:'50%',
				position:'absolute',
				top:30+'px',
				left:'100px'
			})
			this.single_cir=cir;
			
			return this;
		},
		cri_factory:function(num){
			for (var i=0;i<num;i++)	this.item.push(this.single_cir);
			return this;
		},
		animate:function(){
			var top=0,t=this,h=t.WH-80,w=t.WW-80,v=t.v,ele=t.item[0];

			function main(){
				top=parseInt(ele.style.top,10);
				top >= h ?
				(function(){
					v=-v;
					return top;
				}()) :
				top <= 0 ? 
				(function(){
					v=-v;
					return top;
				}()) : '';
				ele.style.top=top + v +'px';
				console.log(top);
				setTimeout(main,40);
			}
			main();
		},
		start:function(num){
			this.init();
			if(!num) num=1;
			this.cri_factory(num);
			$('body')[0].appendChild(this.item[0]);
			this.animate();
		}
	}
	d.start(1);
}