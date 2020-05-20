import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api/sortevent';
import { WorldCovidDataService } from '../services/worldStatService.service';

@Component({
  selector: 'app-worldstats-module',
  templateUrl: './worldStats.component.html',
  styleUrls: ['./worldStats.component.scss']
})

export class WorldStatComponent implements OnInit {

  constructor(private readonly worldCovidDataService: WorldCovidDataService) { }

  cols: any[];
  countriesData: Array<any> = [];
  totalCount: any;
  worldCount: any;

    ngOnInit() {
      this.getWorldCovidData();
      this.headerArray();
    }

    headerArray() {
      this.cols = [
        { field: 'Country', header: 'Country' },
        { field: 'TotalConfirmed', header: 'Total Cases'},
        { field: 'NewConfirmed', header: 'New Cases' },
        { field: 'TotalDeaths', header: 'Total Deaths'},
        { field: 'NewDeaths', header: 'New Deaths' },
        { field: 'TotalRecovered', header: 'Recovered'},
        { field: 'NewRecovered', header: 'Cured Today'},
        { field: 'Date', header: 'Last Update' }
    ];
  }

    getWorldCovidData() {
      this.worldCovidDataService.WorldCovidData().subscribe((res) => {
         this.countriesData = res.Countries;
         this.worldCount = res.Global
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
