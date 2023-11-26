import { Box, styled, Typography } from "@mui/material";
import { navData } from "../../constants/data";

// const Component = styled(Box)`
//   display: flex;
//   margin: 55px 130px 0 130px;
//   justify-content: space-between;
// `;

// the above code is not responsive.. use below code to make responsive

const Component = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "55px 130px 0 130px",
  justifyContent: "space-between",

  overflow: "overlay",

  // for small screens some of the items in the nav bar are not visible and at bottom of website a scrollbar will be displayed to see remaining items in the nav bar.same as original flip cart website.

  //in this case if you want to add scroll bar just below the nav bar for smaller screens to see all items by scrolling then add the overflow: 'overlay' code. by this there wont be any scroll bar at the bottom of the website.

  //if overlay code is not written, then for small screens there will be a scroll bar at bottom of the website to see side items.if you want to delete that bottom scroll bar then add overflow: 'hidden'.

  //overflow: 'hidden',

  [theme.breakpoints.down("lg")]: {
    margin: 0,
  },
}));

const Container = styled(Box)`
  padding: 12px 8px;
  text-align: center;
`;

const Text = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
`;

const NavBar = () => {
  return (
    <Box style={{background: '#fff'}}>

      <Component>
        {navData.map((data) => (
          <Container>
            <img src={data.url} alt="nav" style={{ width: 64 }} />
            <Text> {data.text} </Text>
          </Container>
        ))}
      </Component>
    </Box>
  );
};

export default NavBar;
