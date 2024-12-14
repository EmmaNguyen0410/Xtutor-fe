import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Menu from './Menu'
import {NavLink} from 'react-router-dom'
import { withRouter } from "react-router";
import axios from '../../../axios'

class NavBar extends React.Component {

  
  render () {
    const { history } = this.props;
    return (
      <div>
        <AppBar position='static' style={{ background: '#c88f52',}}>
          <ToolBar>
          <Grid container style={{ alignContent: 'center' }}>
              <Grid item xs={7}>
                <Typography noWrap style = {{fontSize: 40, marginLeft : 80, color: 'white', fontWeight: 600}}>
                  <NavLink to='/' style={{ textDecoration: 'none', color: 'white' }}>
                    X TUTOR
                  </NavLink>
                </Typography>
              </Grid>

              <Grid item xs={1}>
              <Typography style = {{fontSize: 18, marginTop:15}}>
                <NavLink to = '/filter' activeStyle={{color:'#000000'}}  style={{ textDecoration: 'none', color: '#ffffff'}}>FIND A TUTOR</NavLink>
              </Typography>
              </Grid>

              <Grid item xs={1}>
              <Typography style = {{fontSize: 18, marginTop:15}}>
                <NavLink to = '/user' activeStyle={{color:'#000000'}} style ={{ textDecoration: 'none', color: '#ffffff'}} >MY TUITION</NavLink>
              </Typography>
              </Grid>

              <Grid item xs={1}>
                <Typography style={{ fontSize: 18, marginTop: 15, color: '#ffffff' }} noWrap>
                  {localStorage.name}
                </Typography>
              </Grid>

              <Grid item xs={1} justify = 'center' alignContent = 'center' >
                <Menu history={history} />
              </Grid>
              </Grid>
          </ToolBar>

        </AppBar>
      </div>
    );
    
  }
}


export default withRouter(NavBar);
