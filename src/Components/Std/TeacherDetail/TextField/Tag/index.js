import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const Tag = (props) => {
    return (
        <Grid container xs = {3} direction = 'column'>
            <Typography style = {{marginTop : 10, fontSize : 14, colors: "#99a0aa"}} noWrap>
                {props.content}
            </Typography>
        </Grid>
    );
}

export default Tag;