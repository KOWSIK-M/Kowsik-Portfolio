import React from 'react'
import './App.css'
import About from './components/About'
import AnimatedCursor from './components/AnimatedCursor'
import Contact from './components/Contact'
import NavBar from './components/NavBar'
import ScrollTop from './components/ScrollTop'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from './components/Projects'
import Skills from './components/Skills'


export default function App() {
  return (
    <div>
      <div class="home" id="homeSection">
  <div class="divNAV">
    <NavBar/>
  </div>
  <div class="divABOUT" id="about" style={{height: "200vh"}}>
    <About/>
  </div>
  <div id='projects'>
  <Projects/>
  </div>
  <div id="skills">
  <Skills/>
  </div>
    <div class="contact-container" id="contact">
      <Contact/>
    </div>
</div>
      <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="255, 255 ,255"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={1.2}
        />
        <ToastContainer />
        <ScrollTop/>
    </div>

  )
}

