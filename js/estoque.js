function atualizarEstoque() {
  const tabela = document.getElementById("estoqueTable")

  const lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || []
  const estoque = {}

  lancamentos.forEach(item => {
    const { produto, tipo, quantidade } = item

    if (!estoque[produto]) {
      estoque[produto] = { entrada: 0, saida: 0 }
    }

    if (tipo.toLowerCase() === "entrada") {
      estoque[produto].entrada += Number(quantidade)
    } else if (tipo.toLowerCase() === "saída" || tipo.toLowerCase() === "saida") {
      estoque[produto].saida += Number(quantidade)
    }
  })

  // Limpa a tabela antes de adicionar novos dados
  while (tabela.rows.length > 1) {
    tabela.deleteRow(1)
  }

  Object.keys(estoque).forEach(produto => {
    const entrada = estoque[produto].entrada
    const saida = estoque[produto].saida
    const saldo = entrada - saida

    const situacao = saldo <= 5 ? "COMPRAR" : "OK"
    const cor = saldo <= 5 ? "red" : "green"

    const row = tabela.insertRow();
    row.insertCell().textContent = produto
    row.insertCell().textContent = entrada
    row.insertCell().textContent = saida
    row.insertCell().textContent = saldo
    row.insertCell().textContent = situacao

    // célula do alarme
    const alarmeCell = row.insertCell()
    const circle = document.createElement("span")
    circle.style.display = "inline-block"
    circle.style.width = "16px"
    circle.style.height = "16px"
    circle.style.borderRadius = "50%"
    circle.style.backgroundColor = cor
    alarmeCell.appendChild(circle)
  });
}


window.onload = atualizarEstoque