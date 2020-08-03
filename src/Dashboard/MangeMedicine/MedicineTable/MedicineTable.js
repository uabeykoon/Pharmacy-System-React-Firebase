import React, { Component } from 'react';
import './TableCus.css';


const MedicineTable = (props) => {
    //console.log(props.medicineList)

    return (
        <>
        <h1>Medicine List</h1><br />
            {/* {props.input2} */}
            <table id="customers">
                <thead>
                    <tr>
                        <th>Medicine Name</th>
                        <th>Manufacturer</th>
                        <th>Dose</th>
                        <th>Price per Unit <input type="text" onChange={(e)=>props.onChangeAmount(e)}></input></th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {props.medicineList.map((medicine) => {
                        return (<tr key={medicine.id}>
                            <td>{medicine.name}</td>
                            <td>{medicine.manufacturer.manufacturerName}mg</td>
                            <td>{medicine.dose}mg</td>
                            <td> Rs {medicine.price} /= <button className="btn btn-primary" onClick={()=>props.onClickUpdate(medicine.id)}>Update</button></td>
                            <td><button className="btn btn-danger" onClick={()=>props.delete(medicine.id)}>Delete</button></td>

                        </tr>);
                    })}
                </tbody>
            </table>

        </>
    );

}
const calculateTotalPrice = (array) => {
    let total = 0;
    for (let ob of array) {
        total = total + (ob.amount * ob.medicineID.price);
    }
    return total;
}
export default MedicineTable;