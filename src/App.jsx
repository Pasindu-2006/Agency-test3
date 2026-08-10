import Navbar from './components/Navbar'
import { useState, useRef } from 'react'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import Ourwork from './components/Ourwork'
import Teams from './components/Teams'
import ContactUs from './components/ContactUs'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'

const App = () => {
  const outlineRef = useRef(null)
  const[theme, setTheme] = useState(localStorage.getItem('theme')? localStorage.getItem('theme'):'light')

  return (
    <div className='dark:bg-black relative'>
      <Toaster />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <TrustedBy />
      <Services />
      <Ourwork />
      <Teams />
      <ContactUs />
      <Footer theme={theme} />
    </div>
  )
}

export default App