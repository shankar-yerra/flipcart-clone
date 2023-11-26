// this file adds an advertisement poster to the right of the 1st slider
import Slide from "./Slide";

import { Box, styled } from "@mui/material";

const Component = styled(Box)`
    display: flex;
`;

// const LeftComponent = styled(Box)`
//     width: 83%;
// `;


// const RightComponent = styled(Box)`
//     background: #FFFFFF;
//     padding: 5px;
//     margin-top: 10px;
//     margin-left: 10px;
//     width: 17%;
//     text-align: center;
// `;

// for small screens like sm & xs, 1st slide and advertisement poster which are left and right will not be visible.. so to make them visible for small screens use below code with theme

const LeftComponent = styled(Box)(({theme}) => ({
    width: '83%',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
    // this code says that 1st slide's width will be 100% for screens smaller than medium size.
}));

const RightComponent = styled(Box)(({theme}) => ({
        background: '#FFFFFF',
        padding: 5,
        marginTop: 10,
        marginLeft: 10,
        width: '17%',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
        // this code says that hide the ad poster which is right when screen size is less than medium (<ms).
}));

const MidSlide = ({products, title, timer}) => {
    const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';

    return (
        <Component>
            <LeftComponent>
            <Slide 
                 products={products} 
                 title={title} 
                 timer={timer}
            />
            </LeftComponent>
            <RightComponent>
                <img src={adURL} alt="ad" style={{width: 217}}/>
            </RightComponent>
        </Component>
    )
}

export default MidSlide;