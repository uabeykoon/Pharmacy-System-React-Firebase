import React, { Component } from 'react';
import Axios from 'axios';
import { axiosDB } from '../../Axios/Axios';


class CustomerRegistration extends Component {

    state = {
        customerName: null,
        customerAddress: null,
        customerContactNumber: null,
        customerEmail: null,
        customerPassword: null,
    };

    formStyle= {
        width:"40%",
        
        margin:"0 auto",
        marginTop:"100px"
    };



    //add customer to the database

    onChangeCustomerName = (event) => {
        this.setState({
            customerName: event.target.value
        });
    }
    onChangeCustomerAddress = (event) => {
        this.setState({
            customerAddress: event.target.value
        });
    }
    onChangeCustomerContactNumber = (event) => {
        this.setState({
            customerContactNumber: event.target.value
        });
    }
    onChangeCustomerEmail = (event) => {
        this.setState({
            customerEmail: event.target.value
        });
    }
    onChangeCustomerPassword = (event) => {
        this.setState({
            customerPassword: event.target.value
        });
    }
    onInputCustomerClick = (e) => {
        e.preventDefault();
        let object = {
            customerName: this.state.customerName,
            customerAddress: this.state.customerAddress,
            customerContactNumber: this.state.customerContactNumber,
            customerEmail: this.state.customerEmail,
            type: "customer"
        };
        let signUpObject = {
            email: this.state.customerEmail,
            password: this.state.customerPassword,
            returnSecureToken: true
        };

        //console.log(signUpObject)
        Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7otWQXOD6Wc_-p_OHyCuJ_24HkNIupHw', signUpObject)
            .then((res) => {
                axiosDB.post("customer.json", object)
                    .then((response) => {
                        this.props.history.push("/");
                    }).catch((error) => {
                        console.log(error);
                    })
                //console.log(res.data.email);
            }).catch((err) => {
                console.log(err.message);
            });

    }
    onClickCancel= ()=>{
        this.props.history.push("/");
    }
    render() {
        return (
            <>
                <div style={this.formStyle}>
                    <h1>Customer Registration</h1>
                    <form onSubmit={this.onInputCustomerClick}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={this.onChangeCustomerName} required />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" onChange={this.onChangeCustomerAddress} required />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input type="text" className="form-control" onChange={this.onChangeCustomerContactNumber} required />
                        </div>
                        <div className="form-group">

                            <label>Email</label>
                            <input type="email" className="form-control" onChange={this.onChangeCustomerEmail} required />
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="password" className="form-control" minLength="6" onChange={this.onChangeCustomerPassword} required />
                        </div>
                        <input type="submit" value="Register" className="btn btn-primary" />|
                        <input className="btn btn-danger" type="button" value="cancel" onClick={this.onClickCancel}/>
                    </form>
                </div>

            </>

        );
    }
}

export default CustomerRegistration;