# Ecommerce-Website
E-Shop is an e-commerce platform made with Next.js as the frontend framework, Express and Node as the backend, and MongoDB for the database.



# Demo

### Homepage
![alt text](./demo-ss/HomepageNotSigned.png)

### Admin Page
![alt text](./demo-ss/AdminLogin.png)
![alt text](./demo-ss/AddProduct.png)

### Login and SignUp
![alt text](./demo-ss/Login.png)
![alt text](./demo-ss/Register.png)

### Edit Profile
![alt text](./demo-ss/EditProfile.png)

### Categories, Sorting and Searching
![alt text](./demo-ss/Sorted.png)
![alt text](./demo-ss/Search.png)

### Cart
![alt text](./demo-ss/Cart.png)

### Order History
![alt text](./demo-ss/OrderHistory.png)



# Installation

### Clone the project

```bash
  git clone https://github.com/PravabKar/Ecommerce-Website.git
  cd Ecommerce-Website
```

### Add Enviroment variables
    
```bash
  cd server
  vi .env
```

`ATLAS_URL=<YOUR_MONGODB_URL>`

`PORT=9999`

(If setting PORT anything other than 9999, then change client/next.config.js port number as well)


### Run server (make sure you have node installed)
```bash
  node server
```

### Install the project with npm
(From another terminal)
```bash
  cd client
  npm install
  npm install next@12.3.2
```

### To run in Devlopement build

```bash
  npm run dev
```

OR
### To run in Production build

```bash
  npm run build
  npm run start
```
