import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../images/ld.png'

class Footer extends Component{

    render(){
        return(
            <footer className="mt-4 footerStyle">
                <div className="wrapAbout">
                    <div className="row align-items-center">

                        <div className="col-4">
                            <figure className="text-center wrapImage">
                                <img src={Logo} alt="Logo Logical Data"/>
                            </figure>
                        </div>

                        <div className="col-4">
                            <p className="footer-copyright">© 2019 Copyright - All Rights Reserved</p>
                        </div>

                        <div className="footer-social col-4">
                            <NavLink className="social-icons"><i className="fa fa-facebook"></i></NavLink>
                            <NavLink className="social-icons"><i className="fa fa-google"></i></NavLink>
                            <NavLink className="social-icons"><i className="fa fa-twitter"></i></NavLink>
                        </div> 
                    
                    </div>
                </div>
            </footer>    
        );
    }
}

export default Footer;