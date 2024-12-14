import { PayPalButton } from 'react-paypal-button'
import React, { Component } from "react";
import Dialog from "../Dialog";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          open: false
        }
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    openDialog(){
      this.setState({
        open: true
      })
    }
    closeDialog(){
      this.setState({
        open: false
      })
    }
    render(){
      const { functionSave } = this.props;
      const { submitCalendar } = functionSave;
      const { total_payment }  = this.props;
      const {open} = this.state;
      return (
        <div>
        <PayPalButton
            env='sandbox'
            sandboxID='AdYoouzmjCqV3zGJpHFJzOkDXieTh5RRpKApzRZ20smBQJL2jW3jmiDaCWTDwkpr6VKxd7tPKtlsw4DA'
            amount={total_payment}
            currency='USD'
            onPaymentSuccess={(res) => {
              console.log('success',res);
              this.openDialog();
              submitCalendar();
            }}
            onPaymentError={(res) => {
                console.log('error',res);
            }}
            onPaymentStart={(res) => {
                console.log('start',res);
            }}
        />
        <Dialog 
          open = {open}
          handleClose = {this.closeDialog}
          title= " Sucessful"
          textContent = "Your class has been booked!"
        />
        </div>
      )
    }
  }