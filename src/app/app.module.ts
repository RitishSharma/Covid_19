//import { AppRoutingModule } from './app-routing-module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule}   from '@angular/forms';

import { AppComponent } from './app.component';
import { WorldStatComponent } from './worldStatsModule/worldStats.component'
import { IndianStatComponent}  from './indianStatsModule/indianStatsModule.component';
import { IndianDistrictComponent } from './districtWiseModule/districtWiseModule.component';

// Primeng controls
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';

@NgModule({
  declarations: [
    AppComponent,
    WorldStatComponent,
    IndianStatComponent,
    IndianDistrictComponent
  ],
  imports: [
    BrowserModule,
    TabViewModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    TreeTableModule
   // AppRoutingModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
