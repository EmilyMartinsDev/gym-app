export function formatarData(data: string): string {
  const dataObj = new Date(data);

  const ano = dataObj.getFullYear();
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0"); // +1 porque janeiro é 0
  const dia = dataObj.getDate().toString().padStart(2, "0");

  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}
