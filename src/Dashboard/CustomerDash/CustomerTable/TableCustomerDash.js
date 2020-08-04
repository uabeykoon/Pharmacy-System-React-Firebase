import React, { Component } from 'react';
import './TableCus.css';


const TableCustomerDash = (props) => {
    //console.log(props.medicineList)

    return (
        <>
        <h1>Customer List</h1><br />
            {/* {props.input2} */}
            <table id="customers">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer Address</th>
                        <th>Customer Email</th>
                        <th>Customer Contact Number</th>

                    </tr>
                </thead>
                <tbody>
                    {props.customerList.map((customer) => {
                        return (<tr key={customer.id}>
                            <td>{customer.customerName}</td>
                            <td>{customer.customerAddress}</td>
                            <td>{customer.customerEmail}</td>
                            <td>{customer.customerContactNumber}</td>
                           
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
export default TableCustomerDash;