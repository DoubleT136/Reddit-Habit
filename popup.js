// Author: Tommy Tang
// tommy9695@gmail.com

months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var content = "";

$(document).ready(function() {
   cur_date = new Date();
   get_content(cur_date);
   $('.clear_history').click(function() {
      chrome.storage.sync.clear(function() {
         $('#msg').html("Your subreddit history has been cleared!");
         content = "";
      });
   });
   $('.total').click(get_total);
   $('.clear_page').click(function() {
      content = "";
      get_content(cur_date);
   });
   $("#datepicker").datepicker({  maxDate: '0',
      onSelect: function(dateText, inst) {
         var date = $(this).datepicker( 'getDate' );
         get_content(date);
      }
   });
});

function get_content(date)
{
   date_str = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
   content += "<p>" + "<font color='#ff4500'><b>" + date_str + "</b></font><br/>"
   chrome.storage.sync.get(null, function (result) {
      var arr = [];
      for (sub in result) {
         if (sub != "recent_url") {
            var count = 0;
            for (date in result[sub]) {
               if (result[sub][date] == date_str) {
                  count++;
               }
            }
            if (count != 0) {
               arr.push([sub, count]);
            }
         }
      }
      arr.sort(
         function(a, b) {
            return b[1] - a[1];
      });
      if (arr.length == 0) {
         content += "You did not visit any subreddits on that day."
      } else {
         for (key in arr) {
               content += "<b>" + arr[key][0] + "</b>: " + arr[key][1] + "<br/>";
         }
      }
      content += "</p>"
      $('#msg').html(content);
   });
}

function get_total()
{
   content = "<p>" + "<font color='#ff4500'><b>Complete History</b></font><br/>";
   chrome.storage.sync.get(null, function (result) {
      var arr = [];
      for (sub in result) {
         if (sub != "recent_url") {
            var count = 0;
            for (date in result[sub]) {
                  count++;
            }
            arr.push([sub, count]);
         }
      }
      arr.sort(
         function(a, b) {
            return b[1] - a[1];
      });
      for (key in arr) {
            content += "<b>" + arr[key][0] + "</b>: " + arr[key][1] + "<br/>";
      }
      content += "</p>"
      $('#msg').html(content);
      content = "";
   });
}
