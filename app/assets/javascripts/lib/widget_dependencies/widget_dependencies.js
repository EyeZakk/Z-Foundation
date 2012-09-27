//= require ./jquery
//= require_self
//= require ./jquery.ui.core
//= require ./datepicker

if(window._lc === undefined || !window._lc){
  window._lc = {};
};

window._lc.elementHTML = function(element){
   return window._lc.$('<div>').append(element.clone()).remove().html();
};

window._lc.obj_keys = function(obj){
    var keys = [];

    for(var key in obj)
    {
        keys.push(key);
    }

    return keys;
}

window._lc.$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    window._lc.$.each(a, function() {
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

window._lc.stripLeadingZeros = function(str){
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

window._lc.parseHyphenDateStr = function(date_str){

  var matches = date_str.match(/\d{4}-\d{1,2}-\d{1,2}/);
  
  if(!matches || matches.length < 1){
    return null;
  }else{
    
    var parts = matches[0].split("-")

    return {
      year: parseInt(parts[0]),
      month: parseInt( _lc.stripLeadingZeros(parts[1]) ) - 1,
      day: parseInt( _lc.stripLeadingZeros(parts[2]) )
    }
  }

};


window._lc.hyphenDateStringToDate = function(date_string){
  var date_parts = _lc.parseHyphenDateStr(date_string);
  return new Date(date_parts.year, date_parts.month, date_parts.day);
};