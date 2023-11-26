import { useEffect } from "react";
// redux ki helps se call marnee

import { useDispatch, useSelector } from "react-redux";
// useSelector ke help se ham redux se data nikaltha he. 
import { useParams } from "react-router-dom";
// URL se kuch be nikhalne ke liye useParams help karte.

import { getProductDetails } from "../../redux/actions/productActions";

import {Box, Typography, Grid, styled} from '@mui/material';

import ActionItem from "./ActionItem";

import ProductDetail from "./ProductDetail";

const Component = styled(Box)`
    background: #F2F2F2;
    margin-top: 55px;
`;

const Container = styled(Grid)(({theme}) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));


const RightContainer = styled(Grid)`
    margin-top : 50px;
    padding-left: 25px;
    & > p {
        margin-top: 10px;
    }
`;

const DetailView = () => {

    const dispatch = useDispatch();
    const{id} = useParams();
    
    const {loading, product} = useSelector(state => state.getProductDetails); // we want to take loading, product data from redux

    

    useEffect(() => {
        if(product && id !== product.id)
        dispatch(getProductDetails(id))
    },[dispatch, id, loading, product])
    // dispatch, id, loading, product values will keep on changing so we added here.

    console.log(product);

    return(
        <Component>
            {
                product && Object.keys(product).length &&
                <Container container> {/* parent grid  */}
                
                    <Grid item lg={4} md={4} sm={8} xs={12}> {/* child grid */}
                        
                        <ActionItem product = {product}/>
                    </Grid>

                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                       
                        <ProductDetail product = {product} />
                                                             
                    </RightContainer>
                    
                </Container>
            }
        </Component>
    )
}

export default DetailView;