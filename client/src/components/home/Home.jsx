import { useEffect } from "react";

import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSlide from './MidSlide';
import MidSection from "./MidSection";

import { Box, styled } from "@mui/material";

import { getProducts } from "../../redux/actions/productActions";

import { useDispatch, useSelector } from "react-redux";

// useSelector is a custom hook used to fetch data from getProducts reducer state into frontend

const Component = styled(Box)`
  padding: 10px;
  background: #f2f2f2;
`;

const Home = () => {
  const { products } = useSelector((state) => state.getProducts);
  // ye getProducts, neche vala getProducts() same nahi he. neche vala getProducts() function he.... aur uper getProducts ek reducer he vo store file ke andar ban raha he

  //const { products } = getProducts;
  //object de struction method: getProducts ke andar se products nikal liya


  const dispatch = useDispatch();
  // getProducts() function will call dispatch. so we need to use dispatch while calling getProducts().
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Component>
        <Banner />
        <MidSlide products={products} title="Deals of the Day" timer={true}/>
        <MidSection />
        <Slide products={products} title="Discounts for You" timer={false}/>
        <Slide products={products} title="Suggesting Items" timer={false}/>
        <Slide products={products} title="Top Selection" timer={false}/>
        <Slide products={products} title="Recommended Items" timer={false}/>
        <Slide products={products} title="Trending Offers" timer={false}/>
        <Slide products={products} title="Season's Top Picks" timer={false}/>
        <Slide products={products} title="Top Deals on Accessories" timer={false}/>
      </Component>
    </>
  ); // navbar and banner are written inside div tag because multiple jsx files cannot return simultaneously due two those are parent components. so these two parent components are wrapped as child inside div tag as parent.that div tag is renamed to fragment because : Fragments do not create extra node and it is faster than html div tag. improvement in syntex of fragment is we can leave tag empty.
};

export default Home;
