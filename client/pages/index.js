import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
const jwt = require('jsonwebtoken')
import axios, { all } from 'axios'
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
  const [sortValue, setSortValue] = useState('Default');
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');
  const [ogData, setOgData] = useState([]);

  function fetchData() {
    axios.get(process.env.serverUrl+'/products/list')
    .then(res => {
      setOgData(res.data);
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
    setSortValue("Default");
  }

  const sortBy = (value) => {
    setSortValue(value);
    if(value == "Price(Low to High)"){
      filteredData.sort((a, b) => (a.price) - (b.price))
    }
    else if(value == "Price(High to Low)"){
      filteredData.sort((a, b) => (b.price) - (a.price))
    }
    else if(value == "Rating (High to low)"){
      filteredData.sort((a, b) => (b.rating) - (a.rating))
    }
    else if(value == "Name (Z to A)") {
      filteredData.sort((a, b) => b.name.localeCompare(a.name))
    }
    else {
      filteredData.sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  const searchData = (e) => {
    e.preventDefault();
    const result = [];
    const regex = new RegExp(`\\b${searchValue.toLowerCase()}`);

    for(let i = 0; i < ogData.length; i++) {
      if(ogData[i].name.toLowerCase().match(regex)){
        result.push(ogData[i]);
      }
    }
    setAllData(result);
    setFilteredData(result);
    setCheck('All');
    setSearch(searchValue);
  }


  return (
    <div>
      { (isLoading) ? <div>Loading...</div> : 
          <div >
            <NavbarTop searchValue={searchValue} setSearchValue={setSearchValue} name={user_name} searchData={searchData}/>
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
                      {sortValue}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {/* <Dropdown.Item as="button" onClick={() => {sortBy("Default")}}>Default</Dropdown.Item> */}
                      <Dropdown.Item as="button" onClick={() => {sortBy("Price(Low to High)")}}>Price(Low to High)</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => {sortBy("Price(High to Low)")}}>Price(High to Low)</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => {sortBy("Rating (High to low)")}}>Rating (High to low)</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => {sortBy("Name (A to Z)")}}>Name (A to Z)</Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => {sortBy("Name (Z to A)")}}>Name (Z to A)</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              {
                (search) ? <div style={{margin: '20px', color: "orange"}}> <h3>Showing results for '{search}'</h3> </div> : <></>
              }

              <ProductList data={filteredData}/>
            </div>         
            <Footer />
          </div>
      }
    </div>
  )
}
