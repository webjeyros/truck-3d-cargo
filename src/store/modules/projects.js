const state = {
  currentProject: null,
  projects: []
}

const mutations = {
  SET_CURRENT_PROJECT(state, project) {
    state.currentProject = project
  },
  
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  
  ADD_PROJECT(state, project) {
    state.projects.push(project)
  },
  
  UPDATE_PROJECT(state, updatedProject) {
    const index = state.projects.findIndex(p => p.id === updatedProject.id)
    if (index !== -1) {
      state.projects.splice(index, 1, updatedProject)
    }
    if (state.currentProject && state.currentProject.id === updatedProject.id) {
      state.currentProject = updatedProject
    }
  },
  
  DELETE_PROJECT(state, projectId) {
    state.projects = state.projects.filter(p => p.id !== projectId)
    if (state.currentProject && state.currentProject.id === projectId) {
      state.currentProject = null
    }
  }
}

const actions = {
  createProject({ commit, dispatch }, projectData) {
    const project = {
      id: Date.now().toString(),
      name: projectData.name || 'Новый проект',
      description: projectData.description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cargo: [],
      vehicle: null,
      calculations: null
    }
    
    commit('ADD_PROJECT', project)
    commit('SET_CURRENT_PROJECT', project)
    dispatch('saveProjects')
    
    return project
  },
  
  selectProject({ commit }, project) {
    commit('SET_CURRENT_PROJECT', project)
    commit('cargo/SET_CARGO_ITEMS', project.cargo || [], { root: true })
    commit('transport/SET_CURRENT_VEHICLE', project.vehicle, { root: true })
    localStorage.setItem('currentProjectId', project.id)
  },
  
  saveProjects({ state }) {
    try {
      localStorage.setItem('projects', JSON.stringify(state.projects))
    } catch (error) {
      console.error('Ошибка сохранения:', error)
    }
  },
  
  loadProjects({ commit, dispatch }) {
    try {
      const savedProjects = localStorage.getItem('projects')
      if (savedProjects) {
        const projects = JSON.parse(savedProjects)
        commit('SET_PROJECTS', projects)
        
        const currentProjectId = localStorage.getItem('currentProjectId')
        if (currentProjectId) {
          const currentProject = projects.find(p => p.id === currentProjectId)
          if (currentProject) {
            dispatch('selectProject', currentProject)
          }
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error)
    }
  }
}

const getters = {
  currentProject: state => state.currentProject,
  projects: state => state.projects,
  hasProjects: state => state.projects.length > 0
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}