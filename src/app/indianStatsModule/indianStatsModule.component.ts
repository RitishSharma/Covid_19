import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../services/indianStatsService.service';
import { SortEvent } from 'primeng/api/sortevent';

@Component({
  selector: 'app-indianstats-module',
  templateUrl: './indianStatsModule.component.html',
  styleUrls: ['./indianStatsModule.component.scss']
})

export class IndianStatComponent implements OnInit {

  constructor(private readonly covidData: CovidDataService) { }
  
  cols: any[];
  data: Array<any> = [];
  totalCount: Array<any> = [];
  
  ngOnInit() {
      this.getCovidData();
      this.headerArray();
  }

  headerArray() {
    this.cols = [
      { field: 'state', header: 'States' },
      { field: 'confirmed', header: 'Total Cases'},
      { field: 'deaths', header: 'Total Deaths'},
      { field: 'recovered', header: 'Recovered'},
      { field: 'deltaconfirmed', header: 'New Cases' },
      { field: 'deltadeaths', header: 'New Deaths' },
      { field: 'deltarecovered', header: 'Cured Today'},
      { field: 'active', header: 'Active Cases' },
      { field: 'lastupdatedtime', header: 'Last Update' }

    ]; 
  }

    getCovidData() {
      this.covidData.getApiData().subscribe((res) => {
        this.data = res.statewise;
        this.totalCount.push(res.statewise[0]);
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
