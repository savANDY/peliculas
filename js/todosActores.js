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

mostrarTodosActores();

  function mostrarTodosActores(){
    $('#todosActores').html(' ')
    $.ajax({
      type:'POST',
      dataType:'json',
      url:"controlador/controlador_consulta_actores.php",
      success:function(datos) {
        //alert(datos)
        midato=JSON.parse(datos)
        var act = "";
        var tipoBadge = "badge-primary";
        $.each( midato, function(i,dato) {
          if (dato.cant_pelis == 0) tipoBadge = "badge-danger";
          act+='<a href="?actor='+dato.idActor+'" class="list-group-item"><span class="badge badge-info">X</span><span class="badge badge-info"><i class="fa fa-times fa-pencil"></i></span><span class="badge '+tipoBadge+'">'+dato.cant_pelis+'</span> <i class="ti ti-eye"></i> '+dato.Nombre+' </a>';
        });

        //alert(act)
        $('#todosActores').append(act).hide().fadeIn('slow');
        return false;
      },
      error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
  };

});
