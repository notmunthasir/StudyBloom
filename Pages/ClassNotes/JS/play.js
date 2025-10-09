$(document).ready(function () {
  // 🟢 Show welcome box initially when page loads
  $("#welcomeBox").show(500);

  // 🔸 Store currently selected subject
  let currentSubject = "";

  // 👩‍🏫 Teacher list for each subject
  const teachers = {
    Bangla: ["Shanti Miss", "Atia ferdaus Miss"],
    English: ["Tauhidul Sir", "Sagar Sir"],
    Accounting: ["Atik Sir", "Mannan Sir"],
    BOM: ["Razzak Sir", "Anowar Sir"],
    Finance: ["Manik Sir", "Kaniz Miss"],
    Statistics: ["Prokash Sir", "Farid Sir"],
    ICT: ["Shirin Miss"],
  };

  // 🟡 SUBJECT BUTTON CLICK (Normal subjects)
  $(".subject-btn").click(function (e) {
    e.preventDefault();
    currentSubject = $(this).data("subject"); // store clicked subject
    console.log(currentSubject);

    // Sync dropdown selection with button click
    $("#subjectList").val(currentSubject);

    // Update UI visibility
    $("#welcomeBox").hide(500);
    $("#filterBox").show(300);
    $("#teacherBox, #teacherBox, #dateBox").hide(300);

    // Reset teacher and date selections
    $("#teacherSelect").val("");
    $("#dateSelect").val("");

    // Apply filters for selected subject
    filterCards();
  });

  // 🔵 MAIN BUTTON: Daily Notes CLICK
  $(".subOption").click(function (e) {
    e.preventDefault();
    currentSubject = $(this).data("subject");

    // Sync dropdown
    $("#subjectList").val("dailyNotesOpt");

    // Hide/show sections accordingly
    $("#welcomeBox").hide(500);
    $("#filterBox").hide(500);
    $("#teacherBox, #teacherBox").hide(500);
    $("#dateBox").show(500);

    // Reset date selector
    $("#dateSelect").val("");

    filterCards();
  });

  // 🟢 SUBJECT DROPDOWN CHANGE SYSTEM
  $("#subjectList").change(function () {
    currentSubject = $(this).val(); // get selected subject

    // Reset all filters
    $("#teacherSelect").val("");
    $("#dateSelect").val("");
    $("#filterSelect").val("");

    // Daily Notes option
    if (currentSubject === "dailyNotesOpt") {
      $("#welcomeBox").hide(500);
      $("#filterBox").hide(500);
      $("#teacherBox, #teacherBox").hide(500);
      $("#dateBox").show(500);
      currentSubject = "dailyNotes"; // match data-subject name
    }

    // Normal subjects
    else if (currentSubject) {
      $("#welcomeBox").hide(500);
      $("#filterBox").show(300);
      $("#teacherBox, #teacherBox, #dateBox").hide(300);
    }

    // Nothing selected → show welcome again
    else {
      $("#welcomeBox").show(300);
      $("#filterBox, #teacherBox, #dateBox").hide(300);
    }

    filterCards();
  });

  // 🟣 FILTER TYPE CHANGE (SelectTeacher, selectDate, etc.)
  $("#filterSelect").change(function () {
    // Hide all teacher/date boxes first
    $("#teacherBox, #teacherBox, #dateBox").hide(300);

    // Reset selects
    $("#teacherSelect").val("");
    $("#dateSelect").val("");

    let filter = $(this).val();

    // If filter needs teacher selection
    if (filter === "SelectTeacher" || filter === "nameAndDate") {
      let subs = teachers[currentSubject]; // find teacher list for subject
      $("#teacherSelect")
        .empty()
        .append('<option value="" selected>Select Teacher</option>');
      if (subs)
        subs.forEach((t) =>
          $("#teacherSelect").append(`<option value="${t}">${t}</option>`)
        );
      $("#teacherBox, #teacherBox").show(300);
    } else {
      $("#teacherBox, #teacherBox").hide(500);
    }

    // If filter needs date selection
    if (
      filter === "selectDate" ||
      filter === "nameAndDate" ||
      filter === "proxy"
    ) {
      $("#dateBox").show(300);
    } else {
      $("#dateBox").hide(500);
    }

    filterCards();
  });

  // 🧹 CLEAR BUTTONS
  $("#clearTeacher").click(function () {
    $("#teacherSelect").val("");
    filterCards();
  });

  $("#clearDate").click(function () {
    $("#dateSelect").val("");
    filterCards();
  });

  // 🔄 APPLY FILTER when teacher/date changes
  $("#teacherSelect, #dateSelect").change(filterCards);

  // 🧩 MAIN FILTER FUNCTION
  function filterCards() {
    // Hide all cards first
    $(".subject-card").hide(500);

    // Get filter + selections
    let filter = $("#filterSelect").val();
    let teacherVal = $("#teacherSelect").val();
    let dateVal = $("#dateSelect").val();

    // Short (mobile) versions
    let filterShot = $("#filterSelectShot").val();
    let teacherShotVal = $("#teacherSelectShot").val();
    let dateShotVal = $("#dateSelectShot").val();

    // Combine (use whichever has value)
    filter = filter || filterShot;
    teacherVal = teacherVal || teacherShotVal;
    dateVal = dateVal || dateShotVal;

    // 🟦 CASE: DAILY NOTES
    if (currentSubject === "dailyNotes") {
      let anyShown = false;

      $(".subject-card").each(function () {
        let cardDate = $(this).data("date");

        // Show if matches selected date or if no date chosen
        if (!dateVal || cardDate === dateVal) {
          $(this).show(300);
          anyShown = true;
        }
      });

      // Show welcome if no cards found
      if (!anyShown) $("#welcomeBox").show(300);
      else $("#welcomeBox").hide(500);

      return; // stop here (daily notes handled)
    }

    // 🟥 NORMAL SUBJECT FILTERING
    $(".subject-card[data-subject='" + currentSubject + "']").each(function () {
      let show = true;
      let isProxy = $(this).data("proxy") === "yes";
      let cardTeacher = $(this).data("teacher");
      let cardDate = $(this).data("date");

      // If no filter or unit → show all
      if (!filter || filter === "unit") {
        $(this).show(500);
        return;
      }

      // Filter by teacher
      if (
        filter === "SelectTeacher" &&
        teacherVal &&
        cardTeacher !== teacherVal
      )
        show = false;

      // Filter by date
      if (filter === "selectDate" && dateVal && cardDate !== dateVal)
        show = false;

      // Filter by both teacher and date
      if (filter === "nameAndDate") {
        if (teacherVal && cardTeacher !== teacherVal) show = false;
        if (dateVal && cardDate !== dateVal) show = false;
      }

      // Proxy filter
      if (filter === "proxy" && !isProxy) show = false;

      // Proxy + date filter
      if (filter === "proxy" && dateVal && cardDate !== dateVal) show = false;

      // Show card if all conditions true
      if (show) $(this).show(300);
    });
  }

  // 🧭 TOGGLE SIDEBAR
  $(".subBar-toggler").click(function () {
    $(".sidebar").toggleClass("show");
  });

  // 🔘 Hide sidebar when main button clicked
  $("#clickBtn").click(function () {
    $(".sidebar").removeClass("show");
  });


  // POPUP SYSTEM FOR BUTTONS & NAV LINKS
  $(".buttons button, .nav-link[data-name]").click(function (e) {
    e.preventDefault(); // prevent default link behavior

    let name = $(this).data("name"); // get system name
    if (!name) return;

    // Blur and fade main container
    $("#mainContainer").addClass("blur").css("opacity", "0.2");

    // Show popup
    setTimeout(() => {
      $("#popupTitle").text(`${name} System is Coming Soon`);
      $("#popupCard").addClass("show");
    }, 200);
  });

  // CLOSE POPUP
  $("#closeBtn").click(function () {
    $("#popupCard").removeClass("show");

    // Remove blur
    setTimeout(() => {
      $("#mainContainer").removeClass("blur").css("opacity", "1");
    }, 200);
  });

  // CLASS NOTES PAGE NAVIGATION
  $("#ClassNotes").click(function (e) {
    e.preventDefault();
    $("body").css("opacity", "0"); // fade out

    setTimeout(() => {
      window.location.href = "./Pages/ClassNotes/index.html";
    }, 800);
  });

  // FADE-IN PAGE ON LOAD
  $("body").css("opacity", "0");
  setTimeout(() => $("body").css("opacity", "1"), 50);


});
