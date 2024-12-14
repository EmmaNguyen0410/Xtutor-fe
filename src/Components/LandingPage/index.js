import React from 'react';
import Paper from '@material-ui/core/Paper'
import BookingButton from './BookingButton'
import LText from './LText'
import Grid from '@material-ui/core/Grid'

export default function LandingPage() {
  return (
    <Grid container direction='column' justify='center'>
      <Paper square style={{
        height: 905,
        width: '100%',
        backgroundImage: `url(${"https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"})`,
        backgroundSize: "contain",
        position: 'static',
        top: 0
      }}>
        <Grid item xs = {12}>
          <LText />
        </Grid>
        <Grid item  xs = {12}>
          <BookingButton />
        </Grid>
      </Paper>
    </Grid>
  );
}

