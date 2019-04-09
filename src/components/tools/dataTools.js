import coordenadasDepartamentos from "./coordenadasDepartamentos";

export function organizarPorDepartamentos(data) {
  // Arreglo para los departamentos dentro del dataset
  var depArray = [];
  // Arreglo para cada uno de los responsables dentro del dataset
  var responsableArray = [];
  // Arreglo para cada uno de los años dentro del dataset
  var yearArray = [];
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
    // Año
    const year = data[i].ano;
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
        nombre: dept,
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

    // Si el año aún no esta en el arreglo de años
    if (buscarObjeto(year, yearArray) === -1) {
      let newDepArray = [];
      for (let i = 0; i < depArray.length; i++) {
        const obj = {
          nombre: depArray[i],
          numero: 0
        };
        newDepArray = [...newDepArray, obj];
      }
      var obj = {
        nombre: year,
        departamentos: newDepArray,
        responsables: [],
        numero: num,
        maximo_departamento: 0,
        minimo_departamento: 0,
        maximo_responsable_departamento: 0,
        minimo_responsable_departamento: 0
      };

      yearArray = [...yearArray, obj];
    } else {
      const year_index = buscarObjeto(year, yearArray);
      yearArray[year_index].numero += num;

      if (
        buscarObjeto(responsable, yearArray[year_index].responsables) === -1
      ) {
        var obj_resp = {
          nombre: responsable,
          numero: num
        };

        yearArray[year_index].responsables = [
          ...yearArray[year_index].responsables,
          obj_resp
        ];
      } else {
        const resp_index = buscarObjeto(
          responsable,
          yearArray[year_index].responsables
        );
        yearArray[year_index].responsables[resp_index].numero += num;
      }

      if (buscarObjeto(dept, yearArray[year_index].departamentos) === -1) {
        var obj_resp = {
          nombre: dept,
          numero: num
        };

        yearArray[year_index].departamentos = [
          ...yearArray[year_index].departamentos,
          obj_resp
        ];
      } else {
        const resp_index = buscarObjeto(
          dept,
          yearArray[year_index].departamentos
        );
        yearArray[year_index].departamentos[resp_index].numero += num;
      }
    }

    // Si el responsable aún no esta en el arreglo de responsables
    if (buscarObjeto(responsable, responsableArray) === -1) {
      var obj = {
        nombre: responsable,
        numero: 0
      };
      responsableArray = [...responsableArray, obj];
    }
  }

  // Ordena los años
  yearArray.sort((a, b) => {
    return a.nombre - b.nombre;
  });

  // Busca el máximo y el mínimo del arreglo de los años
  for (let i = 0; i < yearArray.length; i++) {
    for (let t = 0; t < yearArray[i].departamentos.length; t++) {
      const num = yearArray[i].departamentos[t].numero;
      if (num > num_max) num_max = num;
      if (num < num_min) num_min = num;
    }
    yearArray[i].maximo_departamento = num_max;
    yearArray[i].minimo_departamento = num_min;
  }

  num_max = 0;
  num_min = 0;

  // Busca el máximo y el mínimo
  for (let i = 0; i < response.length; i++) {
    const num = response[i].numero;
    if (num > num_max) num_max = num;
    if (num < num_min) num_min = num;

    for (let t = 0; t < response[i].responsables.length; t++) {
      const num = response[i].responsables[t].numero;
      if (num > num_max_respnsable) num_max_respnsable = num;
      if (num < num_min_responsable) num_min_responsable = num;

      const indexResponsable = buscarObjeto(
        response[i].responsables[t].nombre,
        responsableArray
      );
      responsableArray[indexResponsable].numero += num;
    }
  }

  // return
  const obj_return = {
    departamentos: response,
    responsables: responsableArray,
    minimo_departamento: num_min,
    maximo_departamento: num_max,
    minimo_responsable_departamento: num_min_responsable,
    maximo_responsable_departamento: num_max_respnsable,
    years: yearArray
  };
  return obj_return;
}

export function colorearMapa(data, col) {
  const departamentos = document.getElementById("Departa").childNodes;
  const sat = 30;
  const hue = col;
  const lumMin = 75;
  for (let i = 0; i < departamentos.length; i++) {
    departamentos[i].style.fill = "hsl(" + hue + "," + sat + "%," + 100 + "%)";
  }
  const num_max = data.maximo_departamento;
  const num_min = data.minimo_departamento;
  for (let i = 0; i < data.departamentos.length; i++) {
    const num = getDepIndex(data.departamentos[i].nombre);
    if (num > -1) {
      const margen = num_max - num_min;
      const lum = (data.departamentos[i].numero / margen) * lumMin;
      departamentos[num].style.fill =
        "hsl(" + hue + "," + sat + "%," + (100 - lum) + "%)";
    }
  }
}

export function limpiarMapa() {
  const departamentos = document.getElementById("Departa").childNodes;

  for (let i = 0; i < departamentos.length; i++) {
    departamentos[i].style.fill = "";
  }
}

export function colorearMapaResponsable(data, responsable) {
  const departamentos = document.getElementById("Departa").childNodes;
  const num_max = data.maximo_responsable_departamento;
  const num_min = data.minimo_responsable_departamento;
  for (let i = 0; i < data.departamentos.length; i++) {
    const num = data.departamentos[i].indexMapa;
    if (num > -1) {
      const sat = 30;
      const hue = 50;
      const lumMin = 75;
      const margen = num_max - num_min;
      const responsable_index = buscarObjeto(
        responsable,
        data.departamentos[i].responsables
      );
      // console.log(responsable_index);
      if (responsable_index > -1) {
        const lum =
          (data.departamentos[i].responsables[responsable_index].numero /
            margen) *
          lumMin;
        departamentos[data.departamentos[i].indexMapa].style.fill =
          "hsl(" + hue + "," + sat + "%," + (100 - lum) + "%)";
      } else {
        const lum = (data.departamentos[i].numero / margen) * lumMin;
        departamentos[data.departamentos[i].indexMapa].style.fill =
          "hsl(" + hue + "," + sat + "%," + 100 + "%)";
      }
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
export function buscarObjeto(nombre, arreglo) {
  for (let i = 0; i < arreglo.length; i++) {
    if (nombre === arreglo[i].nombre) return i;
  }
  return -1;
}
