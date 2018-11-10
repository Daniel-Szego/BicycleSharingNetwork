/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BycicleComponent } from './Bycicle/Bycicle.component';
import { BikeComponent } from './Bike/Bike.component';

import { UserComponent } from './User/User.component';
import { AssetOwnerComponent } from './AssetOwner/AssetOwner.component';

import { InitTestDataComponent } from './InitTestData/InitTestData.component';
import { ClearDataComponent } from './ClearData/ClearData.component';
import { HireBycicleComponent } from './HireBycicle/HireBycicle.component';
import { NeedRepairComponent } from './NeedRepair/NeedRepair.component';
import { RepairedComponent } from './Repaired/Repaired.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BycicleComponent,
    BikeComponent,
    UserComponent,
    AssetOwnerComponent,
    InitTestDataComponent,
    ClearDataComponent,
    HireBycicleComponent,
    NeedRepairComponent,
    RepairedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
