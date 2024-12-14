import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 0,
    marginTop : 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 20,
  },
};

function SessionCard(props) {
  const { classes } = props;
  

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="secondary" gutterBottom>
         {props.ss_name}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.date}
        </Typography>
        <Typography component="p">
        {props.time}          
        </Typography>
      </CardContent> 
    </Card>
  );
}

SessionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionCard);