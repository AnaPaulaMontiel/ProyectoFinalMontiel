const botonModoOscuro = document.querySelector("#modo-oscuro");
const body = document.querySelector(".modo-claro");

const modoOscuroActivo = localStorage.getItem("modoOscuro") === "true";

if (modoOscuroActivo) {
  document.body.classList.add("modo-oscuro");
  botonModoOscuro.textContent = "Modo Claro";
} else {
  document.body.classList.remove("modo-oscuro");
  botonModoOscuro.textContent = "Modo Oscuro";
}

botonModoOscuro.onclick = () => {
  document.body.classList.toggle("modo-oscuro");
  if (body.className === "modo-claro modo-oscuro") {
    botonModoOscuro.textContent = "Modo Claro";
    localStorage.setItem("modoOscuro", "true");
  } else {
    botonModoOscuro.textContent = "Modo Oscuro";
    localStorage.setItem("modoOscuro", "false");
  }
}



obtenerDatos();

function obtenerDatos() {
  const url = 'datos/publicaciones.json'

  fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => mostrarHTML(resultado))
}

function mostrarHTML(publicaciones) {
  const contenido = document.querySelector('.contenido');

  let html = '';

  publicaciones.forEach(publicaciones => {
   const {nombreDeUsuario, post, img, fecha, hora} = publicaciones;

   html += `<div class="blog-entry">`
   html += `<p>${nombreDeUsuario} </p>
   <p>${post} </p>
   <img class = "mi-imagen" src="${img}" alt="Imagen publicación">
   <p>${fecha} </p>
   <p>${hora} </p>`
   html += `</div>`
   
  })

  contenido.innerHTML = html;
}


const formLogin = document.querySelector("#login")
const inputUser = document.querySelector("#input-user")
const inputPass = document.querySelector("#input-pass")
const loginIncorrecto = document.querySelector("#logint")
const contenedorForm = document.querySelector(".container-login")
const logout = document.querySelector("#logout")


const datosUsuario = {
  user: "ana",
  password: "ana"
}

const subirAlLs = ( clave, valor ) => {
  localStorage.setItem(clave, JSON.stringify(valor))
}

const obtenerDelLs = ( clave ) => {
  return JSON.parse(localStorage.getItem(clave))
}

formLogin.onsubmit = ( event ) => {
  event.preventDefault()
  if ( inputUser.value === datosUsuario.user && inputPass.value === datosUsuario.password ) {
    subirAlLs("login", true)
    contenedorForm.style.display = "none"  
    logout.style.display = "block"      
               
  } else {        
    loginIncorrecto.style.display = "block"
    inputPass.style.border = "3px solid red"
    inputUser.style.border = "3px solid red"
        
  }
}

function validarLogin ( clave ) {
  if ( clave !== true ) {
    contenedorForm.style.display = "flex"
    logout.style.display = "none"
                
  } else {
    contenedorForm.style.display = "none"
    logout.style.display = "block"
               
  }
}

validarLogin(obtenerDelLs("login"))

logout.onclick = () => {
  localStorage.removeItem( "login" )
  validarLogin(obtenerDelLs("login"))
  formLogin.reset()
}

function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (!emailRegex.test(email)) {
    alert("Por favor ingresa un email valido");
    return false;
  }
  if (name.length < 2) {
    alert("Por favor ingresa un nombre valido");
    return false;
  }
  return true;
}





