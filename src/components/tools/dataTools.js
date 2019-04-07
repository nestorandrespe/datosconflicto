import coordenadasDepartamentos from "./coordenadasDepartamentos";

export function organizarPorDepartamentos(data) {
  // Arreglo para los departamentos dentro del dataset
  var depArray = [];
  // Arreglo para cada uno de los departamentos
  var response = [];
  // Inicio variable minima
  let num_min = 100000;
  // Inicio variable máxima
  let num_max = 0;
  // Mínimo num responsable
  let num_min_responsable = 100000;
  // Máximo num responsable
  let num_max_respnsable = 0;

  // Loop dentro del dataset y organiza los datos
  for (let i = 0; i < data.length; i++) {
    // Nombre del departamento
    const dept = data[i].dept;
    // Numero de casos dentro de esta entrada
    const num = parseInt(data[i].num);
    // Presunto responsable
    const responsable = data[i].presuntoRes;
    // Indice del elemento dentro del arreglo dept, creado arriba
    let index = -1;

    // Si el departamento aún no esta en el arreglo
    if (depArray.indexOf(dept) === -1) {
      // Agregar el departamento al arreglo
      depArray = [...depArray, dept];
      // El indice del elemento es el último elemento del arreglo
      index = depArray.length - 1;
      // Indice de este departamento dentro del arreglo general que corresponde a los paths en el mapa
      const indexMapa = getDepIndex(dept);

      // Nuevo objeto para el responsable
      const responsable_obj = {
        nombre: responsable,
        numero: num
      };
      // Nuevo objeto con la informaçión del departamento
      const obj = {
        departamento: dept,
        numero: num,
        indexMapa: indexMapa,
        responsables: [responsable_obj]
      };

      // Añadir el objeto a la respuesta
      response = [...response, obj];
    } else {
      // El departamento ya existe en el arreglo
      index = depArray.indexOf(dept);

      // Se suma al numero total del departamento
      response[index].numero = response[index].numero + num;

      // Busca el responsable dentro del arreglo por departamento
      // si lo encuentra devuelve el indice si no devuelve -1
      const index_responsable = buscarObjeto(
        responsable,
        response[index].responsables
      );

      if (index_responsable > -1) {
        // Si existe
        response[index].responsables[index_responsable].numero =
          response[index].responsables[index_responsable].numero + num;
      } else {
        // No existe
        // Se crea el nuevo objeto
        const responsable_obj = {
          nombre: responsable,
          numero: num
        };

        response[index].responsables = [
          ...response[index].responsables,
          responsable_obj
        ];
      }
    }
  }

  // Busca el máximo y el mínimo
  for (let i = 0; i < response.length; i++) {
    const num = response[i].numero;
    if (num > num_max) num_max = num;
    if (num < num_min) num_min = num;
  }

  // return
  const obj_return = {
    departamentos: response,
    minimo: num_min,
    maximo: num_max
  };

  return obj_return;
}

export function colorearMapa(data) {
  const departamentos = document.getElementById("Departa").childNodes;
  const num_max = data.maximo;
  const num_min = data.minimo;
  for (let i = 0; i < data.departamentos.length; i++) {
    const num = data.departamentos[i].indexMapa;
    if (num > -1) {
      const sat = 30;
      const hue = 0;
      const lumMin = 75;
      const margen = num_max - num_min;
      const lum = (data.departamentos[i].numero / margen) * lumMin;
      departamentos[data.departamentos[i].indexMapa].style.fill =
        "hsl(" + hue + "," + sat + "%," + (lumMin - lum + 10) + "%)";
    }
  }
}

// Devuelve el indice del departamento
function getDepIndex(name) {
  for (let i = 0; i < coordenadasDepartamentos.length; i++) {
    if (name === coordenadasDepartamentos[i][0]) return i;
  }
  return -1;
}

// Devuelve el indice del objeto dado el nombre y el arreglo
function buscarObjeto(nombre, arreglo) {
  for (let i = 0; i < arreglo.length; i++) {
    if (nombre === arreglo[i].nombre) return i;
  }
  return -1;
}
