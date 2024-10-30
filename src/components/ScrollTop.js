import {React,useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './ScrollTop.css'

export default function ScrollTop() {
    const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div>
      {showScrollButton && (
            <button id="button-top" onClick={scrollUp} style={{fontSize:"24px"}}>
              <FontAwesomeIcon icon={faChevronUp} /> 
            </button>
          )}
    </div>
  )
}
