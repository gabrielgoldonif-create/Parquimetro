const btnCalcular = document.getElementById("btnCalcular");
const btnReiniciar = document.getElementById("btnReiniciar");
const inputHoras = document.getElementById("horas");
const inputMinutos = document.getElementById("minutos");
const valorSpan = document.getElementById("valor");
const mensagem = document.getElementById("mensagem");

btnCalcular.addEventListener("click", () => {
  const horas = parseInt(inputHoras.value) || 0;
  const minutos = parseInt(inputMinutos.value) || 0;

  const totalMinutos = (horas * 60) + minutos;

  // Validações //
  if (totalMinutos <= 0) {
    mensagem.textContent = "⚠️ Informe um tempo válido (maior que 0).";
    valorSpan.textContent = "0,00";
    return;
  }

  if (totalMinutos > 120) {
    mensagem.textContent = "⚠️ O tempo máximo permitido é de 120 minutos.";
    valorSpan.textContent = "0,00";
    return;
  }

  // Cálculo //
  const valor = (totalMinutos / 30) * 1;

  valorSpan.textContent = valor.toFixed(2).replace(".", ",");
  mensagem.textContent = `✅ Você comprou ${totalMinutos} minutos de estacionamento.`;
});

btnReiniciar.addEventListener("click", () => {
  inputHoras.value = "";
  inputMinutos.value = "";
  valorSpan.textContent = "0,00";
  mensagem.textContent = "";
});
