const botonModoOscuro = document.querySelector("#modo-oscuro");
const body = document.querySelector(".modo-claro");
const main = document.querySelector("#principal");
const contacto = document.querySelector("#contacto")
const iniciosesion = document.querySelector("#inicioSesion")
/*Las variables que se conectan al documento por medio del DOM*/

const modoOscuroActivo = localStorage.getItem("modoOscuro") === "true";
const obtenerDelLs = JSON.parse(localStorage.getItem("ana"));
/*Variable que detecta si en el local storage está el modo oscuro activado*/

if(obtenerDelLs != undefined){
  iniciosesion.innerText = "Cerrar Sesión"
  iniciosesion.addEventListener("click",()=>{
    localStorage.removeItem("ana");
    location.reload();
  })
}

const datosUsuario = {
  user: "ana",
  password: "ana",
};
/*Tu usuario y contraseña de la sesion*/

async function fetchLocalFile(filePath) {
  try {
    const response = await fetch(filePath);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
}
/*funcion *asincrona* que sirve para traer los archivos locales al script*/

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
};

/*Funcion de modo oscuro*/

let cambiarASesion = async (pagina)=>{
  
  main.innerHTML= pagina
  let botonModoOscuro = document.querySelector("#modo-oscuro")
  botonModoOscuro.onclick = () => {
    document.body.classList.toggle("modo-oscuro");
    if (body.className === "modo-claro modo-oscuro") {
      botonModoOscuro.textContent = "Modo Claro";
      localStorage.setItem("modoOscuro", "true");
    } else {
      botonModoOscuro.textContent = "Modo Oscuro";
      localStorage.setItem("modoOscuro", "false");
    }
  };
  const inputUser = document.querySelector("#input-user");
  const inputPass = document.querySelector("#input-pass");
  const confirmar = document.querySelector("#confirmar");
  const botonContacto = document.querySelector("#contacto")

  botonContacto.addEventListener("click",()=>{
    let pcontacto = "/contacto.html"
    fetchLocalFile(pcontacto).then((data) => {
      cambiarAContacto(data)
    });
  })

  const subirAlLs = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor));
  };

  confirmar.addEventListener("click",(evt)=>{
    evt.preventDefault()

    if(inputUser.value == datosUsuario.user && inputPass.value == datosUsuario.password){
      subirAlLs(inputUser.value, inputPass.value)
      location.reload();
    }else{
      let errorLogin = document.querySelector("#logint")

      errorLogin.innerHTML = "no se pudo validar la información"
    }

})
}
/*Lo que cambia a la página principal en la página de inicio de sesion, trabaja con la función de fetchLocalFile
de iniciosesion.addEventListener*/

const cambiarAContacto =(info)=>{
  main.innerHTML = info

  let botonModoOscuro = document.querySelector("#modo-oscuro")
  botonModoOscuro.onclick = () => {
    document.body.classList.toggle("modo-oscuro");
    if (body.className === "modo-claro modo-oscuro") {
      botonModoOscuro.textContent = "Modo Claro";
      localStorage.setItem("modoOscuro", "true");
    } else {
      botonModoOscuro.textContent = "Modo Oscuro";
      localStorage.setItem("modoOscuro", "false");
    }
  };
  let btninicio = document.querySelector("#iniciosesion")
  if(obtenerDelLs != undefined){
    btninicio.innerText = "Cerrar Sesión"
    btninicio.addEventListener("click",()=>{
      localStorage.removeItem("ana");
      location.reload();
    })
  }
  btninicio.addEventListener("click",()=>{
    let psesion = "/iniciarSesion.html"

  fetchLocalFile(psesion).then((data) => {
    cambiarASesion(data)
  }) 
  })
  let name = document.getElementById("name")
  let email = document.getElementById("email")
  let mensaje = document.querySelector("#texto")
  let btnenviar = document.querySelector("#botonenviar")
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  btnenviar.addEventListener("click",(evt)=>{
    evt.preventDefault()

    if (name.value.length < 2) {
      alert("Por favor ingresa un nombre valido");
    }else if(!emailRegex.test(email.value) == true){
      alert("Por favor ingresa un email valido");
    }else{
      localStorage.setItem("mensaje", mensaje.value)
      location.reload();
    }
  })
}
/*Lo que cambia a la página principal en la página de contacto, trabaja con la función de fetchLocalFile
de contacto.addEventListener*/

iniciosesion.addEventListener("click",()=>{
  let psesion = "/iniciarSesion.html"

  fetchLocalFile(psesion).then((data) => {
    cambiarASesion(data)
  });
})
/*Evento que trae la informacion de la página inicio sesion.html y la utiliza*/
contacto.addEventListener("click",()=>{
  let pcontacto = "/contacto.html"
  
  fetchLocalFile(pcontacto).then((data) => {
    cambiarAContacto(data)
  });
})
/*Evento que trae la información de la página de contacto y la utiliza*/

const publicaciones = document.querySelector("#publicaciones")

obtenerDatos();

function obtenerDatos() {
  const url = "datos/publicaciones.json";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => mostrarHTML(resultado));
}

function mostrarHTML(publicaciones) {
  const contenido = document.querySelector(".contenido");

  let html = "";

  publicaciones.forEach((publicaciones) => {
    const { nombreDeUsuario, post, img, fecha, hora } = publicaciones;

    html += `<div class="blog-entry">`;
    html += `<p>${nombreDeUsuario} </p>
   <p>${post} </p>
   <img class = "mi-imagen" src="${img}" alt="Imagen publicación">
   <p>${fecha} </p>
   <p>${hora} </p>`;
    html += `</div>`;
  });

  contenido.innerHTML = html;
}
