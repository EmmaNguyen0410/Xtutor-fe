import React, { Fragment } from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './Components/LandingPage';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import TuitionDetail from './Components/Std/TuitionDetail';
import Filter from './Components/Filter';
import Editmyprofile from './Components/Std/EditMyProfile';
import StdCalendar from './Components/StdCalendar';
import Calendar from './Components/Calendar';
import TeacherDetail from './Components/Std/TeacherDetail';
import TuitionPreference from './Components/Teacher/TuitionPreference';
import NavStd from './Components/Std/NavBar'
import NavTutor from './Components/Teacher/NavBar'
import Paypal from './Components/Paypal'
// import MyDetail from './Components/Teacher/TeacherDetail'
import Tutor_Editmyprofile from './Components/Teacher/EditMyProfile'
import StudentDetail from './Components/Std/StudentDetail';
import Payment from './Components/Std/Payment'

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"Oswald", sans-serif',
  },
  palette: {
    primary: { main: grey[50] },
    secondary: { main: grey[900] },
  },
});

const ProtectedRoute = (props) => {
  const { component, path } = props;
  const token = localStorage.getItem("token");
  if (!token) return <Redirect to="login" />
  return <Route path={path} component={component} {...props} />
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.setFunctionSave = this.setFunctionSave.bind(this);
    this.setCalendarSave = this.setCalendarSave.bind(this);
  }

  state = {
    color: "primary",
    colors: 'white',
    role: localStorage.getItem('role'),
    functionSave: {},
    calendarSave:{
      subject: "",
      sessions: []
    }
  }

  setFunctionSave(name, func) {
    this.setState({
      functionSave: {
        ...this.state.functionSave,
        [name]: func
      }
    })
  }
  setCalendarSave(subject, sessions) {
    console.log('new sub', subject)
    console.log('new sessions', sessions)
    this.setState({calendarSave: {subject: subject, sessions: sessions}}, () => {
      console.log('new sub', subject)
      console.log('new sessions', sessions)     
    })
  }

  changeLogin = (status) => {
    const { color, colors } = status
    this.setState({
      color: color,
      colors: colors
    })
  }
  updateRole = (role) => {
    this.setState({
      role: role
    })
  }
  render() {
    let display;
    let navbar;
    if (this.state.role !== 'student' && this.state.role !== 'tutor'){
      navbar = (
        <NavBar color={this.state.color} colors={this.state.colors} />
      )
    }
    if (this.state.role === "student") {
      navbar = (
        <NavStd />
      )
      display = (
        <Fragment>
          <Route path='/filter' component={Filter} />
          <Route path='/editmyprofile' component={Editmyprofile} />
          <Route path='/student/allclasses' component={StdCalendar} />
          <Route path='/student/book_class' render={propsRoute => <Calendar {...propsRoute} setFunctionSave={this.setFunctionSave} />} />
          <Route path='/user' render={props => {
            return <TuitionDetail {...props}
            />
          }} />
          <Route path = '/paypal' render = {() => <Paypal functionSave={this.state.functionSave} />} />
          <Route path = '/payment' render = {() => <Payment functionSave={this.state.functionSave} calendarSave={this.state.calendarSave} />} />
          <Route path='/tutor/detail' render={propsRoute => <TeacherDetail {...propsRoute} setFunctionSave={this.setFunctionSave} setCalendarSave = {this.setCalendarSave} />} />
          <Route path = '/preference' component = {TuitionPreference} />
          <Route path = '/student/myprofile' component ={StudentDetail} />
        </Fragment>
      )
    }
    if (this.state.role === "tutor") {
      navbar = (  
        <NavTutor/>
      )
      display = (
        <Fragment>
          <Route path = '/tutor/tuitionpreference' render = {props => {
            console.log('dfsf')
            return <TuitionPreference />
          }}/>
          <Route path='/tutor/editmyprofile' component = {Tutor_Editmyprofile}/>
          <Route path = '/tutor/update_freetime' render ={() => <Calendar tutor_id = {localStorage.id} />} />
          <Route path = '/tutor/my_profile' component = {TeacherDetail}/>
        </Fragment>
      )
    }
    return (
      <BrowserRouter>
        <div>
          <MuiThemeProvider theme={THEME}>
            {navbar}
            <Switch>
              <Route path='/signup' render = {propsRoute => {
                return <Signup {...propsRoute}
              />}}/>
              <Route exact path='/' render = {props => {
                return <LandingPage {...props}
              />}} />
              <Route path='/login' render = {props => {
                return <Signin {...props} updateRole = {this.updateRole}
              />}}/>
              {display}
            </Switch>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
