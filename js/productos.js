"use strict"
let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

    /*USUARIO*/

function mostrar(){
document.getElementById('logout').style.display = 'block' ;
}

function ocultar(){
document.getElementById('logout').style.display = 'none' ;
}

mostrar()
ocultar()