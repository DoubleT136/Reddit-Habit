// Author: Tommy Tang
// tommy9695@gmail.com

months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

chrome.tabs.onUpdated.addListener( function( tabId,  changeInfo,  tab) {
       chrome.storage.sync.get('recent_url', function(result) {
              if (result['recent_url'] != tab.url && changeInfo.status == "complete") {
                     chrome.storage.sync.set({'recent_url': [tab.url]});
                     if( /^https:\/\/www.reddit.com\/r\//.test(tab.url)) {
                            var sub = tab.url.match(/(?:\/r\/)(.+?)(?:\/|$|#)/)[1];
                            var date = new Date();
                            date_str = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
                            chrome.storage.sync.get(sub, function(result) {
                                   var obj = {};
                                   if (jQuery.isEmptyObject(result)) {
                                          var arr = [];
                                          arr.push(date_str);
                                          obj[sub] = arr;
                                          chrome.storage.sync.set(obj);
                                   } else {
                                          var arr = result[sub];
                                          arr.push(date_str);
                                          obj[sub] = arr;
                                          chrome.storage.sync.set(obj);
                                   }
                            });
                     }
              }
       });
});
