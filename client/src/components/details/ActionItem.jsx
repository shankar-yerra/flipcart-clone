import { useState } from "react";

import { Box, Button, styled } from "@mui/material";

import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/actions/cartActions"; 

import { payUsingPaytm } from "../../service/api"; // buy now ki click se iss API ko call hoga

import { post } from "../../utils/paytm";

const LeftContainer = styled(Box)(({theme}) => ({
  minWidth: '40%',
  padding: '40px 0 0 80px',
  [theme.breakpoints.down('lg')]: {
    padding: '20px 40px'
  }
}));

const Image = styled("img")({
  width: "95%",
  padding: "15px",
});

const StyledButton = styled(Button)(({theme}) => ({
  width: '48%',
  height: '50',
  borderRadius: '2',
  [theme.breakpoints.down('lg')]: {
    width: '46%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '48%'
  }

}));

const ActionItem = ({ product }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch(); // initializing custom hooks

  //redux ke andar product ko set karne ke liye follow below codes..
  
  const [quantity, setQuantity] = useState(1);
  //initially storing value of quantity as 1.

  const {id} = product; // id ko nikal na he.

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));

    navigate('/cart');
  }

  const buyNow = async () => {
    let response = await payUsingPaytm({amount: 500, email: 'shankaryerra765@gmail.com'});
    let information = { // object is build to make a paytm form
      action: 'https://securegw-stage.paytm.in/order/process',
      // actions me jo aap ka paytm ka form he uski jo website he uska link ko yaha dalna padega.
      params: response
    }
    post(information); // information object passed into post function.
  }

  return (
    <LeftContainer>
      <Box style={{ padding: "15px 20px", border: "1px solid #f0f0f0" }}>
        <Image src={product.detailUrl} alt="product" />
      </Box>
      <StyledButton
        variant="contained"
        onClick={() => addItemToCart()}
        style={{ marginRight: 10, background: "#ff9f00" }}
      >
        <Cart />
        Add to Cart
      </StyledButton>
      <StyledButton variant="contained" onClick={() => buyNow()} style={{ background: "#fb541b" }}>
        <Flash />
        Buy Now
      </StyledButton>
    </LeftContainer>
  );
};

export default ActionItem;
