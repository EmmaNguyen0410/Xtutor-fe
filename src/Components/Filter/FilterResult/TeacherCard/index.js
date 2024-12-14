import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Field from '../../Field';
import Paper from '@material-ui/core/Paper'
import {NavLink} from 'react-router-dom'



const styles = {
  root: {
    marginLeft: 80,
    marginTop: 30,
    marginRight: 80,
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

function TeacherCard(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <NavLink to = '/tutor/detail' style = {{textDecoration:'none'}} onClick ={() => localStorage.setItem('tutor_id', props.id)}>
        <Grid container xs={24} justify='space-between'>
          <Paper className={classes.background}>
            <Grid container xs={16}>
              <Grid item xs={3}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={props.image}
                      title="Teacher"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={7} style={{ marginLeft: 30 }}>
                <Typography variant='h5'>
                  {props.name}
                </Typography>
                <Grid container xs={12} spacing={50} style={{ marginTop: 10 }}>
                  <Field tag='Gender' content={props.gender} />
                  <Field tag='Address' content={props.address} />
                  <Field tag='Phone Number' content={props.phone} />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </NavLink>
    </div>
  );
}

TeacherCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherCard);