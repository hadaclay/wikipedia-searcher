$(document).ready(function() {
  $("#search-form").submit(function(e) {
    e.preventDefault();
    var request = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=pageimages|extracts&exintro&explaintext&exsentences=1&exlimit=max";

    $.ajax({
      url: request,
      dataType: "jsonp",
      data: $("#search-form").serialize(),
      success: successFunction
    });
  });
});

var switchUI = function() {
  $("#result-container").toggle();
  $(".footer").toggle();
  $(".main-container").animate({ "padding-top": "-=30%"});
}

var successFunction = function (data) {
  var results = data.query.pages;
  var url = "https://en.wikipedia.org/?curid=";
  var html = "";

  switchUI();

  Object.keys(results).forEach (function(val) {
    html += "<div class='row'><div class='col-md-8 col-md-offset-2'><a target='_blank' href='"
         + url + val + "'><div class='result'><h3>" + results[val].title + "</h3><p>"
         + results[val].extract + "</p></div></a></div></div>";
  });

  $("#result-container").html(html);
}
