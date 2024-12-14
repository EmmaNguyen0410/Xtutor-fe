import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


export default function PaperSheet(props) {

  return (
    <div>
      <Paper style = {{backgroundColor: props.color, height : 20, padding: 8, fullWidth: true, marginLeft: 20}}>
        <Typography style = {{color: '#ffffff'}}>
          {props.content}
        </Typography>
      </Paper>
    </div>
  );
}
