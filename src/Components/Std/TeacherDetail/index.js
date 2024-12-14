import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Field from './Field';
import TextField from './TextField'
import Paper from '@material-ui/core/Paper'
import Menu from '../../Menu'
import Calendar from '../../Calendar'
import axios from '../../../axios';
import _ from "lodash";
import Circle from '../../Circle'
import TuitionDetail from "../TuitionDetail"
import Instruction from '../../Instruction'




class TeacherDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorInfo: {}

    }
  }
  componentDidMount() {
    const id = localStorage.role === "student" ? "tutor_id" : "id"
    axios.get(`/api/user/tutor/${localStorage.getItem(id)}`, {
      headers: { 'X-Auth-Token': `${localStorage.token}` },
    }).then((data) => { console.log('get api', data); this.setState({ tutorInfo: data.data }); console.log(this.state.tutorInfo) })
  }
  render() {

    const { classes } = this.props;
    const { tutorInfo } = this.state;
    // const { user_id } = tutorInfo;
    if (_.isEmpty(tutorInfo)) {
      return <Circle />
    }
    const display = localStorage.role === "student" ? (
      <Grid item xs={24}>
        <Grid>
          <Typography variant='h4' style={{ marginTop: 30 }}>
            Teacher's Calendar
        </Typography>
        </Grid>
        
            <Typography variant='h5' style={{ marginBottom: 20, marginTop: 20 }}>
              Booking Instruction
            </Typography>
          <Grid container spacing = {2} alignItems = 'center'>
          <Grid xs={2}>
            <Instruction color="#c85452" content='BOOKED' />
          </Grid>
          <Grid xs={2}>
            <Instruction color="#c88f52" content="TEACHER'S FREE TIME" style = {{marginLeft: 20}}/>
          </Grid>
          <Grid xs={2}>
            <Instruction color='#52C1C8' content='YOUR BOOKING CLASS' style = {{marginLeft: 20}}/>
          </Grid>
        </Grid>
        <Typography variant='h5' style={{ marginBottom: 20, marginTop: 20 }}>
          Choose a subject and pick your class
        </Typography>
        <Calendar {...this.props} style={{ marginLeft: 0, marginRight: 0 }} subject={this.state.tutorInfo.teaching_subject} />
      </Grid>) : (
        <Grid item xs={24}>
          <Typography variant='h4' style={{ marginTop: 30 }}>
            Your classes
        </Typography>
          <TuitionDetail />
        </Grid>)
    return (
      <div className={classes.root}>
        <Typography variant='h4' style={{ marginBottom: 20, marginTop: 20 }}>
          Tutor's Infomation
        </Typography>
        <Grid container xs={24} justify='space-between'>
          <Paper className={classes.background}>
            <Grid container xs={16}>
              <Grid item xs={2}>
                <Card style={{ borderRadius: 100 }} className={classes.card}>
                  <CardActionArea >
                    <CardMedia
                      className={classes.media}
                      image={this.state.tutorInfo.user_id.profile.profile_picture}
                      title="Teacher"
                      style={{ borderRadius: 100 }}
                    /> 
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={7} style={{ marginLeft: 30 }}>
                <Typography variant='h5'>
                  {` ${tutorInfo.user_id.profile.first_name} ${tutorInfo.user_id.profile.last_name} `}
                </Typography>
                <Grid container xs={12} spacing={50} style={{ marginTop: 10 }}>
                  <Field tag='Date of birth' content={tutorInfo.user_id.profile.date_of_birth} />
                  <Field tag='Gender' content={tutorInfo.user_id.profile.gender_name} />
                  <Field tag='Resides In' content={tutorInfo.user_id.profile.address} />
                  <Field tag='Phone number' content={tutorInfo.user_id.profile.phone_number} />
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction='column'>
              <TextField tag='About me' content={tutorInfo.reference.about_me} />
              <TextField tag='Major' content={tutorInfo.reference.major} />
              <TextField tag='Certificate' content={tutorInfo.reference.certificate} />
              <TextField tag='Speak/Language' content={tutorInfo.user_id.profile.language_name} />
              <TextField tag='Teaching Experience' content={tutorInfo.working_experience} />
              {/* <TextField tag='Teaching Subject'content={tutorInfo.teaching_subject} /> */}
            </Grid>
          </Paper>
        </Grid>
        {display}
      </div>
    );
  }
}

TeacherDetail.propTypes = {
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
})(TeacherDetail);
