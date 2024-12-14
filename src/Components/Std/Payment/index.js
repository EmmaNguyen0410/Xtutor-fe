import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import TextField from './TextField'
import Paper from '@material-ui/core/Paper'
import axios from '../../../axios';
import _ from "lodash";
import Circle from '../../Circle'
import PaymentIcon from '@material-ui/icons/Payment'
import PayPalButton from '../../Paypal/Paypal'
import moment from 'moment'




class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorInfo: {}

    }
  }
  componentDidMount() {
    const { functionSave } = this.props;
    const { calendarSave } = this.props;
    console.log('calenderSave in payment', calendarSave)
    console.log('update date functionsave',functionSave)
    const id = localStorage.role === "student" ? "tutor_id" : "id"
    axios.get(`/api/user/tutor/${localStorage.getItem(id)}`, {
      headers: { 'X-Auth-Token': `${localStorage.token}` },
    }).then((data) => { this.setState({ tutorInfo: data.data }); console.log(this.state.tutorInfo) })
  }
  render() {
    const { classes } = this.props;
    const { tutorInfo } = this.state;
    const { calendarSave } = this.props;
    // const { user_id } = tutorInfo;
    if (_.isEmpty(tutorInfo)) {
      return <Circle/>
    }
    console.log(tutorInfo);
    let fee_per_hour;
    for(let i = 0; i < tutorInfo.teaching_subject.length; i++){
      if(tutorInfo.teaching_subject[i].subject === calendarSave.subject){
        fee_per_hour = tutorInfo.teaching_subject[i].hourly_rate
      }
    }
    let total_hours = 0;
    let start;
    let end;
    let diff;
    for(let i = 0; i < calendarSave.sessions.length; i++){
      start = moment(calendarSave.sessions[i].start)
      end = moment(calendarSave.sessions[i].end)
      diff = end.diff(start, 'minutes')
      total_hours= total_hours + diff;
    }
    total_hours = total_hours/60;
    let total_payment = total_hours*fee_per_hour;
    console.log(total_hours)
    return (
      <div className={classes.root}>
        <Typography variant='h4' style={{ marginBottom: 20,  marginTop: 20  }}>
          Confirm your booking
        </Typography>
        <Grid container justify='space-between' style = {{marginBottom : 20}}>
          <Paper className={classes.background}>
            <Grid container>
              <Grid item xs={2}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={tutorInfo.user_id.profile.profile_picture}
                      title="Teacher"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item direction='column'>
              <TextField tag="Teacher's name" content={`${tutorInfo.user_id.profile.first_name} ${tutorInfo.user_id.profile.last_name}`} />
              <TextField tag='Fee per hour' content={fee_per_hour} />
              <TextField tag='Total hours' content={total_hours} />
              <TextField tag='TOTAL' content={total_payment} />
              {/* <TextField tag='Teaching Subject'content={tutorInfo.teaching_subject} /> */}
            </Grid>
            </Grid>
          </Paper>
        </Grid>
        <PayPalButton style = {{marginTop: 30}} {...this.props } fee = {fee_per_hour} total_hours = {total_hours} total_payment = {total_payment} />
      </div>
    );
  }
}

Payment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles({
  root: {
    marginLeft: 80,
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
})(Payment);
