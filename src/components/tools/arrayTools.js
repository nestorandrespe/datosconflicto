export function darNumeroMaximo(array) {
  let response = 0;
  for (let i = 0; i < array.length; i++) {
    const num = array[i].numero;
    if (num > response) response = num;
  }

  return response;
}
