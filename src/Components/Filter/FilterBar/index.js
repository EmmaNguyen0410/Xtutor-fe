import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { withFormik, Form } from 'formik'
import Button from '@material-ui/core/Button'
import axios from '../../../axios'

const FilterBar = ({ values, handleChange }) => {
    console.log(values)
    return (
        <Grid container justify='space-around' direction="row">
            <Grid item xs={2}>
                <Form>
                    <FormControl style = {{width: 150, marginLeft: 80}} margin='normal'>
                        <InputLabel>Academic Level</InputLabel>
                        <Select
                            name='academic_level'
                            value={values.academic_level}
                            onChange={handleChange}
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'highschool'}>High School</MenuItem>
                            <MenuItem value={'university'}>University</MenuItem>
                        </Select>
                    </FormControl>
                </Form>
            </Grid>

            <Grid item xs={2}>
                <Form>
                    <FormControl style = {{width: 150}} margin='normal'>
                        <InputLabel>Grade</InputLabel>
                        <Select
                            name='academic_grade'
                            value={values.academic_grade}
                            onChange={handleChange}
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'grade1'}>Grade 1</MenuItem>
                            <MenuItem value={'grade2'}>Grade 2</MenuItem>
                            <MenuItem value={'grade3'}>Grade 3</MenuItem>
                            <MenuItem value={'grade4'}>Grade 4</MenuItem>
                            <MenuItem value={'grade5'}>Grade 5</MenuItem>
                        </Select>
                    </FormControl>
                </Form>
            </Grid>

            <Grid item xs={2}>
                <Form>
                    <FormControl style = {{width: 150}} margin='normal'>
                        <InputLabel>Subject</InputLabel>
                        <Select
                            name='subject'
                            value={values.subject}
                            onChange={handleChange}
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'math'}>Math</MenuItem>
                            <MenuItem value={'physic'}>Physic</MenuItem>
                            <MenuItem value={'chemistry'}>Chemistry</MenuItem>
                            <MenuItem value={'biology'}>Biology</MenuItem>
                            <MenuItem value={'literature'}>Literature</MenuItem>
                            <MenuItem value={'history'}>History</MenuItem>
                            <MenuItem value={'geography'}>Geography</MenuItem>
                            <MenuItem value={'english'}>English</MenuItem>
                            <MenuItem value={'computer'}>Computer</MenuItem>
                        </Select>
                    </FormControl>
                </Form>
            </Grid>

            <Grid item xs={4}>
                <Form>
                    <FormControl style = {{width: 150, marginLeft: 120}} margin='normal'>
                        <Button
                            variant='extendedFab'
                            color='primary'
                            type='submit'
                            style={{backgroundColor: '#52C1C8', color: "#FFFFFF"}}
                        >
                            GO 
                        </Button>
                    </FormControl>
                </Form>
                </Grid>
        </Grid>

    )
} 

const FormikForm = withFormik({
    mapPropsToValues({ }) {
        return {
            academic_level: '',
            academic_grade: '',
            subject: ''
        }
    },
    handleSubmit(values, { props }) {
        console.log(props)
        const { filter_std_info, changeTutors, fetching } = props;
        fetching(true)
        axios({
            method : 'post',
            url: `/api/user/tutor/filter?token=${localStorage.getItem('token')}`,
            data: values 
        }
        ).then((data) => {
                changeTutors(data.data)
                filter_std_info(values)
                fetching(false)
            }
        )
    }
})(FilterBar)

export default FormikForm; 
