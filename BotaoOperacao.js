import { opcoes } from "./App"

export default function BotaoOperacao({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: opcoes.escolherOperacao, payload: { operation } })
      }
    >
      {operation}
    </button>
  )
}