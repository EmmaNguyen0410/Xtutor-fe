import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

const LText = () => {
    return (
        <div>
            <Grid item xs={4}>
                <Typography style={{ fontSize: 36 , marginLeft : 80, marginTop:150, color: '#FFFFFF'}}>
                    Education is the key to success in life, and teachers make a lasting impact in the lives of their students.
                </Typography>
            </Grid>
        </div>
    );
}
export default LText;