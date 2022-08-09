import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../actions/index.js";

function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const products = useSelector((state) => state.productsDetail);
  useEffect(() => {
    dispatch(getReviews(products.id));
  }, []);

  return (
    <div>
      <Container>
        <Row>
          {typeof reviews !== "string" ? (
            reviews.map((e) => (
              <div style={{ display: "flex" }}>
                <h4 style={{ marginLeft: "10px" }}>{e.userEmail}</h4>
                <h4 style={{ marginLeft: "10px" }}>{e.comment}</h4>
                <h4 style={{ marginLeft: "10px" }}>{e.rating}</h4>
              </div>
            ))
          ) : (
            <div>{""}</div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Reviews;
