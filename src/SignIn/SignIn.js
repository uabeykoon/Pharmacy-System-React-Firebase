import React, { Component } from "react";
import Axios from "axios";
import { axiosDB } from "../Axios/Axios";
//import './SignIn.css';

class SignIn extends Component {

    state = {
        email: null,
        password: null,
        type: null
    };

    onSignInClick = (e) => {
        e.preventDefault();
        //console.log(this.state);

        let object = {
            email: this.state.email,
            password: this.state.password
        };
        this.signIn(object);


        //this.props.history.push("/adminhome");
    }
    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }
    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }
    onTypeChange = (event) => {
        console.log(event.target.value)
        this.setState({
            type: event.target.value
        });
    }
    signIn = (object) => {
        //console.log(this.state)
        Axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7otWQXOD6Wc_-p_OHyCuJ_24HkNIupHw", object)
            .then((res) => {


                if (this.state.type === "p") {
                    console.log(res)
                    this.getPharmacy(res.data.email)
                        .then((pharmacy) => {
                            //console.log(pharmacy)
                            let id = this.getIdOfCustomer(pharmacy.data);
                            localStorage.setItem("id", id);
                            this.props.history.push("/adminhome/store");
                        }).catch((error) => {
                            console.log(error)
                        });
                }
                else if (this.state.type === "c") {
                    this.getCustomer(res.data.email)
                        .then((customer) => {
                            let id = this.getIdOfCustomer(customer.data);
                            localStorage.setItem("id", id);
                            this.props.history.push("/customer/buy");
                        }).catch((error) => {
                            console.log(error)
                        });
                } else if(this.state.type===null || this.state.type ==="0"){
                    console.log("select type");
                }

            }).catch((err) => {
                console.log("invalid username and passsword");
            })
    }

    getCustomer = (email) => {
        return axiosDB.get(`customer.json?orderBy="customerEmail"&equalTo="${email}"`);
    }

    getPharmacy = (email) => {
        return axiosDB.get(`pharmacy.json?orderBy="pharmacyEmail"&equalTo="${email}"`);
    }

    getIdOfCustomer = (incomingObject) => {
        let id = null;
        for (let key in incomingObject) {
            id = key
        }
        return id;
    }

    render() {
        return (
            <>
                <div className="wrapper fadeInDown">
                    <div id="formContent">


                        <h2 className="inactive underlineHover">Sign In </h2>

                        <form onSubmit={this.onSignInClick}>
                            <input type="email" placeholder="email" onChange={this.onEmailChange} required />
                            <input type="text" placeholder="password" onChange={this.onPasswordChange} required />
                            <select onChange={this.onTypeChange} required>
                                <option value="0">Select Type</option>
                                <option value="p">Pharmacy</option>
                                <option value="c">Customers</option>
                            </select>
                            <button type="submit">Sign in</button>
                        </form>


                        <div id="formFooter">
                            <a className="underlineHover" >Forgot Password?</a>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default SignIn;