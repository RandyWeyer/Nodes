

$(document).ready(function(){
  $("#save-project").click(function(event) {
    event.preventDefault();
    var text = document.getElementById("node-project").innerHTML;
    var filename = $("#projectFileName").val()
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename + ".txt");
  });

});
