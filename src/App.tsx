import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Router>
        <AppRoutes />
        <Footer />
      </Router>
    </>
  )
}

export default App
