import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SessionCard from '../SessionCard';
import CancelTuition from './CancelTuition';
import axios from '../../axios';
import _ from "lodash";
import Circle from '../Circle'
import Empty from '../Empty'

const styles = theme => ({
  root: {
    width: '66%',
    overflowX: 'auto',
    marginLeft: 80
  },
  table: {
    minWidth: '60%',
    fontSize:16,
  },
  body: {
    fontSize: 16
  },
  listSession: {
    marginLeft: -14,
    "& > div > div > div": {
      padding: 8
    },
    "& > div > div": {
      padding: 8
    }
  }
});
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      fetching: false,
    }
    this.handleCancelTuition = this.handleCancelTuition.bind(this);
  }
  componentDidMount() {
    // console.log(localStorage.id)
    this.setState({
      fetching: true
    })
    if(localStorage.role === "student"){
      axios.get(`/api/class/student/${localStorage.id}`, {
        headers: { 'X-Auth-Token': `${localStorage.token}` },
      }).then((data) => this.setState({ classes: data.data, fetching: false }))
    }
    if(localStorage.role === "tutor"){
      axios.get(`/api/class/tutor/all/${localStorage.id}`, {
        headers: { 'X-Auth-Token': `${localStorage.token}` },
      }).then((data) => {
        // console.log(data.data)
        // const tutor_classes = [];
        // data.data.forEach(element => {
        //   if (element.title !== "") tutor_classes.push(element);
        // });
        // console.log(tutor_classes);
        this.setState({ classes : data.data, fetching: false});
      })
    }
    }
  handleCancelTuition(index) {
    let classes = this.state.classes;
    classes.splice(index, 1);
    this.setState({ classes: classes, });
  }

  render() {
    const { classes } = this.props;
    const { fetching } = this.state;
    
    if (fetching) {
      return <Circle />
    } else {
      if (_.isEmpty(this.state.classes) && localStorage.role === 'student')  {
        return <Empty position = 'absolute' top = '50%' left = '40%' content = 'BOOK NOW ?'/>
      }
      if (_.isEmpty(this.state.classes) && localStorage.role === 'tutor') {
        return <Empty position = 'relative' top = '50%' left = '40%'/>
      }

      console.log(this.state.classes)
      return (
        <div>
          {this.state.classes.map((one_class, index) => {
            const display_cancel = localStorage.role === "student" ? (<CancelTuition class_id={one_class._id} index={index} onCancelTuition={() => this.handleCancelTuition()} />) : null
            if(one_class.sessions){
              return (
                <div>
                  <Grid container justify='flex-start' direction = 'row'>
                    <Grid item xs = {2}>
                    <Typography variant = 'h4' style={{ marginTop: 50, marginLeft: 80 }}>
                      {one_class.subject}
                    </Typography>
                    </Grid>
                    {display_cancel}
                  </Grid>
                  <Grid item style={{ marginTop: 20 }}>
                    <Paper className={classes.root}>
                      <Table className={classes.table}>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left" scope="row" style = {{fontSize : 16}}>Fee : {one_class.hourly_rate}$/hour </TableCell>
                            <TableCell align="left" scope="row" style = {{fontSize : 16}}> Number of lessons: {one_class.sessions.length} </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                  <Grid container justify='flexstart' xs={11} style={{ marginBottom: 20 }}>
                    {/* <Typography style={{ fontSize: 18, marginLeft: 80, marginTop: 10 }}>
                      Session 1 / {one_class.sessions.length}
                    </Typography> */}
                  </Grid>
                  <Grid container spacing={8} style={{ marginLeft: 80 }} xs={8}>
                    <Grid container item xs={12} spacing={24} className={classes.listSession}>
                      {one_class.sessions.map((session, index) => {
                        return (
                          <div>
                            <Grid item>
                              <SessionCard ss_name={`Session ${index + 1}`} date={session.start.slice(0, 10)} time={session.start.slice(11, 16)} />
                            </Grid>
                          </div>
                        )
                      })}
                    </Grid>
                  </Grid>
                </div>
              )
            }
          })}
        </div>
      );
    }
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);