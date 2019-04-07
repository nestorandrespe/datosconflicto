import React, { Component } from "react";
import * as d3 from "d3";

import MapaVector from "./MapaVector";
import ListadoVariables from "./ListadoVariables";
import Footer from "./Footer";
import coordenadasDepartamentos from "./tools/coordenadasDepartamentos";
import { moveRect } from "./tools/moveRect";
import { organizarPorDepartamentos, colorearMapa } from "./tools/dataTools";

class MapContainer extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      data: null,
      data_cronologico: null,
      departamento: null,
      responsable: null,
      cronologico: false
    };
  }

  componentDidMount() {
    const tooltip = document.getElementsByClassName("tooltip")[0];

    document
      .getElementsByClassName("mapContainer")[0]
      .addEventListener("mousemove", e => {
        tooltip.style.top = e.clientY - 50 + "px";
        tooltip.style.left = e.clientX + "px";
      });

    const departamentos = document.getElementById("Departa").childNodes;
    for (let i = 0; i < departamentos.length; i++) {
      departamentos[i].addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
        moveRect(coordenadasDepartamentos[i][0]);
        if (coordenadasDepartamentos[i]) {
          tooltip.innerHTML = coordenadasDepartamentos[i][0];
        } else tooltip.innerHTML = i + 1;
      });

      departamentos[i].addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
        document.getElementsByClassName("squarePos")[0].style.opacity = 0;
      });
    }

    const listadoVariables = document.getElementsByClassName(
      "itemListadoVariable"
    );
    for (let i = 0; i < listadoVariables.length; i++) {
      listadoVariables[i].addEventListener("click", () => {
        const archivo = listadoVariables[i].getAttribute("data-archivo");
        if (archivo) {
          const url = process.env.PUBLIC_URL + "/csv/" + archivo + ".csv";
          d3.csv(url, (error, data) => {
            const dataset = organizarPorDepartamentos(data);
            this.setState({
              data: dataset
            });
          });
        }
      });
    }
  }

  componentDidUpdate() {
    if (
      !this.state.cronologico &&
      this.state.departamento === null &&
      this.state.responsable === null &&
      this.state.data
    ) {
      colorearMapa(this.state.data);
    }
  }

  render() {
    return (
      <>
        <div className="mapContainer">
          <svg id="svgMap" height="620" width="450" viewBox="0 0 450 620">
            <MapaVector />
            <rect className="squarePos" x="0" y="0" width="0" height="0" />
          </svg>

          <ListadoVariables />
        </div>
        <div className="tooltip" />
        <Footer />
      </>
    );
  }
}
export default MapContainer;
