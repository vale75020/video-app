import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Home extends Component {
  constructor() {
    super();

    this.state = {
      videoCount: 0,
      serieCount: 0,
      videos: [],
      series: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:5000/stats")
    .then((r) => r.json())
    .then((stats) => {
      this.setState({
        videoCount: stats.videoCount,
        serieCount: stats.serieCount
      });
    });

    fetch("http://localhost:5000/videos")
    .then((r) => r.json())
    .then((videos) => {
      this.setState({
        videos: videos
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { videoCount, serieCount,videos } = this.state
   // let videoCount = 2;
   // let serieCount = 2;
   const videoList = videos.map(video => (
   <ListItem key={video._id} button component={Link} to={`/videos/${video._id}`}>
     <ListItemText  primary={video.title} />
   </ListItem>
   ));
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <List component="nav">
              <ListItem button>
                <ListItemText primary="Series" />
                <ListItemText primary={serieCount} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Videos" />
                <ListItemText primary={videoCount} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <Typography variant="h6" color="inherit">
            Videos
            </Typography>
            <List>{videoList}</List>
            </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
