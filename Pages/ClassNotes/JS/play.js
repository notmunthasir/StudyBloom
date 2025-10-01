$(document).ready(function () {
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
