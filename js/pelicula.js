directores = "";

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

getDirectores();

function getDirectores(idDirector) {
  $.ajax({
    type:'POST',
    dstaType:'json',
    url:"controlador/controlador_consulta_directores.php",
    success:function(datos) {
      //alert(datos)
      midato=JSON.parse(datos)

      $.each( midato, function(i,dato) {
        if (dato.idDirector == idDirector){
          directores +='<option value="'+dato.idDirector+'" selected>'+dato.Nombre+'</option>';
        } else {
          directores +='<option value="'+dato.idDirector+'">'+dato.Nombre+'</option>';
        }
      });

      return false;
    },
    error: function(xhr){
      alert("An error occured: " + xhr.status + " " + xhr.statusText);
    }
  });
};



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
          director = dato.idDirector;
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
          peli+='<td><p class="director" id="'+dato.idDirector+'"><strong>Director: </strong>'+dato.Director+'</p></td>';
          peli+='</tr>';

          peli+='<tr>';
          peli+='<td><p><strong>Actores:</strong></p>'+dato.Actores+'</td>';
          peli+='</tr>';

          peli+='</tbody>';
          peli+='</table>';
          peli+='<div class="clearfix"> </div>';



          peli+='<fieldset>';
          peli+='<legend>Editar pelicula:</legend>';
          peli+='<div class="form-row">';
          peli+='<div class="form-group col-md-6">';
          peli+='<label for="inputId">Id</label>';
          peli+='<input type="text" class="form-control" id="inputId" disabled placeholder="id" value="'+dato.idPelicula+'">';
          peli+='</div>';
          peli+='<div class="form-group col-md-6">';
          peli+='<label for="inputTitulo">Titulo</label>';
          peli+='<input type="text" class="form-control" id="inputTitulo" placeholder="Titulo" value="'+dato.titulo+'">';
          peli+='</div>';
          peli+='<div class="form-group col-md-6">';
          peli+='<label for="inputAnyo">Año</label>';
          peli+='<input type="number" class="form-control" id="inputAnyo" placeholder="Año" value="'+dato.Año+'">';
          peli+='</div>';
          peli+='<div class="form-group col-md-6">';
          peli+='<label for="inputPassword4">Director</label>';
          peli+='<select class="form-control" id="inputDirector" id="inputDirector" name="Director">';
          peli+=directores;

          peli+='</select>';
          peli+='</div>';
          peli+='<div class="form-group col-md-12">';
          peli+='<label for="poster">URL del cartel</label>';
          peli+='<input class="form-control" type="text" placeholder="http://www.site.com/poster.jpg" id="inputCartel" value="'+dato.cartel+'">';
          peli+='</div>';

          peli+='</div>';

          peli+='<button id="botonModificar" class="btn btn-primary">Editar</button>';
          peli+='</fieldset>';



        });

        //alert(peli)
        $('#detallesPelicula').append(peli).hide().fadeIn('slow');

          $('option').each(function() {
            if ($(this).val() == director) {
              $(this).attr("selected", "selected")
            }

          });

        return false;
      },
      error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
  };

$('body').on("click", "#botonModificar", function(){
  //alert("boton");
  funcionModificarPelicula()
});

function funcionModificarPelicula(){
  MiId = $('#inputId').val();
  MiTitulo = $('#inputTitulo').val();
  MiAnyo = $('#inputAnyo').val();
  MiDirector = $('#inputDirector').val();
  MiAnyo = $('#inputAnyo').val();
  MiCartel = $('#inputCartel').val();

  // alert (MiId + MiNombre + MiCurso);
  $.ajax({
    type:'POST',
    data:"submit=&idPelicula="+MiId+"&Titulo="+MiTitulo+"&Anyo="+MiAnyo+"&Director="+MiDirector+"&Cartel="+MiCartel,
    dstaType:'json',
    url:"controlador/controlador_modificar_pelicula.php",
    success:function(datos) {
      alert("Se ha modificado con exito")
      location.reload();
      //alert(datos)
    },
    error: function(xhr){
      alert("An error occured: " + xhr.status + " " + xhr.statusText);
    }
  })
};

});
