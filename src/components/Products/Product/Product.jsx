import React, { useState, useEffect } from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, CircularProgress } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './style';

const Product = ({ product, onAddToCart, cartLoading }) => {
  const [currentClicked, setCurrentClicked] = useState(``);

  useEffect(() => {
    if (!cartLoading) {
      setCurrentClicked(``)
    }
  }, [cartLoading])

  const classes = useStyles();
  // console.log(currentClicked)
  return (
    <Card className={classes.root}>

      <CardMedia className={classes.media} image={product.image.url} title={product.name} />
      <CardContent>

        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>

        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />

      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        {
          currentClicked !== product.id ? (

            <IconButton aria-label="Add to Cart" onClick={() => {
              setCurrentClicked(product.id)
              onAddToCart(product.id, 1)
            }}>
              <AddShoppingCart />
            </IconButton>
          ) : (
            <div className={classes.spinner}>
              <CircularProgress />
            </div>

          )
        }


      </CardActions>
    </Card>
  )
}

export default Product

//rafce in new file ... Check