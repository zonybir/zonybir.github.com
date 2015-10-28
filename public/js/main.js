window.onload=function(){
		var transform='';
		(function(){//浏览器transform兼容监测以及处理
			var ele=$('img')[0].style,u='undefined';
			if (typeof ele.transform !== u) transform='transform';
			else if(typeof ele.webkitTransform !== u) transform='webkitTransform';
			else if(typeof ele.mozTransform !== u) transform='mozTransform';
		}());
		var play_ani={//音乐碟盘自动旋转及其控制
			play_icon:'',
			player:'',
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
				var _t=this;
				_t.play_icon=$('.mus_icon')[0];
				_t.play=$('.play');
				_t.player=$('#player')[0];
				this.start();
				this.controller();
				setTimeout(function(){_t.player.play();$('.con_one')[0].style.opacity=1;
						$('.con_one p').css({top:'0',left:'0'});},3000);
			},
			controller:function(){
				var _t=this;
				_t.play.addevent('touchstart',function(){
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
		play_ani.init();
		var scroll_bg={
			bgimg:'',
			win:[],
			height:'',
			scale:'',
			ele:'',
			page:0,
			status:false,
			cav_list:[],
			init:function(){
				this.bgimg={x:1280,y:1024};
				this.win={};
				this.scale={};
				var wh=window.innerHeight || document.body.clientHeight;
				wh=wh;
				var _t=this;
				var bg_star=$('.bg_star').sel;
				this.height=this.win.y=document.body.height || document.documentElement.clientHeight || document.body.offsetHeight;//获取浏览器宽高
				this.win.x=document.body.width || document.documentElement.clientWidth || document.body.offsetWidth;
				this.scale.y=(this.bgimg.y-this.win.y)/3;
				this.scale.x=(this.bgimg.x-this.win.x)/24;
				this.ele=$('.bg_img_box img')[0];
				for(var i=0,len=bg_star.length;i<len;i++) {//初始化背景canvas 画布大小
					bg_star[i].width=this.win.x;
					bg_star[i].height=this.win.y*0.7;
					this.cav_list.push(bg_star[i].getContext('2d'));
				}
				console.log(this.win.x+'|------|'+this.win.y);
				
				$('.container')[0].style.height=this.height+'px';
				$('.bg_one')[0].style.height=this.height*3+'px';
				this.draw_star(this.cav_list[0]);//首次加载绘制第一屏的star
				this.event();//注册上下滑动监测
			},
			random:function(){
				return{
					x:Math.floor(30+Math.random()*(this.win.x-15)), // Math.floor(min+Math.random()*(max-min));
					y:Math.floor(30+Math.random()*(this.win.y*0.7-70))
				}
			},
			draw_star:function(context){
				context.clearRect(0,0,this.win.x,this.win.y);
				context.strokeStyle='#293869';//边框样式
				context.fillStyle='#293869';
				context.lineWidth=1;//图形边框宽度
				var i=0,len=this.cav_list.length,_t=this;
				context.beginPath();
				function creat_star(center){
					if(i>= len) {
						context.closePath();
						return;
					}
					context.moveTo(center.x,center.y);
					context.lineTo(center.x-45,center.y+35);
					context.lineTo(center.x+15,center.y+20);
					context.lineTo(center.x-45,center.y+10);
					context.lineTo(center.x-10,center.y+40);
					context.lineTo(center.x,center.y);
					context.fill();
					context.stroke();
					i++;
					setTimeout(function(){
						var b=_t.random();
						creat_star(b);
					},1000)
				}
				var b=this.random();
				setTimeout(function(){creat_star(b)},2500);
			},
			event:function(){
				var _t=this,x=0,y=0,s;
				$('body').touch('up',function(){
					$('.container')[_t.page].style.height=0;					
					if (_t.page == 0)	$('.con_one,.con_one p').styleText();			
					_t.page=_t.page++ >= 2 ? 0 : _t.page;
					$('.container')[_t.page].style.height=_t.height+'px';
					_t.draw_star(_t.cav_list[_t.page]);
					_t.ele.style.top=-_t.scale.y*_t.page+'px';
					_t.ele.style.left=-_t.scale.x*_t.page+'px';
					$('.bg_one')[0].style.top=-_t.scale.y*_t.page*1.9+'px';					
				})
				$('body').touch('down',function(){
					if(_t.page <= 0) return;
					$('.container')[_t.page].style.height=0;	
					_t.page=_t.page-- <= 0 ? 0 :_t.page;
					if (_t.page == 0) {$('.con_one')[0].style.opacity=1;$('.con_one p').css({top:'0',left:'0'});}
					_t.draw_star(_t.cav_list[_t.page]);
					$('.container')[_t.page].style.height=_t.height+'px';
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
}