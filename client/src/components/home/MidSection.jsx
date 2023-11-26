// this file adds 3 posters side by side below 1st slide
import { imageURL } from "../../constants/data";

import { Grid, styled } from "@mui/material";
// GRID will make website RESPONSIVE.
// replace Box with Grid

const Wrapper = styled(Grid)`
    margin-top: 10px;
    justify-content: space-between;
`;

const Image = styled('img')(({theme}) => ({
    marginTop: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    // for xs and sm screens, covid ad will become so small and not clearly visible..so theme prob is used to make them visible for small screens..see below
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        height: 125
    }
    // the above css applicable for screens which are smaller than medium size(<ms).
}));

const MidSection = () => {
    const url = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';
    return (
        <>
            <Wrapper lg={12} sm={12} md={12} xs={12} container>
                {/* 12 is the default total width of screens  
                lg = large screen, md = medium screen
                sm = small screen, xs = extra small screen */}
                {
                    imageURL.map(image => (
                        <Grid item lg={4} sm={12} md={4} xs={12}>
                            {/* lg={4} -> width 4 for 1 poster
                                sm={12} -> width 12 for 1 poster 
                                md={4} -> width 4 for 1 poster
                                xs={12} -> width 12 for 1 poster */}
                            <img src = {image} alt = "image" style={{width: '100%'}}/>
                        </Grid>
                    ))
                }
            </Wrapper> covid donate poster
            <Image src={url} alt="covid" />
            {/* covid donate poster */}
        </>

    )
}

export default MidSection;