import { useState } from 'react'
import './App.css'
import { useAuth } from './hooks/useAuth'
import { LoggedInPage } from './pages/LoggedInPage'
import { SendCodePage } from './pages/SendCodePage'
import { VerifyCodePage } from './pages/VerifyCodePage'

type View = 'sendCode' | 'verifyCode' | 'loggedIn'

function App() {
  const { user, token, login, reset } = useAuth()
  const [view, setView] = useState<View>('sendCode')

  const navigateToSendCode = () => {
    reset()
    setView('sendCode')
  }

  const navigateToVerify = () => {
    setView('verifyCode')
  }

  const handleLoggedIn = (session: Parameters<typeof login>[0]) => {
    login(session)
    setView('loggedIn')
  }

  const renderCurrentView = () => {
    if (view === 'sendCode') {
      return <SendCodePage onContinue={navigateToVerify} />
    }

    if (view === 'verifyCode') {
      return <VerifyCodePage onSuccess={handleLoggedIn} onBack={navigateToSendCode} />
    }

    if (view === 'loggedIn' && user && token) {
      return <LoggedInPage user={user} token={token} onSignOut={navigateToSendCode} />
    }

    return <SendCodePage onContinue={navigateToVerify} />
  }

  return (
    <div className="app">
      <main className="app-shell">
        <section className="hero">
          <p className="eyebrow">End to End Company Products</p>
          <h1>Welcome back</h1>
          <p>Authenticate with your work email. No passwords needed.</p>
        </section>

        {renderCurrentView()}
      </main>
    </div>
  )
}

export default App
