window.onload=function(){
	var cri=document.createElement('div');
	$(cri).css({
		width:'80px',
		height:'80px',
		border:'2px solid #0f0',
		borderRadius:'50%',
		position:'absolute',
		top:30+'px',
		left:'100px'
	})
	$('body')[0].appendChild(cri);
	var winH=document.body.clientHeight || document.body.offsetHeight || window.screen.availHeight,
	winW=	document.body.clientWidth || document.body.offsetWidth || window.screen.availWidth;
	console.log(winH+'-----'+winW);
	var top=0;
	function animate(){
		top=parseInt(cri.style.top);
		if(top >= winH){
			cri.style.top=winH-90+'px';
			return;
		}
		cri.style.top=top+100+'px';
		setTimeout(animate,50);
	}
	animate();
}