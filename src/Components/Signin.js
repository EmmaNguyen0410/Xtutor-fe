import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Input from '@material-ui/core/Input';
import axios from '../axios';
import TuitionPreference from './Teacher/TuitionPreference';
// import MyDetail from '../Components/Teacher/TeacherDetail';
import TeacherDetail from "../Components/Std/TeacherDetail"
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Dialog from './Dialog'

const WrapperComponent = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                open: false,
                content: '',
            }
            this.openDialog = this.openDialog.bind(this);
            this.closeDialog = this.closeDialog.bind(this);
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
        handleError = (error) => {
            console.log(error.message)
            this.setState ({
                content: error.message
            })
        }
        render() {
            const { open } = this.state;
            const {content} = this.state
            return <Component {...this.props} open={open} openDialog={this.openDialog} closeDialog={this.closeDialog} title = {this.state.title} handleError = {this.handleError} content = {content}/>
        }
    }
}

const CreateAccount = ({ values, handleChange, errors, touched, handleBlur, open, closeDialog, content }) => {
    let display = localStorage.getItem('token') ? (
        localStorage.getItem('role') === "tutor" ? (
            <TuitionPreference />
        ) : (
            <TeacherDetail />
            )
    ) : (
        
            <Form>
                <Grid container direction='column' style={{ marginTop: 150 }} alignContent='center' spacing={5} >
                    <Grid item xs={3}>
                        <Typography style={{ fontSize: 20 }} align='center'>
                            LOG INTO XTutor
                            </Typography>
                    </Grid>
                    <Grid container xs={3} justify='center'>
                        <Typography style={{ fontSize: 18, color: '#A7A7A7', fontWeight: 200 }} >
                            or&nbsp;
                            </Typography>
                        <Typography style={{ fontSize: 18, }} >
                            <Link to='/signup' style={{ color: '#A7A7A7', fontWeight: 200 }}>
                                Create Account
                            </Link>
                        </Typography>
                    </Grid>
    
                    <Grid item xs={3} style={{ marginTop: 30 }}>
                        <FormControl fullWidth error={!!touched.email && errors.email}>
                            <Input placeholder='Email Address' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            <FormHelperText>{touched.email && errors.email}</FormHelperText>
                        </FormControl>
                    </Grid>
    
                    <Grid item xs={3} style={{ marginTop: 30 }} error={!!touched.firstname && errors.firstname}>
                        <FormControl fullWidth error={!!touched.password && errors.password}>
                            <Input placeholder='Password' name='password' type='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                            <FormHelperText>{touched.password && errors.password}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Button type='submit' style={{ backgroundColor: '#52c1c8', color: "#ffffff", marginTop: 30 }}>Log In</Button>
                    <Dialog
                        open={open}
                        handleClose={() => closeDialog()}
                        textContent={content}
                        title = 'Oppsy!!!'
                    />
                </Grid>
            </Form>

    )
    return (
        <div>
            {display}
        </div>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({ }) {
        return {
            email: '',
            password: '',
            role : ''
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must have min 6 characters')
    }),
    handleSubmit(values, { props }) { //chua test
        axios({
            url: '/api/auth/login',
            method: 'post',
            data: {
                email: values.email,
                password: values.password,
            }
        })
            .then((sent_data, res) => {
                console.log('hihi',sent_data);
                console.log(res)
                localStorage.setItem('token', sent_data.data.token);
                localStorage.setItem('role', sent_data.data.userInfo.user_id.role);
                localStorage.setItem("id", sent_data.data.userInfo._id);
                localStorage.setItem("user_id", sent_data.data.userInfo.user_id._id);
                localStorage.setItem("name",sent_data.data.userInfo.user_id.profile.first_name + " " + sent_data.data.userInfo.user_id.profile.last_name)
                props.updateRole(localStorage.getItem('role'))
                if (localStorage.getItem('role') === "student") {
                    props.history.push('/user')
                }
                if (localStorage.getItem('role') === "tutor") {
                    props.history.push('/tutor/my_profile');
                }
            })
            .catch(err => {
                console.log(err.response.data)
                console.log(props)
                if(err.response.status === 404){
                    props.handleError(err.response.data)
                    // this.setState({title: 'ERROR', content : 'You can not sign in'})
                    props.openDialog();
                }
            })
    }
})(CreateAccount)


export default WrapperComponent(FormikForm);