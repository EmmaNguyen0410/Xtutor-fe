import React from 'react'
import { Typography } from '@material-ui/core';

function Empty (props){
    return(
        <div>
            <img src="https://image.flaticon.com/icons/svg/1376/1376786.svg" alt="Empty" height="100" width="100" style = {{position: props.position, top:'38%', left: '44%'}}/>
            <Typography variant = 'h4' color = '#000000' style = {{position: props.position, top:props.top, left: props.left}}>
                You have no class.
                <Typography variant = 'h4'>
                {props.content}
                </Typography>
            </Typography>
            
        </div>
    )
}

export default Empty;