const usuarios = [
  { documento: 3254, nombre: "Alicia", tipoUsuario: "administrador", contraseña: "arcoiris" },
  { documento: 2284, nombre: "Juan", tipoUsuario: "administrador", contraseña: "firulais" },
  { documento: 8554, nombre: "Cristina", tipoUsuario: "cliente", contraseña: "pastel" },
  { documento: 5567, nombre: "Mauricio", tipoUsuario: "cliente", contraseña: "sombrilla" },
]

const cantidadBilletes = [
  { denominacion: 100000, cantidad: 0 },
  { denominacion: 50000, cantidad: 0 },
  { denominacion: 20000, cantidad: 0 },
  { denominacion: 10000, cantidad: 0 },
  { denominacion: 5000, cantidad: 0 }
];

//Función para el usuario tipo administrador
const ingresarDinero = (cantidadBilletes) => {
  for (i = 0; i < cantidadBilletes.length; i++) {
    let billetes = parseInt(prompt("¿cuantos billetes de " + cantidadBilletes[i].denominacion + " va a ingresar?"));
    cantidadBilletes[i].cantidad = cantidadBilletes[i].cantidad + billetes;
  }

  //Para mostrar la cantidad de dinero total del cajero
  let totalDinero = 0;
  cantidadBilletes.forEach(element => {
    totalDinero += element.denominacion * element.cantidad;
  });
  alert("El cajero tiene un total de dinero de: " + totalDinero);

  return cantidadBilletes;



}

//función para el usuario tipo cliente
const retirarDinero = (retiro, cantidadBilletes) => {
  const dineroRetirado = [];
  let totalDinero = 0;
  cantidadBilletes.forEach(element => {
    totalDinero += (element.denominacion * element.cantidad);
  })

  if (totalDinero < retiro) {
    alert("Cajero en mantenimiento, vuelva pronto");
  } 
  else if (totalDinero >= retiro) {
    let cambio = totalDinero - retiro;

    cantidadBilletes.forEach(element => {

    const billetesNecesarios = Math.floor(cambio / element.denominacion)
  
    if (billetesNecesarios <= element.cantidad) {
      const billetes = {
        denominacion: element.denominacion,
        cantidad: billetesNecesarios
      }

      dineroRetirado.push(billetes);
      element.cantidad -= billetesNecesarios;
      cambio -= element.denominacion * billetesNecesarios;
    } else if(billetesNecesarios > element.cantidad){
      const billetes = {
        denominacion: element.denominacion,
        cantidad: element.cantidad
      }

      dineroRetirado.push(billetes);
      cambio -= element.denominacion * billetes.cantidad;
      element.cantidad = element.cantidad > 0 ? 0 : 0;
    }
    }
    )
    totalDinero = 0;
    cantidadBilletes.forEach(element => {
      totalDinero += element.denominacion * element.cantidad;
    })

    return {
      dineroRetirado,
      cantidadBilletes
    }

  }

}

let autenticado = false;

while (autenticado === false) {

  const user = prompt("Usuario");
  const password = prompt("Contraseña");
  let validacionUsuario = usuarios.findIndex((objeto, indice, persona) => {
    return objeto.nombre == user;
  });

  let validacionContraseña = usuarios.findIndex((objeto, indice, persona) => {
    return objeto.contraseña == password;
  });

  if (validacionUsuario === validacionContraseña) {
    ("Has ingresado");

    // Para validar si es usario tipo cliente o administrador
    if (usuarios[validacionContraseña].tipoUsuario == "administrador") {
      ingresarDinero(cantidadBilletes);

    } else if (usuarios[validacionContraseña].tipoUsuario == "cliente") {
      const retiro = parseInt(prompt("Bienvenido, ¿cuanto dinero desea retirar?"));
      retirarDinero(retiro, cantidadBilletes);
    }

  } else {
    alert("Usuario o contraseña incorrecta, intentalo nuevamente");
  }

}


