$(document).ready(function(){
  $("div[role=navigation]").load("header.html")
  $(".bs-docs-footer .row").load("footer.html")

  var ref = new Firebase("https://baysidehistorical.firebaseio.com/events");
  var build = new Array("");
  ref.orderByChild("date").once("value", function(snapshot) {
    snapshot.forEach(function(data) {
      var tmp = data.val();
      eventMonth = tmp.date.split(" ")[1];
      if(!(compareDates(tmp.date))){
        build.push('<div class="event"><h3>'+tmp.title+'</h3><div class="content"><p><img src="'+tmp.image+'" /></p><p class="date">Date: '+tmp.date+'</p>');

        if(!(tmp.time == ""))
        build.push('<p class="date">Time: '+tmp.time.from + ' - ' +tmp.time.to +'</p>');

        if(tmp.cost.member == 0 && tmp.cost.nonmember == 0 && tmp.cost.custom == 0){
          build.push('<p class="date">Cost: FREE</p><p>'+tmp.description+'</p>');
        }else if (tmp.cost.member == 0 && tmp.cost.nonmember == 0 && tmp.cost.custom != 0) {
          build.push('<p class="date">Cost: '+tmp.cost.custom+'</p><p>'+tmp.description+'</p>')
        }
        else {
          build.push('<p class="date">Cost:  $'+tmp.cost.member+' with membership; $'+tmp.cost.nonmember+' without membership</p><p>'+tmp.description+'</p>');
        }

        if(tmp.dca == true){
          build.push('<div class="media well well-sm"><div class="media-body small">This program is supported, in part, by public funds from the New York City Department of Cultural Affairs in partnership with the City Council.</div><div class="media-right media-middle"><img class="media-object" src="assets/images/logo/dca.png" alt="DCA Logo" height="30px"></div></div>');
        }

        build.push('</div><hr class="style-eight"> </div>');
      }
    });
    $("#main-content-event").append(build.join(''));
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

});

$("#past").click(function(e){
  e.preventDefault();
  var ref = new Firebase("https://baysidehistorical.firebaseio.com/events");
  var build = new Array("");
  ref.once("value", function(snapshot) {
    snapshot.forEach(function(data) {
      var tmp = data.val();
      eventMonth = tmp.date.split(" ")[1];
      if(compareDates(tmp.date)){
        build.push('<div class="event"><h3>'+tmp.title+'</h3><div class="content"><p><img src="'+tmp.image+'" /></p><p class="date">Date: '+tmp.date+'</p>');

        if(!(tmp.time == ""))
        build.push('<p class="date">Time: '+tmp.time.from + ' - ' +tmp.time.to +'</p>');

        if(tmp.cost.member == 0 && tmp.cost.nonmember == 0 && tmp.cost.custom == 0){
          build.push('<p class="date">Cost: FREE</p><p>'+tmp.description+'</p>');
        }else if (tmp.cost.member == 0 && tmp.cost.nonmember == 0 && tmp.cost.custom != 0) {
          build.push('<p class="date">Cost: '+tmp.cost.custom+'</p><p>'+tmp.description+'</p>')
        }
        else {
          build.push('<p class="date">Cost:  $'+tmp.cost.member+' with membership; $'+tmp.cost.nonmember+' without membership</p><p>'+tmp.description+'</p>');
        }

        if(tmp.dca == true){
          build.push('<div class="media well well-sm"><div class="media-body small">This program is supported, in part, by public funds from the New York City Department of Cultural Affairs in partnership with the City Council.</div><div class="media-right media-middle"><img class="media-object" src="assets/images/logo/dca.png" alt="DCA Logo" height="30px"></div></div>');
        }
        build.push('</div><hr class="style-eight"> </div>');
      }
    });
    $("#main-content-event").html(build.join(''));
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
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
