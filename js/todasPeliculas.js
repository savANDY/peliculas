var anyoActual = (new Date).getFullYear();
directores = "";
ultimoId = 0;
borrarPeli = false;
botonesAdministrador = "";
mostrarActores = "";

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


// BORRAR PELICULA SI GET 'borrar' EXISTE
var peliAborrar = getQueryVariable("borrar");

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("?");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return null;
}

if (peliAborrar) {


  $.ajax({
    type:'POST',
    dstaType:'json',
    data:{data:peliAborrar},
    url:"controlador/controlador_borrar_pelicula.php",
    success:function(datos) {
      alert(datos)
      midato=JSON.parse(datos)

      $.each( midato, function(i,dato) {
        alert('Pelicula '+dato.titulo+ ' borrada');
      });

      window.location.replace("index.php");

      return false;
    },
    error: function(xhr){
      alert("An error occured: " + xhr.status + " " + xhr.statusText);
    }
  });

}


  botonesAdministrador += '<div>';
  botonesAdministrador += '<button id="botonAnyadir" class="btn btn-primary">Añadir</button>';
  botonesAdministrador += '<button id="botonBorrar" class="btn btn-primary">Borrar</button>';
  botonesAdministrador += '</div>';


    $('#contenido').prepend(botonesAdministrador).hide().fadeIn('slow');

  getDirectores();
  function getDirectores() {
    $.ajax({
      type:'POST',
      dstaType:'json',
      url:"controlador/controlador_consulta_directores.php",
      success:function(datos) {
        //alert(datos)
        midato=JSON.parse(datos)

        $.each( midato, function(i,dato) {
          directores +='<option value="'+dato.idDirector+'">'+dato.Nombre+'</option>';
        });

        return false;
      },
      error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
  };


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
          peli+='<h6><a href="?pelicula='+dato.idPelicula+'">'+dato.titulo+'</a></h6>';
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
          if (dato.Año > (anyoActual - 1)){
            peli+='<div class="ribben two">';
            peli+='<p>Nueva</p>';
            peli+='</div>';
          }
          if (borrarPeli){
            peli+='<a href="?borrar='+dato.idPelicula+'"><div class="borrar drch">';
            peli+='<p>X</p>';
            peli+='</div></a>';
          }
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

  function mostrarInsertarNuevaPelicula(){
    //alert(directores);
    var nuevaPeli = "";

    nuevaPeli+='<div id="campoNuevaPelicula">'
    nuevaPeli+='<fieldset>';
    nuevaPeli+='<legend>Nueva pelicula:</legend>';
    nuevaPeli+='<div class="form-row">';
    nuevaPeli+='<div class="form-group col-md-6">';
    nuevaPeli+='<label for="inputTitulo">Titulo</label>';
    nuevaPeli+='<input type="text" class="form-control" id="inputTitulo" placeholder="Titulo" value="">';
    nuevaPeli+='</div>';
    nuevaPeli+='<div class="form-group col-md-6">';
    nuevaPeli+='<label for="inputAnyo">Año</label>';
    nuevaPeli+='<input type="number" class="form-control" id="inputAnyo" placeholder="Año" value="">';
    nuevaPeli+='</div>';
    nuevaPeli+='<div class="form-group col-md-6">';
    nuevaPeli+='<label for="inputPassword4">Director</label>';
    nuevaPeli+='<select class="form-control" id="inputDirector" id="inputDirector" name="Director">';
    nuevaPeli+=directores;
    nuevaPeli+='</select>';
    nuevaPeli+='';
    nuevaPeli+='</div>';
    nuevaPeli+='<div class="form-group col-md-6">';
    nuevaPeli+='<label for="poster">URL del cartel</label>';
    nuevaPeli+='<input class="form-control" type="text" placeholder="http://www.site.com/poster.jpg" id="inputCartel" value="">';
    nuevaPeli+='</div>';
    nuevaPeli+='</div>';
    nuevaPeli+='<button id="botonInsertar" class="btn btn-primary">Añadir</button>';
    nuevaPeli+='</fieldset>';
    nuevaPeli+='</div>';


    nuevaPeli+='<div id="campoActores">'
    nuevaPeli+='</div>';

    //alert(nuevaPeli)
    $('#todasPelis').prepend(nuevaPeli).hide().fadeIn('slow');
    mostrarCampoActores();
  };


function mostrarCampoActores(){

  $.ajax({
    type:'POST',
    dstaType:'json',
    url:"controlador/controlador_consulta_actores.php",
    success:function(datos) {
      //alert(datos)
      midato=JSON.parse(datos);

  mostrarActores+='<fieldset>';
  mostrarActores+='<legend>Actores:</legend>';
  mostrarActores+='<div class="actores">';


  mostrarActores+='<table class="table">';
    mostrarActores+='<thead>';
      mostrarActores+='<tr>';
        mostrarActores+='<th scope="col">#</th>';
        mostrarActores+='<th scope="col">Nombre</th>';
        mostrarActores+='<th scope="col">Actua</th>';
        mostrarActores+='<th scope="col">Es protagonista</th>';
      mostrarActores+='</tr>';
    mostrarActores+='</thead>';
    mostrarActores+='<tbody>';

    var row = 1;
    $.each( midato, function(i,dato) {

      mostrarActores+='<tr>';
        mostrarActores+='<th scope="row">'+row+'</th>';
        mostrarActores+='<td>'+dato.Nombre+'</td>';
        mostrarActores+='<td>';
        mostrarActores+='<div class="checkbox">';
          mostrarActores+='<label><input type="checkbox" class="actuaCheckBox" value="'+dato.idActor+'"></label>';
        mostrarActores+='</div>';
        mostrarActores+='</td>';

        mostrarActores+='<td>';
        mostrarActores+='<div class="checkbox">';
          mostrarActores+='<label><input type="checkbox" class="protagonistaCheckBox" value="'+dato.idActor+'"></label>';
        mostrarActores+='</div>';
        mostrarActores+='</td>';


      mostrarActores+='</tr>';
      row++;
    });

    mostrarActores+='</tbody>';
mostrarActores+='</table>';


  mostrarActores+='</div>';

  mostrarActores+='<button id="botonInsertar" class="btn btn-primary">Añadir</button>';
  mostrarActores+='</fieldset>';



//alert(peli)
  $('#campoActores').prepend(mostrarActores).hide().fadeIn('slow');

  return false;
},
error: function(xhr){
  alert("An error occured: " + xhr.status + " " + xhr.statusText);
}
});


};

getUltimoid();
function getUltimoid() {
  $.ajax({
    type:'POST',
    dstaType:'json',
    url:"controlador/controlador_consulta_peliculas_ultimoid.php",
    success:function(datos) {
      //alert(datos)
      midato=JSON.parse(datos)

      $.each( midato, function(i,dato) {

        ultimoId = dato.ultimoId;

      });
      //alert(peli)
      $('#todasPelis').append(peli).hide().fadeIn('slow');
      return false;
    },
    error: function(xhr){
      alert("An error occured: " + xhr.status + " " + xhr.statusText);
    }
  });
}


idPeli = ultimoId - 1;

alert (ultimoId);

  $('body').on("click", "#botonInsertar", function(){
    //alert("boton");

    //insertarPelicula()

    $('.actuaCheckBox:checkbox:checked').each(function(){
        alert ($(this).val());
    });

    $('.protagonistaCheckBox:checkbox:checked').each(function(){
        alert ($(this).val());
        //insertarActuacion($(this).val(),idPeli);
    });


  });

  function insertarPelicula(){
    MiTitulo = $('#inputTitulo').val();
    MiAnyo = $('#inputAnyo').val();
    MiDirector = $('#inputDirector').val();
    MiCartel = $('#inputCartel').val();

    // alert (MiId + MiNombre + MiCurso);
    $.ajax({
      type:'POST',
      data:"submit=&Titulo="+MiTitulo+"&Anyo="+MiAnyo+"&Director="+MiDirector+"&Cartel="+MiCartel,
      dstaType:'json',
      url:"controlador/controlador_insertar_pelicula.php",
      success:function(datos) {
        alert(datos)
        alert("Se ha añadido con exito")
        location.reload();

      },
      error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    })
  };



  $('body').on("click", "#botonBorrar", function(){
    //alert("boton");
    $('#campoNuevaPelicula').hide();

    mostrarTodasPeliculas();
        mostrarBorrarPeliculas();
  });

  $('body').on("click", "#botonAnyadir", function(){
    //alert("boton");
    $('#campoBorrarPeliculas').hide();
    mostrarInsertarNuevaPelicula();
  });

  function mostrarBorrarPeliculas(){
    borrarPeli = true;
    var borraPeli = "";

    borraPeli+='<div id="campoBorrarPeliculas">'
    borraPeli+='<fieldset>';
    borraPeli+='<legend>Borrar peliculas:</legend>';
    borraPeli+='<div class="alert alert-info" role="alert">';
    borraPeli+='<strong>¡Información!</strong> Para borrar peliculas dale a la \'X\' de la pelicula que deseas borrar.';
    borraPeli+='</div>';
    borraPeli+='</fieldset>';
    borraPeli+='</div>'

    //alert(nuevaPeli)
    $('#todasPelis').prepend(borraPeli).hide().fadeIn('slow');

  }

});
