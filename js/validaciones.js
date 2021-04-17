const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const enviar = document.querySelector('#enviar');
const form = document.querySelector('#formulario');
const spinner = document.querySelector('#spinner');





document.addEventListener('DOMContentLoaded', () => {
    spinner.style.display = "none";
    nombre.addEventListener('blur', validarMiFormulario);
    email.addEventListener('blur', validarMiFormulario);
    asunto.addEventListener('blur', validarMiFormulario);
    mensaje.addEventListener('blur', validarMiFormulario);
    enviar.addEventListener('click', enviarEmail);
})


function validarMiFormulario(e) {

    e.preventDefault();

    var expresionEmail = /\w+@\w+\.+[a-z]/;
    var expresionNombreExpeciales = "äóáéíúÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ"

    if (e.target.value.length <= 0) {

        if (e.target.name === "nombre") {
            mostrarMensaje("el nombre no puede estar vacio", document.querySelector('.n2'));
        }
        if (e.target.name === "email") {
            mostrarMensaje("el email no puede estar vacio", document.querySelector('.n3'));
        }
        if (e.target.name === "asunto") {
            mostrarMensaje("el asunto no puede estar vacio", document.querySelector('.n4'));
        }
        if (e.target.name === "mensaje") {
            mostrarMensaje("el mensaje no puede estar vacio", document.querySelector('.n5'));
        }

    } else if (e.target.name === "nombre") {
  // no supe crear la expresion regular del nombre :( asi que pregunte los caracteres que NO puede tomar
        for(let i =0; i< e.target.value.length ; i++){

            if(   e.target.value[i] < 'A' ||  (e.target.value[i] > 'Z' && e.target.value[i] <'a') || e.target.value[i] >'z' ) {
                    if(  ( ( expresionNombreExpeciales.indexOf (e.target.value[i] ) ) == -1)){
                        mostrarMensaje("no se permiten caracteres invalidos en nombre", document.querySelector('.n2'));
                    }
                
            }
        }
 
    }else if(e.target.name ==="email"){

        if(!expresionEmail.test(e.target.value)){
            mostrarMensaje("ingrese un mail valido", document.querySelector('.n3'));
        }
    }
        
}


function mostrarMensaje(mensaje, dondeInsertar) {
    // si existe una alerta previa no creo otra de la misma
    const existeNombre = document.querySelector('.nombre');
    const existEmail = document.querySelector('.email');
    const existeAsunto = document.querySelector('.asunto');
    const existeMensaje = document.querySelector('.mensaje');
    
    if (existeNombre === null && dondeInsertar == document.querySelector('.n2')) {
       crearError(mensaje,dondeInsertar,'nombre');
    }

    if (existEmail === null && dondeInsertar == document.querySelector('.n3')) {
        crearError(mensaje,dondeInsertar,'email');
    }
    if (existeAsunto === null && dondeInsertar == document.querySelector('.n4')) {
        crearError(mensaje,dondeInsertar,'asunto');
    }
    if (existeMensaje === null && dondeInsertar == document.querySelector('.n5')) {
        crearError(mensaje,dondeInsertar,'mensaje');
    }



}
function crearError(mensaje,dondeInsertar,tipo){
    //creo la alerta 
    const error = document.createElement('p');
    error.classList.add('error', tipo);
    error.textContent = mensaje;
    form.insertBefore(error, dondeInsertar);
    setTimeout(() => {
        error.remove();

    }, 1500);
}

// no me gustan los modales  los spinner son mejores :P

function enviarEmail(e) {
    e.preventDefault();
    if (e.target.name === "enviar") {
        //no hace validar lo otro porque si ya escribis algo se valida con la funcion de arriba el problema es cuando no hay nada ¿caso particular?
        if (nombre.value != "" && mensaje.value != "" && email.value != "" && asunto.value != "") {
            spinner.style.display = "flex";
            setTimeout(() => {

                spinner.style.display = "none";
                form.reset();
                const enviar = document.createElement('div');
                enviar.classList.add('mialerta');
                enviar.innerHTML = `<div class="alert alert-success" role="alert">
                                     Datos enviados correctamente!
                                     </div>`;
                form.appendChild(enviar);
                //aca se podria haber hecho async await pero no lo crei necesario
                setTimeout(() => {
                            enviar.remove();

                 }, 1500);

            }, 3000);           

        } else {
            const error = document.createElement('div');
            error.classList.add('error', 'mialerta');
            error.innerHTML = `<div class="alert alert-danger" role="alert">
            Todos los campos son obligatorios
          </div>`;
            form.appendChild(error);
            setTimeout(() => {
                error.remove();

            }, 1500);

        }

    }

}