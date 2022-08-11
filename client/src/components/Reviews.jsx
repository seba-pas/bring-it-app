import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, setReviews } from "../actions/index.js";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import "../styles/Reviews.css";
import StarRating from './StarRating.jsx';

function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const products = useSelector((state) => state.productsDetail);
  const gState = useSelector((state) => state);
  

  useEffect(() => {
    dispatch(getReviews(products.id));
    return () => {
      dispatch(setReviews());
    };
  }, [products.id]);

  return (
    <div>
      <Container>
        <Row>
          {typeof reviews !== "string" ? (
            reviews.map((e) => (
              <div className="testimonial">
                <div className="pic">
                  <Avatar
                    size="lg"
                    onClick={() => history.push("/persona/usuarioE")}
                    name={`${e.userEmail} `}
                    src={gState.user.image}
                  >
                    <AvatarBadge
                      boxSize="0.08m"
                      bg="springgreen"
                      /* borderColor="springgreen" */
                    />
                  </Avatar>
                </div>
                <p className="description">{e.comment}</p>
                <h3 className="title">{e.userEmail}</h3>
                <small className="post"><StarRating stars={e.rating}/></small>
              </div>
            ))
          ) : (
            <div style={{textAlign:"center", color:"#8c52ff"}}>{"No tiene reviews correspondientes"}</div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Reviews;