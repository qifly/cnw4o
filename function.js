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


function RenderToHtml(jsonstr){
  json=JSON.parse(jsonstr,null);
  document.getElementById('city').innerHTML=json.weatherinfo.city;
  document.getElementById('date_y').innerHTML=json.weatherinfo.date_y+'&nbsp;&nbsp;'+json.weatherinfo.week;
  document.getElementById('weather1').innerHTML=json.weatherinfo.weather1+'&nbsp;&nbsp;'+json.weatherinfo.temp1;
  document.getElementById('wind1').innerHTML=json.weatherinfo.wind1+'&nbsp;&nbsp;'+json.weatherinfo.fl1;
  document.getElementById('index_co').innerHTML=json.weatherinfo.index_co;
  document.getElementById('index').innerHTML=json.weatherinfo.index;
  document.getElementById('index_uv').innerHTML=json.weatherinfo.index_uv;
  document.getElementById('index_cl').innerHTML=json.weatherinfo.index_cl;
  document.getElementById('index_xc').innerHTML=json.weatherinfo.index_xc;
  document.getElementById('index_ls').innerHTML=json.weatherinfo.index_ls;
  document.getElementById('index_tr').innerHTML=json.weatherinfo.index_tr;
  document.getElementById('index_ag').innerHTML=json.weatherinfo.index_ag;
  document.getElementById('index_d').innerHTML=json.weatherinfo.index_d;
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

