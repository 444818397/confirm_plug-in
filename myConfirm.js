 /*
           业务功能 
           1.在body元素下添加添加弹窗元素
           2.实现标题栏拖拽拖拽
           3.实现点击确定或取消返回true或false
           4.点击外部元素时不起作用,直到元素关闭时才可以点击外部元素
*/
        function MyConfirm(){   
            this.disX = 0;
            this.disY = 0;
            this.body=null;
            this.box=null;
            this.header=null;
            this.close=null;
            this.title=null;
            this.foot=null;
            this.content=null;
            this.mask=null;
        }
        //调用confirm实现弹窗
        //message是提示内容
        //fn回调函数 flag参数是接受你点击按钮返回的bool值
        MyConfirm.prototype.confirm = function(title,message,fn){
            var that = this;
            this.createEl(title,message);
            //haeder绑定拖拽功能
            that.header.onmousedown = function(e){
                e = e || window.event;
                that.mousedownHandler(this,e);
                this.setCapture && this.setCapture();
                return false;
            }
            //关闭弹窗
            that.close.onclick=function(){
             that.destroy();
            }
            this.foot.onclick=function(e){
                e = e || window.event;
                if(e.target.nodeName=="BUTTON"){
                  var val=e.target.innerHTML;
                 
                  if(val.trim()=="确定"){
                    fn(true);

                  }
                  else{
                    fn(false);
                  }
                   that.destroy();
                }
            }
            //监听窗口大小的变化
            window.onresize=function(){
               that.win();
            }
            //第一次创建后执行
             that.win();
        }
        //窗口大小改变时弹窗元素始终垂直居中
        MyConfirm.prototype.win=function(){
                var that=this;
                var winWidth=null;
                var winHeight=null;
                if (window.innerWidth)
                {
                   winWidth = window.innerWidth;
                }
                else if ((document.body) && (document.body.clientWidth))
                {
                   winWidth = document.body.clientWidth;
                }
                // 获取窗口高度
                if (window.innerHeight)
                    winHeight = window.innerHeight;
                else if ((document.body) && (document.body.clientHeight))
                    winHeight = document.body.clientHeight;
                // 通过深入 Document 内部对 body 进行检测，获取窗口大小
                if (document.documentElement && document.documentElement.clientHeight && document.   documentElement.clientWidth)
                {
                winHeight = document.documentElement.clientHeight;
                winWidth = document.documentElement.clientWidth;
                }
                var left=winWidth/2-200;
                var top=winHeight/2-100;
                that.box.style.left=left+'px';
                that.box.style.top=top+'px';
        }
        //销毁窗口元素
        MyConfirm.prototype.destroy=function(){
           this.body.removeChild(this.box);
           this.body.removeChild(this.mask);
        }
        //创建整体弹窗元素
        MyConfirm.prototype.createEl=function(tit,message){
            var that=this;
            //获取body元素
            that.body=document.getElementsByTagName('body')[0];
            //创建弹窗盒子元素
            that.box=document.createElement('div');
            that.box.className='my-confirm animated bounce';
                //获取头部元素
                that.header=document.createElement('div');
                that.header.className='my-confirm-header';
                //获取关闭按钮元素
                that.close=document.createElement('span');
                that.close.className='my-confirm-close';
                that.close.innerHTML='✖';
                //获取标题元素
                that.title=document.createElement('h3');
                that.title.className='my-confirm-title';
                that.title.innerHTML=tit;
                that.header.appendChild(that.close);
                that.header.appendChild(that.title);
                //获取内容元素
                that.content=document.createElement('div');
                that.content.className='my-confirm-content';
                that.content.innerHTML=message;
                 //获取底部元素
                that.foot=document.createElement('div');
                that.foot.className='my-confirm-foot';
                that.foot.innerHTML='<button type="button">取消</button><button type="button">确定</button>';
                //创建遮罩元素
                that.mask=document.createElement('div');
                that.mask.className='my-confirm-Mask';
                that.box.appendChild(that.header);
                that.box.appendChild(that.content);
                that.box.appendChild(that.foot);
                that.body.appendChild(that.box);
                that.body.appendChild(that.mask);

        }
        MyConfirm.prototype.mousedownHandler = function(div,e){
            this.disX = e.clientX - div.parentNode.offsetLeft;
            this.disY = e.clientY - div.parentNode.offsetTop;
            var _this = this;
             document.onmousemove = function(e){
                e = e || window.event;
                _this.mousemoveHandler(e);
            };
             document.onmouseup = function(){
                _this.mouseupHandler(div);
            };
        }
        MyConfirm.prototype.mousemoveHandler = function(e){
            this.box.style.left = e.clientX - this.disX + 'px'; 
            this.box.style.top = e.clientY - this.disY + 'px'; 
        }
        MyConfirm.prototype.mouseupHandler = function(div){
            document.onmousemove = document.onmouseup = null;
            div.releaseCapture && div.releaseCapture();
        }
        var myConfirm= new MyConfirm();
        myConfirm.confirm('提示',"确定要修改么?",function(flag){
           alert(flag);
           /*....这里执行业务逻辑*/
        });
         var myConfirm2= new MyConfirm();
        myConfirm2.confirm('警告',"确定要修改么?",function(flag){
           alert(flag);
           /*....这里执行业务逻辑*/
        });
