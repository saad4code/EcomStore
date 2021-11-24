// import Button from '@restart/ui/esm/Button';
import React from 'react'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Carousel } from "react-bootstrap";
import Image1 from "../../assets/image1.jpg"
// import Image2 from "../../assets/image2.jpg"
import Image3 from "../../assets/image3.jpg"
import Image4 from "../../assets/image4.jpg"
import Test1 from "../../assets/test1.jpg"

const Slider = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "640px", objectFit: "cover" }}
          src={Image1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 >MEGA DEALS</h3>
          <p>Biggest discounts of the year.</p>
          <Button style={{ marginBottom: "50px", backgroundColor: "#0062cc", color: "white" }} component={Link} variant="contained" to="/Products">Shop Now</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "640px", objectFit: "cover" }}
          src={Test1}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>RUSH HOUR</h3>
          <p>PREMIUM PRODUCTS FOR YOU</p>
          <Button style={{ marginBottom: "50px", backgroundColor: "#0062cc", color: "white" }} component={Link} variant="contained" to="/Products">Shop Now</Button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "640px", objectFit: "cover" }}
          src={Image3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>SPORTS</h3>
          <p>50% OFF.</p>
          <Button style={{ marginBottom: "50px", backgroundColor: "#0062cc", color: "white" }} component={Link} variant="contained" to="/Products">Shop Now</Button>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "640px", objectFit: "cover" }}
          src={Image4}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>EXTRA 10% OFF</h3>
          <p>SITE-WIDE WITH OUR PAYMENT PARTENRS.</p>
          <Button style={{ marginBottom: "10px", backgroundColor: "#0062cc", color: "white" }} component={Link} variant="contained" to="/Products">Shop Now</Button>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>

    // <div>
    //    <Button component={Link} variant="outlined" to="/Products">Back to Cart</Button>
    // </div>
  )
}

export default Slider
