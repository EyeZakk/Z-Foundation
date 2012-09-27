function parseURLParams() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function dayDiff(date1, date2){
  var yearDiff=date1.getFullYear()-date2.getFullYear();

  var y1=date1.getFullYear();
  var y2=date2.getFullYear();;

  var monthDiff=(date1.getMonth() + y1*12)-(date2.getMonth() +y2*12);

  var day1=date1.getDay();
  var day2=date2.getDay();
  var _dayDiff=(day1-day2) + (monthDiff*30);
  return _dayDiff;
}

function objectToQueryParams(obj){
  keys = obj_keys(obj);
  if(keys.length == 0){
    return "";
  }else{
    paramStr = "?"+keys[0]+"="+obj[keys[0]];
    
    for(var i = 1; i < keys.length; i++){
      paramStr += "&"+keys[i]+"="+obj[keys[i]];
    }

    return paramStr;
  }
}

function obj_keys(obj){
    var keys = [];

    for(var key in obj)
    {
        keys.push(key);
    }

    return keys;
}

function castDateKeys(obj){
  keys = obj_keys(obj);
  new_obj = {};

  for(var i = 0; i < keys.length; i++){
    date = new Date(keys[i]);
    new_obj[date] = obj[keys[i]];
  }

  return new_obj;
}

function parseTimeString(time_string, twenty_four_hr){
  if(typeof(twenty_four_hr) === undefined || !twenty_four_hr){
    twenty_four_hr = true;
  }

  var parts = time_string.split(/[:|\s]/)
  
  if(parts.length == 3){

    hours = parseInt(parts[0].stripLeadingZeros());
    minutes = parseInt(parts[1].stripLeadingZeros());
    ampm = parts[2].toUpperCase();

    if(twenty_four_hr == true){
      if(ampm == "AM" && hours == 12){
        hours = 0;
      }else if(ampm == "PM"){
        hours = hours + 12;
        ampm = null;
      }
    }

    return {
      hours: hours,
      minutes: minutes,
      ampm: ampm
    };  
  }
  return null;
}

/*
 * This is an unfortunate one-off hack to get 
 * parse the substring "YYYY-MM-DD" out of a string
 * with the substring "date-YYYY-MM-DD".
 */
function parseDateSubstr(classes){

  var matches = classes.match(/date-\d{4}-\d{2}-\d{2}/);
  
  if(!matches || matches.length < 1){
    return null;
  }else{
    return matches[0].substring("date-".length, matches[0].length)
  }

};

String.prototype.stripLeadingZeros = function(){
  str = this;
  while (str.charAt(0) == '0') {
      if (str.length == 1) { 
        break 
      }
      
      if (str.charAt(1) == '.') { 
        break 
      };
      
      str = str.substr(1,str.length-1)
  }
  return str;
}

function LastDayOfMonth(Year, Month) {
    return new Date( (new Date(Year, Month + 1, 1)) -1 );
}

// NOTE: adjusts "month" index to the zero-indexed (for Jan)
// form expected by a Date object constructor
function parseHyphenDateStr(date_str){

  var matches = date_str.match(/\d{4}-\d{1,2}-\d{1,2}/);
  
  if(!matches || matches.length < 1){
    return null;
  }else{
    
    var parts = matches[0].split("-")

    return {
      year: parseInt(parts[0]),
      month: parseInt(parts[1].stripLeadingZeros()) - 1,
      day: parseInt(parts[2].stripLeadingZeros())
    }
  }

};

function hyphenDateStringToDate(date_string){
  var date_parts = parseHyphenDateStr(date_string);
  return new Date(date_parts.year, date_parts.month, date_parts.day);
};

Date.prototype.simpleDateString = function(){
  return this.getFullYear() + "-" + 
    (this.getMonth() + 1).zeroPadded() + 
    "-" + this.getDate().zeroPadded();
};

function getParameterByName(name){
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Changes XML to JSON
function xmlToJson(xml) {

  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].length) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
};


Date.prototype.cleanTime = function(){
  var hours_str, minutes_str, ampm_str;

  var hours = this.getHours();
  var minutes = this.getMinutes();
  var ampm = ampm_str = "am";

  if (hours >= 12) {
    ampm = ampm_str = "pm";
    hours = hours - 12;
  }
  if (hours == 0) {
    hours = 12;
  }

  if(hours < 10){
    hours_str = "0" + hours.toString();
  }else{
    hours_str = hours.toString();
  }

  if(minutes < 10){
    minutes_str = "0"+minutes.toString();
  }else{
    minutes_str = minutes.toString();
  }

  return {
    numeric: {
      hours: hours,
      minutes: minutes,
      ampm: ampm
    }, stringified: {
      hours: hours_str,
      minutes: minutes_str,
      ampm: ampm_str
    }
  }
}



Date.prototype.prettyTime = function(){
  parts = this.cleanTime();
  if(parts.numeric.minutes == 0){
    return parts.numeric.hours.toString() + parts.stringified.ampm;
  }
  else{
    return parts.numeric.hours.toString() + ":" + parts.stringified.minutes + parts.stringified.ampm;
  }
};

