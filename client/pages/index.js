import Login from "../components/Login";
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
const jwt = require('jsonwebtoken')
import axios from 'axios'
import NavbarTop from "../components/NavbarTop";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import Dropdown from 'react-bootstrap/Dropdown';



export default function Home() {

  const [user_id, setUserId] = useState('');
  const [user_name, setUserName] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [check, setCheck] = useState("All");
  const categories = ["Laptops", "Phones", "Computer Accessories", "Books", "Furniture"];


  function fetchData() {
    axios.get(process.env.serverUrl+'/products/list')
    .then(res => {
      setAllData(res.data);
      setFilteredData(res.data);
    })
    .catch(err => console.error(err));
  }

  function printinconsole() {
    axios.post(process.env.serverUrl+'/users/auth',  {},
    {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then (res => {
      setUserId(res.data.user._id);
      setUserName(res.data.user.name);
    }).catch (err => console.log(err));
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const user = jwt.decode(token)
      if(!user){
        localStorage.removeItem('token')
      }else {
        printinconsole();
      }
    }
    fetchData();
    setLoading(false);
  },[user_id])

  function handleCategory(e) {
    setCheck(e.target.value);
    const category = e.target.value;
    if(category == 'All'){
      setFilteredData(allData);
      return ;
    }
    const data = [];
    for(var i=0; i < allData.length; i++) {
      if(allData[i].category == category){
        data.push(allData[i]);
      }
    }
    setFilteredData(data);
  }


  return (
    <div>
      { (isLoading) ? <div>Loading...</div> : 
          <div >
            <NavbarTop name={user_name}/>
            <div style={{margin: "10px"}}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <input type="radio" class="btn-check" name="options" id="All" autocomplete="off" value="All" onClick={(event) => handleCategory(event)} />
                  <label class={check == "All" ? "btn btn-primary" : "btn btn-light"} for="All">All</label>
                  {
                    categories.map((category, index) => (
                      <div>
                        <input type="radio" class="btn-check" name="options" id={category} autocomplete="off" value={category} onClick={(event) => handleCategory(event)}/>
                        <label class={check == category ? "btn btn-primary" : "btn btn-light"} for={category} style={{marginLeft: "3px"}}>{category}</label>
                      </div>
                    ))
                  }
                </div>
                <div className="d-flex">
                  <lable style={{paddingTop: "4%", paddingRight: "3px"}}>Sort By: </lable>
                  <Dropdown>
                    <Dropdown.Toggle variant="light">
                      Default
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Price(Low to High)</Dropdown.Item>
                      <Dropdown.Item href="#">Price(High to Low)</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => {}}>Rating (High to low)</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => {}}>Name (A to Z)</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => {}}>Name (Z to A)</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <ProductList data={filteredData}/>
            </div>         
            <Footer />
          </div>
      }
    </div>
  )
}
