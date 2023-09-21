/*
  -> Função para obter a lista de vinhos na adega (via requisição GET)
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/vinhos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.vinhos.forEach(item => insertList(item.vinho, item.uva, item.ano, item.categoria, item.fabricante));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -> Função para carregamento inicial da lista
*/
  getList()

/*
  -> Função para adicionar um vinho na lista (via requisição POST)
*/
const postItem = async (inputVinho, inputUva, inputAno,inputCategoria, inputFabricante) => {
  const formData = new FormData();
  formData.append('vinho', inputVinho);
  formData.append('uva', inputUva);
  formData.append('ano', inputAno);
  formData.append('categoria', inputCategoria);
  formData.append('fabricante', inputFabricante);

  let url = 'http://127.0.0.1:5000/vinho';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -> Função para criar um botão close para cada vinho da adega
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  -> Função para remover um vinho da adega (click no botão close)
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Esta certo disso?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Pronto, vinho removido (espero que tenha bebido)!")
      }
    }
  }
}

/*
  -> Função para remover um vinho da adega (via requisição DELETE)
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/vinho?vinho=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -> Função para adicionar um novo vinho na adega com nome, uva, ano, categoria e fabricante
*/
const newItem = () => {
  let inputVinho = document.getElementById("newVinho").value;
  let inputUva = document.getElementById("newUva").value;
  let inputAno = document.getElementById("newAno").value;
  let inputCategoria = document.getElementById("newCategoria").value;
  let inputFabricante = document.getElementById("newFabricante").value;

  if (inputVinho === '') {
    alert("Escreva o nome de um vinho!");
  } else if (isNaN(inputAno)) {
    alert("Ano deve ser numerico!");
  } else {
    insertList(inputVinho, inputUva, inputAno, inputCategoria, inputFabricante)
    postItem(inputVinho, inputUva, inputAno, inputCategoria, inputFabricante)
    alert("Vinho incluido!")
  }
}

/*
  Função para inserir vinhos na lista
*/
const insertList = (vinho, uva, ano, categoria, fabricante) => {
  var item = [vinho, uva, ano, categoria, fabricante]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertButton(row.insertCell(-1))
  document.getElementById("newVinho").value = "";
  document.getElementById("newUva").value = "";
  document.getElementById("newAno").value = "";
  document.getElementById("newCategoria").value = "";
  document.getElementById("newFabricante").value = "";
  
  removeElement();
};

/*
  -> Função que busca os fatos de felinos através de API externa
*/
const getCatFacts = async () => {
  let url = 'https://cat-fact.herokuapp.com/facts/';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cat facts:', error);
    return [];
  }
};

/*
  -> Função para popular os fatos felinos no frontend
*/
const populateCatFacts = async () => {
  const catFacts = await getCatFacts();
  const catFactsSection = document.getElementById('catFacts');
  
  catFactsSection.innerHTML = ''; // Clear previous content
  
  catFacts.forEach(fact => {
    const factElement = document.createElement('p');
    factElement.textContent = fact.text;
    catFactsSection.appendChild(factElement);
  });
}

//chamar a função para popular a página com fatos felinos
populateCatFacts();

/*
  -> Função para atualizar o ano dos vinhos (via requisição PUT)
*/
const updateYear = () => {
  const vinhoId = parseInt(document.getElementById("updateVinhoId").value);
  const newYear = parseInt(document.getElementById("newYear").value);
  if (isNaN(vinhoId) || isNaN(newYear)) {
    alert("Por favor, insira o ID do vinho e o novo ano corretamente.");
    return;
  }
  // Criar um objeto FormData para enviar os dados como um formulário
  const formData = new FormData();
  formData.append('vinho_id', vinhoId);
  formData.append('new_vinho_year', newYear);
  // Fazer a solicitação PUT com a nova FormData
  const url = 'http://127.0.0.1:5000/vinhoUpdate';
  fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        // Atualizar a célula da tabela com o novo ano
        updateTableCell(vinhoId, newYear);
        alert("Ano do vinho atualizado com sucesso!");
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        throw new Error('Erro na atualização do ano do vinho.');
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
      alert("Ocorreu um erro ao atualizar o ano do vinho.");
    });
}

/*
  -> Função para atualizar a célula da tabela com o novo ano
*/ 
const updateTableCell = (vinhoId, newYear) => {
  const table = document.getElementById('myTable');
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const cellId = parseInt(row.cells[0].textContent);
    if (cellId === vinhoId) {
      // Encontrou a linha correspondente, atualize a célula de ano
      row.cells[2].textContent = newYear;
      break; // Pode sair do loop, pois encontrou a correspondência
    }
  }
}

/*
  -> Função para adicionar as notas de um vinho
*/
const addNote = () => {
  const vinhoId = parseInt(document.getElementById("addNoteVinhoId").value);
  const texto = document.getElementById("addNoteTexto").value;
  if (isNaN(vinhoId)) {
    alert("Por favor, insira o ID do vinho corretamente.");
    return;
  }
  const formData = new FormData();
  formData.append("vinho_id", vinhoId);
  formData.append("texto", texto);
  const url = "http://127.0.0.1:5000/nota";
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // Limpe os campos após a adição bem-sucedida
        document.getElementById("addNoteVinhoId").value = "";
        document.getElementById("addNoteTexto").value = "";
        alert("Nota adicionada com sucesso!");
      } else {
        throw new Error("Erro ao adicionar nota.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao adicionar a nota.");
    });
};

/*
  -> Função para buscar todas as informações de um vinho (via requisição GET) 
*/
function getWineInfo() {
  // Obtenha o nome do vinho do campo de entrada
  const wineName = document.getElementById('wineName').value;

  // Faça a chamada para o endpoint /vinho
  fetch(`http://127.0.0.1:5000/vinho?vinho=${wineName}`, {
      method: 'GET',
      headers: {
          'accept': 'application/json',
      },
  })
  .then(response => response.json())
  .then(data => {
      // Exiba as informações do vinho na página
      const wineInfoResult = document.getElementById('wineInfoResult');
      wineInfoResult.innerHTML = `<h3>Informações do Vinho</h3>
          <p>Nome do Vinho: ${data.vinho}</p>
          <p>Ano: ${data.ano}</p>
          <p>Categoria: ${data.categoria}</p>
          <p>Fabricante: ${data.fabricante}</p>
          <p>Uva: ${data.uva}</p>
          <p>Total de Notas: ${data.total_notas}</p>`;
      
      // Se houver notas, exiba-as também
      if (data.notas && data.notas.length > 0) {
          wineInfoResult.innerHTML += '<h4>Notas:</h4>';
          data.notas.forEach(nota => {
              wineInfoResult.innerHTML += `<p>${nota.texto}</p>`;
          });
      }
  })
  .catch(error => {
      console.error('Erro ao buscar informações do vinho:', error);
      const wineInfoResult = document.getElementById('wineInfoResult');
      wineInfoResult.innerHTML = '<p>Ocorreu um erro ao buscar informações do vinho.</p>';
  });
}

/*
  -> Função para buscar gifs de felinos na API externa
*/
const fetchCatGifs = async () => {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    if (!response.ok) {
      throw new Error('Erro ao buscar imagem de gato.');
    }
    const data = await response.json();
    const catImageUrl = data[0].url;

    // Atualize a imagem no elemento de exibição
    const catImageElement = document.getElementById('catGifImg');
    catImageElement.src = catImageUrl;
  } catch (error) {
    console.error('Erro ao buscar imagem de gato:', error);
  }
};

// Chame a função para buscar uma imagem de gato quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  fetchCatGifs();
});
