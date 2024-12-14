import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from '../../../axios';

const options = [
  'Sign Out',
  'Edit Profile',
  'My Calendar'
];
const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleMenuItem = (index) => {
    const { history } = this.props;
    if(index === 0){
      console.log("sign out");
      axios.get(`api/auth/logout?token=${localStorage.getItem('token')}`)
      .then(() => {
          console.log('ghjhgg')
          localStorage.removeItem('role');
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem("tutor_id");
          localStorage.removeItem("user_id")
          document.location.href = "/login"
      })
      .catch(err => {
        console.log(err)
        this.setState({ anchorEl: null });
      })

    }
    if(index === 1){
      history.push("/editmyprofile");
      this.setState({ anchorEl: null });
    }
    if(index === 2){
      history.push("/student/allclasses")
      this.setState({ anchorEl: null });
    }
    if(index == 3){
      history.push("/student/myprofile");
      this.setState({ anchorEl: null});
    }
  }
  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log('history', this.props.history)

    return (
      <div>
        <IconButton
          style ={{color : 'white',marginTop : 5}}
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem 
              key={option} 
              selected={option === 'Pyxis'} 
              onClick={() => this.handleMenuItem(index)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default LongMenu;