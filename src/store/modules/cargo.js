const state = {
  cargoItems: [],
  selectedItems: [],
  recipients: []
}

const mutations = {
  SET_CARGO_ITEMS(state, items) {
    state.cargoItems = items
  },
  
  ADD_CARGO_ITEM(state, item) {
    state.cargoItems.push(item)
  },
  
  UPDATE_CARGO_ITEM(state, updatedItem) {
    const index = state.cargoItems.findIndex(i => i.id === updatedItem.id)
    if (index !== -1) {
      state.cargoItems.splice(index, 1, updatedItem)
    }
  },
  
  DELETE_CARGO_ITEM(state, itemId) {
    state.cargoItems = state.cargoItems.filter(i => i.id !== itemId)
    state.selectedItems = state.selectedItems.filter(id => id !== itemId)
  },
  
  SET_SELECTED_ITEMS(state, selectedIds) {
    state.selectedItems = selectedIds
  },
  
  SET_RECIPIENTS(state, recipients) {
    state.recipients = recipients
  }
}

const actions = {
  createCargoItem({ commit }, itemData) {
    const item = {
      id: Date.now().toString(),
      name: itemData.name || 'Новый груз',
      dimensions: {
        length: itemData.length || 100,
        width: itemData.width || 100,
        height: itemData.height || 100
      },
      weight: itemData.weight || 1,
      quantity: itemData.quantity || 1,
      recipient: itemData.recipient || 'Получатель 1',
      properties: {
        stackable: itemData.stackable || true,
        rotatable: itemData.rotatable || true,
        fragile: itemData.fragile || false
      },
      color: itemData.color || '#2196F3',
      createdAt: new Date().toISOString()
    }
    
    commit('ADD_CARGO_ITEM', item)
    return item
  }
}

const getters = {
  cargoItems: state => state.cargoItems,
  selectedItems: state => state.selectedItems,
  totalVolume: state => {
    return state.cargoItems.reduce((total, item) => {
      const volume = (item.dimensions.length * item.dimensions.width * item.dimensions.height) / 1000000000 // м³
      return total + (volume * item.quantity)
    }, 0)
  },
  totalWeight: state => {
    return state.cargoItems.reduce((total, item) => {
      return total + (item.weight * item.quantity)
    }, 0)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}