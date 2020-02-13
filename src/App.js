import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginRoute from "./Routes/LoginRoute";
import RegistrationRoute from "./Routes/RegistrationRoute";
import Home from "./Components/Home"; // dashboard route??
import PrivateRoute from "./Components/PrivateOnly/PrivateRoute";
import PublicOnlyRoute from "./Components/PublicOnly/PublicOnlyRoute";
import RecipesRoute from "./Routes/RecipesRoute";
import PantryRoute from "./Routes/PantryRoute";
import IndividualIngredient from "./Components/Pantry/IndividualIngredient";
import MealPlans from "./Components/Planner/MealPlans";
import NotFoundRoute from "./Routes/NotFoundRoute";
import Profile from "./Components/Profile";
import Darkmode from "darkmode-js";
import Header from "./Components/Header";
import MakeMealPlans from "./Components/Planner/MakeMealPlans";
import EditMealPlan from "./Components/Planner/EditMealPlan";
// import Landing from "./Components/Landing";
// import AuthHelper from "../src/Helpers/Auth";
// import Context from "./Contexts/UserContext";
// import config from "./config";
// import MarketplaceRoute from "./Routes/MarketplaceRoute";
// import MealPlanningRoute from "./Routes/MealPlanningRoute";
// import DetailedView from "./Components/Recipes/Individual-Recipe";

const options = {
  bottom: "64px", // default: '32px'
  right: "32px",
  left: "unset",
  time: "0.5s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#100f2c", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: false, // default: true,
  label: "🌓", // default: ''
  autoMatchOsTheme: true // default: true
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      isLoggedIn: false,
      // hasToken: this.hasAuthToken(),
      recipes: [],
      hasError: false
    };
  }

  // componentDidMount() {
  //   if (this.hasAuthToken()) {
  //     AuthHelper.getCurrentUser(this.getAuthToken()).then(data =>
  //       this.setState(prevState => ({
  //         currentUser: data,
  //         isLoggedIn: true
  //       }))
  //     );
  //   }
  //   fetch("http://localhost:8000/api/recipes")
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       this.setState({ recipes: data });
  //     });
  // }

  // saveAuthToken = token => {
  //   window.localStorage.setItem(config.TOKEN_KEY, token);
  // };
  // getAuthToken = () => {
  //   return window.localStorage.getItem(config.TOKEN_KEY);
  // };
  // hasAuthToken = () => {
  //   return !!this.getAuthToken();
  // };
  // makeBasicAuthToken = (userName, password) => {
  //   return window.btoa(`${userName}:${password}`);
  // };

  // onLogin = () => {
  //   AuthHelper.getCurrentUser(this.getAuthToken()).then(
  //     data =>
  //       (this.setState = () => ({
  //         currentUser: data,
  //         isLoggedIn: true
  //       }))
  //   );
  // };

  // onLogout = () => {
  //   window.localStorage.removeItem(config.TOKEN_KEY);
  //   this.setState({ currentUser: {}, isLoggedIn: false });
  // };

  render() {
    const darkmode = new Darkmode(options);
    darkmode.showWidget();

    return (
      // <Context.Provider
      //   value={{
      //     currentUser: this.state.currentUser,
      //     hasToken: this.state.hasToken,
      //     isLoggedIn: this.state.isLoggedIn,
      //     saveAuthToken: this.saveAuthToken,
      //     getAuthToken: this.getAuthToken,
      //     hasAuthToken: this.hasAuthToken,
      //     makeBasicAuthToken: this.makeBasicAuthToken,
      //     recipes: this.state.recipes,
      //     onLogin: this.onLogin,
      //     onLogout: this.onLogout
      //   }}
      // >
      <div className="App">
        <Header user={this.state.currentUser} />
        <main>
          <Switch>
            {/* <PrivateRoute
              exact
              path={"/"}
              component={DashboardRoute}
            /> */}
            <PrivateRoute
              exact
              path={"/"}
              component={Home} // dashboard route??
            />
            <PrivateRoute exact path={"/user/:username"} component={Profile} />
            <PrivateRoute exact path={"/recipes"} component={RecipesRoute} />
            <PrivateRoute exact path={"/pantry"} component={PantryRoute} />
            <PrivateRoute
              path={"/pantry/:ingredientId"}
              component={IndividualIngredient}
            />
            <PrivateRoute
              exact
              path={"/planner"}
              component={(MealPlans, MakeMealPlans, EditMealPlan)}
            />
            {/* <PrivateRoute
              path={"/marketplace"}
              component={MarketplaceRoute}
            />*/}
            <PublicOnlyRoute
              exact
              path={"/register"}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute exact path={"/login"} component={LoginRoute} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
      //{" "}
      // </Context.Provider>
    );
  }
}

export default App;
