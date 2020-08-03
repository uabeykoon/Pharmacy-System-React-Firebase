import React, { Component } from "react";
import Axios from "axios";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { axiosDB } from "../../Axios/Axios";
import TablePharmacy from "./TableCus/TablePharmacy";
import BarChart from "./BarChart/Barchart";
//import './SignIn.css';

class PharmacyDash extends Component {

    state = {
        pharmacyList: [],
        pharmacyListWithOrderCount:[]
    };

    cardRowStyle = {
        marginTop: "50px"
    };

    card1 = { maxWidth: "18rem" }

    componentDidMount() {
        //this.fetchMedicines();
        //this.fetchCustomer();
        //this.fetchManufacturer();
        //this.fetchPharmacy();
        this.fetchData();
    }




    fetchData = () => {
        axiosDB.get("pharmacy.json")
            .then((pharmacy) => {
                axiosDB.get("pharmacyMedicine.json")
                    .then((medicine) => {
                        axiosDB.get("order.json")
                            .then((order) => {
                                let allPharmacy = this.convertObjectToArray(pharmacy.data);
                                let allMedicine = this.convertObjectToArray(medicine.data);
                                let allOrders = this.convertObjectToArray(order.data);
                                let pharmacyWithMedicineCount = this.createArrayWithMedicineCount(allPharmacy, allMedicine);
                                let pharmacyWithOrderCount = this.createArrayWithOrderCount(allPharmacy,allOrders);
                                //console.log(pharmacyWithOrderCount);
                                this.setState({
                                    pharmacyList: pharmacyWithMedicineCount,
                                    pharmacyListWithOrderCount:pharmacyWithOrderCount

                                })
                            }).catch((err) => {
                                console.log(err);
                            });
                    }).catch((err) => {
                        console.log(err);
                    });

            }).catch((err) => {
                console.log(err);
            });
    }



    countNumberOfObjects = (object) => {
        let count = 0;
        for (let ob in object) {
            count++;
        }
        //console.log(count);
        return count;
    }


    convertObjectToArray = (incomingObject) => {
        let newArray = [];
        for (let key in incomingObject) {
            newArray.push({ ...incomingObject[key], id: key });
        }
        return newArray;
    }

    findObject = (array, id) => {
        return array.find((ob) => ob.id === id)
    }


    createArrayWithMedicineCount = (pharmacyArray, medicineArray) => {
        let newArray = [];
        for (let pharmacy of pharmacyArray) {
            newArray.push({ ...pharmacy, medicineCount: this.getCountOfMedicine(pharmacy.id, medicineArray) })
        }
        return newArray
    }

    createArrayWithOrderCount = (pharmacyArray, orderArray) => {
        let newArray = [];
        for (let pharmacy of pharmacyArray) {
            newArray.push({ label:pharmacy.pharmacyName+"-"+pharmacy.pharmacyLocation, y: this.getCountOfMedicine(pharmacy.id, orderArray) })
        }
        //console.log(newArray)
        return newArray
    }

    getCountOfMedicine = (pharmacyID, orderArray) => {
        let filteredArray = orderArray.filter((order) => order.pharmacyID === pharmacyID);
        return filteredArray.length
        //console.log(filteredArray.length)
    }


    render() {


        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <BarChart  pharmacyWithOrderCount={this.state.pharmacyListWithOrderCount}/>
                        </div>

                    </div>
                    <div className="row" style={this.cardRowStyle}>
                        <TablePharmacy pharmacyList={this.state.pharmacyList}/>

                    </div>
                </div>
            </>
        );
    }
}

export default PharmacyDash;