import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit{

  data="Your Perfect Banking Partner"
  placeData="Account Number"
  // uname:any
  // psw:any

constructor(private fb:FormBuilder,private rout:Router,private ds:DataService){ }
loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]

})
  ngOnInit():void{

  }
  login(){
    // alert(this.ds.checkData())
// alert(this.ds.sdata)
    // alert(this.uname)
    if(this.loginForm.valid){
      var path=this.loginForm.value
      this.ds.loginApi(
      path.acno,
      path.psw).subscribe((result:any)=>{

        // store token in local storage
        localStorage.setItem("token",JSON.stringify( result.token))

        alert(result.message)
        this.rout.navigateByUrl('home')
localStorage.setItem("currentAcno",result.currentAcno)
localStorage.setItem("currentUser",result.currentUser)
  
},
      result=>{
        alert(result.error.message)
      }
      )


    }
    else{
      alert("invalid form")

    }
  }

}
