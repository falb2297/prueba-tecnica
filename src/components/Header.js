import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component{

    render(){
        return(
            <header className="headerStyle">
                <nav className="navbar navbar-expand-md navbar-dark navStyle">
                    <NavLink className="navbar-brand titlePage" exact to="/">
                        Práctica LG
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/products">
                                    Productos
                                    <i className="fa fa-shopping-cart"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
