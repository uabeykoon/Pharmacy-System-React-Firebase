import React, { Component } from "react";
import Axios from "axios";
import { axiosDB } from "../Axios/Axios";
import { Link } from "react-router-dom";
//import './SignIn.css';

class SignIn extends Component {

    state = {
        email: null,
        password: null,
        type: null,
        errorMessage: false
    };

    formStyle = {
        width: "40%",
        textAlign: "center",
        margin: "0 auto",
        marginTop: "100px"
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
    onCustomerRegistrationClick = () => {
        this.props.history.push("/customerregistration");
    }
    onPharmacyRegistrationClick = () => {
        this.props.history.push("/pharmacyregistration");
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
                } else if (this.state.type === null || this.state.type === "0") {
                    this.setState({
                        errorMessage: true
                    });
                }

            }).catch((err) => {
                this.setState({
                    errorMessage: true
                });
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



        const errorMessage = this.state.errorMessage ? (<div class="alert alert-danger" role="alert">
            Input are invalid
        </div>) : null;

        return (
            <>

                <div className="border border-info" style={this.formStyle}>

                    <h1 style={{backgroundColor:"blue",color:"white"}}>Online Pharmacy System</h1>
                    <h2 className="inactive underlineHover">Sign In </h2>
                    {errorMessage}

                    <form onSubmit={this.onSignInClick}>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="email" onChange={this.onEmailChange} required />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="password" onChange={this.onPasswordChange} required />
                        </div>
                        <div className="form-group">
                            <select onChange={this.onTypeChange} className="form-control" required>
                                <option value="0">Select Type</option>
                                <option value="p">Pharmacy</option>
                                <option value="c">Customers</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </form>


                    <div id="formFooter">
                        <Link to="/customerregistration">Customer Registration</Link>
                        <br />
                        <Link to="/pharmacyregistration">Pharmacy Registration</Link>
                        <br />
                        <Link to="/dashboard/dash">Quick Dashboard</Link>
                    </div>

                </div>

            </>
        );
    }
}

export default SignIn;