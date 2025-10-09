$(document).ready(function() {

  // Show welcome box on load
  $("#welcomeBox").show(500);

  let currentSubject = "";

  // Teachers for each subject
  const teachers = {
    Bangla:["Shanti Miss","Atia ferdaus Miss"],
    English:["Tauhidul Sir","Sagar Sir"],
    Accounting:["Atik Sir","Mannan Sir"],
    BOM:["Razzak Sir","Anowar Sir"],
    Finance:["Manik Sir","Kaniz Miss"],
    Statistics:["Prokash Sir","Farid Sir"],
    ICT:["Shirin Miss"]
  };

  // NORMAL SUBJECT BUTTON CLICK
  $(".subject-btn").click(function(e){
    e.preventDefault();
    currentSubject = $(this).data("subject");

    $("#welcomeBox").hide(500);
    $("#filterBox, #filterBoxShot").show(300);          
    $("#teacherBox, #teacherBox, #dateBox, #dateBoxShot").hide(300);
    $("#teacherSelect, #teacherSelectShot").val("");
    $("#dateSelect, #dateSelectShot").val("");

    filterCards();
  });

  // MAIN BUTTON: Daily Notes CLICK
  $(".subOption").click(function(e){
    e.preventDefault();
    currentSubject = $(this).data("subject");

    $("#welcomeBox").hide(500);
    $("#filterBox, #filterBoxShot").hide(500);         
    $("#teacherBox, #teacherBox").hide(500);
    $("#dateBox, #dateBoxShot").show(500);           
    $("#dateSelect, #dateSelectShot").val("");

    filterCards();
  });

  // FILTER SELECTION CHANGE
  $("#filterSelect, #filterSelectShot").change(function(){
    $("#teacherBox, #teacherBox, #dateBox, #dateBoxShot").hide(300);
    $("#teacherSelect, #teacherSelectShot").val("");
    $("#dateSelect, #dateSelectShot").val("");

    let filter = $(this).val();
    if(filter==="SelectTeacher" || filter==="nameAndDate"){
      let subs = teachers[currentSubject];
      $("#teacherSelect, #teacherSelectShot").empty().append('<option value="" selected>Select Teacher</option>');
      subs.forEach(t=> $("#teacherSelect, #teacherSelectShot").append(`<option value="${t}">${t}</option>`));
      $("#teacherBox, #teacherBox").show(300);
    }else {
      $("#teacherBox, #teacherBox").hide(500);
    }

    if(filter==="selectDate" || filter==="nameAndDate" || filter==="proxy"){
      $("#dateBox, #dateBoxShot").show(300);
    }else {
      $("#dateBox, #dateBoxShot").hide(500);
    }

    filterCards();
  }); 

  // CLEAR BUTTONS
  $("#clearTeacher, #clearTeacher02").click(function(){ 
    $("#teacherSelect, #teacherSelectShot").val(""); 

    filterCards(); 
  });

  $("#clearDate, #clearDate02").click(function(){ 
    $("#dateSelect, #dateSelectShot").val("");

    filterCards(); 
  });

  // TEACHER & DATE SELECTION CHANGE
  $("#teacherSelect, #teacherSelectShot, #dateSelect, #dateSelectShot").change(filterCards);

  // FUNCTION TO FILTER CARDS
  function filterCards(){

    $(".subject-card").hide(500);

    let filter = $("#filterSelect").val();
    let teacherVal = $("#teacherSelect").val();
    let dateVal = $("#dateSelect").val();

    // 🔹 Short (mobile) selects
    let filterShot = $("#filterSelectShot").val();
    let teacherShotVal = $("#teacherSelectShot").val();
    let dateShotVal = $("#dateSelectShot").val();

    // 🔹 Combine (use whichever has a value)
    filter = filter || filterShot;
    teacherVal = teacherVal || teacherShotVal;
    dateVal = dateVal || dateShotVal;

    // DAILY NOTES BUTTON CASE
    if(currentSubject==="dailyNotes"){
      let anyShown = false;
      
      $(".subject-card").each(function(){
        let cardDate = $(this).data("date");
        
        if(!dateVal || cardDate===dateVal){
          $(this).show(300);
          anyShown = true;
        }
      });

      if(!anyShown){
        $("#welcomeBox").show(300);
      } else {
        $("#welcomeBox").hide(500);
      }
      return;

    }

    // NORMAL SUBJECT FILTERING
    $(".subject-card[data-subject='"+currentSubject+"']").each(function(){
      let show = true;
      let isProxy = $(this).data("proxy")==="yes";
      let cardTeacher = $(this).data("teacher");
      let cardDate = $(this).data("date");

      // If no filter is selected or filter=unit, show all
      if(!filter || filter==="unit") {
        $(this).show(500);
        return;
      }
      
      if(filter==="SelectTeacher" && teacherVal && cardTeacher!==teacherVal) 
        show=false;

      if(filter==="selectDate" && dateVal && cardDate!==dateVal) 
        show=false;

      if(filter==="nameAndDate"){
        if(teacherVal && cardTeacher!==teacherVal) show=false;
        if(dateVal && cardDate!==dateVal) show=false;
      }

      if(filter==="proxy" && !isProxy) 
        show=false;

      if(filter==="proxy" && dateVal && cardDate!==dateVal) 
        show=false;

      if(show) $(this).show(300);
      
    });
  }

});
