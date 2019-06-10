import coordenadasDepartamentos from "./coordenadasDepartamentos";
import { mapa_coor } from "./variables";

export function moveRect(depName) {
  const coordinates = getCoordinates(depName);
  getSquareSize(coordinates);
}

function getSquareSize(coordinates) {
  const mapCoordinates = getStringCoordinate(mapa_coor);

  const marginLat = Math.abs(mapCoordinates.norte - mapCoordinates.sur);
  const marginLon = mapCoordinates.este - mapCoordinates.oeste;

  const marginBoxLat = Math.abs(coordinates.norte - coordinates.sur);
  const marginBoxLon = coordinates.este - coordinates.oeste;

  const mapW = 450;
  const mapH = 620;

  const boxW = (marginBoxLon / marginLon) * mapW;
  const boxH = (marginBoxLat / marginLat) * mapH;

  document.getElementsByClassName("squarePos")[0].style.width = boxW + "px";
  document.getElementsByClassName("squarePos")[0].style.height = boxH + "px";

  const boxX = (-(mapCoordinates.oeste - coordinates.oeste) / marginLon) * mapW;
  const boxY = ((mapCoordinates.norte - coordinates.norte) / marginLat) * mapH;

  document.getElementsByClassName("squarePos")[0].style.opacity = 1;
  document.getElementsByClassName("squarePos")[0].setAttribute("x", boxX);
  document
    .getElementsByClassName("squarePos")[0]
    .setAttribute("y", mapH + boxY - boxH + 4);
}

export function getDepNombrePos(depName) {
  const coordinates = getCoordinates(depName);
  const mapCoordinates = getStringCoordinate(mapa_coor);

  const marginLat = Math.abs(mapCoordinates.norte - mapCoordinates.sur);
  const marginLon = mapCoordinates.este - mapCoordinates.oeste;

  const marginBoxLat = Math.abs(coordinates.norte - coordinates.sur);
  const marginBoxLon = coordinates.este - coordinates.oeste;

  const mapW = 450;
  const mapH = 620;

  const boxW = (marginBoxLon / marginLon) * mapW;
  const boxH = (marginBoxLat / marginLat) * mapH;

  const boxX =
    boxW / 2 + (-(mapCoordinates.oeste - coordinates.oeste) / marginLon) * mapW;
  const boxY =
    mapH -
    boxH +
    ((mapCoordinates.norte - coordinates.norte) / marginLat) * mapH;

  const obj = {
    x: boxX,
    y: boxY
  };

  return obj;
}

export function getCoordinates(depName) {
  let response = {};
  for (let i = 0; i < coordenadasDepartamentos.length; i++) {
    if (depName === coordenadasDepartamentos[i][0]) {
      response = getStringCoordinate(coordenadasDepartamentos[i][1]);
      return response;
    }
  }
  return response;
}

export function getStringCoordinate(coorString) {
  const puntos = coorString.split(",");
  const response = {
    norte: puntos[2],
    sur: puntos[3],
    oeste: puntos[0],
    este: puntos[1]
  };

  return response;
}
