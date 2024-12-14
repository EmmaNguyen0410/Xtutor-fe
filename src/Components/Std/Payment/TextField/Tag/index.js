import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const Tag = (props) => {
    return (
            <Typography style = {{fontSize : 14, colors: "#99a0aa"}} noWrap>
                {props.content}
            </Typography>
    );
}

export default Tag;