import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stateData: any;
  formatedStateData: any;
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  form = new FormGroup({
    state: new FormControl()
  })
  
  //Formats dates
  modifyDateForResponse(data: any){
    data.forEach((value: any) => {
      let yearOfDate: string;
      let monthOfDate: string;
      let dateOfDate: string;
      let monthOfDateInNumber: number;
      yearOfDate = value.date.toString().substr(0,4);
      monthOfDate= value.date.toString().substr(4,2);
      dateOfDate = value.date.toString().substr(6);
      monthOfDateInNumber = parseInt(monthOfDate);
      monthOfDate = this.monthNames[monthOfDateInNumber-1];
      value.date = monthOfDate + " " + dateOfDate + " " + yearOfDate;
    } );
    return data;
  }

  getCurrentData(){
    this.http.get('https://api.covidtracking.com/v1/states/current.json').subscribe(response => {
    this.stateData = response;
    this.stateData = this.modifyDateForResponse(this.stateData);
    // this.stateData.forEach((element:any) => {
    //   console.log(element.state)
    // });
    })
  }


  constructor(private http: HttpClient) { 
    
  }
  
  ngOnInit(): void {
  
  }

}
