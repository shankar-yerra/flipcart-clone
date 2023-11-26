import { useState, useContext } from "react";
// usestate is a react hook used to store values

import { Box, Button, Typography, styled, Badge } from "@mui/material";

import { ShoppingCart } from "@mui/icons-material";

import { Link } from "react-router-dom";

import { UseSelector, useSelector } from "react-redux";

import { DataContext } from "../../context/DataProvider";

import LoginDialog from "../login/LoginDialog";

import Profile from "./Profile";

// const Wrapper = styled(Box)`
//     display: flex;
//     margin: 0 3% 0 auto;
//     & > button, & > p, & > div {
//         margin-right: 40px;
//         font-size: 16px;
//         align-items: center;
//     }
// `;

// children inside wrapper tag can be accessed by & > div{} etc,.
// display: flex will arrange items in horizontal direction.

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "0 3% 0 auto",
  "& > *": {
    marginRight: "40px !important",
    fontSize: 16,
    alignItems: "center",
  },

  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const Container = styled(Link)(({ theme }) => ({
  display: "flex",
  textDecoration: "none",
  color: "inherit",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const LoginButton = styled(Button)`
  color: #2874f0;
  background: #ffffff;
  text-transform: none;
  padding: 5px 40px;
  border-radius: 2px;
  box-shadow: none;
  font-weight: 600;
  height: 32px;
`;

const CustomButtons = () => {
  const [open, setOpen] = useState(false);
  // created a state open with initial value false
  const { account, setAccount } = useContext(DataContext); // data in datacontext will append into account

  const { cartItems } = useSelector((state) => state.cart);

  const openDialog = () => {
    setOpen(true);
  };
  // to open dialog box when login is clicked
  return (
    <Wrapper>
      {
        account ? (
          <Profile account={account} setAccount={setAccount} />
        ) : (
          <LoginButton variant="contained" onClick={() => openDialog()}>
            login
          </LoginButton>
        )
        // if there is no account loged in then show login button or else show username.
      }

      <Typography style={{ marginTop: 3, width: 135 }}>
        Become a Seller
      </Typography>
      <Typography style={{ marginTop: 3 }}>More</Typography>

      <Container to="/cart">
        <Badge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCart />
        </Badge>
        <Typography style={{ marginLeft: 10 }}> Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );

  // open is passed as prop inside logindialog to open dialog box when login is clicked.
  // setopen is passed as prop inside logindialog to change open value to false
};

export default CustomButtons;
