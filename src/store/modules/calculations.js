const state = {
  placedItems: [],
  excludedItems: [],
  statistics: {
    totalWeight: 0,
    totalVolume: 0,
    usedWeight: 0,
    usedVolume: 0,
    efficiency: 0
  },
  axisLoads: {
    front: 0,
    rear: 0
  }
}

const mutations = {
  SET_PLACED_ITEMS(state, items) {
    state.placedItems = items
  },
  
  SET_EXCLUDED_ITEMS(state, items) {
    state.excludedItems = items
  },
  
  SET_STATISTICS(state, stats) {
    state.statistics = stats
  },
  
  SET_AXIS_LOADS(state, loads) {
    state.axisLoads = loads
  }
}

const actions = {
  calculatePlacement({ commit, rootState }) {
    const cargo = rootState.cargo.cargoItems
    const vehicle = rootState.transport.currentVehicle
    
    if (!cargo.length || !vehicle) {
      return
    }
    
    // Простой алгоритм размещения (будет расширен)
    const placed = []
    const excluded = []
    
    let currentX = 0
    let currentY = 0
    let currentZ = 0
    
    for (const item of cargo) {
      for (let i = 0; i < item.quantity; i++) {
        const canPlace = (
          currentX + item.dimensions.length <= vehicle.dimensions.length &&
          currentY + item.dimensions.width <= vehicle.dimensions.width &&
          currentZ + item.dimensions.height <= vehicle.dimensions.height
        )
        
        if (canPlace) {
          placed.push({
            ...item,
            instanceId: `${item.id}_${i}`,
            position: {
              x: currentX,
              y: currentY,
              z: currentZ
            }
          })
          
          currentX += item.dimensions.length
          if (currentX >= vehicle.dimensions.length) {
            currentX = 0
            currentY += item.dimensions.width
            if (currentY >= vehicle.dimensions.width) {
              currentY = 0
              currentZ += item.dimensions.height
            }
          }
        } else {
          excluded.push({
            ...item,
            reason: 'Не помещается в кузов'
          })
        }
      }
    }
    
    commit('SET_PLACED_ITEMS', placed)
    commit('SET_EXCLUDED_ITEMS', excluded)
    
    // Расчет статистики
    const totalWeight = cargo.reduce((sum, item) => sum + item.weight * item.quantity, 0)
    const usedWeight = placed.reduce((sum, item) => sum + item.weight, 0)
    const usedVolume = placed.reduce((sum, item) => {
      return sum + (item.dimensions.length * item.dimensions.width * item.dimensions.height) / 1000000000
    }, 0)
    
    commit('SET_STATISTICS', {
      totalWeight,
      usedWeight,
      usedVolume,
      efficiency: (usedWeight / totalWeight) * 100
    })
  }
}

const getters = {
  placedItems: state => state.placedItems,
  excludedItems: state => state.excludedItems,
  statistics: state => state.statistics
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}