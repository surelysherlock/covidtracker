import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  totalPositiveCases: String = "N/A";
  lastUpdatedDate: String = "N/A";
  currentlyHospitalized: String = "N/A";
  numberOfCasesToday: String = "N/A";
  numberOfHospitalizedToday: String = "N/A";

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  form = new FormGroup({
    stateForm: new FormControl()
  })

  nameOfStates: object = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
  }


  // get first(): any {
  //   return this.form.get('stateForm');
  // }

  //Formats dates
  modifyDateForResponse(data: any) {
    data.forEach((value: any) => {
      let yearOfDate: string;
      let monthOfDate: string;
      let dateOfDate: string;
      let monthOfDateInNumber: number;
      yearOfDate = value.date.toString().substr(0, 4);
      monthOfDate = value.date.toString().substr(4, 2);
      dateOfDate = value.date.toString().substr(6);
      monthOfDateInNumber = parseInt(monthOfDate);
      monthOfDate = this.monthNames[monthOfDateInNumber - 1];
      value.date = monthOfDate + " " + dateOfDate + " " + yearOfDate;
    });
    return data;
  }

  getCurrentData(stateNameInput: String) {
    this.covidService.getStateWiseData().subscribe(response => {
      this.stateData = response;
      this.stateData = this.modifyDateForResponse(this.stateData);
      for (let i = 0; i < this.stateData.length; i++) {
        const stateNameHolder = this.stateData[i]['state'];
        if (stateNameInput.length > 2) {
          for (const [key, value] of Object.entries(this.nameOfStates)) {
            if (stateNameInput == value) {
              stateNameInput = key
            }
          }
        }
        if (stateNameHolder == stateNameInput.toUpperCase()) {
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
