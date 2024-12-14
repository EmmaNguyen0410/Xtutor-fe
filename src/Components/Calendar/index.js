import React from "react";
import BigCalendar from "../BigCalendar";
import axios from "../../axios";
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Circle from '../Circle'
import Dialog from '../Dialog'
import _ from "lodash"
import Instruction from '../Instruction'
import Typography from '@material-ui/core/Typography'
// import {PayPalButton} from 'react-'

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstEvents: [],
            oldEvents: [],
            addEvents: [],
            subject: "",
            fetching: true,
            open: false,
            textContent: "Your free-time has been updated",
            dialogTitle: "Successful!"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateOldEvents = this.updateOldEvents.bind(this);
        this.handleSubChange_Calendar = this.handleSubChange_Calendar.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    openDialog() {
        this.setState({ open: true })
    }
    closeDialog() {
        this.setState({ open: false })
    }
    componentDidMount() {
        const chosen_id = localStorage.role === "tutor" ? "id" : "tutor_id"
        axios.get(`/api/class/tutor/${localStorage.getItem(chosen_id)}`, {
            headers: { 'X-Auth-Token': `${localStorage.token}` },
        })
            .then(data => {
                const events = data.data;
                // console.log(events);
                if (localStorage.role === "student") {
                    events.forEach(element => {
                        if (element.status !== "free_time") {
                            element.status = "booked";
                        }
                    });

                } else {
                    events.forEach(element => {
                        if (element.status !== "free_time") {
                            element.status = "booked";
                        }
                    });
                }
                this.setState({
                    firstEvents: events,
                    oldEvents: events,
                    fetching: false
                });
            }
            )
            .catch(err => console.error(err));
    }
    getAddedEvents(currentEvents) {
        const addedEvents = currentEvents.slice(this.state.firstEvents.length, currentEvents.length);
        // console.log(currentEvents);
        this.setState({
            addEvents: addedEvents,
            currentEvents: currentEvents,
        });
        // console.log(this.state.addEvents)
    }
    handleSubChange_Calendar(sub) {
        this.setState({
            subject: sub
        }, () => {
            console.log('calendar is updated sub')
        })
    }
    handleSubmit() {
        if (localStorage.role === "student") {
            axios(
                {
                    url: "/api/class",
                    method: "post",
                    data: {
                        tutor_id: localStorage.tutor_id,
                        student_id: localStorage.id,
                        hourly_rate: 5,
                        sessions: this.state.addEvents,
                        subject: this.state.subject
                    },
                    headers: { "X-Auth-Token": `${localStorage.token}` }
                }
            )
        } else if (localStorage.role === "tutor") {

            const free_time = []
            this.state.oldEvents.forEach((item) => {
                if (item.status === "free_time") free_time.push(item)
            })
            // this.state.addEvents.forEach((item) => {
            //      if (item.status === "free_time") free_time.push(item)
            // })
            axios(
                {
                    url: `/api/user/tutor/update_free_time/${localStorage.id}`,
                    method: "put",
                    data: {
                        free_time: free_time
                    },
                    headers: { 'X-Auth-Token': `${localStorage.token}` }
                }
            );
            this.openDialog();
        }

    }
    updateOldEvents(currentEvents) {
        this.setState({ oldEvents: currentEvents });
    }

    render() {
        const { oldEvents, fetching, open } = this.state;
        const { setFunctionSave, setCalendarSave, history } = this.props;
        // if(_.isEmpty(oldEvents)){
        //     return <Circle />
        //}
        if (fetching) {
            return <Circle />
        }
        console.log(oldEvents);
        console.log(this.props);
        const buttonContent = localStorage.role === "student" ? "CLICK HERE TO BOOK YOUR CLASS" : "Update your free calendar"
        const displayed_button = localStorage.getItem('role') === 'student' ? (
            <Button style={{ backgroundColor: '#52C1C8', color: "#FFFFFF", marginTop: 80, width: '20%', height: 50, marginBottom : 100  }} onClick={() => {
                setCalendarSave(this.state.subject, this.state.addEvents);
                setFunctionSave("submitCalendar", this.handleSubmit);
                history.push("/payment");
            }}>{buttonContent}</Button>
        ) : (
                <Button style={{ backgroundColor: '#52C1C8', color: "#FFFFFF", marginTop: 20, marginLeft: 80 }} onClick={this.handleSubmit}>{buttonContent}</Button>
            )
        const display_tutor_instruction = localStorage.role === 'tutor' ? (
            <Grid style = {{marginLeft: 80}}>
            <Typography variant='h4' style={{ marginBottom: 20, marginTop: 20 }}>
              Update Your Freetime
            </Typography>
            <Grid container>
            <Grid xs={2}>
                <Instruction color="#c85452" content='YOUR CLASS' />
            </Grid>
            <Grid xs={2}>
                <Instruction color="#c88f52" content="TEACHER'S FREE TIME" style = {{marginLeft: 20}}/>
            </Grid>
            </Grid>
            </Grid>
        ): (false)
        return (
            <Grid>
                {display_tutor_instruction}
                <BigCalendar
                    handleSubChange_Calendar={this.handleSubChange_Calendar}
                    updateOldEvents={this.updateOldEvents}
                    dataFromProps={oldEvents}
                    getAddedEvents={currentEvents => this.getAddedEvents(currentEvents)}
                    subject={this.props.subject}
                />
                <Dialog
                    open={open}
                    handleClose={() => this.closeDialog()}
                    textContent={this.state.textContent}
                    title={this.state.dialogTitle}
                />
                {displayed_button}
            </Grid>
        );
    }
}
export default Calendar;