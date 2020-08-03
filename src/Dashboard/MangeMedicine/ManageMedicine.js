import React, { Component } from "react";
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { axiosDB } from "../../Axios/Axios";
import MedicineTable from "./MedicineTable/MedicineTable";
//import './SignIn.css';

class ManageMedicine extends Component {

    state = {
        name: null,
        manufacturer: {},
        dose: null,
        price: null,

        manuName: null,
        manuCon: null,
        manufacturerList: [],

        medicineList:[]
    }


    formStyle = {
        width: "100%",
        margin: "20 auto",
        marginTop: "10px",
        padding: "30px"
    };

    componentDidMount() {
        this.fetchManufacturer();
        this.fetchMedicine();
    }

    onChangePriceToUpdate = (event) => {
        this.setState({
            selectedValue: event.target.value,
        })
        console.log(event.target.value);
    }

    onClickUpdate = (id) => {
        let ob = {
            price: this.state.selectedValue
        };
        console.log(id)
        axiosDB.patch(`medicine/${id}.json`, ob)
            .then((res) => {
                console.log(res);
                this.fetchMedicine();
            }).catch((err) => {
                console.log(err);
            })
    }


    fetchManufacturer = () => {
        axiosDB.get("manufacturer.json")
            .then((res) => {
                this.setState({
                    manufacturerList: this.convertObjectToArray(res.data)
                });
                //console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }


    fetchMedicine =()=>{
        axiosDB.get("medicine.json")
        .then((medicine)=>{
            this.setState({
                medicineList:this.convertObjectToArray(medicine.data)
            })
        }).catch((err)=>{
            console.log(err);
        })
    }


    //input manufacturer to database
    onChangeNameManu = (event) => {
        this.setState({
            manuName: event.target.value
        });
    }
    onChangeContactManu = (event) => {
        this.setState({
            manuCon: event.target.value
        });
    }

    onClickAddManu = (e) => {
        e.preventDefault();
        let object = {
            manufacturerName: this.state.manuName,
            manufacturerContactNumber: this.state.manuCon
        };
        axiosDB.post("manufacturer.json", object)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }


    //input medicine to the database
    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        });
    }
    onChangeManufacturer = (event) => {
        this.setState({
            manufacturer: this.findObject(this.state.manufacturerList, event.target.value)
        });
    }
    onChangedose = (event) => {
        this.setState({
            dose: event.target.value
        });
    }
    onChangePrice = (event) => {
        this.setState({
            price: event.target.value
        });
    }
    onInputMedicineClick = (e) => {
        e.preventDefault();
            let object = {
                name: this.state.name,
                manufacturer: this.state.manufacturer,
                dose: this.state.dose,
                price: this.state.price
            };
            axiosDB.post("medicine.json", object)
                .then((res) => {
                    console.log(res);
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

    findObject = (array, id) => {
        return array.find((ob) => ob.id === id)
    }




    render() {


        return (
            <>
                <div style={this.formStyle} className="border border-dark">
                    <h1>Manufacturer Registration</h1>
                    <form onSubmit={this.onClickAddManu}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={this.onChangeNameManu} required />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input type="text" className="form-control" onChange={this.onChangeContactManu} required />
                        </div>
                        <input className="btn btn-primary" type="submit" value="ADD MANUFACTURER" />|
                        {/* <input className="btn btn-danger" type="button" value="Cancel" onClick={} /> */}
                    </form>
                </div>
                <div style={this.formStyle} className="border border-dark">
                    <form onSubmit={this.onInputMedicineClick}>
                        <h1>Medicine Registration</h1>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={this.onChangeName} required />
                        </div>
                        <div className="form-group">
                            <label>Manufacturer</label>
                            <select className="form-control" onChange={this.onChangeManufacturer} required>
                                <option value={0}>Select Manufacturer</option>
                                {this.state.manufacturerList.map((manu) => {
                                    return (<option key={manu.id} value={manu.id}>{manu.manufacturerName}</option>);
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Dose</label>
                            <input type="text" className="form-control" onChange={this.onChangedose} required />
                        </div>
                        <div className="form-group">
                            <label>Price per Unit</label>
                            <input type="text" className="form-control" onChange={this.onChangePrice} required />
                        </div>
                        <input type="submit" className="btn btn-primary" value="ADD MEDICINE" />
                    </form>
                </div>
                <div>
                    <MedicineTable medicineList={this.state.medicineList} onChangeAmount={this.onChangePriceToUpdate} onClickUpdate={this.onClickUpdate}/>
                </div>
            </>
        );
    }
}

export default ManageMedicine;