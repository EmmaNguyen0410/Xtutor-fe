import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const Tag = (props) => {
    return (
        <Grid container xs = {3} direction = 'column'>
            <Typography style = {{marginTop : 5, fontSize : 16, colors: "#000000"}} noWrap>
                {props.content}
            </Typography>
        </Grid>
    );
}

export default Tag;