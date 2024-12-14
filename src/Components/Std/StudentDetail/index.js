import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Field from './Field/Field';
import TextField from './TextField/TextField'
import Paper from '@material-ui/core/Paper'



const styles = {
  root: {
    marginLeft: 80,
    marginTop: 50,
    marginRight: 30,
  },
  card: {
    maxWidth: 138,
  },
  media: {
    height: 138,
  },
  background: {
    backgroundColor: '#F1F1F1',
    padding: 20,
    width: 1000,
  },
  background1: {
    backgroundColor: '#F1F1F1',
    padding: 20,
    maxWidth: 800,
  }
};

function StudentDetail(props) {
  const { classes } = props;
  return (  
    <div className={classes.root}>
      <Grid container xs={24} justify = 'space-between'>
        <Paper className={classes.background}>
          <Grid container xs={16}>
            <Grid item xs={2}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1542304291-b9d13957968d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    title="Student"
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={7} style={{ marginLeft: 30 }}>
              <Typography variant='h5'>
                Student's Name
              </Typography>
              <Grid container xs={12} spacing={50} style={{ marginTop: 10 }}>
                <Field tag='Subject' content='English' />
                <Field tag='Teaches' content='Dotoral' />
                <Field tag='Resides In' content='Ha Noi' />
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={12} direction='column'>
            <TextField />
            <TextField tag='Teaches' content='Doctoral' />
            <TextField tag='Teaching Experience' content='2018 - 2020 : Expert Programming' />
            <TextField tag='Teaching Subject' content='XXX' />
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

StudentDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentDetail);