import React from 'react';
import { Container, Typography, Button, Grid, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from "./styles"
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart, isLoading }) => {

  const classes = useStyles();
  const EmptyCart = () => (

    <Typography variant="subtitle1">You have no items in your shopping cart,
        <Link to="/" className={classes.link}> adding some</Link>!
    </Typography>

  )

  const FilledCart = () => !isLoading ? (
    <>
    <Grid container spacing={4}  xs={12} sm={12} >
      <Grid container  spacing={4} item xs={8} sm={10}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={5} key={item.id}>
            <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      <Grid xs={4} sm={2}>
         <div className={classes.cardDetails}>

    <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>

          <Button style={{ marginTop:"12px"}} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>

          
          <Button style={{color:"white", marginTop:"10px"}} component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
       

    </div>
      </Grid>
    </Grid>

   
    </>

  ) : (
    <div className={classes.spinner}>

      <CircularProgress />

    </div>
  );

  if(!cart.line_items) return "Loading..."

  return (
    <Container>

      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
        { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
      </div>
      
    </Container>
  )
}

export default Cart
