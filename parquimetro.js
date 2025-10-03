const btnCalcular = document.getElementById("btnCalcular");
const btnReiniciar = document.getElementById("btnReiniciar");
const inputValor = document.getElementById("valorPago");
const tempoSpan = document.getElementById("tempo");
const trocoSpan = document.getElementById("troco");
const mensagem = document.getElementById("mensagem");

btnCalcular.addEventListener("click", () => {
  const valor = parseFloat(inputValor.value);

  if (isNaN(valor) || valor <= 0) {
    mensagem.textContent = "⚠️ Informe um valor válido maior que 0.";
    tempoSpan.textContent = "0";
    trocoSpan.textContent = "0,00";
    return;
  }

  // Regra: 30 minutos = R$1, máximo 120 min
  let blocosComprados = Math.floor(valor / 1); // cada R$1 = 30 min
  let minutos = blocosComprados * 30;

  if (minutos > 120) {
    minutos = 120;
  }

  const custo = (minutos / 30) * 1;
  const troco = Math.max(0, valor - custo);

  tempoSpan.textContent = minutos;
  trocoSpan.textContent = troco.toFixed(2).replace(".", ",");
  mensagem.textContent = `✅ Você comprou ${minutos} minutos de estacionamento.`;
});

btnReiniciar.addEventListener("click", () => {
  inputValor.value = "";
  tempoSpan.textContent = "0";
  trocoSpan.textContent = "0,00";
  mensagem.textContent = "";
});
