import React, { useState, useEffect, createContext, useContext } from 'react'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Learn from './pages/Learn.jsx'
import ModuleView from './pages/ModuleView.jsx'
import DirectiveLab from './pages/DirectiveLab.jsx'
import Reference from './pages/Reference.jsx'
import Settings from './pages/Settings.jsx'

// --- App Context ---
export const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

const INITIAL_PROGRESS = {
  completedModules: [],
  completedExercises: [],
  labRuns: 0,
  totalScore: 0,
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [activeModule, setActiveModule] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('il-theme') || 'light')
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('il-apikey') || '')
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('il-progress')) || INITIAL_PROGRESS
    } catch { return INITIAL_PROGRESS }
  })

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('il-theme', theme)
  }, [theme])

  // Persist progress
  useEffect(() => {
    localStorage.setItem('il-progress', JSON.stringify(progress))
  }, [progress])

  // Persist API key
  useEffect(() => {
    localStorage.setItem('il-apikey', apiKey)
  }, [apiKey])

  const navigate = (target, moduleId = null) => {
    setPage(target)
    if (moduleId) setActiveModule(moduleId)
    window.scrollTo(0, 0)
  }

  const completeModule = (moduleId) => {
    setProgress(prev => ({
      ...prev,
      completedModules: prev.completedModules.includes(moduleId)
        ? prev.completedModules
        : [...prev.completedModules, moduleId],
    }))
  }

  const incrementLabRuns = () => {
    setProgress(prev => ({ ...prev, labRuns: prev.labRuns + 1 }))
  }

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS)
  }

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  const ctx = {
    page, navigate,
    activeModule, setActiveModule,
    theme, toggleTheme,
    apiKey, setApiKey,
    progress, completeModule, incrementLabRuns, resetProgress,
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':  return <Dashboard />
      case 'learn':      return <Learn />
      case 'module':     return <ModuleView moduleId={activeModule} />
      case 'lab':        return <DirectiveLab />
      case 'reference':  return <Reference />
      case 'settings':   return <Settings />
      default:           return <Dashboard />
    }
  }

  return (
    <AppContext.Provider value={ctx}>
      <Layout>
        {renderPage()}
      </Layout>
    </AppContext.Provider>
  )
}
