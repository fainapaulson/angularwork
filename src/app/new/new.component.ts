import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit{

  data="Your Perfect Banking Partner"
  placeData="Account Number"
  constructor(){ }
  ngOnInit():void{

  }
  login(){
    alert("login clicked")
  }

  unameChange(event:any){
    console.log(event.target.value);
    
  }
}
