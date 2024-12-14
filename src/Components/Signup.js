import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link'
import Input from '@material-ui/core/Input';
import axios from '../axios';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Dialog from './Dialog'
import Imgur from './Imgur'
import Circle from './Circle'


const WrapperComponent = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                open: false,
                title: '',
                content: '',
                loading_image: false
            }
            this.openDialog = this.openDialog.bind(this);
            this.closeDialog = this.closeDialog.bind(this);
            this.uploadedStatus = this.uploadedStatus.bind(this);
            this.uploadingStatus = this.uploadingStatus.bind(this);
        }
        uploadedStatus(){
            this.setState({
                loading_image: false
            }, ()=> {
                console.log("uploaded")
            })
        }
        uploadingStatus(){
            this.setState({
                loading_image: true
            },()=> {
                console.log("uploading")
            })
        }
        openDialog() {
            this.setState({
                open: true
            })
        }

        closeDialog() {
            this.setState({
                open: false
            })
        }

        handleDialog = ({title, content}) => {
            this.setState({
                title:title,
                content : content
            })
        }  

        render() {
            const { open } = this.state;
            const {title} = this.state;
            const {content} = this.state;
            const { loading_image } = this.state;
            return <Component {...this.props} open={open} openDialog={this.openDialog} loading_image = {loading_image} uploadedStatus = {this.uploadedStatus} uploadingStatus = {this.uploadingStatus} closeDialog={this.closeDialog} handleDialog = {this.handleDialog} title = {title} content = {content}/>
        }
    }
}


