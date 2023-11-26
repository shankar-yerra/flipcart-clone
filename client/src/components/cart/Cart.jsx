
import { Typography, Grid, Box, styled, Button } from "@mui/material";
import { useSelector } from "react-redux";

// components
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";

import { payUsingPaytm } from "../../service/api";

import { post } from "../../utils/paytm";

// const Container = styled(Grid)`
//     padding: 30px 135px;
// `;

const Container = styled(Grid)(({theme}) => ({
    padding: '30px 135px',
    [theme.breakpoints.down('md')]: {
        padding: '15px 0'
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const ButtonWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%); 
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
     display: flex;
     margin-left: auto;
     background: #fb641b;
     color: #fff;
     width: 250px;
     height: 51px;
     border-radius: 2px;
`;

// const LeftComponent = styled(Grid)`
//     padding-right: 15px;
// `;

const LeftComponent = styled(Grid)(({theme}) => ({
    paddingRight: 15,
    [theme.breakpoints.down('md')]: {
        marginBottom: 15
    }
}))

const Cart = () => {

    const {cartItems} = useSelector(state => state.cart);

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
        <>
            {
                cartItems.length ?
                    <Container container> 
                        <LeftComponent item lg={9} md={9} sm={12} xs={12} >
                            <Header>
                                <Typography>My Cart({cartItems.length})</Typography>
                            </Header>
                            {
                                cartItems.map(item => (
                                    <CartItem item={item}/>
                                ))
                            }
                            <ButtonWrapper>
                                <StyledButton onClick={() => buyNow()}>Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>

                        <Grid item lg={3} md={3} sm={12} xs={12} >
                            <TotalView cartItems={cartItems}/>
                        </Grid>

                    </Container>

                : <EmptyCart />
            }
        </>
    )
}

export default Cart;