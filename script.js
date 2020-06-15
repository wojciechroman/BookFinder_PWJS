$(document).ready(function () {
   var viewstyle = 0;
   $( "#list" ).click(function() {
      viewstyle = 0;
    });
    $( "#view_module" ).click(function() {
      viewstyle = 1;
    });

   $("#form").submit(function () {

      var search = $("#books").val();
      if (search == "") {
         alert("Proszę uzupełnić pole wyszukiwania");
      }
      else {
         $("#result").empty();

         var position = 200;
         var string = "";
         var url = "";
         var img = "";
         var title = "";
         var author = "";
         var temp = 1;
         var div = "";
         var div2 = $("</div>");
         $.get("https://www.googleapis.com/books/v1/volumes?q=" + search, function (response) {
            if (viewstyle == 0) {
               for (i = 0; i < response.items.length; i++) {
                  title = $('<h5 class="center-align white-text">' + response.items[i].volumeInfo.title + '</h5>');
                  author = $('<h5 class="center-align white-text"> Autor: ' + response.items[i].volumeInfo.authors + '</h5>');
                  img = $('<img id="img"><br><a href=' + response.items[i].volumeInfo.infoLink + '><button id="imagebutton" class="btn red">Przeczytaj więcej</button></a>');
                  url = response.items[i].volumeInfo.imageLinks.thumbnail;
                  img.attr('src', url);
                  title.appendTo('#result');
                  author.appendTo('#result');
                  img.appendTo('#result');
               }
            }
            else {
               
               for (i = 0; i < response.items.length; i++) {
                  title = '<h5 class="center-align white-text">' + response.items[i].volumeInfo.title + '</h5>';
                  author = '<h5 class="center-align white-text"> Autor: ' + response.items[i].volumeInfo.authors + '</h5>';
                  url = response.items[i].volumeInfo.imageLinks.thumbnail;
                  img = '<img id="img2" src="'+url+'"><br><a href=' + response.items[i].volumeInfo.infoLink + '><button id="imagebutton2" class="btn red">Przeczytaj więcej</button></a>';
                  div = '<div id="div'+temp+'" style="top:'+position+'px">';
                  string=$(div+title+author+img+div2);
                  console.log(string);
                  string.appendTo('#result');
                  
                  if (temp == 1) {
                     temp = 0;
                  }
                  else {
                     temp++;
                     position+=450;
                  }
                  string = "";
               }
               
            }
         });

      }
      return false;
   });

});