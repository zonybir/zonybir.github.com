window.onload=function(){
	var defin=(function(){
		
		var mus_bg={
			mus_bg_icon:'',
			player:'',
			oldDeg:0,
			status:'',
			start:function(){
				if(typeof this.init === 'function') {setTimeout(function(){mus_bg.start();},500);return};
				var _t=this,deg=_t.oldDeg;
				function animate(){
					_t.oldDeg=deg=(deg+1)>= 360 ? 0 : (deg+1) ;
					_t.mus_bg_icon.transform('rotate('+deg+'deg)');
					_t.status=setTimeout(animate,20);
				}
				animate();
			},
			init:function(){
				var _t=this;
				this.mus_bg_icon=$('#mus_img');
				var img=new Image();
				img.src='../public/images/mus_icon_bg.jpg';
				img.addEventListener('load', function(){
					var context=$('#mus_img')[0].getContext('2d');
					context.drawImage(img,0,0,200,200);
					context.clearRect(80,80,40,40);
					context.fillStyle='red';
					context.lineWidth=4;
					context.stroke();
					_t.start();					
					_t.init='';
				} , false);
			},
		}

		var player={
			player:'',
			canvas:'',
			touchH:'',
			time:{
				radian:0,
				currentTime:0,
				setCurrent:function(){
					var t=this,_t=player;
					function updateSchedule(){
						var nowTime=_t.player.currentTime,
						current=nowTime*t.radian;
						_t.drawCurrent(current);
						setTimeout(updateSchedule,500);
					}
					updateSchedule();
				}

			},
			drawCurrent:function(num){//动态绘制 播放进度 以及旋转臂
				this.canvas.clearRect(0,0,this.canvas.width,this.canvas.height);
				this.canvas.beginPath();				
				this.canvas.arc(110,110,105,-Math.PI/2,num-Math.PI/2);
				this.canvas.stroke();
				this.canvas.closePath();
				this.touchH.style.transform='rotate('+num*(180/Math.PI)+'deg)';
			},
			init:function(){
				
				this.player=$('#player')[0];
				var _t=this,
				time=this.player.duration,
				canvas=$('#mus_schedule')[0];//播放进度 canvas
				this.canvas=canvas.getContext('2d');
				_t.canvas.lineWidth=10;
				_t.canvas.strokeStyle='#C9434E';
				_t.touchH=$('.schedule_line')[0];				
				this.player.onplay=function(){
					$('.loading_cover').addClass('hide_c');
					setTimeout(function(){$('.loading_cover').css({display:'none'})},3000);
					this.time.radian=Math.PI*2/time;
					this.time.setCurrent();
					_t.controll();
					mus_bg.init();
				}
			},
			controll:function(){
				var x,y,t=this,mx,my;
				function stopDefault(e){
					e.preventDefault();
					e.cancelable=true;
				}
				console.log(1111);
				$('.schedule_line').addevent('touchstart',function(event){
					event = event || window.event;
					stopDefault(event);
					event=event.touches[0];
					x=event.pageX;
					y=event.pageY;
					console.log(x+'----s--'+y);
				});
				$('.schedule_line').addevent('touchmoce',function(event){
					event = event || window.event;
					stopDefault(event);
					event=event.touches[0];
					mx=event.pageX;
					my=event.pageY;
					console.log(mx+'-----'+my);
				});
				$('.schedule_line ').addevent('touchend',function(event){
					event = event || window.event;
					stopDefault(event);
					event=event.touches[0];
				})
			}
		}
		player.init();
	}());
}