function MakeRequest(url) {
  var xhr = new XMLHttpRequest ();
  var txt;
  xhr.onreadystatechange = function () {
    if ( this.readyState == 4 )
    {
      switch ( this.status )
      {
        case 200:
          txt=xhr.responseText;
          break;
        default:
          txt=false;
      }
    }
  }
  xhr.open( 'GET',url,false );
  xhr.send();
  return txt;
};

function GetDefaultUrl(){
  if (!widget.preferences.dcid)
    {
      widget.preferences.dcid="101161002";
      widget.preferences.dcname="成县";
    };
  return 'http://m.weather.com.cn/data/'+widget.preferences.dcid+'.html';
}

function GetDefaultSkUrl(){
  if (!widget.preferences.dcid)
    {
      widget.preferences.dcid="101161002";
      widget.preferences.dcname="成县";
    };
  return 'http://www.weather.com.cn/data/sk/'+widget.preferences.dcid+'.html';
}

function RenderSkToHtml(jsonstr){
    json=JSON.parse(jsonstr,null);
    with (json.weatherinfo)
	document.getElementById("sk").innerHTML="实况 <span style='font-weight:bold'>"+temp+"℃&nbsp;&nbsp;"+WD+WS+"&nbsp;&nbsp;相对湿度："+SD+"&nbsp;&nbsp;"+time+" 更新</span>";
}

function RenderToHtml(jsonstr){
  json=JSON.parse(jsonstr,null);
  document.getElementById('city').innerHTML=json.weatherinfo.city;
  document.getElementById('date_y').innerHTML=json.weatherinfo.date_y+'&nbsp;&nbsp;'+json.weatherinfo.week;
    with (json.weatherinfo){
	var dayimg1="<img src='themes/01/day"+img1+".png' /><br />";
	var dayimg2="<img src='themes/01/day"+img3+".png' /><br />";
	var dayimg3="<img src='themes/01/day"+img5+".png' /><br />";
	var day1=weather1+"<br />"+temp1+"<br />"+wind1+"<br />"+fl1;
	var day2=weather2+"<br />"+temp2+"<br />"+wind2+"<br />"+fl2;
	var day3=weather3+"<br />"+temp3+"<br />"+wind3+"<br />"+fl3;
	var day46="未来4-6天预报  仅供参考：<br />"+weather4+temp4+"    "+weather5+temp5+"    "+weather6+temp6;
	document.getElementById("index_co").innerHTML="舒适度指数："+index_co;
	document.getElementById("index").innerHTML="穿衣指数："+index;
        document.getElementById("index_uv").innerHTML="紫外线指数："+index_uv;
	document.getElementById("index_cl").innerHTML="晨练指数："+index_cl;
	document.getElementById("index_xc").innerHTML="洗车指数："+index_xc;
	document.getElementById("index_ls").innerHTML="晾晒指数："+index_ls;
	document.getElementById("index_tr").innerHTML="旅游指数："+index_tr;
	document.getElementById("index_ag").innerHTML="息斯敏过敏指数："+index_ag;
	document.getElementById("index_d").innerHTML= "温馨提示：<br />"+index_d;
    }
    document.getElementById('day1').innerHTML=dayimg1+day1;
    document.getElementById('day2').innerHTML=dayimg2+day2;
    document.getElementById('day3').innerHTML=dayimg3+day3;
    document.getElementById('day46').innerHTML=day46;
};

function GetProvince() {
  document.getElementById('city').options.length=0;
  document.getElementById('county').options.length=0;
  MakeList("",'province');
};

function GetCity(obj) {
  document.getElementById('county').options.length=0;
  MakeList(obj.value,'city');
};

function GetCounty(obj) {
  MakeList(obj.value,'county');
};

function GetCountyId(obj) {
  MakeList(obj.value,'countyid');
  document.getElementById('txtcname').value=obj.options[obj.selectedIndex].text;
};

function MakeList(value,obj) {
  var url="http://www.weather.com.cn/data/list3/city"+value+".xml";
  var lst=document.getElementById(obj);
  lst.options.length=0;
  var str=MakeRequest(url);
  if (str) {
    var arr=str.split(",");
    var pos=arr[0].indexOf('|');
    for (var i=0;i<arr.length;i++)
    {
      var item=new Option(arr[i].substring(pos+1,arr[i].length),arr[i].substring(0,pos));
      lst.options.add(item);
    };
    lst.options[0].selected=true;
    lst.onchange();
  }
  else
    return false;
};

function Message(msg) {
  var sb=document.getElementById('statubar');
  sb.innerHTML=msg;
  sb.style.display="";
  setTimeout('document.getElementById("statubar").style.display="none"',3000);
}

function SaveToDefault() {
  widget.preferences.dcname=document.getElementById('txtcname').value;
  widget.preferences.dcid=document.getElementById('txtcid').value;
  Message("新位置已保存。");
}

