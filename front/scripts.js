/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/pacientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.pacientes.forEach(item => insertList(item.name, 
                                                item.age, 
                                                item.systolic_bp,
                                                item.diastolic_bp,
                                                item.blood_sugar,
                                                item.body_temp,
                                                item.heart_rate,
                                                item.risk_level
                                              ))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar a tabela antes de recarregar os dados
  --------------------------------------------------------------------------------------
*/
const clearTable = () => {
  var table = document.getElementById('myTable');
  // Remove todas as linhas exceto o cabeçalho (primeira linha)
  while(table.rows.length > 1) {
    table.deleteRow(1);
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para recarregar a lista completa do servidor
  --------------------------------------------------------------------------------------
*/
const refreshList = async () => {
  clearTable();
  await getList();
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
// Carrega a lista apenas uma vez quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
  getList();
});




/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputAge, inputSystolicBP,
                        inputDiastolicBP, inputBloodSugar, inputBodyTemp,
                        inputHeartRate) => {
    
  const formData = new FormData();
  formData.append('name', inputName);
  formData.append('age', inputAge);
  formData.append('systolic_bp', inputSystolicBP);
  formData.append('diastolic_bp', inputDiastolicBP);
  formData.append('blood_sugar', inputBloodSugar);
  formData.append('body_temp', inputBodyTemp);
  formData.append('heart_rate', inputHeartRate);


  let url = 'http://127.0.0.1:5000/paciente';
  return fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      return data; // Retorna os dados do paciente com o diagnóstico
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertDeleteButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/paciente?name='+item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = async (event) => {
  event.preventDefault();

  let inputName = document.getElementById("newName").value;
  let inputAge= document.getElementById("newAge").value;
  let inputSystolicBP = document.getElementById("newSystolicBP").value;
  let inputDiastolicBP = document.getElementById("newDiastolicBP").value;
  let inputBloodSugar = document.getElementById("newBloodSugar").value;
  let inputBodyTemp = document.getElementById("newBodyTemp").value;
  let inputHeartRate = document.getElementById("newHeartRate").value;


  // Verifique se o nome da paciente já existe antes de adicionar
  const checkUrl = `http://127.0.0.1:5000/pacientes?nome=${inputPatient}`;
  fetch(checkUrl, {
    method: 'get'
  })
    .then((response) => response.json())
    .then(async (data) => {
      if (data.pacientes && data.pacientes.some(item => item.name === inputName)) {
        alert("A paciente já está cadastrada.\nCadastre a paciente com um nome diferente ou atualize o existente.");
      } else if (inputName === '') {
        alert("O nome da paciente não pode ser vazio!");
      } else if (isNaN(inputAge) || isNaN(inputSystolicBP) || isNaN(inputDiastolicBP) || isNaN(inputBloodSugar) || isNaN(inputBodyTemp) || isNaN(inputHeartRate)) {
        alert("Esse(s) campo(s) precisam ser números!");
      } else {
        try {
          // Envia os dados para o servidor e aguarda a resposta com o diagnóstico
          const result = await postItem(inputName, inputAge, inputSystolicBP,
                                        inputDiastolicBP, inputBloodSugar, inputBodyTemp,
                                        inputHeartRate);
            // Limpa o formulário
          document.getElementById("newName").value = "";
          document.getElementById("newAge").value = "";
          document.getElementById("newSystolicBP").value = "";
          document.getElementById("newDiastolicBP").value = "";
          document.getElementById("newBloodSugar").value = "";
          document.getElementById("newBodyTemp").value = "";
          document.getElementById("newHeartRate").value = "";

          
          // Recarrega a lista completa para mostrar o novo paciente com o diagnóstico
          await refreshList();
          
          // Mostra mensagem de sucesso com o diagnóstico
          const risco = result.risk_level === 0 ? "BAIXO" : result.risk_level === 1 ? "MÉDIO" : "ALTO";
          alert(`Paciente adicionado com sucesso!\nRisco materno: ${risco}`);
          
          // Scroll para a tabela para mostrar o novo resultado
          document.querySelector('.items').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
        } catch (error) {
          console.error('Erro ao adicionar paciente:', error);
          alert("Erro ao adicionar paciente. Tente novamente.");
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Erro ao verificar paciente existente. Tente novamente.");
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (name, age, systolic_bp, diastolic_bp,  blood_sugar, body_temp, heart_rate, risk_level) => {
  var item = [name, age, systolic_bp, diastolic_bp,  blood_sugar, body_temp, heart_rate, risk_level];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  // Insere as células com os dados do paciente
  for (var i = 0; i < item.length; i++) {
    var cell = row.insertCell(i);
    cell.textContent = item[i];
  }

  // Insere a célula do diagnóstico com styling
  var riskCell = row.insertCell(item.length);
  const riskText = risk_level === 0 ? "BAIXO" : result.risk_level === 1 ? "MÉDIO" : "ALTO";
  riskCell.textContent = riskText;

  
  // Aplica styling baseado no diagnóstico
  if (risk_level === 0) {
    riskCellCell.className = "low-risk";
  } else if (risk_level === 1) {
    riskCell.className = "mid-risk";
  } else {
    riskCell.className = "high-risk";
  }

  // Insere o botão de deletar
  var deleteCell = row.insertCell(-1);
  insertDeleteButton(deleteCell);

  removeElement();
}