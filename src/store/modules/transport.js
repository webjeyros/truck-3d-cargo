const state = {
  vehicles: [],
  currentVehicle: null
}

const mutations = {
  SET_VEHICLES(state, vehicles) {
    state.vehicles = vehicles
  },
  
  SET_CURRENT_VEHICLE(state, vehicle) {
    state.currentVehicle = vehicle
  }
}

const actions = {
  loadVehicles({ commit }) {
    // Предустановленные транспортные средства
    const defaultVehicles = [
      {
        id: 'gazelle',
        name: 'Газель',
        category: 'Легкие коммерческие',
        dimensions: {
          length: 3000,
          width: 2000,
          height: 1800
        },
        maxWeight: 1500,
        volume: 10.8,
        image: '/models/gazelle.jpg'
      },
      {
        id: 'truck-10t',
        name: 'Грузовик 10т',
        category: 'Средние грузовики',
        dimensions: {
          length: 6000,
          width: 2400,
          height: 2400
        },
        maxWeight: 10000,
        volume: 34.56,
        image: '/models/truck-10t.jpg'
      }
    ]
    
    commit('SET_VEHICLES', defaultVehicles)
  },
  
  selectVehicle({ commit }, vehicle) {
    commit('SET_CURRENT_VEHICLE', vehicle)
  }
}

const getters = {
  vehicles: state => state.vehicles,
  currentVehicle: state => state.currentVehicle,
  vehiclesByCategory: state => {
    return state.vehicles.reduce((acc, vehicle) => {
      const category = vehicle.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(vehicle)
      return acc
    }, {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}