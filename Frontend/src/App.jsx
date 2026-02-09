import {Routes , Route} from 'react-router-dom';
import  Home  from './pages/Home';
// import { AboutPage } from './pages/AboutPage';
// import { ContactPage } from './pages/ContactPage';

export const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<AboutPage />} /> */}
      {/* <Route path="/contact" element={<ContactPage />} /> */}
    </Routes>
    </>
  )
}