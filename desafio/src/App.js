// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [indice, setIndice] = useState('');
  const [soma, setSoma] = useState(null);

  const [numeroFibonacci, setNumeroFibonacci] = useState('');
  const [resultadoFibonacci, setResultadoFibonacci] = useState(null);

  const [faturamentoDiario, setFaturamentoDiario] = useState('');
  const [analiseFaturamento, setAnaliseFaturamento] = useState(null);

  const [faturamentoEstados, setFaturamentoEstados] = useState(null);

  const [texto, setTexto] = useState('');
  const [textoInvertido, setTextoInvertido] = useState('');

  // Funções para os desafios
  const calcularSoma = () => {
    let k = 0;
    let soma = 0;
    while (k < parseInt(indice)) {
      k += 1;
      soma += k;
    }
    setSoma(soma);
  };

  const verificarFibonacci = (n) => {
    let a = 0, b = 1, c;
    if (n === a || n === b) return true;
    while (b <= n) {
      c = a + b;
      a = b;
      b = c;
      if (b === n) return true;
    }
    return false;
  };

  const calcularFibonacci = () => {
    const pertence = verificarFibonacci(parseInt(numeroFibonacci));
    setResultadoFibonacci(pertence ? `${numeroFibonacci} pertence à sequência de Fibonacci.` : `${numeroFibonacci} não pertence à sequência de Fibonacci.`);
  };

  const calcularFaturamento = () => {
    const dados = JSON.parse(faturamentoDiario);
    const diasComFaturamento = dados.filter(valor => valor > 0);
    const menorFaturamento = Math.min(...diasComFaturamento);
    const maiorFaturamento = Math.max(...diasComFaturamento);
    const mediaMensal = diasComFaturamento.reduce((a, b) => a + b, 0) / diasComFaturamento.length;
    const diasAcimaDaMedia = diasComFaturamento.filter(valor => valor > mediaMensal).length;

    setAnaliseFaturamento({
      menorFaturamento,
      maiorFaturamento,
      diasAcimaDaMedia
    });
  };

  const calcularPercentuais = () => {
    const dados = {
      SP: 67836.43,
      RJ: 36678.66,
      MG: 29229.88,
      ES: 27165.48,
      Outros: 19849.53
    };

    const totalFaturamento = Object.values(dados).reduce((a, b) => a + b, 0);

    const percentualPorEstado = Object.entries(dados).map(([estado, valor]) => ({
      estado,
      percentual: ((valor / totalFaturamento) * 100).toFixed(2) + '%'
    }));

    setFaturamentoEstados(percentualPorEstado);
  };

  const inverterString = (str) => {
    let invertida = '';
    for (let i = str.length - 1; i >= 0; i--) {
      invertida += str[i];
    }
    return invertida;
  };

  const inverterTexto = () => {
    setTextoInvertido(inverterString(texto));
  };

  return (
    <div className="App">
      <h1>Desafios de Programação</h1>

      {/* Desafio 1: Soma dos Números até um Índice */}
      <div>
        <h2>Desafio 1: Soma dos Números</h2>
        <input
          type="number"
          value={indice}
          onChange={(e) => setIndice(e.target.value)}
          placeholder="Digite o índice"
        />
        <button onClick={calcularSoma}>Calcular Soma</button>
        {soma !== null && <p>Soma: {soma}</p>}
      </div>

      {/* Desafio 2: Sequência de Fibonacci */}
      <div>
        <h2>Desafio 2: Sequência de Fibonacci</h2>
        <input
          type="number"
          value={numeroFibonacci}
          onChange={(e) => setNumeroFibonacci(e.target.value)}
          placeholder="Digite um número"
        />
        <button onClick={calcularFibonacci}>Verificar Fibonacci</button>
        {resultadoFibonacci && <p>{resultadoFibonacci}</p>}
      </div>

      {/* Desafio 3: Análise de Faturamento Diário */}
      <div>
        <h2>Desafio 3: Análise de Faturamento Diário</h2>
        <textarea
          value={faturamentoDiario}
          onChange={(e) => setFaturamentoDiario(e.target.value)}
          placeholder='Digite o faturamento diário (JSON array, ex: [67456.56, 32890.00, ...])'
        />
        <button onClick={calcularFaturamento}>Calcular Análise</button>
        {analiseFaturamento && (
          <div>
            <p>Menor valor de faturamento: R$ {analiseFaturamento.menorFaturamento.toFixed(2)}</p>
            <p>Maior valor de faturamento: R$ {analiseFaturamento.maiorFaturamento.toFixed(2)}</p>
            <p>Número de dias acima da média: {analiseFaturamento.diasAcimaDaMedia}</p>
          </div>
        )}
      </div>

      {/* Desafio 4: Percentual de Representação dos Estados */}
      <div>
        <h2>Desafio 4: Percentual por Estado</h2>
        <button onClick={calcularPercentuais}>Calcular Percentuais</button>
        {faturamentoEstados && (
          <div>
            {faturamentoEstados.map(({ estado, percentual }) => (
              <p key={estado}>Percentual de {estado}: {percentual}</p>
            ))}
          </div>
        )}
      </div>

      {/* Desafio 5: Inversão de String */}
      <div>
        <h2>Desafio 5: Inversão de String</h2>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite um texto"
        />
        <button onClick={inverterTexto}>Inverter Texto</button>
        {textoInvertido && <p>Texto Invertido: {textoInvertido}</p>}
      </div>
    </div>
  );
}

export default App;