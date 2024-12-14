import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';


const BookingButton = () => {
    let link_redirect;
    let button_content;
    if(localStorage.getItem('role') === 'student'){
        button_content = 'BOOK YOUR TUITION'
        link_redirect = "/filter"
    }else if(localStorage.getItem('role') === 'tutor'){
        button_content = 'GO TO YOUR CALENDAR'
        link_redirect = "/tutor/my_profile"
    }else{
        button_content = 'LOG IN TO BOOK TUITION'
        link_redirect = '/login'
    }

    return (
        <Grid item xs={3}>
            <Button noWrap color='primary' href = {link_redirect} style={{ background: '#52c1c8',marginLeft: 80, marginTop: 31, paddingTop: 17, paddingBottom: 17, paddingLeft: 45, paddingRight: 45, fontSize:18 }}>{button_content}</Button>
        </Grid>
    );
}
export default BookingButton;