String.prototype.toTimeHash = function(twenty_four_hr){
  if(twenty_four_hr === undefined || twenty_four_hr === null){
    twenty_four_hr = false;
  }

  if(this == "invalid"){
    return {
      numeric: "invalid",
      stringified: "invalid"
    }
  }

  times_str = this.stripWhitespace();

  var hours_str, minutes_str, ampm_str;

  var hours = times_str.substr(0,2)
  var minutes = times_str.substr(3,2)
  var ampm = ampm_str = times_str.substr(5,2);

  if(hours[0] == "0"){
    hours = hours.substr(1,1);
  }

  if(minutes[0] == "0"){
      minutes = minutes.substr(1,1);
    }

  hours = parseInt(hours);
  minutes = parseInt(minutes);

  if (hours == 0) {
    hours = 12;
  }

  if(hours < 10){
    hours_str = "0" + hours.toString();
  }else{
    hours_str = hours.toString();
  }

  if(minutes < 10){
    minutes_str = "0"+minutes.toString();
  }else{
    minutes_str = minutes.toString();
  }

  if(twenty_four_hr == true){
    
    if(ampm.toLowerCase() == "pm" && hours != 12){
      hours = hours + 12;
      hours_str = hours.toString();
    }else if(ampm.toLowerCase() == "pm" && hours == 12){
      hours = hours;
      hours_str = hours.toString();      
    }else{
      if(hours == 12){
        hours = 0;
        hours_str = "0";
      }
    }
    ampm = null;
  }

  return {
    numeric: {
      hours: hours,
      minutes: minutes,
      ampm: ampm
    }, stringified: {
      hours: hours_str,
      minutes: minutes_str,
      ampm: ampm_str
    }
  }
}



Date.prototype.setISO8601 = function (string, localize) {

    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    var d = string.match(new RegExp(regexp));

    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
    }

    if(localize)
        offset -= date.getTimezoneOffset();

    time = (Number(date) + (offset * 60 * 1000));
    this.setTime(Number(time));

    return this;
};

Date.prototype.toAMPMString = function(){
    var d = new Date(this);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m<10?"0"+m:m;

    s = s<10?"0"+s:s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?"+hh+":"+m+":"+s);

    var repalcement = h+":"+m;
    /* if you want to add seconds
    repalcement += ":"+s;  */
    repalcement += " "+dd;

    return this.toString().replace(pattern,repalcement);
};

Date.prototype.addDays = function(days) {
   var dat = new Date(this.valueOf())
   dat.setDate(dat.getDate() + days);
   return dat;
}

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push( new Date (currentDate) )
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var field_escape = function(str){
  return(
      str.replace(/&/g,'&amp;').
          replace(/>/g,'&gt;').
          replace(/</g,'&lt;').
          replace(/"/g,'&quot;')
  );
};

String.prototype.stripWhitespace = function(){
  return this.replace(/( |\n)/g, '')
};

$.fn.absCenter = function(){
  var parent = $(this).parent()
  $(this).css({ left: (parent.width() / 2), top: (parent.height() / 2),
                marginLeft: -1*($(this).width() / 2), marginTop: -1*($(this).height() / 2) })
}

$.fn.fixedCenter = function(){
  var parent = $(this).parent()
  $(this).css({ left: ($(window).width() / 2), top: ($(window).height() / 2),
                marginLeft: -1*($(this).width() / 2), marginTop: -1*($(this).height() / 2) })
}

var capitalize = function(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var monthForNum = function(num, opts){
  var short = null;
  if(!opts.short || opts.short === undefined){
    short = true;
  }

  var monthsLong = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
  var monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  idx = num - 1;

  if(short){
    return monthsShort[idx];
  }else{
    return monthsLong[idx];
  }
}

Number.prototype.ordinal = function () {
  var suffix = 'th',
    aNum = this;
  while (aNum > 100) {
    aNum -= 100;
  }
  if (aNum < 10 || aNum > 13) {
      switch (aNum % 10) {
          case 1:
              suffix = 'st';
              break;
          case 1:
              suffix = 'nd';
              break;
          case 3:
              suffix = 'rd';
              break;
      }
  }
  return this.toString() + suffix;
}

/* overlay first element on second element */
function overlayElement(firstElement, secondElement){
  firstElement.width(secondElement.width());
  firstElement.height(secondElement.height());
  firstElement.position({
    my: "center",
    at: "center",
    of: secondElement
  });
};

String.prototype.truncatedTo = function(max_chars) {
  if(this.length <= max_chars){
    return this.toString(); 
  }else{
    return this.substring(0, (max_chars - 1)) + "...";
  };
};

Array.prototype.removeElement = function(element){
  index = this.indexOf(element);

  if(index != -1){
    this.splice(index, 1);
    return this;
  }
  return null;
};

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};

var elementHTML = function(element){
   return $('<div>').append(element.clone()).remove().html();
};

/* overlay first element on second element */
function overlayElement(firstElement, secondElement){
  firstElement.width(secondElement.width());
  firstElement.height(secondElement.height());
  firstElement.position({
    my: "center",
    at: "center",
    of: secondElement
  });
};

Number.prototype.zeroPadded = function(){
  if(this < 10){
    return "0" + this.toString();
  }else{
    return this.toString();
  }
}

Array.remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};

Array.prototype.removeByValue = function(value) {
  var idx = this.indexOf(value);
  if(idx > -1){
    this.splice(idx, 1);
    return this;
  };
  return null;
};

String.prototype.stripPX = function(){
  return this.replace(/[^-\d\.]/g, '');
}