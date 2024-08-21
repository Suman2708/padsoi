import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider';
import Rightheader from './Rightheader';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const [text, setText] = useState("");
  const [liopen, setLiopen] = useState(true);
  const { products } = useSelector(state => state.getproductsdata);


  const history = useNavigate();
  const { account, setAccount } = useContext(Logincontext);
  const [dropen, setDropen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const getvaliduser = async () => {

    const res = await fetch("/getvaliduser", {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"

    });

    const data = res.json();
    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data is valid....");
      // setAccount(data);
    }

  }




  useEffect(() => {
    getvaliduser();
  }, []);

  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data2 = await res2.json();
    // console.log(data2);

    if (!res2.status === 201) {
      const error = new Error(res2.error);
      throw error;
    } else {
      setAccount(false);

      toast.success("user Logout 😃!", {
        position: "top-center"
      });
      history("/");
    }
  }

  const handelopen = () => {
    setDropen(true);
  }

  const handleClosedr = () => {
    setDropen(false)
  }

  const getText = (text) => {
    setText(text)
    setLiopen(false)
  }


  return (
    <header>
      <nav>
        <div className='left'>

          <IconButton className="hamburgur" onClick={handelopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen} onClose={handleClosedr} >
            <Rightheader logclose={handleClosedr} />
          </Drawer>
          <div className='navlogo'>
            <NavLink to='/'>
              <img src="./nk.png" />
            </NavLink>
          </div>
          <div className='nav_searchbaar'>
            <input type='text' name='' id=''
              onChange={(e) => getText(e.target.value)}
              placeholder="Search Your Products"
            />
            <div className='search_icon'>
              <SearchIcon id='search' />
            </div>
            {
              text &&
              <List className="extrasearch" hidden={liopen}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                      <NavLink to={`/productone/${product.id}`} onClick={() => setLiopen(true)}>
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))
                }
              </List>
            }
          </div>

        </div>
        <div className='right'>
          <div className='nav_btn'>
            <NavLink to='/login'>signin</NavLink>
          </div>
          {
            account ? <NavLink to="/buynow">
              <div className="cart_btn">
                <Badge badgeContent={account.carts.length} color="secondary">
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>

                <p>Cart</p>
              </div>
            </NavLink> : <NavLink to="/login">
              <div className="cart_btn">
                <Badge badgeContent={0} color="secondary">
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>
                <p>Cart</p>
              </div>
            </NavLink>
          }
          {
            account ?
              <Avatar className="avtar2"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >{account.name[0].toUpperCase()}</Avatar> :
              <Avatar className="avtar2"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
          }

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account ?
              <MenuItem onClick={handleClose} ><LogoutIcon onClick={logoutuser} /></MenuItem>
              : ""}

          </Menu>
        </div>

      </nav>
    </header>
  )
}

export default Navbar