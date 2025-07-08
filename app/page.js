"use client";

import { useState } from 'react';

const perguntas = [
  "Sinto-me frequentemente isolado(a) ou desconectado(a) das pessoas ao meu redor, mesmo em companhia.",
  "Tenho dificuldade em criar ou manter relacionamentos próximos e significativos.",
  "Experimento uma sensação constante de vazio emocional ou abandono, independentemente de quem esteja comigo.",
  "Sinto que não tenho ninguém com quem compartilhar meus pensamentos, sentimentos ou preocupações mais profundas.",
  "Minha autoestima e autoconfiança são afetadas pela sensação persistente de solidão.",
  "Recentemente, tenho pensado seriamente que minha vida não vale a pena ou que ninguém se importaria se algo ruim acontecesse comigo.", // FLAG
  "Costumo evitar situações sociais ou oportunidades de interação por medo de rejeição ou inadequação.",
  "Tenho dificuldades significativas em me abrir emocionalmente e confiar em outras pessoas.",
  "Tenho buscado formas inadequadas ou prejudiciais de lidar com minha solidão, como uso excessivo de álcool, drogas, ou isolamento extremo.",
  "Minha saúde emocional, física ou mental tem piorado devido aos sentimentos frequentes de solidão."
];

export default function TesteSolidao() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("VERMELHO");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("VERDE");
      else if (soma <= 35) setResultado("AMARELO");
      else setResultado("VERMELHO");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md text-gray-900 dark:text-gray-100">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Teste de Solidão</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Pergunta {indiceAtual + 1} de {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Resultado: {resultado}</h2>
          {resultado === "VERDE" && <p>Você lida muito bem com esse tema e está emocionalmente bem resolvido. Poderá auxiliar grandemente outras pessoas que precisam de ajuda.</p>}
          {resultado === "AMARELO" && <p>Há sinais evidentes de dificuldades emocionais que precisam ser trabalhadas e que, com determinação e ajuda, poderão ser superadas.</p>}
          {resultado === "VERMELHO" && <p>Seus problemas emocionais com este tema precisam necessariamente de ajuda profissional. Procure com brevidade a ajuda de um médico ou psicólogo.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            Refazer teste
          </button>
        </>
      )}
    </div>
  );
}
