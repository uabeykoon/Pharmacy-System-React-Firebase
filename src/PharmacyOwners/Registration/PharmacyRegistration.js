import React, { Component } from 'react';
import Axios from 'axios';
import { axiosDB } from '../../Axios/Axios';


class PharmacyRegistration extends Component {


    state = {
        pharmacyName: null,
        pharmacyLocation: null,
        pharmacyEmail: null,
        pharmacyPassword: null,
        errorMessage:false
    };

    formStyle= {
        width:"40%",
        
        margin:"0 auto",
        marginTop:"100px"
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

        const errorMessage = this.state.errorMessage?(<div class="alert alert-danger" role="alert">
        Input are invalid
      </div>):null;


        return (
            <>
                <div style={this.formStyle}>
                    <h1>Pharmacy Registration</h1>
                    <form onSubmit={this.onInputPharmacyClick}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={this.onChangePharmacyName} required />
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input type="text" className="form-control" onChange={this.onChangePharmacyLocation} required />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" onChange={this.onChangePharmacyEmail} required />
                        </div>

                        <div className="form-group">
                            <label>password</label>
                            <input type="password" className="form-control" minLength="6" onChange={this.onChangePharmacyPassword} required />
                        </div>

                        <input className="btn btn-primary" type="submit" value="Register" />|
                        <input className="btn btn-danger" type="button" value="cancel" />
                    </form>
                </div>

            </>

        );
    }
}

export default PharmacyRegistration;