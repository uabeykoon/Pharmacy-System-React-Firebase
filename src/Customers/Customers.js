import React, { Component } from "react";
import { axiosAPI, axiosDB } from "../Axios/Axios";

class Customers extends Component {

    state = {
        pharmacies: [],
        medicine:[]
    };


    componentDidMount() {
        this.fetchPharmacy();
        this.fetchMedcine();
    }


    fetchPharmacy = () => {
        axiosDB.get("pharmacy.json")
            .then((pharmacy) => {
                this.setState({
                    pharmacies: this.convertObjectToArray(pharmacy.data)
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    fetchMedcine = () => {
        axiosDB.get("medicine.json")
            .then((medicine) => {
                this.setState({
                    medicine: this.convertObjectToArray(medicine.data)
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    convertObjectToArray = (incomingObject) => {
        let newArray = [];
        for (let key in incomingObject) {
            newArray.push({ ...incomingObject[key], id: key });
        }
        return newArray;
    }


    render() {
        return (
            <>
                <h1>Place your order here</h1><br /><br /><br />
                <label>Pharmacy</label>
                <select>
                    {this.state.pharmacies.map((pharmacy) => {
                        return (<option key={pharmacy.id}>{pharmacy.pharmacyName}</option>);
                    })}
                </select>
                <br />

                <label>Medicine</label>
                <select>
                {this.state.medicine.map((medicine) => {
                        return (<option key={medicine.id}>{medicine.name}-{medicine.dose}mg</option>);
                    })}
                </select>
                <br />

                <label>Quantity</label>
                <input type="text" id="quantity" name="quantity" />
                <br />
                <input type="submit" value="Add to cart" />
                <input type="reset" value="Clear" />
                <br /><br /><br />
                <h2>please attach a photo of prescription</h2>
                <label>Select a image</label>
                <input type="file" id="myfile" name="myfile"></input>
            </>
        );
    }
}

export default Customers;