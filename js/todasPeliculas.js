var anyoActual = (new Date).getFullYear();
directores = "";
ultimoId = 0;
borrarPeli = false;
botonesAdministrador = "";
mostrarActores = "";
esProtagonista = 0;
var arrayActores = [];

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
        //alert(datos)
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
        alert(datos)
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
    nuevaPeli+='<label for="inputDirector">Director</label>';
    nuevaPeli+='<div class="input-group">';
    nuevaPeli+='<div class="input-group-btn">';
		nuevaPeli+='<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Seleccionar <span class="caret"></span></button>';
		nuevaPeli+='<ul class="dropdown-menu">';
		nuevaPeli+='<li id="seleccionarDirector"><a href="#">Seleccionar</a></li>';
		nuevaPeli+='<li id="nuevoDirector"><a href="#">Insertar</a></li>';
		nuevaPeli+='</ul>';
    nuevaPeli+='</div>';
    nuevaPeli+='<input type="text" class="form-control" id="inputNuevoDirector" placeholder="Nuevo director" value="" style="display: none;">';
    nuevaPeli+='<select class="form-control" id="inputSeleccionarDirector" name="Director">';
    nuevaPeli+=directores;
    nuevaPeli+='</select>';
    nuevaPeli+='</div>';
    nuevaPeli+='</div>';
    nuevaPeli+='<div class="form-group col-md-6">';
    nuevaPeli+='<label for="poster">URL del cartel</label>';
    nuevaPeli+='<input class="form-control" type="text" placeholder="http://www.site.com/poster.jpg" id="inputCartel" value="">';
    nuevaPeli+='</div>';
    nuevaPeli+='</div>';
    nuevaPeli+='</fieldset>';
    nuevaPeli+='</div>';


    nuevaPeli+='<div id="campoActores">'
    nuevaPeli+='</div>';

    //alert(nuevaPeli)
    $('#todasPelis').prepend(nuevaPeli).hide().fadeIn('slow');
    mostrarCampoActores();
  };

  $('body').on("click", "#nuevoDirector", function(){
    $('#inputSeleccionarDirector').hide();
    $('#inputNuevoDirector').show();
});

$('body').on("click", "#seleccionarDirector", function(){
  $('#inputNuevoDirector').hide();
  $('#inputSeleccionarDirector').show();
});


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


  // function getUltimoid() {
  //   $.ajax({
  //     type:'POST',
  //     dstaType:'json',
  //     url:"controlador/controlador_consulta_peliculas_ultimoid.php",
  //     success:function(datos) {
  //       //alert(datos)
  //       midato=JSON.parse(datos)
  //
  //       $.each( midato, function(i,dato) {
  //
  //         ultimoId = dato.ultimoId;
  //
  //       });
  //
  //
  //       return false;
  //     },
  //     error: function(xhr){
  //       alert("An error occured: " + xhr.status + " " + xhr.statusText);
  //     }
  //   });
  // }


//  idPeli = ultimoId - 1;

  $('body').on("click", "#botonInsertar", function(){
    //alert("boton");


    // getUltimoid();
    idPeli = ultimoId - 1;

    $('.actuaCheckBox:checkbox:checked').each(function(){
      esProtagonista = 0;
      alert ($(this).val());
      idActor = $(this).val();


      $('.protagonistaCheckBox:checkbox:checked').each(function(){
        alert ($(this).val());
        if ($(this).val() === idActor) {
          esProtagonista = 1;
        }
        arrayActores.push(idActor+"-"+esProtagonista);
        //alert(arrayActores);
      });

    });
    insertarPelicula();
    //location.reload();

  });

  function insertarActuacion(idActor,esProtagonista){


    $.ajax({
      type:'POST',
      data:"submit=&idActor="+idActor+"&esProtagonista="+esProtagonista,
      dstaType:'json',
      url:"controlador/controlador_insertar_actuacion.php",
      success:function(datos) {
        //alert(idActor + ", " + esProtagonista);
        //alert("Se ha añadido con exito")
        //location.reload();

      },
      error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });

  }


  function insertarPelicula(){
    alert(arrayActores);
    MiTitulo = $('#inputTitulo').val();
    MiAnyo = $('#inputAnyo').val();
    MiDirector = $('#inputSeleccionarDirector').val();
    MiCartel = $('#inputCartel').val();

    $.ajax({
      type:'POST',
      data:"submit=&Titulo="+MiTitulo+"&Anyo="+MiAnyo+"&Director="+MiDirector+"&Cartel="+MiCartel+"&arrayActores="+arrayActores,
      dstaType:'json',
      url:"controlador/controlador_insertar_pelicula.php",
      success:function(datos) {
        alert(datos)
        alert("Se ha añadido con exito")
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
