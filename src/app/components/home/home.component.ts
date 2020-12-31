import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { CovidTrackerService } from 'src/app/restapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private covidService: CovidTrackerService) { 

  }
  stateData: any;

  stateName: String = "None";
  totalPositiveCases: String = "";
  lastUpdatedDate: String = "";
  currentlyHospitalized: String = "";
  numberOfCasesToday: String = "";
  numberOfHospitalizedToday: String = "";

  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  form = new FormGroup({
    stateForm: new FormControl()
  })


  // get first(): any {
  //   return this.form.get('stateForm');
  // }

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

  getCurrentData(stateNameInput:String){
    this.covidService.getStateWiseData().subscribe(response => {
    this.stateData = response;
    this.stateData = this.modifyDateForResponse(this.stateData);
    for (let i = 0; i < this.stateData.length; i++) {
      const stateNameHolder = this.stateData[i]['state'];
      if (stateNameHolder == stateNameInput) {
        this.stateData = this.stateData[i];
      }
    }
    this.stateName = this.stateData['state'];
    this.totalPositiveCases = this.stateData['positive'];
    this.lastUpdatedDate = this.stateData['date'];
    this.currentlyHospitalized = this.stateData['hospitalizedCurrently'];
    this.numberOfCasesToday = this.stateData['positiveIncrease'];
    this.numberOfHospitalizedToday = this.stateData['hospitalizedIncrease'];
    this.lastUpdatedDate = this.stateData['date'];
    })
  }


  
  
  ngOnInit(): void {
  
  }

}
