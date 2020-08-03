import React, { Component } from 'react';
import './TableCus.css';


const TableCus = (props) => {
    //console.log(props.medicineList)

    return (
        <>
        <h1>Purchasing List</h1><br />
            {/* {props.input2} */}
            <table id="customers">
                <thead>
                    <tr>
                        <th>Madicine Name</th>
                        <th>Dose</th>
                        <th>Price Per Unit</th>
                        <th>Amount</th>
                        <th>Total Price Per Item</th>
                        <th>Remove</th>

                    </tr>
                </thead>
                <tbody>
                    {props.medicineList.map((medicine) => {
                        return (<tr key={medicine.medicineID.id}>
                            <td>{medicine.medicineID.name}</td>
                            <td>{medicine.medicineID.dose}mg</td>
                            <td>Rs {medicine.medicineID.price}/=</td>
                            <td>{medicine.amount}</td>
                            <td>Rs {medicine.amount * medicine.medicineID.price}/=</td>
                            <td><button className="btn btn-danger" onClick={()=>props.removeItem(medicine.medicineID.id)}>Remove</button></td>
                        </tr>);
                    })}
                </tbody>
            </table>

            <h1>Total Price - Rs {calculateTotalPrice(props.medicineList)} /=</h1>
            <button className="btn btn-primary" onClick={props.placeOrder}>Place Order</button>
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
export default TableCus;