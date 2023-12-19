import { createGlobalStyle } from "styled-components";

export const cores = {
  azulEscuro: "#00629B",
  background: "#EFEFEF",
  preto: "#000",
  laranja: "#FF8200",
  branco: "#FAFAFA",
  azulClaro: "#EDF8FC",
};

const GlobalCss = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Roboto , sans-serif;
  list-style: none;
  text-decoration: none;
}
body{
  background-color: ${cores.background}
}

.container{
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
}
`;
export default GlobalCss;
