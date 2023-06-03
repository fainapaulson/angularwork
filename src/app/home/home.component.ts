import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  user:any
  acno:any
  balance:any
  userObject:any
  date:any
  transactionStatus:any
  tStatus:any
  Dacno:any

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder,
   private datepipe:DatePipe){}
  
  moneyTransferForm=this.fb.group({
      toAcno:['',[Validators.required,Validators.pattern('[0-9]+')]],
      amount:['',[Validators.required,Validators.pattern('[0-9]+')]],
      psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
      
    })
    
  
  ngOnInit():void{
      if(!localStorage.getItem("currentAcno")){
        this.router.navigateByUrl("")
        alert("please login first")
      }
      this.user=localStorage.getItem("currentUser")
    }
  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")

  }
  getBalance(){
    this.acno=localStorage.getItem("currentAcno")
    this.ds.balanceApi(this.acno).subscribe((result:any)=>{
      this.balance=result.message
      // console.log(this.balance);
      
    })
  }
  acView(){
    this.acno=localStorage.getItem("currentAcno")
    this.ds.getUserApi(this.acno).subscribe((result:any)=>{

    this.userObject=result.message
  this.user=this.userObject.uname
  this.acno=this.userObject.acno

     } )
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

sendMoney(){
    if(this.moneyTransferForm.valid){
      
      this.date=new Date()
      let latest_date=this.datepipe.transform(this.date,'short')
    console.log(latest_date);
  
   this.acno=localStorage.getItem("currentAcno")
    let toAcno=this.moneyTransferForm.value.toAcno
    let amnt=this.moneyTransferForm.value.amount
    let psw=this.moneyTransferForm.value.psw

  if(this.acno==toAcno){
    this.transactionStatus="from and to ac numbers are same"
  this.tStatus=false
  }
  else{

    this.ds.fundTransfer(toAcno,this.acno,amnt,psw,latest_date).subscribe(
      (result:any)=>{
        console.log(result.message);
  this.transactionStatus=result.message+"!"
  this.tStatus=true
        
      },
      result=>{
        console.log(result.error.message);
        this.transactionStatus=result.error.message+"!"
        this.tStatus=false

      }
    )
  }
  }
  
  else{
    this.transactionStatus="invalid form !"
  this.tStatus=false
  }
  }

  deleteClick(){
   this.Dacno =localStorage.getItem("currentAcno")
  }
  NoDelete(){
    this.Dacno=""
  }
  yesDelete(event:any){
    // alert(event)
    this.ds.deleteAccount(event).subscribe((result:any)=>{
      alert(result.message)
      this.logout()
    })
  }
}
