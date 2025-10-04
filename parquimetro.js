const btnCalcular = document.getElementById("btnCalcular");
const btnReiniciar = document.getElementById("btnReiniciar");
const inputValor = document.getElementById("valorPago");
const tempoSpan = document.getElementById("tempo");
const trocoSpan = document.getElementById("troco");
const mensagem = document.getElementById("mensagem");

function parseValor(str) {
  if (!str) return NaN;
  return parseFloat(String(str).replace(",", "."));
}

function formatBR(num) {
  return num.toFixed(2).replace(".", ",");
}

// Tabela de preços por tempo (minutos x custo)
const TARIFAS = [
  { min: 120, custo: 3.00 },
  { min: 90,  custo: 2.75 }, // 60 + 30
  { min: 60,  custo: 1.75 },
  { min: 30,  custo: 1.00 },
  { min: 0,   custo: 0.00 }
];

btnCalcular.addEventListener("click", () => {
  const valor = parseValor(inputValor.value);

  if (!isFinite(valor) || valor <= 0) {
    mensagem.textContent = "⚠️ Informe um valor válido maior que 0.";
    tempoSpan.textContent = "0";
    trocoSpan.textContent = "0,00";
    return;
  }

  // Escolhe o MAIOR tempo possível cujo custo caiba no valor pago
  let minutos = 0;
  let custo = 0;

  for (const t of TARIFAS) {
    if (valor >= t.custo) {
      minutos = t.min;
      custo = t.custo;
      break;
    }
  }

  const troco = Math.max(0, +(valor - custo).toFixed(2));

  tempoSpan.textContent = String(minutos);
  trocoSpan.textContent = formatBR(troco);

  if (minutos === 0) {
    mensagem.textContent = "ℹ️ Valor insuficiente para 30 min (mínimo R$ 1,00).";
  } else {
    mensagem.textContent = `✅ Você comprou ${minutos} minutos de estacionamento.`;
  }
});

btnReiniciar.addEventListener("click", () => {
  inputValor.value = "";
  tempoSpan.textContent = "0";
  trocoSpan.textContent = "0,00";
  mensagem.textContent = "";
});
