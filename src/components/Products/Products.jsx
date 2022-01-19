import React from "react";
import { Grid } from "@material-ui/core"
import Skeleton from 'react-loading-skeleton'
import Product from './Product/Product';
import 'react-loading-skeleton/dist/skeleton.css'
import useStyles from "./styles";

const skelton = [1, 2, 3, 4, 5, 6, 7, 8]

const Products = ({ products, onAddToCart, proLoading, cartLoading }) => {
   const classes = useStyles();

   return (
      <main className={classes.content}>

         <div className={classes.toolbar} />

         <Grid container justify="center" spacing={5} >

            {
               !proLoading ?
                  products.map((product, ind) => (

                     <Grid item xs={12} sm={6} md={4} lg={4} key={ind}>
                        <Product product={product} onAddToCart={onAddToCart} cartLoading={cartLoading} key={ind} />
                     </Grid>

                  ))
                  :
                  skelton.map((ind) => (
                     <Grid key={ind} item xs={12} sm={6} md={4} lg={3}>
                        <Skeleton variant="rect" width={210} height={118} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="circle" width={40} height={40} />
                     </Grid>
                  ))
            }
         </Grid>

      </main>
   )
}



export default Products;