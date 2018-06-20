function getAsText(readFile) {
  var reader = new FileReader();
  reader.readAsText(readFile, "UTF-8");
  reader.onload = loaded;
}
function loaded(event) {
  // console.log(event.target.result);
  var fileString = event.target.result;
  $("#input-card").html(fileString);
}
function startRead(event) {
  var file = document.getElementById('loadProjectFileName').files[0];
  if (file) {
    getAsText(file);
  }

  event.stopPropagation();
  event.preventDefault();
}



$(document).ready(function(){
  $("#save-project").click(function(event) {
    event.preventDefault();
    var text = document.getElementById("input-card").innerHTML;
    var filename = $("#projectFileName").val()
    var blob = new Blob([text+newCanvas], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename + ".txt");
  });
  $("#load-project").click(function(event) {
    startRead(event);
  });
});
