import { Component, OnInit } from '@angular/core';
import { CovidDistrictDataService } from  '../services/indianDistrictService.service';
import { SortEvent } from 'primeng/api/sortevent';

@Component({
  selector: 'app-districtWise-module',
  templateUrl: './districtWiseModule.component.html',
  styleUrls: ['./districtWiseModule.component.scss']
})

export class IndianDistrictComponent implements OnInit {

  constructor(private readonly covidDistrictData: CovidDistrictDataService) { }
  
  colum: any[];
  districtStats: Array<any> = [];
  totalCount: Array<any> = [];
  districtWiseData: Array<any> = [];

  ngOnInit() {
      this.headerArray();
      this.getCovidDistrictData();
  }

  headerArray() {
    this.colum = [
      { field: 'district', header: 'District Name'},
      { field: 'confirmed', header: 'District Confirmed Cases  '},
    ]; 
  }

    getCovidDistrictData() {
      this.covidDistrictData.getDistrictData().subscribe((res) => {
           this.districtStats = res;
           this.districtStats.forEach( items => {
             items.districtData.forEach((item) => {
              this.districtWiseData.push( {
                district: item.district,
                confirmed: item.confirmed
              })
             })
           })
      });
    }

    customSort(event: SortEvent) {
      event.data.sort((data1, data2) => {
          let value1 = data1[event.field];
          let value2 = data2[event.field];
          return event.order * this.computeValueForSort(value1, value2);
      });
    }

    private computeValueForSort(value1: any, value2: any) {
      let result;
      if (value1 == null && value2 != null) {
          result = -1;
      } else if (value1 != null && value2 == null) {
          result = 1;
      } else if (value1 == null && value2 == null) {
          result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
          result = value1.localeCompare(value2, undefined, { numeric: true });
      } else {
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }
      return result;
  }
  
   }
