import BotaoOperacao from "./BotaoOperacao";
import Botao from "./Botao";
import "./style.css";
import { useReducer } from "react";

export const opcoes = {
  limpar: "limpar",
  calcular: "calcular",
  adicionarDigito: "adicionar-digito",
  escolherOperacao: "escolher-operacao",
  excluirDigito: "delete-digit",
};

function reducer(state, { type, payload }) {
  // eslint-disable-next-line
  switch (type) {
    case opcoes.adicionarDigito:
      if (state.overwrite) {
        return {
          ...state,
          operadorAtual: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "0" && state.operadorAtual === "0") {
        return state;
      }

      if (payload.digit === "." && state.operadorAtual.includes(".")) {
        return state;
      }

      return {
        ...state,
        operadorAtual: `${state.operadorAtual || ""}${payload.digit}`,
      };

    case opcoes.escolherOperacao:
      if (state.operadorAtual == null && state.operadorAnterior == null) {
        return state;
      }

      if (state.operadorAtual == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.operadorAnterior == null) {
        return {
          ...state,
          operation: payload.operation,
          operadorAnterior: state.operadorAtual,
          operadorAtual: null,
        };
      }

      return {
        ...state,
        operadorAnterior: calcular(state),
        operation: payload.operation,
        operadorAtual: null,
      };


    case opcoes.limpar:
      return {};

    case opcoes.excluirDigito:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          operadorAtual: null,
        };
      }
      if (state.operadorAtual == null) return state;
      if (state.operadorAtual.length === 1) {
        return { ...state, operadorAtual: null };
      }

      return {
        ...state,
        operadorAtual: state.operadorAtual.slice(0, -1),
      };

    case opcoes.calcular:
      if (
        state.operation == null ||
        state.operadorAtual == null ||
        state.operadorAnterior == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        operadorAnterior: null,
        operation: null,
        operadorAtual: calcular(state),
      };
  }
}

function calcular({ operadorAtual, operadorAnterior, operation }) {
  const prev = parseFloat(operadorAnterior);
  const current = parseFloat(operadorAtual);
  if (isNaN(prev) || isNaN(current)) return "";
  let execucaoCalculo = "";
  // eslint-disable-next-line
  switch (operation) {
    case "+":
      execucaoCalculo = prev + current;
      break;
    case "-":
      execucaoCalculo = prev - current;
      break;
    case "*":
      execucaoCalculo = prev * current;
      break;
    case "÷":
      execucaoCalculo = prev / current;
      break;
  }

  return execucaoCalculo.toString();
}

const numeroInteiro = new Intl.NumberFormat("en-us", {
  maximo: 0,
});
function incluirOperando(operando) {
  if (operando == null) return;
  const [inteiro, decimal] = operando.split(".");
  if (decimal == null) return numeroInteiro.format(inteiro);
  return `${numeroInteiro.format(inteiro)}.${decimal}`;
}

function App() {
  const [{ operadorAtual, operadorAnterior, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="GRID">
      <h1>CALCULADORA</h1>
      <div className="resultado">
        <div className="operador-anterior">
          {incluirOperando(operadorAnterior)} {operation}
        </div>
        <div className="operador-atual">{incluirOperando(operadorAtual)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: opcoes.limpar })}
      >
        AC
      </button>

      <button onClick={() => dispatch({ type: opcoes.excluirDigito })}>
        DEL
      </button>

      <BotaoOperacao operation="÷" dispatch={dispatch} />
      <Botao digit="1" dispatch={dispatch} />
      <Botao digit="2" dispatch={dispatch} />
      <Botao digit="3" dispatch={dispatch} />
      <BotaoOperacao operation="*" dispatch={dispatch} />
      <Botao digit="4" dispatch={dispatch} />
      <Botao digit="5" dispatch={dispatch} />
      <Botao digit="6" dispatch={dispatch} />
      <BotaoOperacao operation="+" dispatch={dispatch} />
      <Botao digit="7" dispatch={dispatch} />
      <Botao digit="8" dispatch={dispatch} />
      <Botao digit="9" dispatch={dispatch} />
      <BotaoOperacao operation="-" dispatch={dispatch} />
      <Botao digit="." dispatch={dispatch} />
      <Botao digit="0" dispatch={dispatch} />


      <button
        className="span-two"
        onClick={() => dispatch({ type: opcoes.calcular })}
      >
        =
      </button>
    </div>
  );
}


export default App;