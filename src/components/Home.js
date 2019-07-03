import React, { Component } from 'react';

import logo from '../images/logo.svg';

class Home extends Component{

    render(){
        return(
            <div className="mt-4 wrapContentHome">
                <section className="container-fuid text-center">
                    <h1 >Prueba Técnica React</h1>
                    <div className="wrapLogo">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;