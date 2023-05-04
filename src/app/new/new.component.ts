import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

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
constructor(private ds:DataService){ }
  ngOnInit():void{

  }
  login(){
    alert(this.ds.checkData())
// alert(this.ds.sdata)
    // alert(this.uname)
  }

}
