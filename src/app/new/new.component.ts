import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit{

  data="Your Perfect Banking Partner"
  placeData="Account Number"

  uname:any
  psw:any


  constructor(){ }
  ngOnInit():void{

  }
  login(a:any,b:any){
    this.uname=a.value
    this.psw=b.value
    console.log(this.uname,this.psw);
    

    alert("login clicked")
  }

}
