import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import PropTypes, { element } from "prop-types";
import _ from "lodash";
import FormDialog from "./dialog";
import "./react-big-calendar.css";
import moment from "moment";
import Input from '@material-ui/core/Input';
import Dialog from '../Dialog'
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

const localizer = BigCalendar.momentLocalizer(moment);

class CalendarApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledEdit: props.disabledEdit,
      editState: false,
      open: false,
      events: [],
      event: {},
      subject: "",
      openDialog : false,
      textContent: "",
      title : ""
    };

    this.onSelectSlot = this.onSelectSlot.bind(this);
    this.closeDialogHandle = this.closeDialogHandle.bind(this);
    this.submitDialogHandle = this.submitDialogHandle.bind(this);
    this.onClickSlot = this.onClickSlot.bind(this);
    this.deleteHandle = this.deleteHandle.bind(this);
    this.convertToICT = this.convertToICT.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this)
  }
  openDialog(){
    this.setState({
      openDialog: true,
    })
  }
  closeDialog(){
    this.setState({
      openDialog: false,
    })
  }

  componentDidMount() {
    const { dataFromProps } = this.props;
    console.log(dataFromProps)
    const events = _.map(dataFromProps, el => ({
      ...el,
      start: this.convertToICT(el.start),
      end: this.convertToICT(el.end)
    }));
    this.setState({
      // eslint-disable-next-line react/prop-types
      events: events
    });
  }

  // Edit State để biết được là nó đang add New Hay Edit
  // EditState = False khi ấn cancel và => True khi ấn trực tiếp
  // Event là cái thằng chứa các thông tin để truyền qua Dialog,
  // khi Edit thì sẽ setState lại thằng này.
  // Open đơn giản là đóng hoặc mở modal
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const events = _.map(nextProps.dataFromProps, el => ({
        ...el,
        start: this.convertToICT(el.start),
        end: this.convertToICT(el.end)
      }));
      this.setState({
        events
      });
    }
  }
  componentDidUpdate() {
    // console.log(this.state.events);
  }
  onSelectSlot(e) {
    const { events, disabledEdit } = this.state;
    const { updateOldEvents, getAddedEvents } = this.props;
    let selectable = true;
    const free_time = [];
    const booked = [];
    let count = 0;
    const href = document.location.href.split("/");
    const path = href[href.length - 1];
    events.forEach((element) => {
      if((localStorage.role === "tutor") && ((moment(element.end).isSameOrAfter(moment(e.start))) && (moment(e.end).isSameOrAfter(moment(element.start))))){
        selectable = false;
        console.log("you have set this time free or have another class")
        this.setState({
          textContent : "You have set this time free or have another class",
          title : "Opps!!!"
        })
        this.openDialog()
      }
      if(localStorage.role === "student" && path !== "allclasses"  && element.title === ""){
        free_time.push(element)
      }else{
        booked.push(element);
      }
    });
    if(free_time.length !== 0){
      console.log(free_time);
      free_time.forEach((element) => {
        if(((moment(element.end).isSameOrAfter(moment(e.end))) && (moment(e.start).isSameOrAfter(moment(element.start))))){
          count++;
        }
      });
      if (count === 0) {
        selectable = false;
        this.setState({
          textContent : "You can only book class in tutor's free time",
          title : "Opps!!!"
        })
        this.openDialog()  
      }else{
        count = 0;
        booked.forEach((element) => {
          if(((moment(element.end).isSameOrAfter(moment(e.start))) && (moment(e.end).isSameOrAfter(moment(element.start))))){
            count++;
          }
        });
        if(count !== 0){
          selectable = false;
          this.setState({
            textContent : "This time has been booked ",
            title : "Opps!!!"
          })
          this.openDialog() 
        }
      }
    }else{
      if(localStorage.getItem('role') === 'student' && path !== "allclasses" ){
        selectable = false;
        this.setState({
          textContent : "You cannot book class because tutor's freetime is empty",
          title : "Opps!!!"
        })
        this.openDialog()
      }
    } 
    // console.log(selectable);
    if (updateOldEvents && getAddedEvents && selectable) {
      if (!disabledEdit) {
        const event = {
          start: e.start,
          end: e.end,
          title: "",
          status: localStorage.getItem("role") === "tutor" ? "free_time" : "student_book"
        };
        this.setState({
          open: true,
          event,
          events: [...events, event]
        });

      }
    }
  }

  onClickSlot(event, e) {
    // console.log(this.state.disabledEdit)
      e.preventDefault();
      this.setState({
        open: true,
        disabledEdit: (((localStorage.role === "tutor") && (event.title === "")) || ((event.status !== "free_time") && (event.status !== "booked"))) ? false : true,
        editState: true,
        event
      });
      // console.log(this.state);
  }

  deleteHandle(event) {
    let { events } = this.state;
    const { getAddedEvents, updateOldEvents } = this.props;
    if (updateOldEvents && getAddedEvents) {
      const indexEventChoose = _.findIndex(events, el => _.isEqual(event, el));
      events = _.filter(
        events,
        (el, index) => !_.isEqual(event, el) && index !== indexEventChoose
      );
      getAddedEvents(events);
      updateOldEvents(events);
      this.setState({
        events,
        open: false,
        disabledEdit: false
      });
    }
  }

  closeDialogHandle() {
    const { events, editState } = this.state;
    const { getAddedEvents, updateOldEvents } = this.props;
    if (updateOldEvents && getAddedEvents) {
      if (!editState) {
        events.pop();
        this.setState({
          open: false,
          events
        });
      }
      // console.log(this.state)
      this.setState({
        open: false,
        editState: false,
        disabledEdit: false
      });
    } else {
      this.setState({
        open: false,
        editState: false,
        disabledEdit: false
      });
    }
  }

  submitDialogHandle(pack) {
    const { event, events, editState, disabledEdit } = this.state;
    const { getAddedEvents, updateOldEvents } = this.props;


    if (updateOldEvents && getAddedEvents) {
      if (!disabledEdit) {
        if (!editState) {
          events.pop();
          const title = this.state.subject;
          const status = localStorage.getItem("role") === "tutor" ? "free_time" : "student_book"
          const start = this.convertToICT(pack.dateTimeStart);
          const end = this.convertToICT(pack.dateTimeEnd);
          const packaged = [
            ...events,
            {
              ...event,
              title,
              start,
              end,
              status
            }
          ];
          getAddedEvents(packaged);
          updateOldEvents(packaged);
          this.setState({
            open: false,
            events: [
              ...events,
              {
                ...event,
                title,
                start,
                end,
                status
              }
            ]
          });
        } else {
          const indexEventChoose = _.findIndex(events, el =>
            _.isEqual(event, el)
          );
          const title = pack.notes;
          const status = localStorage.getItem("role") === "tutor" ? "free_time" : "student_book"
          const start = this.convertToICT(pack.dateTimeStart);
          const end = this.convertToICT(pack.dateTimeEnd);
          const eventAfterEdit = {
            ...event,
            title,
            start,
            end,
            status
          };
          events[indexEventChoose] = eventAfterEdit;
          const packaged = events;
          // console.log(packaged);
          if (getAddedEvents && updateOldEvents) {
            getAddedEvents(packaged);
            updateOldEvents(packaged)
            this.setState({
              events,
              event: eventAfterEdit,
              open: false
            });
          }
        }
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  convertToICT(value) {
    return moment(value).toDate();
  }
  handleSubChange = (e) => {
    const { getAddedEvents, updateOldEvents } = this.props;
    if (updateOldEvents && getAddedEvents) {
      this.setState(
        { subject: e.target.value },
        () => {
          this.props.handleSubChange_Calendar(this.state.subject)
        }
      );
    }
  }

  render() {
    const { open, event, events, editState, disabledEdit, openDialog, closeDialog } = this.state;
    const href = document.location.href.split("/");
    const path = href[href.length - 1];
    const display = (path === "detail") ? (
    <FormControl style = {{minWidth: 120}}>
    <InputLabel>{this.state.subject}</InputLabel>
    <Select displayEmpty onChange = {this.handleSubChange} required>
      {this.props.subject.map((one_subject)=>{return (<MenuItem value={one_subject.subject}>{one_subject.subject}</MenuItem>)})}
    </Select>
    </FormControl>)
    : false
    return (
      // <Router >
      <div style={{ height: "100vh", marginTop: 20 }}>
        {display}
        <BigCalendar
        style = {{}}
          length={120}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={
            (event, start, end, isSelected) => {
              if (event.color) {
                return {
                  style: {
                    backgroundColor: event.color,
                    borderRadius: '10px'
                  }
                }
              }
              else if (event.status === "free_time") {
                return {
                  style: {
                    backgroundColor: "#c88f52",
                    borderRadius: '10px'
                  }
                }
              }
              else if (event.status === "booked") {
                return {
                  style: {
                    backgroundColor: "#c85452"
                  }
                }
              }
              else {
                return {
                  style: {
                    backgroundColor: "#52c1c8"
                  }
                }
              }
            }
          }
          selectable
          // toolbar={MyToolBar}
          onSelectSlot={this.onSelectSlot}
          onSelectEvent={this.onClickSlot}
        />

        {
          <FormDialog
            open={open}
            event={event}
            editState={editState}
            closeDialogHandle={this.closeDialogHandle}
            deleteHandle={this.deleteHandle}
            submitDialogHandle={this.submitDialogHandle}
            disabledEdit={disabledEdit}
          />
        }
        <Dialog
        open = {openDialog}
        handleClose = {()=>this.closeDialog()}
        textContent = {this.state.textContent}
        title = {this.state.title}
        />
      </div>
    );
  }
}

// Props disabled - show will disable actions
CalendarApp.defaultProps = {
  disabledEdit: false,
  dataFromProps: []
  // MyToolBar: undefined,
};

CalendarApp.propTypes = {
  getAddedEvents: PropTypes.func.isRequired,
  disabledEdit: PropTypes.bool,
  dataFromProps: PropTypes.arrayOf(PropTypes.shape({}))
  // MyToolBar: PropTypes.bool,
};

export default CalendarApp;
