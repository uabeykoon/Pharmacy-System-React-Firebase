import React, { Component } from 'react';
import Axios from 'axios';
import { axiosDB } from '../../Axios/Axios';


class PharmacyRegistration extends Component {


    state = {
        pharmacyName: null,
        pharmacyLocation: null,
        pharmacyEmail: null,
        pharmacyPassword: null,
    };



    //input pharmacy to database

    onChangePharmacyName = (event) => {
        this.setState({
            pharmacyName: event.target.value
        });
    }
    onChangePharmacyLocation = (event) => {
        this.setState({
            pharmacyLocation: event.target.value
        });
    }
    onChangePharmacyEmail = (event) => {
        this.setState({
            pharmacyEmail: event.target.value
        });
    }
    onChangePharmacyPassword = (event) => {
        this.setState({
            pharmacyPassword: event.target.value
        });
    }
    onInputPharmacyClick = (e) => {
        e.preventDefault();
        let object = {
            pharmacyName: this.state.pharmacyName,
            pharmacyLocation: this.state.pharmacyLocation,
            pharmacyEmail: this.state.pharmacyEmail,
            type: "pharmacy"
        };
        let signUpObject = {
            email: this.state.pharmacyEmail,
            password: this.state.pharmacyPassword,
            returnSecureToken: true
        };

        //console.log(signUpObject)
        Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7otWQXOD6Wc_-p_OHyCuJ_24HkNIupHw', signUpObject)
            .then((res) => {
                axiosDB.post("pharmacy.json", object)
                    .then((response) => {
                        console.log(response);
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
                <h1>Pharmacy Registration</h1>
                <form onSubmit={this.onInputPharmacyClick}>
                    <label>Name</label>
                    <input type="text" onChange={this.onChangePharmacyName} required />
                    <br />
                    <label>Location</label>
                    <input type="text" onChange={this.onChangePharmacyLocation} required />
                    <br />
                    <label>Email</label>
                    <input type="email" onChange={this.onChangePharmacyEmail} required />
                    <br />
                    <label>password</label>
                    <input type="password" minLength="6" onChange={this.onChangePharmacyPassword} required />
                    <br />
                    <input type="submit" value="Register" />
                    <input type="button" value="cancel" />
                </form>
            </>

        );
    }
}

export default PharmacyRegistration;