import BigCalendar from "../BigCalendar";
import React from "react";
import axios from "../../axios";
import "../BigCalendar/react-big-calendar.css";
import Grid from '@material-ui/core/Grid';
import _ from "lodash";
import Circle from '../Circle'


class StdCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      colors: ["#52c1c8","#c88f52","#c85452","#6baaaf","#7cacaf","#bb0369","#bb6a69"],
      fetching: false
    };
  }
  componentDidMount() {
    this.setState({fetching: true})
    const {colors} = this.state;
    const showEvents = [];
    axios.get(`api/class/student/${localStorage.id}?token=${localStorage.token}`)
      .then(data => {
        const classes = data.data;
        classes.forEach((oneClass,index) => {
          oneClass.sessions.forEach((session) => {
            session.color = colors[index];
            showEvents.push(session);
          });
        });
        setTimeout(() => {this.setState({events : showEvents, fetching: false})},2000)
      })
      .catch(err => console.error(err));
  }

  render() {
    const {events, fetching } = this.state;
    // if(_.isEmpty(events)){
    //   return <Circle/>
    // }
    if(fetching){
      return <Circle/>
    }
    return (
      <Grid style = {{marginLeft: 80, marginRight: 80}}>
        <BigCalendar
          dataFromProps={events}
          disabledEdit = {true}
        />
      </Grid>
    );
  }
}
export default StdCalendar;