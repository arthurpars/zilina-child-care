import { LanguageProvider } from './useLanguage'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Welcome from './components/Welcome'
import Programs from './components/Programs'
import Day from './components/Day'
import Gallery from './components/Gallery'
import ApplyForm from './components/ApplyForm'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <main id="main-content">
        <ErrorBoundary>
          <Hero />
          <Welcome />
          <Gallery />
          <Programs />
          <Day />
          <ApplyForm />
          <Contact />
        </ErrorBoundary>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
