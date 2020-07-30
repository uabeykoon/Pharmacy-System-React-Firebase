import React, { Component } from "react";
import { axiosAPI, axiosDB } from "../../Axios/Axios";

class Buy extends Component {

    state = {
        loading:false,
        disableMedicine:false,
        pharmacies: [],
        selectedPharmacy:null,
        selectedMedicine:null,
        selectedAmount:null,
        allmedicineList:[],
        medicineWithDetails:[],
        medicineList:[]
    };


    componentDidMount() {
        this.fetchPharmacy();
        //this.fetchMedicine();
    }

    onChangePharmacy =(event) =>{
        this.setState({
            loading:true,
            selectedPharmacy:event.target.value
        });
        this.fetchMedicine();
        console.log(event.target.value);
    }
    onChangeMedicine = (event) =>{
        console.log(event.target.value)
        this.setState({
            selectedMedicine:event.target.value
        });
    }

    onChangeAmount= (event) =>{
        this.setState({
            selectedAmount:event.target.value
        });
    }

    onAddtoListClick =(e) =>{
        e.preventDefault();
        let obj = {
            medicineID:this.state.selectedMedicine,
            amount:this.state.selectedAmount
        };
        console.log(obj)
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

    fetchMedicineRelatedToPharmacy = () => {
        return axiosDB.get(`pharmacyMedicine.json?orderBy="pharmacyID"&equalTo="${this.state.selectedPharmacy}"`)

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
                        //console.log(medicine.data)
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

    combineMedicineDetails =() =>{
        let array=[];
        for(let med of this.state.medicineList){
            array.push({...med,medicineID:this.findRelatedObject(this.state.allmedicineList,med.medicineID)});
        }
        console.log(array);
        return array;
    }

    findRelatedObject = (array,id) =>{
        return array.find((ob)=>ob.id===id);
    }




    convertObjectToArray = (incomingObject) => {
        let newArray = [];
        for (let key in incomingObject) {
            newArray.push({ ...incomingObject[key], id: key });
        }
        return newArray;
    }


    render() {

        const spinner = this.state.loading ? (<><div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
    </div></>) : null;

        return (
            <>
            <form onSubmit={this.onAddtoListClick}>
                <h1>Place your order here</h1><br />
                {spinner}
                <br />
                <label>Pharmacy</label>
                <select onChange={this.onChangePharmacy}>
                <option value={0}>Select Pharmacy</option>
                    {this.state.pharmacies.map((pharmacy) => {
                        return (<option key={pharmacy.id} value={pharmacy.id}>{pharmacy.pharmacyName} - {pharmacy.pharmacyLocation}</option>);
                    })}
                </select>
                <br />

                <label>Medicine</label>
                <select disabled={this.state.disableMedicine} onChange={this.onChangeMedicine}>
                <option value={0}>Select Medicine</option>
                    
                {this.state.medicineWithDetails.map((medicine) => {
                        return (<option key={medicine.medicineID.id} value={medicine.medicineID.id}>{medicine.medicineID.name}-{medicine.medicineID.dose}mg</option>);
                    })}
                </select>
                <br />

                <label>Quantity</label>
                <input type="text" id="quantity" name="quantity" disabled={this.state.disableMedicine} onChange={this.onChangeAmount}/>
                <br />
                <input type="submit" value="Add to cart" disabled={this.state.disableMedicine} />
                <input type="reset" value="Clear" disabled={this.state.disableMedicine} />
                <br /><br /><br />
                <h2>please attach a photo of prescription</h2>
                <label>Select a image</label>
                <input type="file" id="myfile" name="myfile"></input>
                </form>
            </>
        );
    }
}

export default Buy;