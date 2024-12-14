/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Delete } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Grid, FormLabel, IconButton, DialogContent } from "@material-ui/core";

const style = {
  FormLabelCss: {
    marginTop: 24,
    marginBottom: 4
  }
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginRight: theme.spacing.unit,
    width: 230
  }
});

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  },
  deleteButton: {
    position: "absolute",
    right: 50,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const {
    children,
    classes,
    onClose,
    editState,
    deleteHandle,
    currentEvent
  } = props;
  const href = document.location.href.split("/");
  const path = href[href.length - 1];
  const displayDeleteButton = (path != "allclasses" && editState) ? (<IconButton
    aria-label="Close"
    className={classes.deleteButton}
    onClick={() => deleteHandle(currentEvent)}
  >
    <Delete color="error" />
  </IconButton>) : false
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      {displayDeleteButton}
      <FormLabel style={{ fontSize: 30 }} variant="h6">
        {children}
      </FormLabel>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      open: false,
      editState: false,
      notes: "",
      dateTimeStart: new Date(),
      dateTimeEnd: new Date(),
      event: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { open, event, editState } = this.props;
    if (open !== nextProps.open) {
      this.setState({
        open: nextProps.open
      });
    }
    if (event !== nextProps.event) {
      const { start, end, title } = nextProps.event;
      this.setState({
        event: nextProps.event,
        dateTimeStart: start,
        dateTimeEnd: end,
        notes: title
      });
    }
    if (editState !== nextProps.editState) {
      this.setState({
        editState: nextProps.editState
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // notes với title là 1
  
  render() {
    const {
      closeDialogHandle,
      submitDialogHandle,
      deleteHandle,
      classes,
      disabledEdit
    } = this.props;
    const { event, notes, editState, open } = this.state;
    const href = document.location.href.split("/");
    const path = href[href.length - 1];
    
    let { dateTimeStart, dateTimeEnd } = this.state;
    const { FormLabelCss } = style;

    if (event) {
      const pack = {
        dateTimeStart,
        dateTimeEnd,
        notes
      };
      const display = (path !== "allclasses" && !disabledEdit) ? (<Button
        onClick={() => {
          submitDialogHandle(pack);
          this.setState({
            notes: ""
          });
        }}
        color="#52c1c8"
      >
        Submit
      </Button>) : false
      dateTimeStart = moment(dateTimeStart).format("YYYY-MM-DDTHH:mm");
      dateTimeEnd = moment(dateTimeEnd).format("YYYY-MM-DDTHH:mm"); // 2019-09-12T20:30
      return (
        <div>
          <Dialog
            // fullWidth
            maxWidth="md"
            onClose={closeDialogHandle}
            open={open}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={closeDialogHandle}
              editState={disabledEdit ? false : editState}
              deleteHandle={deleteHandle}
              currentEvent={event}
            >
              Date & Time
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6} md={6}>
                  <FormLabel
                    style={FormLabelCss}
                    component="legend"
                    margin="normal"
                  >
                    Start
                  </FormLabel>
                  <form className={classes.container} noValidate>
                    <TextField
                      onChange={this.handleChange}
                      id="datetime-local"
                      name="dateTimeStart"
                      disabled={disabledEdit}
                      value={dateTimeStart}
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </form>
                </Grid>

                <Grid item xs={6} md={6}>
                  <FormLabel
                    style={FormLabelCss}
                    component="legend"
                    margin="normal"
                  >
                    End
                  </FormLabel>
                  <form className={classes.container} noValidate>
                    <TextField
                      onChange={this.handleChange}
                      id="datetime-local"
                      name="dateTimeEnd"
                      disabled={disabledEdit}
                      value={dateTimeEnd}
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </form>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {display}
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    return "";
  }
}

export default withStyles(styles)(FormDialog);

FormDialog.propTypes = {
  closeDialogHandle: PropTypes.func.isRequired,
  submitDialogHandle: PropTypes.func.isRequired,
  deleteHandle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  event: PropTypes.shape({}).isRequired,
  editState: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
  disabledEdit: PropTypes.bool.isRequired
};
