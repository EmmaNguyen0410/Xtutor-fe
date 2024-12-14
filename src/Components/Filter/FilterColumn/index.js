import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { withFormik, Form } from 'formik'
import Button from '@material-ui/core/Button'
import axios from '../../../axios'

const FilterColumn = ({values, handleChange}) => {
    return(
        <Grid container style={{ marginTop: 80, marginLeft: 100 }} direction="column">
            <Grid item xs={5}>
                <Form>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>Language</InputLabel>
                        <Select
                            displayEmpty
                            name='language_name'
                            value={values.language_name}
                            onChange={handleChange}
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'english'}>English</MenuItem>
                            <MenuItem value={'german'}>German</MenuItem>
                            <MenuItem value={'vietnamese'}>Vietnamese</MenuItem>
                            <MenuItem value={'mandarin'}>Mandarin</MenuItem>
                        </Select>
                    </FormControl>
                </Form>
            </Grid>

            <Grid item xs={5}>
                <Form>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>Education</InputLabel>
                        <Select
                            displayEmpty
                            name='academic_level_name'
                            value={values.academic_level_name}
                            onChange={handleChange}
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'primaryschool'}>Primary School</MenuItem>
                            <MenuItem value={'secondaryschool'}>Secondary School</MenuItem>
                            <MenuItem value={'highschool'}>High School</MenuItem>
                            <MenuItem value={'university'}>University</MenuItem>
                        </Select>
                    </FormControl>
                </Form>
            </Grid>
            <Grid item xs= {5}>
                <Form>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            displayEmpty
                            name='gender_name'
                            value={values.gender_name}
                            onChange={handleChange}
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin='normal'>
                        <Button
                            variant='extendedFab'
                            color='primary'
                            type='submit'
                            style={{ backgroundColor: '#52C1C8', color: "#FFFFFF", paddingLeft : 60, paddingRight: 60, marginTop : 10}}
                        >
                            Filter
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
            language_name: '',
            academic_level_name: '',
            gender_name: ''
        }
    },
    handleSubmit(values, {props}) {
        const {filter_tutor_info} = props;
        // axios({ 
        //     method : 'post',
        //     url: '/api/user/tutor/filter',
        //     data: {
        //         language_name: values.language,
        //         academic_level_name: values.education,
        //         gender_name: values.gender,
        //     },
        //     headers: { 'X-Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYW9ucDA0MTA5OUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTU1ODMyOTI1NX0.lkqx-o-14-saMoKmbEJQKWqIUSyTgyMZtdv5QLjQ-1c' } 
        // }).then(data =>
        //    changeTutors(data.data))
        filter_tutor_info(values)
    }
})(FilterColumn)


export default FormikForm 
