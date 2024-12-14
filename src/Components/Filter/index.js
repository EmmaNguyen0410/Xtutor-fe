import React from 'react';
import Grid from '@material-ui/core/Grid';
import FilterBar from './FilterBar';
import FilterColumn from './FilterColumn';
import FilterResult from './FilterResult';
import axios from '../../axios';
import Circle from '../Circle'
import _ from "lodash";

class Filter extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            tutors: [],
            tutor_info: {},
            std_info: {},
            fetching: '',
        }
        this.changeTutors = this.changeTutors.bind(this);
        this.filter_std_info = this.filter_std_info.bind(this);
        this.filter_tutor_info = this.filter_tutor_info.bind(this);
        this.fetching = this.fetching.bind(this)
    }

    changeTutors(tutors) {
        console.log(tutors)
        this.setState ({
            tutors : tutors
        })
    }
    filter_tutor_info(info){
        console.log('tutor info', info)
        this.setState({
            tutor_info: info
        }, () => {
            const all_info = Object.assign(this.state.std_info, this.state.tutor_info)
            console.log('all info', all_info)
            this.setState({
                fetching: true
            })
            axios({
                method : 'post',
                url: `/api/user/tutor/filter?token=${localStorage.getItem('token')}`,
                data: all_info
            }).then((data) => {
                console.log(data.data)
                this.setState({
                    tutors: data.data,
                    fetching:false
                })
            })
        })
    }
    filter_std_info(info){
        console.log('std info', info)
        this.setState({
            std_info: info
        })
    }
    fetching(status){
        console.log(status)
        this.setState({
            fetching : status
        })
    }
    render(){
        const { fetching } = this.state;
        let result;
        if(fetching){
            result = (<Circle/>)
        }else (result = <FilterResult tutors = {this.state.tutors}/>)
            return (
                <div>
                    <FilterBar filter_std_info={this.filter_std_info} changeTutors = {this.changeTutors} fetching = {this.fetching} />
                    <Grid container xs={12} direction='row'>
                        <Grid item xs={3}>
                            <FilterColumn  filter_tutor_info = {this.filter_tutor_info}/>
                        </Grid>
                        <Grid xs={6} style ={{marginTop : 60}}>
                            {result}
                        </Grid>
                    </Grid>
                </div>
            );        
    } 
}
export default Filter;