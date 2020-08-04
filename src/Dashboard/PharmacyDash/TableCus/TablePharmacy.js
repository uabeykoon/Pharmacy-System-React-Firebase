import React, { Component } from 'react';
import './TableCus.css';


const TablePharmacy = (props) => {
    //console.log(props.medicineList)

    return (
        <>
        <h1>Pharmacy List</h1><br />
            {/* {props.input2} */}
            <table id="customers">
                <thead>
                    <tr>
                        <th>Pharmacy Name</th>
                        <th>Pharmacy Location</th>
                        <th>Pharmacy Email</th>
                        <th>Contact Number</th>
                        <th>Medicine Count</th>

                    </tr>
                </thead>
                <tbody>
                    {props.pharmacyList.map((pharmacy) => {
                        return (<tr key={pharmacy.id}>
                            <td>{pharmacy.pharmacyName}</td>
                            <td>{pharmacy.pharmacyLocation}</td>
                        <td>{pharmacy.pharmacyEmail}</td>
                        <td>{pharmacy.pharmacyContactNumber}</td>
                        <td>{pharmacy.medicineCount}</td>
                           
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
export default TablePharmacy;