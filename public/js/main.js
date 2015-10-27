window.onload=function(){
		var transform='';
		(function(){
			var ele=$('img')[0].style,u='undefined';
			if (typeof ele.transform !== u) transform='transform';
			else if(typeof ele.webkitTransform !== u) transform='webkitTransform';
			else if(typeof ele.mozTransform !== u) transform='mozTransform';
		}());
		var play_ani={
			play_icon:'',
			oldDeg:0,
			status:'',
			start:function(){
				var _t=this,deg=_t.oldDeg;
				function animate(){
					_t.oldDeg=deg=(deg+1)>= 360 ? 0 : (deg+1) ;
					_t.play_icon.style[transform]='rotate('+deg+'deg)';
					_t.status=setTimeout(animate,20);
				}
				animate();
			},
			init:function(){
				this.play_icon=$('.mus_icon')[0];
				this.start();
			}
		} 
		play_ani.init();
		var player=document.getElementById('player');
		var play_animate_class='play_animation';
		$('.play').addevent('click',function(){
			if(player.paused){
				player.play();
				play_ani.start();
			}else{
				player.pause();
				clearTimeout(play_ani.status);
			}
		});
		setTimeout(function(){player.play();},1000);
		var scroll_bg={
			bgimg:'',
			win:'null',
			scale:'',
			ele:'',
			page:0,
			status:false,
			init:function(){
				this.bgimg={x:1280,y:1024};
				this.win={};
				this.scale={};
				var wh=window.innerHeight || document.body.clientHeight;
				wh=wh;
				var _t=this;
				var canvas=document.getElementById('bg_cav');
				this.win.y=document.body.height || document.documentElement.clientHeight || document.body.offsetHeight;
				this.win.x=document.body.width || document.documentElement.clientWidth || document.body.offsetWidth;
				this.scale.y=(this.bgimg.y-this.win.y)/2;
				this.scale.x=(this.bgimg.x-this.win.x)/24;
				this.ele=$('.bg_img_box img')[0];
				canvas.width=this.win.x;
				canvas.height=this.win.y;
				console.log(this.win.x+'|------|'+this.win.y);
				
				$('.container').css({height:wh+'px',fontSize:'18px',color:'#EEF0F5'}).addClass('animate_z5');
				
				this.event();
				//canvas bg crow

				(function(){
					function random(){
						return{
							x:Math.floor(30+Math.random()*(_t.win.x-15)),
							y:Math.floor(30+Math.random()*(_t.win.y-15))
						}
					}
					var context=canvas.getContext('2d');
					context.strokeStyle='#293869';//边框样式
					context.fillStyle='#293869';
					context.lineWidth=1;//图形边框宽度
					function creat_star(center){
						context.moveTo(center.x,center.y);
						 context.lineTo(center.x-45,center.y+35);
						 context.lineTo(center.x+20,center.y+20);
						 context.lineTo(center.x-45,center.y+10);
						 context.lineTo(center.x-10,center.y+40);
						 context.lineTo(center.x,center.y);
						 context.fill();
					         	context.stroke();
					}
					for(var i=0;i<3;i++){
						var b=random();
						console.log(b);
						creat_star(b);
					}
					
				         	
             	
          
				}())
			},
			event:function(){
				var _t=this,x=0,y=0,s;
				$('body').touch('up',function(){
					$('.container')[_t.page].style.height=0;
					
					_t.page=_t.page++ >= 2 ? 2 : _t.page;
					_t.ele.style.top=-_t.scale.y*_t.page+'px';
					_t.ele.style.left=-_t.scale.x*_t.page+'px';
					$('.bg_one')[0].style.top=-_t.scale.y*_t.page*1.8+'px';
					
				})
				$('body').touch('down',function(){
					
					_t.page=_t.page-- <= 0 ? 0 :_t.page;
					$('.container')[_t.page].style.height=_t.win.y+'px';
					$('.bg_one')[0].style.top=-_t.scale.y*_t.page*1.8+'px';
					 _t.ele.style.top=-_t.scale.y*_t.page+'px';
					_t.ele.style.left=-_t.scale.x*_t.page+'px';
				})
			},
			setScroll:function(num){
				if(document.body.scrollTop) document.body.scrollTop=num;
				else if(document.documentElement.scrollTop) document.documentElement.scrollTop=num;
			}
		}
		scroll_bg.init();
		var zh=document.body.height || document.documentElement.clientHeight;
		//alert(zh);
		
}