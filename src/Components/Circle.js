import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


function CircularIndeterminate(props) {
    console.log(props)
  return (
    <div>
      <CircularProgress style = {{ color :"#52c1c8", display : props.display, position: 'absolute', top:'50%', left: '50%'}} size = {80}/>
    </div>
  );
}

export default CircularIndeterminate;