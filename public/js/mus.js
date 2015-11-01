window.onload=function(){
	var defin=(function(){
		var winH=document.body.height || document.documentElement.clientHeight,
		winW=document.body.width || document.documentElement.clientWidth;
		var play_ani={//音乐碟盘自动旋转及其控制
			play_icon:'',
			player:'',
			oldDeg:0,
			status:'',
			start:function(){
				var _t=this,deg=_t.oldDeg;
				function animate(){
					_t.oldDeg=deg=(deg+1)>= 360 ? 0 : (deg+1) ;
					_t.play_icon.transform('rotate('+deg+'deg)');
					_t.status=setTimeout(animate,20);
				}
				animate();
			},
			init:function(){
				var _t=this;
				_t.play_icon=$('.mus_icon');
				//_t.play=$('.play');
				//_t.player=$('#player')[0];
				this.start();
				//this.controller();
				/*setTimeout(function(){
					_t.player.play();$('.con_one')[0].style.opacity=1;
					$('.con_one p').css({top:'0',left:'0'});					
					setTimeout(function(){scroll_bg.slider_status=true;},4000)
				},2000);*/
			},
			controller:function(){
				var _t=this;
				_t.play.addevent('touchstart',function(event){
					event=event || window.event;
					console.log(event);
					if(player.paused){
						_t.player.play();
						_t.start();
					}else{
						_t.player.pause();
						clearTimeout(_t.status);
					}
				});
			}
		}
		//play_ani.init(); 
		var img=new Image();
		img.src='/images/mus_icon_bg.jpg';
		img.addEventListener('load', function(){
			var canvas=$('#mus_img')[0];
			var context=canvas.getContext('2d');
			//context.rotate(10);
			context.drawImage(img,0,0,200,200);
			context.clearRect(80,80,40,40);
			//context.rect(10,10,30,30);
			context.fillStyle='red';
			context.lineWidth=4;
			context.stroke();



			mus_bg.init();
		} , false);
		var mus_bg={
			mus_bg_icon:'',
			player:'',
			oldDeg:0,
			status:'',
			start:function(){
				var _t=this,deg=_t.oldDeg;
				function animate(){
					_t.oldDeg=deg=(deg+1)>= 360 ? 0 : (deg+1) ;
					_t.mus_bg_icon.transform('rotate('+deg+'deg)');
					_t.status=setTimeout(animate,20);
				}
				animate();
			},
			init:function(){
				//console.log(ele);
				var _t=this;
				this.mus_bg_icon=$('#mus_img');				//_t.play=$('.play');
				//_t.player=$('#player')[0];
				this.start();
				//this.controller();
				/*setTimeout(function(){
					_t.player.play();$('.con_one')[0].style.opacity=1;
					$('.con_one p').css({top:'0',left:'0'});					
					setTimeout(function(){scroll_bg.slider_status=true;},4000)
				},2000);*/
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
			drawCurrent:function(num){
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
				canvas=$('#mus_schedule')[0];
				this.canvas=canvas.getContext('2d');
				_t.canvas.lineWidth=10;
				_t.canvas.strokeStyle='#fff';
				_t.touchH=$('.schedule_line')[0];
				if (!!time){
					console.log(time);
					this.time.radian=Math.PI*2/time;
					this.time.setCurrent();
				}
			}
		}
		player.init();
	}());
}