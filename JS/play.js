$(document).ready(function () {
  // Button click
  $(".buttons button").click(function () {
    let name = $(this).data("name");
    $("#mainContainer").addClass("blur");
    $("#mainContainer").fadeTo(500, 0);
    setTimeout(() => {
      $("#popupTitle").text(`${name} System is Coming Soon`);
      $("#popupCard").addClass("show");
    }, 500);
  });

  // Close popup
  $("#closeBtn").click(function () {
    $("#popupCard").removeClass("show");
    setTimeout(() => {
      $("#mainContainer").removeClass("blur").fadeTo(250, 1);
    }, 250);
  });

  // When button is clicked
  $("#ClassNotes").click(function () {
    // fade out body
    $("body").css("opacity", "0");

    // wait for fade, then change page
    setTimeout(function () {
      window.location.href = "./Pages/ClassNotes/index.html";
    }, 800); // match CSS transition time
  });

  // When page loads, fade in
  $(document).ready(function () {
    $("body").css("opacity", "0"); // start hidden
    setTimeout(() => $("body").css("opacity", "1"), 50); // fade in
  });
});
