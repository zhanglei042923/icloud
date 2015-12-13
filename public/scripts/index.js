window.onload=function(){
var nian=document.getElementById('nian');
var nianxia=document.getElementById('nian_xia');
var ri=document.getElementById('ris');
var dianji=document.getElementById('dianji');
var bian=document.getElementById('bian');
var d=new Date();
d=new Date(d.getFullYear(),d.getMonth(),d.getDate());
var num=d.getDate();

// for(var j=0;j<xiaoge.length;j++){
// 	if(xiaoge[j].innerHTML==d.getDate()&&d.getMonth()){
// 	xiaoge[j].style.background='red';
// 	}
// }
//  var cont=xiaoge[0]; 
//  for(var i=0;i<xiaoge.length;i++){
// 	xiaoge[i].index=i;
// 	xiaoge[i].onclick=function(){
// 		cont.style.background='none'
// 		xiaoge[this.index].style.background='red';
// 		cont=xiaoge[this.index];
// 		ri.innerHTML=xiaoge[this.index].innerHTML;
// 		d=new Date(d.setDate(xiaoge[this.index].innerHTML));
// 		nian.innerHTML=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
// 		nianxia.innerHTML=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日'+'星期'+arr[d.getDay()];
// 	}
// }

var arr={1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',0:'日'};
var meiyuetianshu=[31,28,31,30,31,30,31,31,30,31,30,31];
var prev=document.getElementById('prev');
var next=document.getElementById('next');
var ajax=function(o){
	var req=new XMLHttpRequest();
	req.open('get',o.url);
	req.send();
	req.onreadystatechange=function(){
		if(this.readyState==this.DONE&&this.status==200){
			o.onsuccess(this.response);
		}
	}
}

//给他一个div class=‘aa’给他一个字符串
addClass=function(el,s){
var tmp=el.getAttribute('class').split(' ');
var dict={};
for(var i=0;i<tmp.length;i++){
	dict[tmp[i]]=true;
  }
  if(!dict[s]){
  	el.setAttribute('class',el.getAttribute('class')+' '+s);
  }
}
removeClass=function(){
  var tmp=el.getAttribute('class').split(' ');
  var dict={};
  for(var i=0;i<tmp.length;i++){
	dict[tmp[i]]=true;
  }
  delete dict[s];
  var ns='';
  for(var name in dict){
  	na +=' ' +name ;
  }
  el.setAttribute('class',ns);
}
//上一个月个下一个月的移动
var isrunnian=function(year){
	if(year%4==0&&year%100!=0||year%400==0){
		return true;
	}
	return false;
}
var previousDay=function(){
	var currentyear=d.getFullYear();
	var currentmonth=d.getMonth();
	var currentdate=d.getDate();
	var targetyear,targetmonth,targetdate;
	targetdate=currentdate-1;
	if(targetdate==0){//如果天数为0，月数减一
		targetyear=currentyear;
		targetmonth=currentmonth-1;
		if(targetmonth==-1){//如果月数为-1，年数直接跳到上一年
			targetyear=currentyear-1;
			targetmonth=11;
		}
		if(targetmonth==1){
			if(isrunnian(targetyear)){
				meiyuetianshu[1]=29;
			}
		}
		targetdate=meiyuetianshu[targetmonth];
	}else{
		targetmonth=currentmonth;
		targetyear=currentyear;
	}
	d=new Date(targetyear,targetmonth,targetdate);
}
prev.onclick=previousDay;
//判断他的前一天，当月的最后一天，下一年的第一天
var previousDays=function(){
	var currentyear=d.getFullYear();
	var currentmonth=d.getMonth();
	var currentdate=d.getDate();
	var targetyear,targetmonth,targetdate;
	targetdate=currentdate+1;
	if(targetdate>meiyuetianshu[currentmonth]){
		meiyuetianshu[1]=29;
		targetyear=currentyear;
		targetmonth=currentmonth+1;
		if(targetmonth==12){
			targetyear=currentyear+1;
			targetmonth=0;
		}
		targetdate=1;
	}else{
		targetmonth=currentmonth;
		targetyear=currentyear;
	}
	d=new Date(targetyear,targetmonth,targetdate);
}
//日历的画
var xiaoge=document.getElementsByClassName('xiaoge');
var huarili=function(){
      var i=0;
      //画前一个月的
      var tmp=d.getDate();
      d.setDate(1);
      var xingqi=d.getDay();
      d.setDate(tmp);
      var L=xingqi==0?6:xingqi-1;
      if(d.getMonth()-1==-1){
      	var shangige=31
      }else{
      	var shangyige=meiyuetianshu[d.getMonth()-1];
      }
      for(;i<L;i++){
      	xiaoge[i].innerHTML=shangyige-(L-i-1);
      	xiaoge[i].style.color='#ababab';
      	xiaoge[i].removeAttribute('id');
      	xiaoge[i].setAttribute('pr',true);
      }
      // //画当月的
      for(;i<meiyuetianshu[d.getMonth()]+L;i++){
      	xiaoge[i].setAttribute('id','d'+(i-L+1));
      	xiaoge[i].innerHTML=i-L+1;
      	xiaoge[i].style.color='black';
      	xiaoge[i].removeAttribute('nx');
      	xiaoge[i].removeAttribute('pr');

      }
      // //画下个月的
      var D=i;
      for(;i<42;i++){
      	xiaoge[i].setAttribute('nx',true);
      	xiaoge[i].innerHTML=i-D+1;
      	xiaoge[i].style.color='#ababab';
      	xiaoge[i].removeAttribute('id');
      }
}

huarili();
//日历中的字体变化和UI还有显示当前时间
var shang;

var dangqiangriqi=function(){
	return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
}
var xianshi=document.getElementById('xianshi')
var xxx=document.getElementById('xxx');
var close=document.getElementById('close');
close.onclick=function(){
	xianshi.style.display='none';
}
var ondatechange=function(){
	ajax({
		url:'http://localhost:3000/rili?timea='+dangqiangriqi(),
		onsuccess:function(e){
			var ff=JSON.parse(e); 
			if(e!=='none'){
			shijian.innerHTML='';
	         for(var i=0;i<ff.length;i++){
			        var img=document.createElement('div');
			        img.setAttribute('class','img_photo');
			      	img.style.background='url(./images/'+ff[i]+')';
			      	img.style.backgroundSize='cover';

			      	shijian.appendChild(img);
			      	var img_photo = document.getElementsByClassName('img_photo');
			      	img_photo[i].index = i ;
			      	img_photo[i].onclick=function(){
				       xianshi.style.display='block';
				       xxx.style.background='url(./images/'+ff[this.index]+')';
				       xxx.style.backgroundSize='cover';
					}
	      }
			}
	      }
	})
	if(shang){
		shang.style.color='black';
	}
	var xx=d.getDate();
	var el=document.getElementById('d'+xx);
	el.style.color='';
	shang=el;
	ri.innerHTML=d.getDate();
	nianxia.innerHTML=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日'+'星期'+arr[d.getDay()];
	nian.innerHTML=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
	bian.innerHTML='星期'+arr[d.getDay()];
}
ondatechange();
var cont=xiaoge[0];
for(var i=0;i<xiaoge.length;i++){
	xiaoge[i].onclick=function(){
		var a=d.getFullYear();
		var b=d.getMonth();
		var c=d.getDate();

		document.getElementById('d'+num).style.color='red';

 if(this.hasAttribute('id')){
	d.setDate(this.innerHTML);
	ondatechange();
 }else if(this.hasAttribute('pr')){
	var z=Number(this.innerHTML);
	var y=b-1;
	var x=a;
	d=new Date(x,y,z);
	huarili();
    ondatechange();
	}else if(this.hasAttribute('nx')){
	var z=Number(this.innerHTML);
	var y=b+1;
	var x=a;
	if(y==1&&isrunnian(x)){
	meiyuetianshu[1]=29;
	}
	d=new Date(x,y,z);
   huarili();
		}	
   ondatechange();	
	}
}

//显示在当前要显示的页面当中
prev.onclick=function(){
	previousDay();
	huarili();
	ondatechange();//专门用来根据日期更新页面显示；
	
};
next.onclick=function(){
	previousDays();
	huarili();
	
}

//shijianzhou
var dd=new Date();
var shijian=document.getElementById('shijian');
var dangqianshijian=document.getElementById('dangqianshijian');
var yidong=document.getElementById('yidong');
var cishu,minute;
var zongchang=1500;
minute=dd.getMinutes()+dd.getHours()*40;
yidong.style.top=360+Math.floor(minute)/zongchang*1500+'px';
dangqianshijian.innerHTML=dd.getHours()+':'+dd.getMinutes();
dangqianshijian.style.top=350+Math.floor(minute)/zongchang*1500+'px';
var timele=setInterval(function(){
	minute=dd.getMinutes()+dd.getHours()*40;
   yidong.style.top=360+Math.floor(minute)/zongchang*1500+'px';
    dangqianshijian.innerHTML=dd.getHours()+':'+dd.getMinutes();
    dangqianshijian.style.top=350+Math.floor(minute)/zongchang*1500+'px';
},1000);


//dangqianshijian 
var qian=document.getElementById('qianwang')
qian.onclick=function(){
	location.reload();

}

};


