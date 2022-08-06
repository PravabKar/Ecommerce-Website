
import{useState,useEffect} from 'react'
import ProductForm from './components/product-form/ProductForm'
import {Product} from './components/product/Product'
import {AdminProduct} from './components/admin-product/AdminProduct'

import {ProductList} from './components/product-list/ProductList'
import {AdminProductList} from './components/admin-product-list/AdminProductList'
import {ProductState} from './store/ProductState';
import {Routes,Route,Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/admin/login/Login'
import {ProtectRoute} from './components/admin/ProtectRoute';
import {NavBar} from './components/navbar/NavBar';
import {CartState} from './store/CartState';
import { AuthState } from './store/AuthState';
import {Cart} from './components/cart/Cart'
import RegisterAdmin from './components/register-admin/RegisterAdmin'
import {Update} from './components/updateproduct/Update'
function App() {
  const navigate=useNavigate();
  return (
    <div className="App">
    
   <ProductState>
    <CartState>
    <AuthState>
     <NavBar/>
     <Routes>
     
       <Route path="/" element={<ProductList/>}/>
       <Route path="/admin/product/list" element={<AdminProductList/>}/>
       <Route path="/admin/login" element={<Login/>}/>
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/admin/register" element={<RegisterAdmin/>}/>
       <Route path="/update" element={<Update/>}/>
       <Route element={<ProtectRoute/>}>
         <Route path="/admin/product/add" element={<ProductForm/>}/>
       </Route>

       </Routes>
       </AuthState>
      </CartState>
    </ProductState> 
      
    </div>
  );
}

export default App;
