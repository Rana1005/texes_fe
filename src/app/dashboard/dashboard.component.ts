import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  companyForm! : FormGroup;
  proceedForm!: FormGroup;
  baseUrl = `https://rahul8827.pythonanywhere.com/`;
  valueSelected:boolean = false;
  dataList:any = [];

  constructor(private http: HttpClient) {
    this.companyForm = new FormGroup({
      pincode: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      premiseType: new FormControl('')
    });

    this.proceedForm = new FormGroup({
      email: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      company: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.companyForm.controls['premiseType'].setValue('residential');
  }

  getData() {
    let data = this.companyForm.value;
    this.http.get(this.baseUrl+'customer/alltermdetails/',{params:data}).subscribe((response)=>{
      this.dataList = response;
    });
  }

  selectRow(company:any, cellValue:any) {
    this.proceedForm.controls['value'].setValue(cellValue);
    this.proceedForm.controls['company'].setValue(company);
    this.valueSelected = true;
  }

  sendEmail() {
    let data = this.proceedForm.value;
    data.type = 'web';
    this.http.post(this.baseUrl+'customer/termselection/',data).subscribe((response)=>{
      console.log('response message',response)
    });
  }


}
