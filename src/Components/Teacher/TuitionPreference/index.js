import React from 'react';
import TeachingExperience from './TeachingExperience'
import TeachingSubject from './TeachingSubject'
import axios from '../../../axios'
import Grid from '@material-ui/core/Grid'
import TeachingReference from './TeachingReference';
class EditMyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: []
        };
        // this.handleSubChange = this.handleSubChange.bind(this);
    };
    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs = {6}>
                    <TeachingReference />
                    </Grid>
                    <Grid item xs = {6}>
                    <TeachingExperience />
                    </Grid>
                </Grid>
                <TeachingSubject/>
            </div>
        );
    }
}

export default EditMyProfile