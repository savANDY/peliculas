var anyoActual = (new Date).getFullYear();
directores = "";
ultimoId = 0;
borrarPeli = false;

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
        mostrarInsertarNuevaPelicula();
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



      //alert(nuevaPeli)
      $('#todasPelis').append(nuevaPeli).hide().fadeIn('slow');

  };


  $('body').on("click", "#botonInsertar", function(){
    //alert("boton");
    insertarPelicula()
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
    borrarPeliculas()
  });

function borrarPeliculas(){
  borrarPeli = true;

  var borraPeli = "";


    borraPeli+='<fieldset>';
    borraPeli+='<legend>Borrar peliculas:</legend>';
    borraPeli+='<div class="alert alert-info" role="alert">';
		borraPeli+='<strong>¡Información!</strong> Para borrar peliculas dale a la \'X\' de la pelicula que deseas borrar.';
		borraPeli+='</div>';
    borraPeli+='</fieldset>';



  //alert(nuevaPeli)
  $('#todasPelis').append(borraPeli).hide().fadeIn('slow');




}

});
