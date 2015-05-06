var topicsContent;
var topicHeaders = ["about","castle","cemetery","trustees","staff","about"];

$(document).ready(function(){

  $("div[role=navigation]").load("header.html")
  $(".bs-docs-footer .row").load("footer.html")

  var s = getParameterByName("s");

  $.get("../../about_topics.html", function( data ) {
    topicsContent = data.split("~");
    $("#bannerAbout").css("background-image",'url(assets/images/header/'+topicHeaders[s]+'.jpg)')
    $("#main-content").html(topicsContent[s]);
  });

  $("#sidebar a").click(function(){
    var li = $(this).parent();
    var pos = $("#sidebar li").index(li)
    $("#bannerAbout").css("background-image",'url(assets//images/header/'+topicHeaders[pos]+'.jpg)')
    $("#main-content").html(topicsContent[pos]);
  });

})

function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
