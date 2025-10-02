$(document).ready(function () {
  $(function () {
    // Show welcome box on load
    $("#welcomeBox").show();

    // Click to hide welcome box
    $("#welcomeBox").click(function () {
      $(this).fadeOut(500);
    });

    $(".subOption").click(function (e) {
      e.preventDefault();

      let subjectId = $(this).data("subject");

      // Hide all boxes
      $(".totalNotes").hide();

      // Show selected one
      $("#" + subjectId).fadeIn(300);
    });
  });

  let unit = $("#unit");
  let teacher = $("#SelectTeacher");
  let date = $("#selectDate");

  $("body").on("change", "#SelectTeacher, #selectDate", function () {
    let teacher = $("#SelectTeacher").val();
    let date = $("#selectDate").val();

    $(".rs_main").hide();

    $(".rs_main").each(function () {
      let dataTeacher = $(this).data("teacher");
      let dataDate = $(this).data("date");

      if (teacher == "" && date == "") {
        $(this).hide();
      }

      if (dataTeacher == teacher && dataDate == date) {
        $(this).show();
      } else {
        $(this).hide();
      }

      if (teacher == dataTeacher && date == "") {
        $(this).show();
      }

      if (teacher == "" && date == dataDate) {
        $(this).show();
      }
    });
  });
});
