import React, { Component } from "react";
import * as d3 from "d3";

import MapaVector from "./MapaVector";
import ListadoVariables from "./ListadoVariables";
import DatosWindow from "./DatosWindow";
import Footer from "./Footer";
import coordenadasDepartamentos from "./tools/coordenadasDepartamentos";
import { moveRect, getDepNombrePos } from "./tools/moveRect";
import {
  organizarPorDepartamentos,
  colorearMapa,
  colorearMapaResponsable,
  limpiarMapa
} from "./tools/dataTools";

class MapContainer extends Component {
  constructor() {
    super();

    this.setResponsable = this.setResponsable.bind(this);
    this.setYear = this.setYear.bind(this);

    this.state = {
      loading: false,
      data: null,
      data_cronologico: null,
      departamento: null,
      responsable: null,
      cronologico: false,
      year: null
    };
  }

  componentDidMount() {
    const svg = d3.select("#svgMap");
    const titulo = svg
      .append("text")
      .attr("class", "nombre_departamento")
      .attr("text-anchor", "middle")
      .attr("font-size", "14px");

    // document
    //   .getElementsByClassName("mapContainer")[0]
    //   .addEventListener("mousemove", e => {
    //     tooltip.style.top = e.clientY - 50 + "px";
    //     tooltip.style.left = e.clientX + "px";
    //   });

    const departamentos = document.getElementById("Departa").childNodes;
    for (let i = 0; i < departamentos.length; i++) {
      departamentos[i].addEventListener("mouseenter", () => {
        moveRect(coordenadasDepartamentos[i][0]);
        const pos = getDepNombrePos(coordenadasDepartamentos[i][0]);
        if (coordenadasDepartamentos[i]) {
          titulo
            .text(coordenadasDepartamentos[i][0])
            .attr("x", pos.x)
            .attr("y", pos.y);
        }
      });

      departamentos[i].addEventListener("mouseleave", () => {
        document.getElementsByClassName("squarePos")[0].style.opacity = 0;
        titulo
          .text("")
          .attr("x", -100)
          .attr("y", -100);
      });
    }

    const listadoVariables = document.getElementsByClassName(
      "itemListadoVariable"
    );
    for (let i = 0; i < listadoVariables.length; i++) {
      listadoVariables[i].addEventListener("click", () => {
        const archivo = listadoVariables[i].getAttribute("data-archivo");
        if (archivo) {
          const url_casos =
            process.env.PUBLIC_URL + "/csv/casos-" + archivo + ".csv";
          const url_casos_json =
            process.env.PUBLIC_URL + "/json/casos-" + archivo + ".json";
          const url_victimas =
            process.env.PUBLIC_URL + "/csv/victimas-" + archivo + ".csv";

          this.setState({
            loading: true
          });
          d3.json(url_casos_json, (error, data_casos) => {
            // d3.csv(url_casos, (error, data_casos) => {
            // d3.csv(url_victimas, (error, data_victimas) => {
            // const dataset = organizarPorDepartamentos(data_casos);
            const dataset = data_casos;
            this.setState({
              data: dataset,
              loading: false,
              data_cronologico: null,
              departamento: null,
              responsable: null,
              cronologico: false,
              year: null
            });

            // console.log(data_casos);

            // console.log(JSON.stringify(dataset));

            // });
          });
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.year);
    // console.log(this.state.year);
    if (
      this.state.departamento === null &&
      this.state.responsable === null &&
      this.state.data &&
      this.state.year === null
    ) {
      colorearMapa(this.state.data, 50);
    } else if (
      this.state.departamento === null &&
      this.state.responsable !== null &&
      this.state.data
    ) {
      colorearMapaResponsable(this.state.data, this.state.responsable);
    }

    if (this.state.year && this.state.responsable === null) {
      colorearMapa(this.state.year, 50);
    } else if (this.state.responsable !== null && this.state.year) {
      limpiarMapa();
    }
  }

  setResponsable(string) {
    if (string !== "*") {
      this.setState({
        responsable: string
      });
    } else {
      this.setState({
        responsable: null
      });
    }
  }

  setYear(year) {
    if (year) {
      this.setState({
        year: year
      });
    } else {
      this.setState({
        year: null
      });
    }
  }

  render() {
    let win = null;
    if (this.state.data) {
      win = (
        <DatosWindow
          setResponsable={this.setResponsable}
          setYear={this.setYear}
          data={this.state.data}
          departamento={this.state.departamento}
          responsable={this.state.responsable}
          cronologico={this.state.cronologico}
        />
      );
    }
    return (
      <>
        <div className="mapContainer">
          <svg id="svgMap" height="620" width="450" viewBox="0 0 450 620">
            <MapaVector />
            <rect className="squarePos" x="0" y="0" width="0" height="0" />
          </svg>

          <ListadoVariables />
          {win}
        </div>
        <Footer />
      </>
    );
  }
}
export default MapContainer;
