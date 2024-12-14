import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

const Field = (props) => {
    return (
        <Grid container xs = {3} direction = 'column'>
            <Typography style = {{fontSize: 16}} noWrap>
                {props.tag}
            </Typography>
            <Typography style = {{marginTop : 10, fontSize : 16}} noWrap>
                {props.content}
            </Typography>
        </Grid>
    );
}
export default Field;