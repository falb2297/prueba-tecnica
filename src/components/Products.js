import React, { Component } from 'react';

import { data } from '../data/productos.json';

class Products extends Component{

    constructor(props){
        super(props);
        this.state = {
            productos: [],
            elementos: 0,
            indiceElementos: 0,
            agregados: [],
            enFactura: []
        }
    }

    componentDidMount(){

        if(data.length > 0){
            let productosVisibles = new Array(0);
            let setAgregados = new Array(0);
            let valorFinal = 4;

            if(valorFinal > data.length)
                valorFinal = data.length;

            for (let i = 0; i < valorFinal; i++) {
                productosVisibles.push(data[i]);
            }

            for (let i = 0; i < data.length; i++) {
                setAgregados.push({
                    id: data[i].id,
                    cantidad: 0,
                    agregado: false
                });
            }

            this.setState({
                elementos: valorFinal,
                productos: productosVisibles,
                agregados: setAgregados
            });    
        }//if
    }

    getNextInformation = () => {

        let productosVisibles = new Array(0);

        let valorInicial = this.state.elementos;
        let valorFinal = valorInicial + 4;

        if(valorInicial < data.length){
            
            if(valorFinal > data.length){
                valorFinal = data.length;
            }

            for (let i = valorInicial; i < valorFinal; i++) {
                productosVisibles.push(data[i]);
            }

            this.setState({
                elementos: valorFinal,
                productos: productosVisibles,
                indiceElementos: valorInicial
            }, () => this.setImputs());
        }
    }

    getPreviousInformation = () => {

        let productosVisibles = new Array(0);

        let valorInicial = this.state.indiceElementos - 4;
        let valorFinal = this.state.indiceElementos;

        if(valorInicial >= 0){

            for (let i = valorInicial; i < valorFinal; i++) {
                productosVisibles.push(data[i]);
            }

            this.setState({
                elementos: valorFinal,
                productos: productosVisibles,
                indiceElementos: valorInicial
            }, () => this.setImputs());

        }
    }

    setImputs = () => {
        let inputs = document.getElementsByClassName("checkBuy");
        let inputsNumber = document.getElementsByClassName("cantidadBuy");

        if(inputs.length !== 0 && inputsNumber.length !== 0){

            let agregados = this.state.agregados;

            for (const input of inputs) {
               
                for (const obj of agregados) {

                    if(`checkBuyNum${obj.id}` === input.getAttribute('id')){

                        if(obj.agregado){
                            input.checked = true;
                        }else{
                            input.checked = false;
                        }
                    }
                }//for
            }//for

            for (const input of inputsNumber) {
                
                for (const obj of agregados) {

                    if(`cantidadBuyNum${obj.id}` === input.getAttribute('id')){

                        if(obj.cantidad !== 0)
                            input.value = obj.cantidad.toString();
                        else{
                            input.value = '';
                        }

                    }
                }//for
            }//for
        }//if
    }//function

    handleNumber = (idProducto, numMax, e) => {

        let respuesta = e.target.value;
        let isEmpty, cantidad;

        if (respuesta === '') {
            isEmpty = true;
            cantidad = 0;
            
        }else{
            cantidad = parseInt(respuesta);
            isEmpty = false;
        }

        let nombreIdInput = e.target.id;

        if(cantidad > 0 && cantidad <= numMax){

            let setAgregados = new Array(0);
            let agregados = this.state.agregados;

            for (const obj of agregados) {

                if(obj.id === idProducto)
                    obj.cantidad = cantidad;

                setAgregados.push(obj);
            }

            this.setState({
                agregados: setAgregados
            });
            
        }else if(isEmpty){
            
            let setAgregados = new Array(0);
            let agregados = this.state.agregados;

            for (const obj of agregados) {

                if(obj.id === idProducto)
                    obj.cantidad = 0;

                setAgregados.push(obj);
            }

            this.setState({
                agregados: setAgregados
            });

        }else{
            document.getElementById(nombreIdInput).focus();
        }
    }//function

