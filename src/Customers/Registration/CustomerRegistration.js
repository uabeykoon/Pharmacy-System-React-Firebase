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
    render() {
        return (
            <>
                <h1>Customer Registration</h1>
                <form onSubmit={this.onInputCustomerClick}>
                    <label>Name</label>
                    <input type="text" onChange={this.onChangeCustomerName} required/>
                    <br />
                    <label>Address</label>
                    <input type="text" onChange={this.onChangeCustomerAddress} required/>
                    <br />
                    <label>Contact Number</label>
                    <input type="text" onChange={this.onChangeCustomerContactNumber} required/>
                    <br />
                    <label>Email</label>
                    <input type="email" onChange={this.onChangeCustomerEmail} required/>
                    <br />
                    <label>password</label>
                    <input type="password" minLength="6" onChange={this.onChangeCustomerPassword} required/>
                    <br />
                    <input type="submit" value="Register" />
                </form>
            </>

        );
    }
}

export default CustomerRegistration;