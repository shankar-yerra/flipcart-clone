
// items which are below banners are slides (carousel) are made here

import Carousel from "react-multi-carousel";
// carousel is used to add scrooling of banners left to right. it can be installed in terminal by npm i react-multi-carousel. after that all banners will get from top to bottom.in order to turn all banners like a pages in book(one after another) use the below code.

import 'react-multi-carousel/lib/styles.css';
//the above line is used to display all banners one after another after clicking right and left arrows (<,>) symbols.

import Countdown from 'react-countdown';
// used to add timer

import { Link } from "react-router-dom";
// Link component used to change routing.

import { Box, Typography, Button, Divider, styled } from "@mui/material";

const responsive = { // props
    desktop: {
        breakpoint: { max: 3000, min: 1024},
        items:5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464},
        items:2
    },
    mobile: {
        breakpoint: { max: 464, min: 0},
        items:1
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    padding: 15px 20px;
    display: flex;
`;

const Timer = styled(Box)`
    display: flex;
    margin-left: 10px;
    align-items: center;
    color: #7f7f7f;
`;

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    margin-right: 25px;
    line-height: 32px;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto; 
    background-color: #2874f0;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 600;
`; // moves viewall button to right.

const Image = styled('img')({
    width: 'auto',
    height: 150
});

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
`;

const Slide = ({products, title, timer}) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({hours, minutes, seconds}) => {
        return <Box variant="span">{hours} : {minutes} : {seconds} Left</Box>;
    }
    return (
        <Component>
                <Deal>
                    <DealText>{title}</DealText>
                    {
                        timer && 
                            <Timer>
                                <img src={timerURL} alt = "timer" style={{width: 24}}/>
                                <Countdown date = {Date.now() + 5.04e+7} renderer={renderer}/>
                                {/* 14hours = 5.04e+7 milliseconds */}
                            </Timer>
                            // if timer prop is true then show timer
                    }
                    
                    <ViewAllButton variant="contained" color="primary">View All</ViewAllButton>
                    
                </Deal>
                <Divider /> 
                {/* divider is a replacement for hr tag(displays a line) */}
                <Carousel
                    responsive={responsive} // props passed
                    swipeable = {false}
                    draggable = {false}
                    infinite = {true}
                    autoPlay = {true}
                    autoPlaySpeed = {4000}
                    keyBoardControl = {true}
                    centerMode = {true}
                    dotListClass = "custom-dot-list-style"
                    itemClass = "carousel-item-padding-40-px"
                    containerClass = "carousel-container"
                >
                    {
                        products.map(product => (

                            <Link to={`product/${product.id}`} style={{textDecoration: 'none'}}>
                                {/* components which should change their rounting should rap up with Link component and which url routing should change are written in to={} statement. */}
                            <Box textAlign="center" style={{padding: '25px 15px'}}>
                                <Image src = {product.url} alt = "product" /> 
                                {/* mapping of all data which are in products */}

                                <Text style={{fontWeight: 600, color: '#212121'}}>{product.title.shortTitle}</Text>

                                <Text style={{color: 'green'}}>{product.discount}</Text>

                                <Text style={{color: '#212121', opacity: '.6'}}>{product.tagline}</Text>

                                {/* previously we stored data in product using redux. now we want to add title,discount,taglint under pictures which are stored in product by writing product.title.shortTitle,product.discount etc,.. */}

                            </Box>
                            </Link>
                        ))
                    }

                </Carousel>
        </Component>
    )
}

export default Slide;