    handleChecked = (idProducto) => {
       
        let setAgregados = new Array(0);
        let agregadosOld = this.state.agregados;

        for (let i = 0; i < agregadosOld.length; i++) {
          
            if(agregadosOld[i].id === idProducto){

                if(agregadosOld[i].agregado)
                    agregadosOld[i].agregado = false;
                else
                    agregadosOld[i].agregado = true;

                setAgregados.push(agregadosOld[i]);
                
            }else{
                setAgregados.push(agregadosOld[i]);
            }
        }

        this.setState({
            agregados: setAgregados
        });
        
    }

    buyProducts = () => {
        
        if(this.state.enFactura.length !== 0 ){
            if (window.confirm('¿Desea Realizar la Compra?')){
                
                this.setState({
                    enFactura: []
                }, () => alert("¡Compra Realizada!"));
            
            }//ifConfirmacion
        }
    }

    addToCar = () => {
       
        let agregados = this.state.agregados;
        let verdaderosAgregados = this.state.enFactura;

        let setAgregados = new Array(0);

        let almenosUno = false;
        let leyendaPregunta = '¿Desea Agregar al Carrtito? :';

        let nuevasCantidades = new Array(0);

        let contadorUnico = 0;
        
        for (const objInfo of agregados) {
            
            if(objInfo.cantidad > 0 && objInfo.agregado){
                almenosUno = true;

                for (const objMoreInfo of data) {
                    
                    if(objInfo.id === objMoreInfo.id){

                        let diferencia = objMoreInfo.cantidad - objInfo.cantidad;

                        nuevasCantidades.push({
                            id: objInfo.id,
                            nuevaCantidad: diferencia
                        });

                        leyendaPregunta = leyendaPregunta + `\n   Articulo: ${objMoreInfo.nombre} Cantidad: ${objInfo.cantidad}`;
                        verdaderosAgregados.push({
                            nombre: objMoreInfo.nombre,
                            precio: objMoreInfo.precio,
                            cantidad: objInfo.cantidad,
                            id: contadorUnico,
                            refProducto: objInfo.id
                        });
                        contadorUnico = contadorUnico + 1; 
                    }
                }//for(objMoreInfo)
                
                setAgregados.push({
                    id: objInfo.id,
                    cantidad: 0,
                    agregado: false
                });

            }else{
                setAgregados.push(objInfo);
            }
        }//for(agregados)

        if(almenosUno){
            
            if (window.confirm(leyendaPregunta)) {

                for (const objUpdate of nuevasCantidades) {
                    for (const objData of data) {
                    
                        if(objUpdate.id === objData.id)
                            objData.cantidad = objUpdate.nuevaCantidad;  

                    }//for
                }//for

                let productosVisibles = new Array(0);

                let valorInicial = this.state.indiceElementos;
                let valorFinal = this.state.elementos;

                for (let i = valorInicial; i < valorFinal; i++) {
                    productosVisibles.push(data[i]);
                }
                     
                this.setState({
                    productos: productosVisibles,
                    agregados: setAgregados,
                    enFactura: verdaderosAgregados
                }, () => {
                    this.setImputs();
                    alert("¡Productos Agregados!");
                });

            } else {
                alert("¡Procedimiento Cancelado!");
            }

        }else{
            alert("¡No hay Opciones Válidas!");
        }

    }//function

    getFooterTotal = (i, totalGlobal) => {

        if(i === (this.state.enFactura.length - 1)){
            return(
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <th>TOTAL</th>
                    <th>₡ {totalGlobal}</th>
                </tr>  
            );
        }else{
            return(
                <React.Fragment></React.Fragment>    
            );
        }
    }//function

    clickEliminarProducto = (itemId) => {
        
        let itemsFactura = this.state.enFactura;
        let setItemsAgregados = new Array(0);
        let productosVisibles = new Array(0);

        if (window.confirm('¿Desea eliminar este Ítem?')){
            
            for (const item of itemsFactura) {

                if(item.id === itemId){

                    for (const objData of data) {
                    
                        if(item.refProducto === objData.id)
                            objData.cantidad = objData.cantidad + item.cantidad;  

                    }//for
                }else{
                    setItemsAgregados.push(item);
                }
            }//for

            let valorInicial = this.state.indiceElementos;
            let valorFinal = this.state.elementos;

            for (let i = valorInicial; i < valorFinal; i++) {
                productosVisibles.push(data[i]);
            }

            this.setState({
                productos: productosVisibles,
                enFactura: setItemsAgregados
            }, () => alert("¡Ítem Eliminado!"));


        }//ifConfirmacion

    }//function

