import React,{useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}


// const rows = [
//   createRow('Paperclips (Box)', 100, 1.15),
//   createRow('Paper (Case)', 10, 45.99),
//   createRow('Waste Basket', 2, 17.99),
//   createRow('Paperclips (Box)', 100, 1.15),
//   createRow('Paper (Case)', 10, 45.99),
//   createRow('Waste Basket', 2, 17.99),

// ];

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable(props) {

    const [textColor,setTextColor]  = useState('#fbc86c');

    const location = useLocation()
    useEffect(() => {
    
        if (location.pathname.includes("/dashboard/quotation/") || location.pathname.includes("/dashboard/invoice/")   ) {
         setTextColor('#333');
        } else {
          
        }
      }, [location])
      


    console.log(props)
    const { quotation } = props;
    console.log(quotation)
    return (
        < TableContainer  >
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                {/* {invoice ? ( */}
                <TableHead>
                    {/* <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow> */}
                    <TableRow>
                        <TableCell  sx={{ color: textColor }} sx={{ color: textColor }}  sx={{ color: textColor }} sx={{ color: textColor }} >Description</TableCell>
                        <TableCell sx={{ color: textColor }} sx={{ color: textColor }}  sx={{ color: textColor }} sx={{ color: textColor }}  align="right">Qty.</TableCell>
                        <TableCell sx={{ color: textColor }} sx={{ color: textColor }}  sx={{ color: textColor }} sx={{ color: textColor }}  align="right">Unit</TableCell>
                        <TableCell sx={{ color: textColor }} sx={{ color: textColor }}  sx={{ color: textColor }} sx={{ color: textColor }}  align="right">Sum</TableCell>
                    </TableRow>
                </TableHead>
                {quotation ?
                    (
                <TableBody>
                    {quotation.items.map((row) => (
            <TableRow key={row._id}>
              <TableCell sx={{ color: textColor }}   >{row.name}</TableCell>
              <TableCell  sx={{ color: textColor }}  sx={{ color: textColor }} sx={{ color: textColor }}    align="right">{row.qty}</TableCell>
              <TableCell sx={{ color: textColor }}  sx={{ color: textColor }} sx={{ color: textColor }}     align="right">{row.amount}</TableCell>
              <TableCell  sx={{ color: textColor }}  sx={{ color: textColor }} sx={{ color: textColor }}    align="right">{row.amount * row.qty}</TableCell>
            </TableRow>
          ))}

                    <TableRow>
                        <TableCell sx={{ color: textColor }} rowSpan={3} />
                        <TableCell  sx={{ color: textColor }} sx={{ color: textColor }}  colSpan={2}>Subtotal</TableCell>
                        <TableCell  sx={{ color: textColor }} sx={{ color: textColor }}     align="right">{quotation.subTotal}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: textColor }} sx={{ color: textColor }} >V.A.T</TableCell>
                        <TableCell  sx={{ color: textColor }} sx={{ color: textColor }} align="right"></TableCell>
                        <TableCell  sx={{ color: textColor }} sx={{ color: textColor }}     align="right">{quotation.VAT}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: textColor }} colSpan={2}>Total</TableCell>
                        <TableCell sx={{ color: textColor }}     align="right">{quotation.total}</TableCell>
                    </TableRow>
                </TableBody>
                    ) : []
                }
                {/* ) : []} */}
            </Table>

        </TableContainer >
    );
}
