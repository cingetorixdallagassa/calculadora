import { opcoes } from "./App";

export default function Botao({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: opcoes.adicionarDigito, payload: { digit } })}
    >
      {digit}
    </button>
  )
}
