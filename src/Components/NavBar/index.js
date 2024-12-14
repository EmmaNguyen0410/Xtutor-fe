import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router";

class NavBar extends React.Component {
  
  
  render() {
    return (
      <div>
        <AppBar position='static' style={{ backgroundColor: '#c88f52' }}>
          <ToolBar>
            <Grid container style={{ alignContent: 'center' }}>
              <Grid item xs={6}>
                <Typography noWrap style={{ fontSize: 40, marginLeft: 80, fontWeight: 600, color: '#ffffff' }}>
                  <NavLink to='/' style={{ textDecoration: 'none', color: 'white' }}>
                    X TUTOR
                  </NavLink>
                </Typography>
              </Grid>

              <Grid item xs={1} >
                <Typography style={{ fontSize: 18, marginTop: 15 }}>
                  <NavLink to='/' style={{ textDecoration: 'none', color: 'white' }}>
                    HOME
                  </NavLink>
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <Typography style={{ fontSize: 18, marginTop: 15 }}>
                  <NavLink to='/about' style={{ textDecoration: 'none', color: 'white' }} >
                  ABOUT
                  </NavLink>
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <Typography color='white' style={{ fontSize: 18, marginTop: 15 }}>
                  <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/blog'>
                  BLOG
                  </NavLink>
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <Typography color='white' style={{ fontSize: 18, marginTop: 15 }}>
                  <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/login' onClick={this.handleClick}>
                  LOG IN
                  </NavLink>
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <Typography color='white' style={{ fontSize: 18, marginTop: 15 }} >
                  <NavLink style={{ textDecoration: 'none', color: 'white' }} to='/signup'>
                  SIGN UP
                  </NavLink>
                </Typography>
              </Grid>
            </Grid>
          </ToolBar>
        </AppBar>
      </div>
    );

  }
}


export default withRouter(NavBar);
