import React, { Component } from "react";
import {axiosDB,axiosAPI} from '../Axios/Axios';
import Axios from "axios";

class DataInput extends Component {

    state={
        name:null,
        dose:null,
        price:null,

        pharmacyName:null,
        pharmacyLocation:null,
        pharmacyEmail:null,
        pharmacyPassword:null,

        customerName:null,
        customerAddress:null,
        customerContactNumber:null,
        customerEmail:null,
        customerPassword:null,

    };

//input medicine to the database
    onChangeName = (event) =>{
        this.setState({
            name:event.target.value
        });
    }
    onChangedose = (event) =>{
        this.setState({
            dose:event.target.value
        });
    }
    onChangePrice = (event) =>{
        this.setState({
            price:event.target.value
        });
    }
    onInputMedicineClick = (e) =>{
        e.preventDefault();
        let object = {
            name:this.state.name,
            dose:this.state.dose,
            price:this.state.price
        };
        axiosDB.post("medicine.json",object)
        .then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        
    }



//input pharmacy to database

onChangePharmacyName = (event) =>{
    this.setState({
        pharmacyName:event.target.value
    });
}
onChangePharmacyLocation = (event) =>{
    this.setState({
        pharmacyLocation:event.target.value
    });
}
onChangePharmacyEmail = (event) =>{
    this.setState({
        pharmacyEmail:event.target.value
    });
}
onChangePharmacyPassword = (event) =>{
    this.setState({
        pharmacyPassword:event.target.value
    });
}
onInputPharmacyClick = (e) =>{
    e.preventDefault();
    let object = {
        pharmacyName:this.state.pharmacyName,
        pharmacyLocation:this.state.pharmacyLocation,
        pharmacyEmail:this.state.pharmacyEmail,
        type:"pharmacy"
    };
    let signUpObject ={
        email: this.state.pharmacyEmail,
        password:this.state.pharmacyPassword,
        returnSecureToken:true
    };

    //console.log(signUpObject)
    Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7otWQXOD6Wc_-p_OHyCuJ_24HkNIupHw',signUpObject)
    .then((res)=>{
        axiosDB.post("pharmacy.json",object)
        .then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
        //console.log(res.data.email);
    }).catch((err)=>{
        console.log(err.message);
    });

}


//add customer to the database

onChangeCustomerName = (event) =>{
    this.setState({
        customerName:event.target.value
    });
}
onChangeCustomerAddress = (event) =>{
    this.setState({
        customerAddress:event.target.value
    });
}
onChangeCustomerContactNumber = (event) =>{
    this.setState({
        customerContactNumber:event.target.value
    });
}
onChangeCustomerEmail = (event) =>{
    this.setState({
        customerEmail:event.target.value
    });
}
onChangeCustomerPassword = (event) =>{
    this.setState({
        customerPassword:event.target.value
    });
}
onInputCustomerClick = (e) =>{
    e.preventDefault();
    let object = {
        customerName:this.state.customerName,
        customerAddress:this.state.customerAddress,
        customerContactNumber:this.state.customerContactNumber,
        customerEmail:this.state.customerEmail,
        type:"customer"
    };
    let signUpObject ={
        email: this.state.customerEmail,
        password:this.state.customerPassword,
        returnSecureToken:true
    };

    //console.log(signUpObject)
    Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7otWQXOD6Wc_-p_OHyCuJ_24HkNIupHw',signUpObject)
    .then((res)=>{
        axiosDB.post("customer.json",object)
        .then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
        //console.log(res.data.email);
    }).catch((err)=>{
        console.log(err.message);
    });

}




    render() {
        return (
            <>
                <form onSubmit={this.onInputMedicineClick}>
                <h2>Medicine</h2>
                    <label>Name</label>
                    <input type="text" onChange={this.onChangeName} required/>
                    <br />
                    <label>dose</label>
                    <input type="text" onChange={this.onChangedose} required/>
                    <br />
                    <label>Price per Unit</label>
                    <input type="text" onChange={this.onChangePrice} required/>
                    <br />
                    <input type="submit" value="Input" />
                </form>
                <br />
                <br />

                <form onSubmit={this.onInputPharmacyClick}>
                    <h2>Pharmacy</h2>
                    <label>Name</label>
                    <input type="text" onChange={this.onChangePharmacyName} required/>
                    <br />
                    <label>Location</label>
                    <input type="text" onChange={this.onChangePharmacyLocation} required/>
                    <br />
                    <label>Email</label>
                    <input type="email" onChange={this.onChangePharmacyEmail} required/>
                    <br />
                    <label>password</label>
                    <input type="password" minLength="6" onChange={this.onChangePharmacyPassword} required/>
                    <br />
                    <input type="submit" value="Input" />
                </form>


                <form onSubmit={this.onInputCustomerClick}>
                    <h2>Customer</h2>
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
                    <input type="submit" value="Input" />
                </form>



            </>
        );
    }
}

export default DataInput;