    render(){
        
        if(this.state.enFactura.length !== 0)
            document.getElementById('rowTableDelete').classList.add("displayNone");

            
        let totalGlobal = 0;
        const productosCarrito = this.state.enFactura.map((obj, i) => {

            totalGlobal = totalGlobal + (obj.precio * obj.cantidad);
            
            return(
                <React.Fragment>
                <tr key={i}>
                    <td>{obj.nombre}</td>
                    <td>₡ {obj.precio}</td>
                    <td>{obj.cantidad}</td>
                    <td>
                        <button 
                            onClick={() => this.clickEliminarProducto(obj.id)}
                            type="button"
                            id={`btnDeleteProductoNum${obj.id}`} 
                            className="btn btn-danger btn-sm btnDeleteProducto">Eliminar<i class='fas fa-trash-alt ml-1'></i></button>
                    </td>
                    <td>₡ {obj.precio * obj.cantidad}</td>
                    <td>+ ₡ {totalGlobal}</td>
                </tr>
                {this.getFooterTotal(i, totalGlobal)}
                </React.Fragment>
            );
        });
    
            
        const productos = this.state.productos.map((obj, i) => {

            return(
                <tr key={i}>
                    <td>{obj.id}</td>
                    <td>{obj.nombre}</td>
                    <td>₡ {obj.precio}</td>
                    <td>{obj.cantidad}</td>
                    <td>
                        <div className="form-check"> 
                            <input 
                                onChange={() => this.handleChecked(obj.id)} 
                                className="form-check-input checkBuy" 
                                type="checkbox" 
                                id={`checkBuyNum${obj.id}`} />

                            <label className="form-check-label" htmlFor={`checkNum${obj.id}`}>
                                <i className="fa fa-shopping-cart"></i>
                            </label>
                        </div>
                    </td>
                    <td>
                        <input 
                            onChange={(e) => this.handleNumber(obj.id, obj.cantidad, e)} 
                            placeholder="0" 
                            type="number" 
                            id={`cantidadBuyNum${obj.id}`} 
                            min="1" max={obj.cantidad} 
                            className="cantidadBuy" />
                    </td>
                </tr>
            );

        });

        return(
            <div className="mt-4 wrapContentProducts">
                <section className="container-fuid">
                    <div className="row">
                        <div className="col-md-6 text-center wrapProductos">
                            <h3>Articulos Disponibles</h3>
                            <table className="table table-striped table-hover mt-2">
                                <thead> 
                                    <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Precio (C/U)</th>
                                        <th>Disponibles</th>
                                        <th>Agregar</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-md-6 text-center wrapProductosAgregados">
                            <h3>Articulos Agregados</h3>
                            <table className="table table-striped table-hover mt-2">
                                <thead> 
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th><i class='fas fa-trash-alt'></i></th>
                                        <th>Monto</th>
                                        <th>+ TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   <tr id="rowTableDelete">
                                       <td></td>
                                       <td></td>
                                       <td></td>
                                       <td></td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   {productosCarrito}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 text-right wrapButtonAgregar">
                            <button 
                                onClick={this.addToCar} 
                                type="button" 
                                className="btn btn-warning btn-lg btnAgregar">Agregar</button>
                        </div>
                        <div className="col-md-6 text-right wrapButtonComprar">
                            <button 
                                onClick={this.buyProducts} 
                                type="button" 
                                className="btn btn-danger btn-lg btnComprar">Comprar</button>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-7 text-center wrapPaginacion">
                            <button 
                                onClick={this.getPreviousInformation} 
                                type="button" 
                                className="btn btn-danger btn-sm mr-1">&larr; Anterior</button>

                            <button 
                                onClick={this.getNextInformation}
                                type="button" 
                                className="btn btn-danger btn-sm ml-1">Siguiente &rarr;</button>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}//Products

export default Products;