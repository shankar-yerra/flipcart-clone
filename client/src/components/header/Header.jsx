import { useState } from 'react';

import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, ListItem, styled } from "@mui/material"; // to get access from mui

import { Menu } from '@mui/icons-material';

import Search from "./Search";
import CustomButtons from "./CustomButtons";

import { Link } from "react-router-dom";

const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
`;
// css of top bar in original flipcart app
const Component = styled(Link)`
  margin-left: 12%;
  line-height: 0;
  text-decoration: none;
  color: inherit;
`;

// below is the css for explore plus sentence
const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;

// inside styled() img tag cannot written directly because it is html tag.so we have to write inside single invented comas and css is given through object. pixel(px) cannot be mentioned to handle css in object.
const PlusImage = styled("img")({
  width: 10,
  height: 10,
  marginLeft: 4,
});

// appbar component with mentioned css in StyledHeader

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
  margin: "0 5% 0 auto",
  [theme.breakpoints.down("md")]: {
    display: "none",
  }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block"
  }
}));

const Header = () => {
  const logoURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  // url for getting image of flipcart name on top

  const subURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"; // url for getting image beside plus on top

  const [open, setOpen] = useState(false);
  
  
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }

    const list = () => (
      <Box style={{width: 200}} onClick={handleClose}>
         <List>
           <ListItem button>
              <CustomButtons />
           </ListItem>
         </List>
      </Box>
    )

  return (
    // Box is replacement of div tag and Typography is replacement of p tag.
    // min height in tool box is used to keep the input box at centre.
    <StyledHeader>
      <Toolbar style={{ minHeight: 55 }}>
        <MenuButton color="inherit" onClick = {handleOpen}>
          <Menu />
        </MenuButton>

        <Drawer open={open} onClose={handleClose}>
         { list() }
        </Drawer>

        <Component to="/">
          <img src={logoURL} alt="logo" style={{ width: 75 }} />
          <Box style={{ display: "flex" }}>
            <SubHeading>
              Explore&nbsp;
              <Box component="span" style={{ color: "#FFE500" }}>
                Plus
              </Box>
            </SubHeading>
            <PlusImage src={subURL} alt="sub-logo" />
          </Box>
        </Component>
        <Search />
        <CustomButtonWrapper>
          <CustomButtons />
        </CustomButtonWrapper>
      </Toolbar>
    </StyledHeader> // <AppBar></AppBar> to get a blue bar on top of screen
    // span component cannot written in typography.so Box is used.
    //&nbsp is used to give space between Explore and Plus.
  );
};

export default Header;
