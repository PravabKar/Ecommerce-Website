import 'bootstrap/dist/css/bootstrap.css'
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';
import { MdOutlineSearch } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlinePix } from "react-icons/md";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';


const NavbarTop = (prop) => {

  const [search, setSearch] = useState('');

  useEffect(() => {
  },[])

  const logoutHandler = (event) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Logout',
      text: "Are you sure you want to log out",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'No',
      reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          Swal.fire(
            'Logged Out',
            'success'
            )
          window.location.href = '/';
          
          }
        })
    };

   return (
    <nav style={navStyles}>
      <div style={leftStyles}>
        <a href="/" style={logoStyles}  > <MdOutlinePix/> E-Shop  </a>
      </div>

      {
        !prop.hide ?
        <div style={centerStyles}>
          <input className='form-control' type="search" placeholder="Search for Products" style={searchStyles} value={prop.searchValue} onChange={(e) => prop.setSearchValue(e.target.value)}/>
          <button className='btn btn-warning' style={searchButtonStyles} onClick={prop.searchData}> <MdOutlineSearch/> </button>
        </div>:
        <></>
      }

      <div style={rightStyles}>
        {
          prop.name ? 
          <div className='d-flex'>
            <a href="/cart" style={linkStyles}> <MdOutlineShoppingCart style={{fontSize: "120%"}}/> </a>
            <Dropdown>
              <Dropdown.Toggle variant="dark">
                <MdOutlinePerson style={{marginRight: '5%'}} />
                {prop.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/order">Orders</Dropdown.Item>
                <Dropdown.Item as="button" onClick={logoutHandler}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>  :
          <div>
            <Link href="/login" style={linkStyles}>Login</Link>
            <Link href="/register" style={linkStyles}>SignUp</Link>
          </div> 
        }
      </div>
    </nav>
   )
}

const logoStyles = {
  color: '#6b96fa',
  textDecoration: 'none',
  fontFamily: 'Orbitron',
  fontSize: '25px',
  fontWeight: 'bold',
  marginRight: '10px',
  padding: '5px 10px',
}

const navStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: 'black',
  color: 'white'
};

const leftStyles = {
  flex: '0 0 auto',
};

const centerStyles = {
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20%',
  marginRight: '20%',
};

const searchStyles = {
  marginRight: '10px',
  padding: '5px',
};

const searchButtonStyles = {
  padding: '5px 10px',
};

const rightStyles = {
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
};

const linkStyles = {
  marginRight: '10px',
  padding: '5px 10px',
  color: 'white',
  textDecoration: 'none'
};


const dropdownStyles = {
  position: 'relative',
  display: 'inline-block',
};

const dropdownButtonStyles = {
  padding: '5px 10px',
};

const dropdownMenuStyles = {
  position: 'absolute',
  top: '100%',
  right: '0',
  zIndex: '1',
  display: 'none',
  backgroundColor: '#fff',
  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  minWidth: '120px',
};

const dropdownItemStyles = {
  display: 'block',
  padding: '10px',
  textDecoration: 'none',
  color: '#333',
};

export default NavbarTop