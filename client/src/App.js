import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import 'roboto-fontface/css/roboto/roboto-fontface.css'; // import font from material ui
import Home from "./components/Home";
import "typeface-roboto";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class AppComponent extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            <Button color="inerith" component={Link} to="/">
            Home
            </Button>
              </Typography>
              <Button color="inerith" component={Link} to="/about/">
                About
              </Button>
            </Toolbar>
          </AppBar>
         
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          
        </div>
      </Router>
    );
  }
}

AppComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

let App = withStyles(styles)(AppComponent);

export default App;
