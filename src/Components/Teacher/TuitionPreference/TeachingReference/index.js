import React from 'react';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import { Button, FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormHelperText from '@material-ui/core/FormHelperText'
import Menu from '../../../Menu'
import { withFormik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import _ from "lodash";
import axios from '../../../../axios'
import Circle from '../../../Circle'
import AddIcon from '@material-ui/icons/Add';
import Dialog from '../../../Dialog'
import { red } from '@material-ui/core/colors';


const Wrapper = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                reference: null,
                open: false
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
        componentDidMount() {
            axios.get(`api/user/tutor/${localStorage.id}?token=${localStorage.token}`)
                .then(data => {
                    console.log(data)
                    console.log("reference", data.data.reference)
                    this.setState({ reference: data.data.reference })
                })
                .catch(err => console.error(err))
        }

        render() {
            const { open } = this.state;
            const { reference } = this.state;
            if (!reference) return null;
            return <Component {...this.props} reference={reference} open={open} openDialog={this.openDialog} closeDialog={this.closeDialog} />
        }
    }
}

class TeachingReference extends React.Component {
    render() {
        const { values, handleChange, errors, handleBlur, touched, open, closeDialog } = this.props;
        console.log('values reference', values)
        // const { ;subjects } = this.state

        // console.log("initial", values)
        if (_.isEmpty(values)) {
            return <Circle />
        }
        console.log(values);
        return (
            <Form style={{ marginLeft: 80, marginTop: 40 }}>
                <Typography variant='h3' >Reference</Typography>
                <Grid container direction='row' xs={12} justify='flex-start' spacing={16} style={{ marginTop: 20, width: '100%' }} > 
                    <Grid item xs={5}>
                        <Typography variant='h4' style={{ marginBottom: 20 }} >About me</Typography>
                        <FormControl error={touched.about_me && errors.about_me}>
                            <Input onBlur={handleBlur} name="about_me" value={values.about_me} type="text" placeholder="About me" onChange={handleChange} style={{ width: 300, marginRight: 20 }} />
                        </FormControl>
                        <FormHelperText style={{color: 'red'}} id="component-error-text">{touched.about_me && errors.about_me ? errors.about_me : ''}</FormHelperText>
                    </Grid>
                </Grid>
                <Grid container xs={12} direction='column' style={{ marginTop: 20 }}>
                    <Typography variant='h4' >Major</Typography>
                    <FieldArray
                        style={{ width: '100%' }}
                        name="major"
                        render={({ push, remove }) => (
                            <Form>
                                {values.major.map((sub, index) => (
                                    <Grid container direction='row' xs={12} justify='flex-start' style={{ marginTop: 20, width: '100%' }} >
                                        <Grid item xs={5}>
                                            <FormControl>
                                                <Field
                                                    name={`major[${index}]`}
                                                    render={({ field, form: { touched, errors } }) => (
                                                        <div>
                                                            <Input {...field} type="text" placeholder="Major" style={{ width: 300, marginRight: 20 }} />
                                                            {touched[field.name] &&
                                                                errors[field.name] && <div className="error">{errors[field.name]}</div>}
                                                        </div>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl>
                                                <Button
                                                    style={{ backgroundColor: '#c85452', color: "#FFFFFF", marginLeft: 70 }}
                                                    variant='extendedFab'
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </FormControl>
                                        </Grid>
                                    </Grid>))
                                }
                                <Grid container direction='row' xs={12} justify='flex-start' alignItem="center" spacing={16} style={{ marginTop: 20 }} >
                                    <Grid item xs={3}>
                                        <FormControl>
                                            <Button
                                                style={{ backgroundColor: '#52C1C8', color: "#FFFFFF" }}
                                                variant='extendedFab'
                                                type="button"
                                                onClick={() => push("")}
                                            >
                                                <AddIcon />
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    />
                </Grid>
                <Grid container xs={12} direction='column' style={{ marginTop: 20 }}>
                    <Typography variant='h4' >Institute</Typography>
                    <FieldArray
                        style={{ width: '100%' }}
                        name="institute"
                        render={({ push, remove }) => (
                            <Form>
                                {values.institute.map((sub, index) => (
                                    <Grid container direction='row' xs={12} justify='flex-start' spacing={16} style={{ marginTop: 20, width: '100%' }} >
                                        <Grid item xs={5}>
                                            <FormControl>
                                                <Field
                                                    name={`institute[${index}]`}
                                                    render={({ field, form: { touched, errors } }) => (
                                                        <div>
                                                            <Input {...field} type="text" placeholder="Institute" style={{ width: 300 }} />
                                                            {/* {touched[field.name] &&
                                                                errors[field.name] && <div className="error">{errors[field.name]}</div>} */}
                                                        </div>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl>
                                                <Button
                                                    style={{ backgroundColor: '#c85452', color: "#FFFFFF", marginLeft: 70 }}
                                                    variant='extendedFab'
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </FormControl>
                                        </Grid>
                                    </Grid>))
                                }
                                <Grid container direction='row' xs={12} justify='flex-start' alignItem="center" spacing={16} style={{ marginTop: 20 }} >
                                    <Grid item xs={3}>
                                        <FormControl>
                                            <Button
                                                style={{ backgroundColor: '#52C1C8', color: "#FFFFFF" }}
                                                variant='extendedFab'
                                                type="button"
                                                onClick={() => push("")}
                                            >
                                                <AddIcon />
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    />
                </Grid>
                <Grid container xs={12} direction='column' style={{ marginTop: 20 }}>
                    <Typography variant='h4' >Certificate</Typography>
                    <FieldArray
                        style={{ width: '100%' }}
                        name="certificate"
                        render={({ push, remove }) => (
                            <Form>
                                {values.certificate.map((sub, index) => (
                                    <Grid container direction='row' xs={12} justify='flex-start' spacing={16} style={{ marginTop: 20, width: '100%' }} >
                                        <Grid item xs={5}>
                                            <FormControl>
                                                <Field
                                                    name={`certificate[${index}]`}
                                                    render={({ field, form: { touched, errors } }) => (
                                                        <div>
                                                            <Input {...field} type="text" placeholder="Certificate" style={{ width: 300 }} />
                                                            {touched[field.name] &&
                                                                errors[field.name] && <div className="error">{errors[field.name]}</div>}
                                                        </div>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl>
                                                <Button
                                                    style={{ backgroundColor: '#c85452', color: "#FFFFFF", marginLeft: 70 }}
                                                    variant='extendedFab'
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </FormControl>
                                        </Grid>
                                    </Grid>))
                                }
                                <Grid container direction='row' xs={12} justify='flex-start' alignItem="center" spacing={16} style={{ marginTop: 20 }} >
                                    <Grid item xs={3}>
                                        <FormControl>
                                            <Button
                                                style={{ backgroundColor: '#52C1C8', color: "#FFFFFF" }}
                                                variant='extendedFab'
                                                type="button"
                                                onClick={() => push("")}
                                            >
                                                <AddIcon />
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8} style={{ marginTop: 0 }}>
                                        <FormControl>
                                            <Button
                                                style={{ backgroundColor: '#52C1C8', color: "#FFFFFF", paddingLeft: 60, paddingRight: 60 }}
                                                variant='extendedFab'
                                                type='submit'
                                                onClick={() => {
                                                    console.log('axios', values)
                                                    axios({
                                                        url: `/api/user/tutor/update_reference?token=${localStorage.getItem('token')}`,
                                                        method: 'put',
                                                        data: {
                                                            id: localStorage.getItem('id'),
                                                            about_me: values.about_me,
                                                            major: values.major,
                                                            institute: values.institute,
                                                            certificate: values.certificate
                                                        }
                                                    })
                                                        .then((updated) => {
                                                            console.log(updated);
                                                            {/* document.location.href = "/tutor/tuitionpreference" */ }

                                                        })
                                                        .catch(err => console.error(err))
                                                }}
                                            >
                                                Update Reference
                            </Button>
                                            <Dialog
                                                open={open}
                                                handleClose={() => closeDialog()}
                                                textContent="You have successfully update your preference"
                                                title='SUCCESSFUL'
                                                link='/tutor/tuitionpreference'
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    />
                </Grid>
                <Grid>

                </Grid>
            </Form>
        )
    }
}

const FormikDefault = withFormik({
    mapPropsToValues(props) {
        const { reference } = props;
        console.log('reference initial', reference);
        console.log(props);
        return (
            reference
        )
    },
    validationSchema: Yup.object().shape({
        // subjects: Yup.array()
        //     .of(
        //         Yup.object().shape({
        //             subject: Yup.string()
        //                 .required('Subject name is required'),
        //             level: Yup.string()
        //                 .required('Academic level is required'),
        //             grade: Yup.string()
        //                 .required('Grade is required'),
        //             rate: Yup.string()
        //                 .required('Hourly rate is required')
        //         })
        //     )
        //reference: Yup.object().shape({
           about_me: Yup.string()
               .required("Please describe something about you!")
        //})
    }),
    handleSubmit(values, { props }) {
        console.log(props)
        props.openDialog()
    }
})(TeachingReference)

export default Wrapper(FormikDefault);