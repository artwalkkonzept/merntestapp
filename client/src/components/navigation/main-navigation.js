  import React, { Component } from "react";
  import { Switch, Route, Link, NavLink } from "react-router-dom";
  import "bootstrap/dist/css/bootstrap.min.css";
  import '../../../src/App.css';
  
  import AuthService from "../../services/artwalk.service";
  
  import Login from "../../pages/login.component";
  import Register from "../../pages/register.component";
  import Home from "../../pages/home.component";
  import Profile from "../../pages/profile.component";
  import BoardUser from "../../pages/board-user.component";
  import BoardModerator from "../../pages/board-moderator.component";
  import BoardAdmin from "../../pages/board-admin.component";
  
  import User from "../../pages/user.component";
  
  class mainNavigation extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
      };
    }
  
    componentDidMount() {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        this.setState({
          currentUser: user,
          showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
          showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        });
      }
    }
  
    logOut() {
      AuthService.logout();
    }
  
    render() {
      const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
  
      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <NavLink to={"/"} className="navbar-brand">
              bezKodernut
            </NavLink>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
  
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}
  
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
  
              {currentUser && (
                <li className="nav-item">
                  <Link to={"./userid"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>
  
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
  
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
  
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/userid" component={User} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
      );
    }
  }
  
  export default mainNavigation;