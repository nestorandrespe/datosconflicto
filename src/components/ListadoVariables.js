import React, { Component } from "react";

import "jquery-ui/ui/widgets/draggable.js";
const $ = require("jquery");

class ListadoVariables extends Component {
  constructor() {
    super();

    this.state = {
      active: null
    };
  }
  componentWillUnmount() {
    $(".window.listadoVariables").draggable("destroy");
  }
  componentDidMount() {
    const listadoVariables = document.getElementsByClassName(
      "itemListadoVariable"
    );
    for (let i = 0; i < listadoVariables.length; i++) {
      listadoVariables[i].addEventListener("click", () => {
        this.setState({
          active: i + 1
        });
      });
    }

    $(".window.listadoVariables").draggable({
      scroll: false,
      handle: ".top"
    });
  }
  render() {
    return (
      <>
        <div className="window listadoVariables">
          <div className="top" />
          <div className="inside">
            <a
              className={
                this.state.active === 1
                  ? "itemListadoVariable active"
                  : "itemListadoVariable"
              }
              href="#"
              data-archivo="vs"
            >
              Violencia sexual
            </a>
            <a
              className={
                this.state.active === 2
                  ? "itemListadoVariable active"
                  : "itemListadoVariable"
              }
              href="#"
              data-archivo="df"
            >
              Desaparición forzada
            </a>
            <a
              className={
                this.state.active === 3
                  ? "itemListadoVariable active"
                  : "itemListadoVariable"
              }
              href="#"
              data-archivo="as"
            >
              Asesinatos selectivos
            </a>
            <a
              className={
                this.state.active === 4
                  ? "itemListadoVariable active"
                  : "itemListadoVariable"
              }
              href="#"
              data-archivo="bp"
            >
              Daño a bienes civiles
            </a>
            <a
              className={
                this.state.active === 5
                  ? "itemListadoVariable active"
                  : "itemListadoVariable"
              }
              href="#"
              data-archivo="ma"
            >
              Masacres
            </a>
            <a
              className={
                this.state.active === 6
                  ? "itemListadoVariable active"
                  : "itemListadoVariable"
              }
              href="#"
              data-archivo="se"
            >
              Secuestro
            </a>
            <a
              className={
                this.state.active === 7
                  ? "itemListadoVariable active"
                  : "itemListadoVariable"
              }
              href="#"
              data-archivo="ap"
            >
              Ataques a poblaciones
            </a>
            <a
              className={
                this.state.active === 9
                  ? "itemListadoVariable active"
                  : "itemListadoVariable"
              }
              href="#"
              data-archivo="at"
            >
              Atentados terroristas
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default ListadoVariables;
