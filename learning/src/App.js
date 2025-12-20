import logo from './logo.svg';
import './App.css';
import { clear } from '@testing-library/user-event/dist/clear';
import { useState } from 'react';
import { Card, CardBody, Col, Container, Row, ToastContainer } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddBook from './components/AddBook';
import Menu from './components/Menu';
import Header from './components/Header';
import AllBooks from './components/AllBooks';
import Book from './components/Book';
import Update from './components/Update';

function App() {

  return (
    <div className="App" style={{}}>
    <Router>
    <ToastContainer/> 
    <Container>
      <Header/>
    <div className="row " style={{ marginTop:40, backgroundColor:'lightblue',paddingLeft:20}}>
        <div className="col-md-4 " >
          <h2>Menu</h2>
          <Menu/>
                </div>
        <div className="col-md-8" style={{padding:20,backgroundColor:'lightgray'}}>
          <h2>Content</h2>
          <Card>
            <CardBody>
              <Routes>
                <Route path='add-book' Component={AddBook} exact/>
              <Route path='all-books' Component={AllBooks}  exact/>
              <Route path='Book'  Component={Book} exact/>
              <Route path='update' Component={Update}  exact/>
              </Routes>
            </CardBody>
          </Card>
        </div>
      </div>

     
    </Container>
    </Router>
    
       </div>  );
}

export default App;
