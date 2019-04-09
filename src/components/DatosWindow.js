import React, { Component } from "react";
import * as d3 from "d3";

import { darNumeroMaximo } from "./tools/arrayTools";
import { buscarObjeto } from "./tools/dataTools";

import "jquery-ui/ui/widgets/draggable.js";
const $ = require("jquery");

class DatosWindow extends Component {
  constructor() {
    super();

    this.bindResponsables = this.bindResponsables.bind(this);

    this.state = {
      responsable: "*",
      years: null,
      rangeYear: 0,
      started: false
    };
  }
  componentWillUnmount() {
    $(".window.datos").draggable("destroy");
  }
  componentWillReceiveProps(props) {
    if (this.props.data !== props.data) {
      // this.state.years
      // console.log(this.state.data);
      this.setState({
        years: props.data.years.length,
        rangeYear: props.data.years.length,
        responsable: "*"
      });
      const array_years = props.data.years;
      const array_responsables = props.data.responsables;
      array_responsables.sort((a, b) => {
        return b.numero - a.numero;
      });
      const max_numero_years = darNumeroMaximo(array_years);
      const max_numero = darNumeroMaximo(array_responsables);
      let total = 0;
      this.svg
        .select(".all_years")
        .transition()
        .duration(200)
        .attr("points", () => {
          let response = "0,650 ";
          for (let i = 1; i < array_years.length; i++) {
            const num = parseInt(array_years[i].numero);
            const x = (i - 1) * (600 / (array_years.length - 1));
            const y = 650 - (num / max_numero_years) * 650;
            const string = x + "," + y + " ";
            response += string;

            if (i === array_years.length - 1)
              response += "600," + y + " 600,650";
          }
          return response;
        });

      this.svg.selectAll(".txt,.rect_responsable").remove();
      for (let i = 0; i < array_responsables.length; i++) {
        this.svg
          .append("text")
          .attr("x", 5)
          .attr("y", () => {
            return i * 25 + 15;
          })
          .attr("data-responsable", array_responsables[i].nombre)
          .attr("class", "txt btn")
          .attr("fill", "#FFFFFF")
          .attr("font-size", "14px")
          .text(
            array_responsables[i].nombre + " | " + array_responsables[i].numero
          );

        this.svg
          .append("rect")
          .attr("x", 5)
          .attr("class", "rect_responsable")
          .attr("y", () => {
            return i * 25 + 20;
          })
          .attr("fill", "#ffffff")
          .attr("width", () => {
            return (array_responsables[i].numero / max_numero) * 590;
          })
          .attr("height", 2);

        total += array_responsables[i].numero;
        if (i === array_responsables.length - 1) {
          this.svg
            .append("text")
            .attr("x", 5)
            .attr("class", "txt btn active")
            .attr("data-responsable", "*")
            .attr("y", () => {
              return (i + 1) * 25 + 15;
            })
            .attr("fill", "#FFFFFF")
            .attr("font-size", "12px")
            .text("TOTAL | " + total);
        }
        this.bindResponsables();
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const array_responsables = this.props.data.responsables;
    const array_years = this.props.data.years;

    const max_numero = darNumeroMaximo(array_responsables);
    const max_numero_years = darNumeroMaximo(array_years);

    const yearObj = array_years[this.state.rangeYear];
    if (yearObj) {
      var texto_responsables = this.svg.selectAll(".txt");
      var rec_responsables = this.svg.selectAll(".rect_responsable");
      let total = 0;

      this.svg
        .select(".line_year")
        .attr("x1", () => {
          return (this.state.rangeYear - 1) * (600 / (array_years.length - 1));
        })
        .attr("x2", () => {
          return (this.state.rangeYear - 1) * (600 / (array_years.length - 1));
        });

      this.svg
        .select(".year_text")
        .text(yearObj.nombre)
        .attr("x", () => {
          let resp =
            (this.state.rangeYear - 1) * (600 / (array_years.length - 1));
          if (resp < 30) resp = 30;
          else if (resp > 570) resp = 570;
          return resp;
        });

      texto_responsables
        .text((e, i) => {
          let nombre, numero;
          if (i < array_responsables.length) {
            const index = buscarObjeto(
              array_responsables[i].nombre,
              yearObj.responsables
            );
            if (index === -1) numero = 0;
            else numero = yearObj.responsables[index].numero;
            nombre = array_responsables[i].nombre + " | " + numero;
            total += numero;
          } else {
            nombre = "TOTAL | " + total;
          }
          return nombre;
        })
        .classed("year_view", true);

      rec_responsables
        .classed("year_view", true)
        .transition()
        .duration(100)
        .attr("width", (e, i) => {
          let nombre, numero;
          const index = buscarObjeto(
            array_responsables[i].nombre,
            yearObj.responsables
          );
          if (index === -1) numero = 0;
          else numero = yearObj.responsables[index].numero;
          return (numero / max_numero) * 590;
        });
    } else {
      let total = 0;
      this.svg
        .select(".line_year")
        .attr("x1", -10)
        .attr("x2", -10);

      this.svg
        .select(".year_text")
        .text("acumulado")
        .attr("x", 550);

      this.svg
        .selectAll(".txt")
        .text((e, i) => {
          let nombre, numero;
          if (i < array_responsables.length) {
            nombre =
              array_responsables[i].nombre +
              " | " +
              array_responsables[i].numero;
            total += array_responsables[i].numero;
          } else {
            nombre = "TOTAL | " + total;
          }
          return nombre;
        })
        .classed("year_view", false);

      this.svg
        .selectAll(".rect_responsable")
        .classed("year_view", false)
        .transition()
        .duration(100)
        .attr("width", (e, i) => {
          return (array_responsables[i].numero / max_numero) * 590;
        });
    }

    if (this.state.responsable !== "*") {
      this.svg
        .select(".responsable_years")
        .transition()
        .duration(200)
        .attr("points", () => {
          let response = "0,650 ";
          for (let i = 1; i < array_years.length; i++) {
            const index_responsable_year = buscarObjeto(
              this.state.responsable,
              array_years[i].responsables
            );
            const num = 0;
            if (index_responsable_year > -1) {
              num = parseInt(
                array_years[i].responsables[index_responsable_year].numero
              );
            }

            const x = (i - 1) * (600 / (array_years.length - 1));
            const y = 650 - (num / max_numero_years) * 650;
            const string = parseInt(x) + "," + y + " ";
            response += string;

            if (i === array_years.length - 1)
              response += "600," + y + " 600,650";
          }
          return response;
        });
    } else {
      this.svg
        .select(".responsable_years")
        .transition()
        .duration(200)
        .attr("points", () => {
          let response = "0,650 ";
          for (let i = 1; i < array_years.length; i++) {
            const num = parseInt(array_years[i].numero);
            const x = (i - 1) * (600 / (array_years.length - 1));
            const y = 650 - (num / max_numero_years) * 650;
            const string = x + "," + y + " ";
            response += string;

            if (i === array_years.length - 1)
              response += "600," + y + " 600,650";
          }
          return response;
        });
    }
  }
  componentDidMount() {
    this.setState({
      years: this.props.data.years.length,
      rangeYear: this.props.data.years.length
    });

    this.svg = d3.select("#d3_canvas");

    const array_responsables = this.props.data.responsables;
    const array_years = this.props.data.years;

    const max_numero = darNumeroMaximo(array_responsables);
    const max_numero_years = darNumeroMaximo(array_years);

    const yearObj = array_years[this.state.rangeYear];

    this.svg.selectAll("*").remove();

    array_responsables.sort((a, b) => {
      return b.numero - a.numero;
    });

    let total = 0;

    this.svg
      .append("polygon")
      .attr("points", () => {
        let response = "0,650 ";
        for (let i = 1; i < array_years.length; i++) {
          const num = parseInt(array_years[i].numero);
          const x = (i - 1) * (600 / (array_years.length - 1));
          const y = 650 - (num / max_numero_years) * 650;
          const string = x + "," + y + " ";
          response += string;

          if (i === array_years.length - 1) response += "600," + y + " 600,650";
        }
        return response;
      })
      .attr("class", "all_years");

    this.svg
      .append("polygon")
      .attr("points", () => {
        let response = "0,650 ";
        for (let i = 1; i < array_years.length; i++) {
          const num = parseInt(array_years[i].numero);
          const x = (i - 1) * (600 / (array_years.length - 1));
          const y = 650 - (num / max_numero_years) * 650;
          const string = x + "," + y + " ";
          response += string;

          if (i === array_years.length - 1) response += "600," + y + " 600,650";
        }
        return response;
      })
      .attr("class", "responsable_years");

    this.svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 650)
      .attr("class", "line_year");

    this.svg
      .append("text")
      .attr("class", "year_text")
      .attr("y", 670)
      .attr("x", 550)
      .attr("font-size", "15px")
      .attr("text-anchor", "middle")
      .text("acumulado");

    for (let i = 0; i < array_responsables.length; i++) {
      this.svg
        .append("text")
        .attr("x", 5)
        .attr("y", () => {
          return i * 25 + 15;
        })
        .attr("data-responsable", array_responsables[i].nombre)
        .attr("class", "txt btn")
        .attr("fill", "#FFFFFF")
        .attr("font-size", "14px")
        .text(
          array_responsables[i].nombre + " | " + array_responsables[i].numero
        );

      this.svg
        .append("rect")
        .attr("x", 5)
        .attr("class", "rect_responsable")
        .attr("y", () => {
          return i * 25 + 20;
        })
        .attr("fill", "#ffffff")
        .attr("width", () => {
          return (array_responsables[i].numero / max_numero) * 590;
        })
        .attr("height", 2);

      total += array_responsables[i].numero;
      if (i === array_responsables.length - 1) {
        this.svg
          .append("text")
          .attr("x", 5)
          .attr("class", "txt btn active")
          .attr("data-responsable", "*")
          .attr("y", () => {
            return (i + 1) * 25 + 15;
          })
          .attr("fill", "#FFFFFF")
          .attr("font-size", "12px")
          .text("TOTAL | " + total);
      }
    }

    this.bindResponsables();

    $(".window.datos").draggable({
      scroll: false,
      handle: ".top"
    });
  }

  bindResponsables() {
    const listadoItems = document.getElementsByClassName("btn");
    for (let i = 0; i < listadoItems.length; i++) {
      listadoItems[i].addEventListener("click", () => {
        document.querySelectorAll(".btn.active")[0].classList.remove("active");
        listadoItems[i].classList.add("active");

        this.props.setResponsable(
          listadoItems[i].getAttribute("data-responsable")
        );

        this.setState({
          responsable: listadoItems[i].getAttribute("data-responsable")
        });
      });
    }
  }
  render() {
    return (
      <>
        <div className="window datos">
          <div className="top" />
          <div className="menu">
            <div className="item active">Responsable</div>
          </div>
          <div className="inside">
            <svg
              id="d3_canvas"
              width="600"
              height="650"
              viewBox="0 0 600 650"
            />
          </div>
          <div className="sliderBox">
            <div className="notice">
              <div className="year" />
            </div>
            <input
              type="range"
              min="1"
              max={this.state.years}
              value={this.state.rangeYear}
              className="slider"
              onChange={e => {
                this.setState({ rangeYear: e.target.value });
                this.props.setYear(this.props.data.years[e.target.value]);
              }}
              id="myRange"
            />
          </div>
        </div>
      </>
    );
  }
}

export default DatosWindow;
