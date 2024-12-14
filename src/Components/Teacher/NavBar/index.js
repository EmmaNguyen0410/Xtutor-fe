import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Menu from './Menu'
import { NavLink } from 'react-router-dom'

class NavBar extends React.Component {

  render() {
    const { history } = this.props;
    return (
      <div>
        <AppBar position='static' style={{ background: '#c88f52' }}>
          <ToolBar>
            <Grid container style={{ alignContent: 'center' }}>
              <Grid item xs={7}>
                <Typography noWrap style={{ fontSize: 40, marginLeft: 80, color: 'white', fontWeight: 600 }}>
                  <NavLink to='/' style={{ textDecoration: 'none', color: 'white' }}>
                    X TUTOR
                  </NavLink>
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <Typography activeStyle={{}} style={{ fontSize: 18, marginTop: 15 }}>
                  <NavLink to='/tutor/update_freetime' activeStyle={{ color: '#000000' }} style={{ textDecoration: 'none', color: '#ffffff' }}>MY CALENDAR</NavLink>
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <Typography style={{ fontSize: 18, marginTop: 15 }}>
                  <NavLink to='/tutor/my_profile' activeStyle={{ color: '#000000' }} style={{ textDecoration: 'none', color: '#ffffff' }} >MY PROFILE</NavLink>
                </Typography>
              </Grid>

              <Grid item >
                <Typography style={{ fontSize: 18, marginTop: 15, color: '#ffffff' }} noWrap>
                  {localStorage.name}
                </Typography>
              </Grid>

              <Grid item xs={1} justify='center' alignContent='center' >
                <Menu history={history} />
              </Grid>
            </Grid>
          </ToolBar>

        </AppBar>
      </div>
    );

  }
}


export default NavBar;
