import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "../../axios"

class CancelTuition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClickOpen =this.handleClickOpen.bind(this);
    this.handleClose =this.handleClose.bind(this);
    this.handleCancelTuition = this.handleCancelTuition.bind(this);

  }


  handleClickOpen(){
    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open: false });
  };
  handleCancelTuition(){
    const {onCancelTuition, index} = this.props;
    onCancelTuition(index);
    axios.delete(`/api/class/${this.props.class_id}`,{
      headers : {"X-Auth-Token" : `${localStorage.token}`}
    });
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={{ marginTop: 50, backgroundColor: "#c85452"}}>
          Cancel Tuition
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cancel Tuition</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to cancel the whole tuition session.
              Please note that no refund will be given if you cancel the tuition.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Cancel Reason"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary" >
              Cancel
            </Button>
            <Button onClick={this.handleCancelTuition} style={{ backgroundColor: "#B23B37" }}>
              I'd like to cancel this tuition
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CancelTuition;