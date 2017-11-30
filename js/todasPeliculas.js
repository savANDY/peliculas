$(document).ready(function() {

  $('.toggle').click(function(){
    // Switches the Icon
    $(this).children('i').toggleClass('fa-pencil');
    // Switches the forms
    $('.form').animate({
      height: "toggle",
      'padding-top': 'toggle',
      'padding-bottom': 'toggle',
      opacity: "toggle"
    }, "slow");
  });

  mostrarTodasPeliculas();

  function mostrarTodasPeliculas(){
    $('#todasPelis').html(' ')
    $.ajax({
      type:'POST',
      dstaType:'json',
      url:"controlador/controlador_consulta_peliculas.php",
      success:function(datos) {
        //alert(datos)
        midato=JSON.parse(datos)
        var peli = "";
        $.each( midato, function(i,dato) {

          peli+='<div id="peliculaId'+dato.idPelicula+'" class="col-md-2 w3l-movie-gride-agile cadaPeli">';
          peli+='<a href="?pelicula='+dato.idPelicula+'"><img class="imagenPeli" src="'+dato.cartel+'" title="'+dato.titulo+'" alt=" " /></a>';
          peli+='<div class="mid-1">';
          peli+='<div class="w3l-movie-text">';
          peli+='<h6><a href="single.html">'+dato.titulo+'</a></h6>';
          peli+='</div>';
          peli+='<div class="mid-2">';
          peli+='<p>'+dato.Año+'</p>';
          peli+='<div class="block-stars">';
          peli+='<ul class="w3l-ratings">';
          peli+='<li>'+dato.Director+'</li>';
          peli+='</ul>';
          peli+='</div>';
          peli+='<div class="clearfix"></div>';
          peli+='</div>';

          peli+='</div>';
          peli+='<div class="ribben two">';
          peli+='<p>Nueva</p>';
          peli+='</div>';
          peli+='</div>';
        });

        //alert(peli)
        $('#todasPelis').append(peli).hide().fadeIn('slow');
        return false;
      },
      error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
  };

});
