import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import TokenService from "../Helpers/Token";
import AddMealPlan from "../Components/Planner/MakeMealPlans";
import "../Styles/Planner.css";

class PlannerRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mealplans: [],
      addMealPlan: false
    };
  }

  componentDidMount() {
    this.getMealPlans();
  }

  // GET; then set state.title with response
  getMealPlans = () => {
    console.log("planner route get mealplans");
    const url = `${config.API_ENDPOINT}/planner`;
    const authToken = TokenService.getAuthToken();
    console.log("auth token is", authToken);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log("get mealplans data is", data);
        return this.setState({
          mealplans: data
        });
      });
  };

  // POST - add ingredient in pop-out view

  // PATCH using ingredient id, new route

  renderMealPlans = () => {
    const mealplans = this.state.mealplans;
    console.log("mealplans is", mealplans);
    return mealplans.map(mealplan => (
      <section className="mealplan-section" key={mealplan.id}>
        {/* <Link
          to={{
            pathname: `/planner/${mealplan.id}`,
            state: {
              title: mealplan.title,
              planned_date: mealplan.planned_date,
              prep_time: mealplan.prep_time,
              needed_ingredients: mealplan.needed_ingredients
            }
          }}
        > */}
        <h2 className="mealplan-title">{mealplan.title}</h2>
        {/* </Link>{" "} */}
        <span className="planned-date">{mealplan.planned_date}</span>{" "}
        <span className="prep-time">{mealplan.prep_time}</span>{" "}
        <Link
          // key={mealplan.id}   ...needs to be unique
          className="edit-mealplan-button"
          to={{
            pathname: `/planner/${mealplan.id}`,
            state: {
              id: mealplan.id,
              title: mealplan.title,
              planned_date: mealplan.planned_date,
              prep_time: mealplan.prep_time,
              needed_ingredients: mealplan.needed_ingredients
            }
          }}
        >
          Edit MealPlan
        </Link>
        <br />
      </section>
    ));
  };

  setStateAddMealPlanTrue = () => {
    this.setState({ addMealPlan: true });
  };

  setStateAddMealPlanFalse = () => {
    this.setState({ addMealPlan: false });
  };

  render() {
    console.log("this.state.add", this.state.addMealPlan);
    return (
      <section id="planner-route-container">
        <h2 className="my-planner-header" id="my-planner-header">
          My Mealplans
        </h2>
        {this.state.mealplans && this.renderMealPlans()}
        {this.state.mealplans.length > 0 && (
          <button
            id="modal-btn"
            className="Add-Meal-Plan-Button"
            type="submit"
            onClick={() => this.setStateAddMealPlanTrue()}
          >
            Add a MealPlan
          </button>
        )}
        <AddMealPlan
          addMealPlan={this.state.addMealPlan}
          allMealPlans={this.state.mealplans}
          refreshMealPlans={this.getMealPlans}
          closeAddForm={this.setStateAddMealPlanFalse}
        />
      </section>
    );
  }
}

export default PlannerRoute;