$(function(){
  $("#addCard").click(function(){
    $("#2r").append('<div class="card" style="width: 18em;">'+
                    // '<form id="editForm">'+
                    '<div class = form>'+
                    '<div class="form-group">'+
                    '<label for="cardTitle">Title</label>'+
                    '<input type="text" class="form-control" id="cardTitle">'+
                    '</div>'+
                    '<div class="form-group">'+
                    '<label for="cardNote">Note:</label>'+
                    '<input type="text" class="form-control" id="cardNote">'+
                    '</div>'+
                    '<span class="btn btn-primary" id="saveCard">Save</span>'+
                    '</div>'+
                    // '</form>'+
                    '<div class="card-body">'+
                    '<h5 class="card-title"></h5>'+
                    '<p class="card-text"></p>'+
                    '<span class="btn btn-primary" id="editCard">Edit</span>'+
                    '</div>'+
                    '</div>'
                  );

    $("#saveCard").last().click(function(){

      var inputtedTitle = $("input#cardTitle").val();
      var inputtedNote = $("input#cardNote").val();
      $(".card-title").text(inputtedTitle);
      $(".card-text").text(inputtedNote);
      $(".form").hide();
      $(".card-body").show();
    });

    $("#editCard").click(function(){
      $(".form").show();
      $(".card-body").hide();
    })

  });
});
