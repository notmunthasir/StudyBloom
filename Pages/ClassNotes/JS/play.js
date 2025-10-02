$(document).ready(function() {

  // Show welcome box on load
  $("#welcomeBox").show(500);

  

  let currentSubject = "";

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
    $("#filterBox").show(300);          
    $("#teacherBox, #dateBox").hide(300);
    $("#teacherSelect").val("");
    $("#dateSelect").val("");

    filterCards();
  });

  // MAIN BUTTON: Daily Notes CLICK
  $(".subOption").click(function(e){
    e.preventDefault();
    currentSubject = $(this).data("subject");

    $("#welcomeBox").hide(500);
    $("#filterBox").hide(500);         
    $("#teacherBox").hide(500);
    $("#dateBox").show(500);           
    $("#dateSelect").val("");

    filterCards();
  });

  // FILTER SELECTION CHANGE
  $("#filterSelect").change(function(){
    $("#teacherBox, #dateBox").hide(300);
    $("#teacherSelect").val("");
    $("#dateSelect").val("");

    let filter = $(this).val();
    if(filter==="SelectTeacher" || filter==="nameAndDate"){
      let subs = teachers[currentSubject];
      $("#teacherSelect").empty().append('<option value="" selected>Select Teacher</option>');
      subs.forEach(t=> $("#teacherSelect").append(`<option>${t}</option>`));
      $("#teacherBox").show();
    }
    if(filter==="selectDate" || filter==="nameAndDate" || filter==="proxy"){
      $("#dateBox").show();
    }
    filterCards();

  }); 

  // CLEAR BUTTONS
  $("#clearTeacher").click(function(){ 
    $("#teacherSelect").val(""); 
    filterCards(); 
  });
  $("#clearDate").click(function(){ 
    $("#dateSelect").val(""); 
    filterCards(); 
  });

  // TEACHER & DATE SELECTION CHANGE
  $("#teacherSelect, #dateSelect").change(filterCards);

  // FUNCTION TO FILTER CARDS
  function filterCards(){
    $(".subject-card").hide();
    let filter = $("#filterSelect").val();
    let teacherVal = $("#teacherSelect").val();
    let dateVal = $("#dateSelect").val();

    // DAILY NOTES BUTTON CASE
    if(currentSubject==="dailyNotes"){
      let anyShown = false;
      $(".subject-card").each(function(){
        let cardDate = $(this).data("date");
        if(!dateVal || cardDate===dateVal){
          $(this).show();
          anyShown = true;
        }
      });
      if(!anyShown){
        $("#welcomeBox").show();
      } else {
        $("#welcomeBox").hide();
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
        $(this).show();
        return;
      }

      if(filter==="SelectTeacher" && teacherVal && cardTeacher!==teacherVal) show=false;
      if(filter==="selectDate" && dateVal && cardDate!==dateVal) show=false;
      if(filter==="nameAndDate"){
        if(teacherVal && cardTeacher!==teacherVal) show=false;
        if(dateVal && cardDate!==dateVal) show=false;
      }
      if(filter==="proxy" && !isProxy) show=false;
      if(filter==="proxy" && dateVal && cardDate!==dateVal) show=false;

      if(show) $(this).show();
    });

  } console.log("Ready");
});