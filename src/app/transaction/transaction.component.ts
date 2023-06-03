import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import jspdf from 'jspdf'
import 'jspdf-autotable'
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  user:any
  acno:any
  date:any
  transactions:any
  searchString:any=""

  constructor(private ds:DataService){}
  ngOnInit(): void {

    this.user=localStorage.getItem("currentUser")
    this.acno=localStorage.getItem("currentAcno")
this.date=new Date()

this.ds.transactionHistory(this.acno).subscribe((result:any)=>{
  this.transactions=result.message
  console.log( this.transactions);
  
})

  }
  filterTrans(type:any){
    this.searchString=type
  }
// jspdf ,jspdf-autotable installed
  exportPdf(){
// create an object for jspdf
var pdf=new jspdf()

// setup col titles
let col=['index','type','amount','date']
// setup row
let row:any=[]
// style
pdf.setFontSize(16)
pdf.text('Account Statement',15,10)
pdf.setTextColor(99)
pdf.setFontSize(12)

// array of object convert to array of array(nested array)
var allitems=this.transactions
for(let i of allitems){
  let rowData=[i.type,i.amount,i.date]
  row.push(rowData)
}
// convert nested array to pdf
(pdf as any).autoTable(col,row,{startY:15})
// open converted pdf in another tab
pdf.output('dataurlnewwindow')
// download and save
pdf.save('accountStatement.pdf')
  }

}