const Login = ({ values, loading_image, handleChange, errors, touched, handleBlur, open, closeDialog, title, content, setFieldValue, uploadedStatus, uploadingStatus }) => {
    console.log(values);
    let displayed_image = loading_image?(<Circle/>):(
        <img alt="avatar" src={values.image_upload} style={{ width: 100, height: 100 }} /> 
    )
    return (
        <Form>
            <Grid container direction='column' xs={12} style={{ marginTop: 80 }} alignContent = 'center'>
                    <Grid item xs={4}>
                        <Typography style={{ fontSize: 18 }} align = 'center'>
                            Create Account
                        </Typography>
                    </Grid>
                    <Grid container xs={4} justify = 'center'>
                        <Typography style={{ fontSize: 18,color: '#A7A7A7', fontWeight: 200 }} >
                            or&nbsp;
                        </Typography>
                        <Typography style={{ fontSize: 18 }} >
                            <Link to = '/login' style={{ color: '#A7A7A7', fontWeight: 200 }}>
                                    Log In
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style = {{marginTop : 20}}>
                        <FormControl fullWidth error={!!touched.firstname && errors.firstname}>
                        <Input placeholder='First Name' name='firstname' value={values.firstname} onChange = {handleChange} fullWidth onBlur={handleBlur}/>
                        <FormHelperText>{touched.firstname && errors.firstname}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style = {{marginTop : 20}}>
                        <FormControl fullWidth error={!!touched.lastname && errors.lastname}>
                        <Input placeholder='Last Name'  name='lastname' value={values.lastname} onChange = {handleChange} fullWidth onBlur={handleBlur}/>
                        <FormHelperText>{touched.lastname && errors.lastname}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style = {{marginTop : 20}}>
                        <FormControl fullWidth error={!!touched.email && errors.email}>
                        <Input placeholder='Email Address' name='email' value={values.email} onChange = {handleChange} fullWidth onBlur={handleBlur}/>
                        <FormHelperText>{touched.email && errors.email}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style = {{marginTop : 20}}>
                        <FormControl fullWidth error={!!touched.password && errors.password}>
                        <Input placeholder='Password' type='password' name='password' value={values.password} onChange = {handleChange} fullWidth onBlur={handleBlur}/>
                        <FormHelperText>{touched.password && errors.password}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style = {{marginTop : 20}}>
                        <FormControl fullWidth error={!!touched.confirm_password && errors.confirm_password}>
                        <Input placeholder='Confirm Password' type='password' name='confirm_password' value={values.confirm_password} onChange = {handleChange} fullWidth onBlur={handleBlur}/>
                        <FormHelperText>{touched.confirm_password && errors.confirm_password}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style = {{marginTop : 20}}>
                        <InputLabel>Gender</InputLabel>
                        <FormControl fullWidth error={!!touched.gender && errors.gender}>
                        <Select
                            displayEmpty
                            name='gender'
                            value={values.gender}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>
                        </Select>
                        <FormHelperText>{touched.gender && errors.gender}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style = {{marginTop : 20}}>
                        <FormControl fullWidth error={!!touched.phonenumber && errors.phonenumber}>
                        <Input placeholder='Phone number' type='number' name='phonenumber' value={values.phonenumber}  onChange = {handleChange} fullWidth onBlur={handleBlur}/>
                        <FormHelperText>{touched.phonenumber && errors.phonenumber}</FormHelperText>                            
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style = {{marginTop : 20}}>
                        <InputLabel>You are?</InputLabel>
                        <FormControl fullWidth error={!!touched.role && errors.role}>
                        <Select
                            displayEmpty
                            name='role'
                            value={values.role}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value='student'>Student</MenuItem>
                            <MenuItem value='tutor'>Tutor</MenuItem>
                        </Select>
                        <FormHelperText>{touched.role && errors.role}</FormHelperText>                            
                        </FormControl>
                    </Grid> 
                    <Grid item xs={4} style={{ marginTop: 20}}>
                        <Imgur setFieldValue={setFieldValue} uploadedStatus = {uploadedStatus} uploadingStatus = {uploadingStatus} />
                        {/* <img alt="avatar" src={values.image_upload} style={{ width: 100, height: 100 }} /> */}
                        {displayed_image}
                    </Grid>     
                    <Grid item xs={4} style = {{marginTop : 20}}>

                        <Typography style={{ fontSize: 17 }} align = 'center' >

                            By creating an account, you agree to our Terms of Service and have read and understood the Privacy Policy
    
                        </Typography>
                    </Grid>
                    <Button type='submit' style={{ backgroundColor: '#52c1c8', color: "#ffffff", marginTop: 30, marginBottom: 30 }}>Create Account</Button>
                    <Dialog
                        open={open}
                        handleClose={() => closeDialog()}
                        textContent={content}
                        title = {title}
                        />
                </Grid>
        </Form>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({ }) {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirm_password: '',
            gender: '',
            phonenumber: '',
            role: '',
            image_upload: '',
        }
    },
    validationSchema: Yup.object().shape({
        firstname: Yup.string()
            .required('First name is required')
            .min(3, 'First name must have min 3 characters'),
        lastname: Yup.string()
            .required('Last name is required')
            .min(3, 'Last name must have min 3 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must have min 8 characters'),
        confirm_password: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm password must match'),
        phonenumber: Yup.number()
            .required('Phone Number is required')
            .min(10, 'Phone Number must have min 10 characters')
            .integer('Please provide integer'),
        role: Yup.string()
            .required('Role is required')

    }),
    handleSubmit(values, { props }) {
        axios({
            url: '/api/auth/register',
            method: 'post',
            data: {
                first_name: values.firstname,
                last_name: values.lastname,
                email: values.email,
                password: values.password,
                gender_name: values.gender,
                phone_num: values.phonenumber.toString(),
                role: values.role,
                profile_picture: values.image_upload
            }}).then((sent_data) => {
                console.log(sent_data)
                let status = sent_data.data.success;
                console.log(sent_data.data.success)
                if(status === 1){
                    props.handleDialog({title:'SUCCESSFUL', content: 'You have successfully create an account'})
                    props.openDialog();
                    props.history.push("/login");
                }else{
                    props.handleDialog({title:'OOPSY!!!', content: 'Your account has been registered'})
                    props.openDialog();
            }}).catch(err => console.log(err.response.data))
        }
})(Login)

export default WrapperComponent(FormikForm);