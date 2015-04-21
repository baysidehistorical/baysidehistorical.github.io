$(document).ready(function(){
  $("div[role=navigation]").load("../../header.html")
  $(".bs-docs-footer .row").load("../../footer.html")

  $.getJSON("assets/js/eventsList.js", function(result){

    json_results = result;
    //Testing Area

    //end testing area
    var sortedEvents = result.events;

    sortedEvents.sort(function(a,b){
      var aDate = Date.parse(a.date);
      var bDate = Date.parse(b.date);

      if(aDate < bDate) return -1;
      if(aDate > bDate) return 1;
      return 0;
    });

    var build = new Array("");
    var tmp;
    for(pos = 0; pos < sortedEvents.length; pos++){
      tmp = sortedEvents[pos];
      eventMonth = tmp.date.split(" ")[1]
      if(!(compareDates(tmp.date))){
        build.push('<div class="event" id="'+tmp.id+'"><h3>'+tmp.title+'</h3><div class="content"><p><img src="../assets/images/events/'+tmp.image+'" /></p><p class="date">Date: '+tmp.date+'</p>');

        if(!(tmp.time == ""))
        build.push('<p class="date">Time: '+tmp.time + '</p>');

        build.push('<p class="date">Cost: '+tmp.cost+'</p><p>'+tmp.description+'</p></div><hr class="style-eight"> </div>');
      }
    }
    $("#main-content-event").append(build.join(''));
  });
});

$("#past").click(function(e){
  e.preventDefault();
  $.getJSON("assets/js/eventsList.js",
  function(result){
    json_results = result;
    var sortedEvents = result.events;

    /*
    sortedEvents.sort(function(a,b){
    var aDate = Date.parse(a.date);
    var bDate = Date.parse(b.date);

    if(aDate < bDate) return 1;
    if(aDate > bDate) return -1;
    return 0;

  });
  */
  var build = new Array("");
  var tmp;
  for(pos = 0; pos < sortedEvents.length; pos++){
    tmp = sortedEvents[pos];
    eventMonth = tmp.date.split(" ")[1];
    if(compareDates(tmp.date)){
      build.push('<div class="event" id="'+tmp.id+'"><h3>'+tmp.title+'</h3><div class="content"><p><img src="../assets/images/events/'+tmp.image+'" /></p><p class="date">Date: '+tmp.date+'</p>');

      if(!(tmp.time == ""))
      build.push('<p class="date">Time: '+tmp.time + '</p>');

      build.push('<p class="date">Cost: '+tmp.cost+'</p><p>'+tmp.description+'</p></div><hr class="style-eight"> </div>');
    }
  }
  $("#main-content-event").html(build.join(''));
});
});

//Returns True if this is a past event and false if it is upcoming
function compareDates(ed){

//This will compare with the last date of an event if it spans more than one day.

  if (ed.split(' - ').length > 1) { ed = ed.split(' - ')[1]; }
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  today = mm+'/'+dd+'/'+yyyy;
  today = Date.parse(today);

  var eventDate = Date.parse(ed);
  if (today <= eventDate) { return false; }
  else { return true; }
}
