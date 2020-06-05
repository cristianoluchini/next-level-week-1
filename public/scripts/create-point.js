// Obter estados e popular componente.
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(states => {
    for(state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  });  
};
populateUFs();

// Obter cidades com base no estado e popular componente
function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");
  const ufvalue = event.target.value;
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`;
  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;
  fetch(url)
  .then(res => res.json())
  .then(cities => {    
    for(city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled = false;
  });  
};
document.querySelector("select[name=uf]").addEventListener("change", getCities);

// Adiciona ou remove itens da lista de ítens de coleta
const itemsToCollect = document.querySelectorAll(".items_grid li");
const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  itemLi.classList.toggle("selected");

  const itemId = event.target.dataset.id;

  // Verifica se já existem itens na lista
  const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId;
    return itemFound;
  });

  // Se já estiver selecionado, remove da seleção
  if(alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent
    });
    selectedItems = filteredItems;

  // Se não estiver selecionado, adiciona a selação
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
};

for (item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
};