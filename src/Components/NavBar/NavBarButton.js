import React from 'react'
import Grid from '@material-ui/core/Grid';

import { Button } from '@material-ui/core';


const NavBarButton = (props) => {
    return(
        <Grid item xs={1}>
              <Button color='primary' style = {{fontSize: 18}} href = {props.link}>{props.name}</Button>
        </Grid>
    );
}
export default NavBarButton;