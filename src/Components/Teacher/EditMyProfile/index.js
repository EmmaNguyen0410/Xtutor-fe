import React, { Component } from 'react';
import FormDefault from './Form/Form';

class EditMyProfile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            address: "",
            dob: "",
            education: "",
            email: "",
            firstname: "",
            gender: "",
            lastname: "",
            nation: "",
            password: "",
            payment: "",
            paypal: "",
            phonenumber: "",
            plan: "",
            postal: "",
        }
    }
    editProfile = () => {
        console.log('afadsf')
    }
    render() {
        return (
            <FormDefault editProfile = {this.editProfile}/>
        )
    }
}




export default EditMyProfile