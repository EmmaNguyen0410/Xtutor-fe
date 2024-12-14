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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const Wrapper = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                subjects: null,
                open: false,
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
                    console.log("teaching sub", data.data.teaching_subject)
                    this.setState({ subjects: data.data.teaching_subject })
                })
                .catch(err => console.error(err))
        }

        render() {
            const { open } = this.state;
            const { subjects } = this.state;
            if (!subjects) return null;
            return <Component {...this.props} subjects={subjects} open={open} openDialog={this.openDialog} closeDialog={this.closeDialog} />
        }
    }
}

class TeachingSubject extends React.Component {
    render() {
        const { values, handleChange, errors, handleBlur, touched, open, closeDialog, openDialog } = this.props;
        console.log('values', values)
        // const { ;subjects } = this.state

        // console.log("initial", values)
        if (_.isEmpty(values)) {
            return <Circle />
        }
        return (
            <Form>
                <Grid container xs={12} direction="column" style={{ marginTop: 50, marginLeft: 80 }} alignItems='flex-start' >
                    <Typography variant='h3'>Teaching Subject</Typography>
                    <Grid container direction='row' xs={8} justify='flex-start' spacing={16} style={{ marginTop: 20 }} >
                        {/* <Grid item xs={2} >
                            <Typography variant='h4'>Subject</Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography noWrap variant='h4'>Academic Level</Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant='h4'>Grade</Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography noWrap variant='h4'>Hourly Rate</Typography>
                        </Grid> */}
                        <FieldArray
                            name="subjects"
                            render={({ push, remove }) => (
                                <Form>
                                    {values.subjects.map((sub, index) => (
                                        <Grid container direction='row' justify='flex-start' spacing={16} style={{ marginTop: 20, width: 1300}} >
                                            <Grid item xs={2}>
                                                <FormControl error={!!touched.year && errors.year}>
                                                    <Field
                                                        name={`subjects[${index}].subject`}
                                                        render={({ field, form: { touched, errors } }) => (
                                                            <div>
                                                                <InputLabel>Subject</InputLabel>
                                                                <Select
                                                                    displayEmpty
                                                                    {...field}
                                                                    onChange={handleChange}
                                                                    style= {{minWidth : 75}}
                                                                >
                                                                    <MenuItem value='math'>Math</MenuItem>
                                                                    <MenuItem value='physic'>Physic</MenuItem>
                                                                    <MenuItem value='chemistry'>Chemistry</MenuItem>
                                                                    <MenuItem value='biology'>Biology</MenuItem>
                                                                    <MenuItem value='literature'>Literature</MenuItem>
                                                                    <MenuItem value='history'>History</MenuItem>
                                                                    <MenuItem value='geography'>Geography</MenuItem>
                                                                    <MenuItem value='english'>English</MenuItem>
                                                                    <MenuItem value='computer'>Computer</MenuItem>
                                                                </Select>
                                                            </div>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2} >
                                                <FormControl error={!!touched.year && errors.year}>
                                                    <Field
                                                        name={`subjects[${index}].academic_level`}
                                                        render={({ field, form: { touched, errors } }) => (
                                                            <div>
                                                                <InputLabel>Academic level</InputLabel>
                                                                <Select
                                                                    displayEmpty
                                                                    {...field}
                                                                    onChange={handleChange}
                                                                    style= {{minWidth : 135}}
                                                                >
                                                                    <MenuItem value='highschool'>High School</MenuItem>
                                                                    <MenuItem value='university'>University</MenuItem>
                                                                </Select>
                                                            </div>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <FormControl error={!!touched.year && errors.year}>
                                                    <Field
                                                        
                                                        name={`subjects[${index}].academic_grade`}
                                                        render={({ field, form: { touched, errors } }) => (
                                                            <div>
                                                                <InputLabel>Grade</InputLabel>
                                                                <Select
                                                                    displayEmpty
                                                                    {...field}
                                                                    onChange={handleChange}
                                                                    style= {{minWidth : 75}}
                                                                >
                                                                    <MenuItem value='grade1'>Grade 1</MenuItem>
                                                                    <MenuItem value='grade2'>Grade 2</MenuItem>
                                                                    <MenuItem value='grade3'>Grade 3</MenuItem>
                                                                    <MenuItem value='grade4'>Grade 4</MenuItem>
                                                                    <MenuItem value='grade5'>Grade 5</MenuItem>
                                                                </Select>
                                                            </div>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <FormControl error={!!touched.year && errors.year}>
                                                    <Field
                                                        name={`subjects[${index}].hourly_rate`}
                                                        render={({ field, form: { touched, errors } }) => (
                                                            <div>
                                                                <InputLabel>Hourly rate</InputLabel>
                                                                <Input {...field} type="number" style= {{maxWidth : 100}} />
                                                                {touched[field.name] &&
                                                                    errors[field.name] && <div className="error">{errors[field.name]}</div>}
                                                            </div>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <FormControl>
                                                    <Button
                                                        style={{ backgroundColor: '#c85452', color: "#FFFFFF" }}
                                                        variant='extendedFab'
                                                        type="button"
                                                        className="secondary"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                </FormControl>
                                            </Grid>
                                        </Grid>))
                                    }
                                    <Grid container direction='row' xs={12} justify='flex-start' spacing={16} style={{ marginTop: 20 }} >
                                        <Grid item xs={1}>
                                            <FormControl>
                                                <Button
                                                    style={{ backgroundColor: '#52C1C8', color: "#FFFFFF" }}
                                                    variant='extendedFab'
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() => push({ subject: "", academic_level: "", academic_grade: "", hourly_rate: "" })}
                                                >
                                                    <AddIcon />
                                                </Button>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl>
                                                <Button
                                                    style={{ backgroundColor: '#52C1C8', color: "#FFFFFF", paddingLeft: 60, paddingRight: 60, marginLeft: 60 }}
                                                    variant='extendedFab'
                                                    type='submit'
                                                    onClick={() => {
                                                        console.log('gui ne')
                                                        axios({
                                                            url: `/api/user/tutor/update_teaching_sub?token=${localStorage.getItem('token')}`,
                                                            method: 'put',
                                                            data: {
                                                                id: localStorage.getItem('id'),
                                                                teaching_subs: values.subjects
                                                            }
                                                        })
                                                            .then((updated) => {
                                                                console.log(updated);
                                                                openDialog()
                                                                {/* document.location.href = '/tutor/tuitionpreference'; */ }
                                                            })
                                                            .catch(err => console.error(err))
                                                    }}
                                                >
                                                    Update Subject
                                                </Button>
                                                <Dialog
                                                    open={open}
                                                    handleClose={() => closeDialog()}
                                                    textContent="You have successfully update your subject"
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
                </Grid>
            </Form>
        )
    }
}

const FormikDefault = withFormik({
    mapPropsToValues(props) {
        console.log('prop', props)
        const { subjects } = props;
        console.log(subjects)
        return (props)
    },
    validationSchema: Yup.object().shape({
        subjects: Yup.array()
            .of(
                Yup.object().shape({
                    subject: Yup.string()
                        .required('Subject name is required'),
                    level: Yup.string()
                        .required('Academic level is required'),
                    grade: Yup.string()
                        .required('Grade is required'),
                    rate: Yup.string()
                        .required('Hourly rate is required')
                })
            )
    }),
    handleSubmit(values, { props }) {
        console.log(props)
        props.openDialog()
    }
})(TeachingSubject)

export default Wrapper(FormikDefault);