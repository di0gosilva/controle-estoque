const form = document.getElementById("lancamentoForm")
const table = document.getElementById("lancamentoTable")
const table2 = document.getElementById("estoqueTable")

window.onload = function() {
  const lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || []
  lancamentos.forEach(addRowToTable)
}

form.addEventListener("submit", function(e) {
  e.preventDefault()

  const data = document.getElementById("data").value
  const tipo = document.getElementById("tipo").value
  const descricao = document.getElementById("descricao").value
  const produto = document.getElementById("produto").value
  const quantidade = document.getElementById("quantidade").value

  if (!data || !tipo || !descricao || !produto || !quantidade) {
    alert("Preencha todos os campos.")
    return
  }

  const lancamento = { data, tipo, descricao, produto, quantidade }

  const lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || []
  lancamentos.push(lancamento)
  localStorage.setItem("lancamentos", JSON.stringify(lancamentos))
  addRowToTable(lancamento)

  form.reset()
})

function addRowToTable(lancamento) {
  const newRow = table.insertRow()

  newRow.insertCell().textContent = lancamento.data
  newRow.insertCell().textContent = lancamento.tipo
  newRow.insertCell().textContent = lancamento.descricao
  newRow.insertCell().textContent = lancamento.produto
  newRow.insertCell().textContent = lancamento.quantidade
}
