import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const Tag = (props) => {
    return (
            <Typography style = {{fontSize : 16, colors: "#000000"}} noWrap>
                {props.content}
            </Typography>
    );
}

export default Tag;