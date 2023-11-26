import Carousel from "react-multi-carousel"; // carousel is used to add scrooling of banners left to right. it can be installed in terminal by npm i react-multi-carousel. after that all banners will get from top to bottom.in order to turn all banners like a pages in book(one after another) use the below code.

import "react-multi-carousel/lib/styles.css";
//the above line is used to display all banners one after another after clicking right and left arrows (<,>) symbols.
import { styled } from "@mui/material";

import { bannerData } from "../../constants/data";

// const Image = styled('img')({
//     width: '100%',
//     height: 280
// })

// the above code puts fixed height of the banner for all sizes of screens due to which banner will not be clear for small screens.so theme is used like...

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: 280,
  [theme.breakpoints.down("md")]: {
    objectFit: "cover",
    height: 180,
  },
  // this code says that screens which are smaller than medium size will have height: 180 and other property as well
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Banner = () => {
  return (
    <Carousel //below are props
      responsive={responsive}
      swipeable={false}
      draggable={false}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      slidesToSlide={1}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      containerClass="carousel-container"
    >
      {bannerData.map((data) => (
        <Image src={data.url} alt="banner" />
      ))}
    </Carousel>
  );
};
// dotlistclass,itemclass,containerclass props makes smooth running of banners
//swipeable,draggable false props do not allow to swap or drag
// infinite prop will make banners repeat in a loop that is banners will start from 1st, after last banner and viseversa.
//slidetoslide{1} will slide only 1 banner after click.
export default Banner;
