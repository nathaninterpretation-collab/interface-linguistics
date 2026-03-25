import React from 'react'
import { useApp } from '../App.jsx'

/* ---- Navigation config ---- */
const SIDEBAR_NAV = [
  {
    section: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard',    icon: IconHome },
      { id: 'learn',     label: 'Learn',        icon: IconBook },
      { id: 'lab',       label: 'Directive Lab', icon: IconFlask },
      { id: 'reference', label: 'Reference',    icon: IconLibrary },
    ],
  },
  {
    section: 'Account',
    items: [
      { id: 'settings', label: 'Settings', icon: IconGear },
    ],
  },
]

/* Mobile bottom nav — 5 items, Lab is the centre pill */
const MOBILE_NAV = [
  { id: 'dashboard', label: 'Home',     icon: IconHome },
  { id: 'learn',     label: 'Learn',    icon: IconBook },
  { id: 'lab',       label: 'Lab',      icon: IconFlask, primary: true },
  { id: 'reference', label: 'Ref',      icon: IconLibrary },
  { id: 'settings',  label: 'Settings', icon: IconGear },
]

const PAGE_TITLES = {
  dashboard: 'Interface Linguistics',
  learn:     'Learn',
  module:    'Module',
  lab:       'Directive Lab',
  reference: 'Reference',
  settings:  'Settings',
}

export default function Layout({ children }) {
  const { page, navigate, theme, toggleTheme, progress, activeModule } = useApp()
  const TOTAL_MODULES = 5
  const pct = Math.round((progress.completedModules.length / TOTAL_MODULES) * 100)
  const pageTitle = PAGE_TITLES[page] || 'Interface Linguistics'
  const isModulePage = page === 'module'

  return (
    <div className="app-shell">

      {/* ── Desktop Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">IL</div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">Interface Linguistics</span>
            <span className="sidebar-brand-sub">BilinCo · v1.0</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {SIDEBAR_NAV.map(group => (
            <React.Fragment key={group.section}>
              <div className="sidebar-section-label">{group.section}</div>
              {group.items.map(item => {
                const Icon = item.icon
                const isActive = page === item.id || (item.id === 'learn' && isModulePage)
                return (
                  <button
                    key={item.id}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => navigate(item.id)}
                  >
                    <Icon className="nav-icon" />
                    {item.label}
                  </button>
                )
              })}
            </React.Fragment>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-progress-label">
            <span>Curriculum</span>
            <span style={{ fontWeight: 600 }}>
              {progress.completedModules.length}/{TOTAL_MODULES}
            </span>
          </div>
          <div className="sidebar-progress-bar">
            <div className="sidebar-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </aside>

      {/* ── Mobile Header (fixed top) ── */}
      <header className="mobile-header">
        <div className="mobile-header-side">
          {isModulePage ? (
            <button
              className="icon-btn"
              onClick={() => navigate('learn')}
              aria-label="Back to Learn"
              style={{ marginLeft: -4 }}
            >
              <IconChevronLeft size={20} />
            </button>
          ) : (
            <div className="mobile-logo">IL</div>
          )}
        </div>

        <div className="mobile-header-title">
          {isModulePage ? 'Module' : pageTitle}
        </div>

        <div className="mobile-header-side right">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
          </button>
        </div>
      </header>

      {/* ── Desktop Topbar ── */}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            {isModulePage && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => navigate('learn')}
                style={{ marginRight: 8, padding: '6px 10px' }}
              >
                <IconChevronLeft size={16} />
                Learn
              </button>
            )}
            <span className="page-title">{pageTitle}</span>
          </div>
          <div className="topbar-right">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
            </button>
          </div>
        </header>

        <div style={{ padding: '40px', maxWidth: '940px' }} className="animate-fade-in page-content">
          {children}
        </div>
      </div>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="mobile-nav" role="navigation" aria-label="Main navigation">
        {MOBILE_NAV.map(item => {
          const Icon = item.icon
          const isActive =
            page === item.id || (item.id === 'learn' && isModulePage)

          return (
            <button
              key={item.id}
              className={`mobile-nav-item ${isActive ? 'active' : ''} ${item.primary ? 'lab-primary' : ''}`}
              onClick={() => navigate(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="mobile-nav-icon-wrap">
                <Icon className="mobile-nav-icon" />
              </div>
              <span className="mobile-nav-label">{item.label}</span>
            </button>
          )
        })}
      </nav>

    </div>
  )
}

/* ======================================================
   SVG Icon Components
   ====================================================== */

function IconHome({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h4a1 1 0 001-1v-3h2v3a1 1 0 001 1h4a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  )
}

function IconBook({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
    </svg>
  )
}

function IconFlask({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
    </svg>
  )
}

function IconLibrary({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
  )
}

function IconGear({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  )
}

function IconChevronLeft({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function IconMoon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )
}

function IconSun({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  )
}
