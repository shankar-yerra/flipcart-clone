
import Header from './components/header/Header'; 
import Home from './components/home/Home';
import DetailView from './components/details/DetailView';
import Cart from './components/cart/Cart';

import DataProvider from './context/DataProvider';

import {Box} from '@mui/material';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
// BrowserRouter package helps to enable routing in your project or website.
//whose components which should want routing those should rap up with Routes.
//this routing is URL based routing..means URL ke bases pe component dikhathe.

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
      <Header /> 
      <Box style={{marginTop: 54}}>
        <Routes>
      <Route path='/' element={<Home />} /> 
      {/* it says if URL path is empty then open Home component */}
      <Route path= '/product/:id' element={<DetailView />} />
      {/* open DetailView when path is /product/:id. here id is used to differentiate b/w product items...means unique detail page should shown for unique items. */}

      <Route path='/cart' element={<Cart />} />
      
      </Routes>
      </Box>
      </BrowserRouter>
    </DataProvider>
    // <Header /> is a self closing tag
  );
}

export default App;
