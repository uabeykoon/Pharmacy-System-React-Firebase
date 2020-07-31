import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { axiosDB } from "../../Axios/Axios";
import './Store.css';
import Table from "./Table/Table";

class Store extends Component {
    state = {
        loading: false,
        addButtonDisable: false,
        validateErrorMessage: false,
        allmedicineList: [],
        medicineList:[],
        medicineWithDetails:[],
        selectedMedicineTOAdd: null,
        selectedMedicineAmountToAdd: null
    }

    componentDidMount() {
        this.fetchMedicine();
    }

    onChangeMedicineToAdd = (event) => {
        //console.log(event.target.value);
        this.setState({
            selectedMedicineTOAdd: event.target.value
        });
    }
    onChangeMedicineAmountAdd = (event) => {
        //console.log(event.target.value);
        this.setState({
            selectedMedicineAmountToAdd: event.target.value
        });
    }
    onAddButtonClick = (e) => {
        e.preventDefault();
        //console.log(this.state.selectedMedicineAmountToAdd);
        //console.log(this.state.selectedMedicineTOAdd);

        if (this.state.selectedMedicineTOAdd === null || this.state.selectedMedicineTOAdd === "0") {
            this.setState({
                validateErrorMessage: true
            });

        } else {
            this.setState({
                validateErrorMessage: false
            });
            let object = {
                pharmacyID: localStorage.getItem("id"),
                medicineID: this.state.selectedMedicineTOAdd,
                availableAmount: this.state.selectedMedicineAmountToAdd
            }
            this.addNewMedicineToStore(object)
                .then((res) => {
                    this.fetchMedicine();
                    // this.setState({
                    //     loading: false
                    // });
                    console.log(res);
                }).catch((err) => {
                    this.setState({
                        loading: false
                    });
                    console(err);
                })
        }
    }








    addNewMedicineToStore = (object) => {
        this.setState({
            loading: true
        });
        return axiosDB.post("pharmacyMedicine.json", object)
    }

    fetchMedicineRelatedToPharmacy = () => {
        return axiosDB.get(`pharmacyMedicine.json?orderBy="pharmacyID"&equalTo="${localStorage.getItem("id")}"`)

    }



    fetchMedicine = () => {
        this.setState({
            loading: true
        });
        axiosDB.get("medicine.json")
            .then((allMedicine) => {
                //console.log(medicine);
                this.fetchMedicineRelatedToPharmacy()
                    .then((medicine) => {
                        this.setState({
                            loading: false,
                            medicineList:this.convertObjectToArray(medicine.data),
                            allmedicineList: this.convertObjectToArray(allMedicine.data)
                           
                        });
                        this.setState({
                            medicineWithDetails:this.combineMedicineDetails()
                        })
                        //console.log(this.combineMedicineDetails());

                        
                    }).catch((err)=>{
                        console.log(err);
                    })

            }).catch((err) => {
                this.setState({
                    loading: false
                });
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
    
    combineMedicineDetails =() =>{
        let array=[];
        for(let med of this.state.medicineList){
            array.push({...med,medicineID:this.findRelatedObject(this.state.allmedicineList,med.medicineID)});
        }
        //console.log(array);
        return array;
    }

    findRelatedObject = (array,id) =>{
        return array.find((ob)=>ob.id===id);
    }


    render() {
        //console.log(this.state.allmedicineList);
        const spinner = this.state.loading ? (<><div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div></>) : null;
        const validateErrorMessage = this.state.validateErrorMessage ? (<div className="alert alert-danger" role="alert">
            Input in Invalid Change it and try again
        </div>) : null;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <br />
                        {spinner}
                    </div>
                </div>

                <form onSubmit={this.onAddButtonClick}><br />
                    {validateErrorMessage}

                    <label>Medicine</label>
                    <select onChange={this.onChangeMedicineToAdd} required>
                        <option value={0}>Select Medicine</option>
                        {this.state.allmedicineList.map((medicine) => {
                            return (<option key={medicine.id} value={medicine.id}>{medicine.name} - {medicine.dose}mg</option>);
                        })}

                    </select>
                    <br />

                    <label>Available Tablet</label>
                    <input type="text" onChange={this.onChangeMedicineAmountAdd} required />
                    <br />
                    <input type="submit" value="ADD" disabled={this.state.addButtonDisable} />

                </form>

                <Table medicineList={this.state.medicineWithDetails}/>
            </div>

        );
    }
}

export default Store;