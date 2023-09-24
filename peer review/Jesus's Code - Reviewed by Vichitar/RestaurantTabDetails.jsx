import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
/* SUGGESTION:
          The unused imports can be removed:
            import Tab from "react-bootstrap/Tab";
            import Tabs from "react-bootstrap/Tabs";
            import PendingReviews from "./Admin/PendingReviews.jsx";
            import PendingReviewPost from "./Admin/PostReviews/PendingReviewPost.jsx";
  ANSWER: I agree. I forgot
*/
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Global } from "../helpers/Global.js";
import Review from "./Reservations/Review.jsx";
import PendingReviews from "./Admin/PendingReviews.jsx";
import PendingReviewPost from "./Admin/PostReviews/PendingReviewPost.jsx";
import FoodDetails from "./HomePage/Reservation/FoodDetailsCard.jsx";

function RestaurantTabDetails({ restaurantDetail }) {
  const baseUrl = Global.baseUrl;
  const [foods, setFoods] = useState([]);
  const [user, setuser] = useState(null);
  const [parkingsNumber, setParkings] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (restaurantDetail !== null) {
      
      setuser(JSON.parse(localStorage.getItem("user")));
      // Get foods from the restaurant
      axios
        .get(baseUrl + "foods/restaurant/" + restaurantDetail.id)
        .then((response) => {
          setFoods(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    axios
    .get(baseUrl + "parkings/restaurant/" + restaurantDetail.id)
    .then((response) => {
      setParkings(response.data.length);
      /* SUGGESTION:
          The console log can be removed as it would be irrelevant to the user.
          ANSWER: I agree. I forgot to remove it
      */
      console.log("Number of Parkings", parkingsNumber);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [parkingsNumber])
  
  return (
    /* SUGGESTION:
          Use className instead of class for every element.
      ANSWER: Rejected. I don't know why it is better to use className instead of class
    */
    <div className="container">
      
      <div class="card text-center">
        
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="information-tab" data-bs-toggle="tab" data-bs-target="#information-tab-pane" type="button" role="tab" aria-controls="information-tab-pane" aria-selected="true">Information</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="menu-tab" data-bs-toggle="tab" data-bs-target="#menu-tab-pane" type="button" role="tab" aria-controls="meun-tab-pane" aria-selected="false">Menu</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">Reviews</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="parking-tab" data-bs-toggle="tab" data-bs-target="#parking-tab-pane" type="button" role="tab" aria-controls="parking-tab-pane" aria-selected="false">Parking</button>
            </li>
          </ul>
        </div>
        
        <div class="card-body">
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="information-tab-pane" role="tabpanel" aria-labelledby="information-tab" tabindex="0">
              <div className="row px-5 mx-5">

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      Telephone
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.telephone}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      Address
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.address}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      State
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.state}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      City
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.city}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-4 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      ZIP
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.zip}</li>
                    </ul>
                  </div>     
                </div>

                <div className="col-md-12 pt-5">
                  <div class="card">
                    <div class="card-header fw-bold">
                      Description
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{restaurantDetail.description}</li>
                    </ul>
                  </div>     
                </div>

              </div>
            </div>
            <div class="tab-pane fade" id="menu-tab-pane" role="tabpanel" aria-labelledby="menu-tab" tabindex="0">
              {
                user !== null &&
                user.rolId !== 9? null : 
                <Button className="btn-primary m-1" 
                  onClick = {() => navigate("/createFood/" + restaurantDetail.id)}
                > Add Food</Button>
              }
              <p>
                {foods.length !== 0
                  ? 
                  foods.map((food) => (
                    <FoodDetails
                      key={food.id}
                      name={food.name}
                      image={food.image}
                      ingredients={food.ingredients}
                      price={food.price}
                      displayInput={false}
                    />
                  ))
                  :
                  <p className="text-center mt-4 fs-3"> This restaurant has no uploaded menu</p>
            }
              </p>
            </div>
            <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">
              <Button
                className="btn-primary m-1"
                onClick={() => navigate("/AddReview/" + restaurantDetail.id)}
              > Add Review</Button>
              <Review 
                restaurantDetail={restaurantDetail}
              />
            </div>
            <div class="tab-pane fade" id="parking-tab-pane" role="tabpanel" aria-labelledby="parking-tab" tabindex="0">
              {/* SUGGESTION: 
                        Intendation could be improved for the p tag below  -- PS Sorry, I meant Indentation
                ANSWER: I did not this line of code and I dont understand what you mean exactly.
              */}
              <p className="text-center mt-4 fs-3">{parkingsNumber > 0?"This restaurant has "+parkingsNumber+" places in total":"This Restaurant has no Parking Facilities Section"}</p>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default RestaurantTabDetails;
