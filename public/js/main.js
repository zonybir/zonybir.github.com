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
				setTimeout(function(){
					_t.player.play();$('.con_one')[0].style.opacity=1;
					$('.con_one p').css({top:'0',left:'0'});
					scroll_bg.slider_status=true;
				},3000);
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
		var scroll_bg={
			bgimg:'',
			win:[],
			height:'',
			scale:'',
			ele:'',
			page:0,
			status:false,
			cav_list:[],
			slider_status:false,
			init:function(){//滑动屏幕各种参数样式初始化
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
				this.slider_page.ele_pageTwo=$('.con_two p');
				this.slider_page.ele_pageThree=$('.con_three .strap');
				this.rectTouch.init();
				this.event();//注册上下滑动监测

			},
			random:function(){//生成随机 x  y   for star
				return{
					x:Math.floor(30+Math.random()*(this.win.x-15)), // Math.floor(min+Math.random()*(max-min));
					y:Math.floor(30+Math.random()*(this.win.y*0.7-70))
				}
			},
			draw_star:function(context){//动态绘制star
				context.clearRect(0,0,this.win.x,this.win.y);
				context.strokeStyle='#293869';//边框样式
				context.fillStyle='#293869';//填充样式
				context.lineWidth=1;
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
			event:function(){//上下滑动屏幕  及其 显示流程控制
				var _t=this,x=0,y=0,s;
				$('body').touch('up',function(){
					if(!_t.slider_status) return;
					else _t.slider_status=false
					$('.container')[_t.page].style.height=0;					
					_t.slider_page.animateUp(_t.page);		
					_t.page=_t.page++ >= 2 ? (function(){$('.con_one')[0].style.opacity=1;$('.con_one p').css({top:'0',left:'0'});return 0}()): _t.page;
					$('.container')[_t.page].style.height=_t.height+'px';
					_t.draw_star(_t.cav_list[_t.page]);
					_t.ele.style.top=-_t.scale.y*_t.page+'px';
					_t.ele.style.left=-_t.scale.x*_t.page+'px';
					$('.bg_one')[0].style.top=-_t.scale.y*_t.page*1.9+'px';
					setTimeout(function(){_t.slider_status=true;},6000);					
				})
				$('body').touch('down',function(){
					if(!_t.slider_status || _t.page <= 0) return;
					else {
						_t.slider_status=false;
						setTimeout(function(){_t.slider_status=true;},6000);
					}					
					$('.container')[_t.page].style.height=0;	
					_t.page=_t.page-- <= 0 ? 0 :_t.page;
					_t.slider_page.animateDown(_t.page);
					_t.draw_star(_t.cav_list[_t.page]);
					$('.container')[_t.page].style.height=_t.height+'px';
					$('.bg_one')[0].style.top=-_t.scale.y*_t.page*1.8+'px';
					 _t.ele.style.top=-_t.scale.y*_t.page+'px';
					_t.ele.style.left=-_t.scale.x*_t.page+'px';
						

				})
			},
			slider_page:{//当前屏幕可见控制 以及各帕流程
				ele_pageTwo:'',
				ele_pageThree:'',
				animateUp:function(num){//下一帕
					var _t=scroll_bg.slider_page;
					switch(num){
						case 0:{
							$('.con_one,.con_one p').styleText('');
							_t.ele_pageTwo[0].style.opacity=1;
							_t.ele_pageTwo[1].style.top=0;
							_t.ele_pageTwo[2].style.top=0;
							_t.ele_pageTwo[3].style.left=0;
							_t.ele_pageTwo[4].style.left=0;
							_t.ele_pageTwo[5].style[transform]='scale(1)';
							break;
						}
						case 1:{
							_t.ele_pageTwo.styleText('');
							setTimeout(function(){_t.ele_pageThree.removeClass('back_anima');_t.ele_pageThree.addClass('anima');},2000);
							break;
						}
						case 2:{
							_t.ele_pageThree.addClass('back_anima');
							_t.ele_pageThree.removeClass('anima');
							$('.con_one')[0].style.opacity=1;
							$('.con_one p').css({top:'0',left:'0'});
							break;
						}
					}
				},
				animateDown:function(num){//上一帕
					var _t=scroll_bg.slider_page;
					console.log(num);
					switch(num){
						case 0:{
							$('.con_one')[0].style.opacity=1;
							$('.con_one p').css({top:'0',left:'0'});
							_t.ele_pageTwo.styleText('');
							break;
						}
						case 1:{
							_t.ele_pageThree.addClass('back_anima');
							_t.ele_pageThree.removeClass('anima');
							_t.ele_pageTwo[0].style.opacity=1;
							_t.ele_pageTwo[1].style.top=0;
							_t.ele_pageTwo[2].style.top=0;
							_t.ele_pageTwo[3].style.left=0;
							_t.ele_pageTwo[4].style.left=0;
							_t.ele_pageTwo[5].style[transform]='scale(1)';
							break;
						}
					}
				}
			},
			setScroll:function(num){
				if(document.body.scrollTop) document.body.scrollTop=num;
				else if(document.documentElement.scrollTop) document.documentElement.scrollTop=num;
			},
			rectTouch:{
				ele:'',
				init:function(){
					var _t=$('.strap'),x,y;
					_t[0].style[transform]='rotateX('+0+'deg)'+'rotateZ('+0+'deg)';
					_t.addevent('touchstart',function(event){
						event=event || window.event;
						event.stopPropagation();
						event.preventDefault();
						event.cancelable=true;
						event=event.touches[0];
						x=event.pageX;
						y=event.pageY;
					})
					_t.addevent('touchmove',function(event){
						event=event || window.event;
						event.stopPropagation();
						event.preventDefault();
						event.cancelable=true;
						event=event.touches[0];
						var cssText=_t.styleText(),
						old_rotate_X=/rotateX\((\S+)deg\)/i.exec(cssText)[1],
						old_rotate_Z=/rotateZ\((\S+)deg\)/i.exec(cssText)[1],
						btX=((x-event.pageX)+parseInt(old_rotate_Z,10))%360,
						btY=((y-event.pageY)+parseInt(old_rotate_X,10))%360;
						/*console.log(old_rotate_X);*/
						this.style[transform]='rotateX('+btY+'deg) rotateZ('+btX+'deg)';
						x=event.pageX;
						y=event.pageY;
					})
				}
			}
		}
		play_ani.init();
		scroll_bg.init();
		var zh=document.body.height || document.documentElement.clientHeight;		
}