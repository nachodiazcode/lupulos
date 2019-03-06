$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration:255,
        constrainWidth: false,
        hover: true ,
        gutter: 0,
        belowOrigin: true,
        alignment: 'left',
        stopPropagation: false
    });

});
 

window.onload = function ocultar_registro(){
    var formulario2 = document.getElementById("formulario2");
  }

  function mostrar(){
    document.getElementById("formulario2").style.display = "block" ;
    document.getElementById("formulario").style.display = "none" ;
  }

  function ocultar(){
    document.getElementById("formulario").style.display = "block" ;
    document.getElementById("formulario2").style.display = "none" ;
  }

  function mostrar_ocultar(){

    if(formulario2.style.display == "none"){
      mostrar();
    } else {
      ocultar();
    }

  }
