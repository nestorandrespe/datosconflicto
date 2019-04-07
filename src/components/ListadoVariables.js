import React, { Component } from "react";

class ListadoVariables extends Component {
  render() {
    return (
      <>
        <div className="window listadoVariables">
          <div className="top" />
          <div className="inside">
            <a className="itemListadoVariable" href="#" data-archivo="casos-vs">
              Víctimas violencia sexual
            </a>
            <a className="itemListadoVariable" href="#">
              Víctimas desaparición forzada
            </a>
            <a className="itemListadoVariable" href="#">
              Víctimas asesinatos selectivos
            </a>
            <a className="itemListadoVariable" href="#">
              Víctimas daño a bienes civiles
            </a>
            <a className="itemListadoVariable" href="#">
              Víctimas masacres
            </a>
            <a className="itemListadoVariable" href="#">
              Víctimas secuestro
            </a>
            <a className="itemListadoVariable" href="#">
              Casos ataques a poblaciones
            </a>
            <a className="itemListadoVariable" href="#">
              Casos acciones bélicas
            </a>
            <a className="itemListadoVariable" href="#">
              Casos atentados terroristas
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default ListadoVariables;
