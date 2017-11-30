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

  mostrarDetallesPelicula();

  function mostrarDetallesPelicula(){
    $('#detallesPelicula').html(' ');
    MiId = "asd";


    var param1var = getQueryVariable("pelicula");

    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("?");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      alert('Query Variable ' + variable + ' not found');
    }

    $.ajax({
      type:'POST',
      dstaType:'json',
      data:{data:param1var},
      url:"controlador/controlador_consulta_una_pelicula.php",
      success:function(datos) {
        //alert(datos)
        midato=JSON.parse(datos)
        var peli = "";
        $.each( midato, function(i,dato) {

          $('#tituloPelicula').text(dato.titulo);

          peli+='<table class="table table-bordered">';
          peli+='<thead>';
          peli+='<tr>';
          peli+='<th class="centrado">Poster</th>';
          peli+='<th>Detalles</th>';
          peli+='</tr>';
          peli+='</thead>';
          peli+='<tbody>';
          peli+='<tr>';
          peli+='<td rowspan="3" class="centrado"><img class="imagenPeli" src="'+dato.cartel+'" title="'+dato.titulo+'" alt=" " /></td>';
          peli+='<td>Titulo: '+dato.titulo+'<br>Año: '+dato.Año+'</td>';
          peli+='</tr>';

          peli+='<tr>';
          peli+='<td><strong>Director: </strong>'+dato.Director+'</td>';
          peli+='</tr>';

          peli+='<tr>';
          peli+='<td><p><strong>Actores:</strong></p>'+dato.Actores+'</td>';
          peli+='</tr>';

          peli+='</tbody>';
          peli+='</table>';
          peli+='<div class="clearfix"> </div>';



        });

        //alert(peli)
        $('#detallesPelicula').append(peli).hide().fadeIn('slow');
        return false;
      },
      error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
  };

});
