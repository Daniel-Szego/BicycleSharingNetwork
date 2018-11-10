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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BikeService } from './Bike.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-bike',
  templateUrl: './Bike.component.html',
  styleUrls: ['./Bike.component.css'],
  providers: [BikeService]
})
export class BikeComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  BikeType = new FormControl('', Validators.required);
  BicycleColor = new FormControl('', Validators.required);
  ObjectID = new FormControl('', Validators.required);
  ObjectName = new FormControl('', Validators.required);
  AssetAvailability = new FormControl('', Validators.required);
  AssetSate = new FormControl('', Validators.required);
  Owner = new FormControl('', Validators.required);
  HiredBy = new FormControl('', Validators.required);

  constructor(public serviceBike: BikeService, fb: FormBuilder) {
    this.myForm = fb.group({
      BikeType: this.BikeType,
      BicycleColor: this.BicycleColor,
      ObjectID: this.ObjectID,
      ObjectName: this.ObjectName,
      AssetAvailability: this.AssetAvailability,
      AssetSate: this.AssetSate,
      Owner: this.Owner,
      HiredBy: this.HiredBy
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceBike.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.bicyclesharing.model.Bike',
      'BikeType': this.BikeType.value,
      'BicycleColor': this.BicycleColor.value,
      'ObjectID': this.ObjectID.value,
      'ObjectName': this.ObjectName.value,
      'AssetAvailability': this.AssetAvailability.value,
      'AssetSate': this.AssetSate.value,
      'Owner': this.Owner.value,
      'HiredBy': this.HiredBy.value
    };

    this.myForm.setValue({
      'BikeType': null,
      'BicycleColor': null,
      'ObjectID': null,
      'ObjectName': null,
      'AssetAvailability': null,
      'AssetSate': null,
      'Owner': null,
      'HiredBy': null
    });

    return this.serviceBike.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'BikeType': null,
        'BicycleColor': null,
        'ObjectID': null,
        'ObjectName': null,
        'AssetAvailability': null,
        'AssetSate': null,
        'Owner': null,
        'HiredBy': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.bicyclesharing.model.Bike',
      'BikeType': this.BikeType.value,
      'BicycleColor': this.BicycleColor.value,
      'ObjectName': this.ObjectName.value,
      'AssetAvailability': this.AssetAvailability.value,
      'AssetSate': this.AssetSate.value,
      'Owner': this.Owner.value,
      'HiredBy': this.HiredBy.value
    };

    return this.serviceBike.updateAsset(form.get('ObjectID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceBike.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceBike.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'BikeType': null,
        'BicycleColor': null,
        'ObjectID': null,
        'ObjectName': null,
        'AssetAvailability': null,
        'AssetSate': null,
        'Owner': null,
        'HiredBy': null
      };

      if (result.BikeType) {
        formObject.BikeType = result.BikeType;
      } else {
        formObject.BikeType = null;
      }

      if (result.BicycleColor) {
        formObject.BicycleColor = result.BicycleColor;
      } else {
        formObject.BicycleColor = null;
      }

      if (result.ObjectID) {
        formObject.ObjectID = result.ObjectID;
      } else {
        formObject.ObjectID = null;
      }

      if (result.ObjectName) {
        formObject.ObjectName = result.ObjectName;
      } else {
        formObject.ObjectName = null;
      }

      if (result.AssetAvailability) {
        formObject.AssetAvailability = result.AssetAvailability;
      } else {
        formObject.AssetAvailability = null;
      }

      if (result.AssetSate) {
        formObject.AssetSate = result.AssetSate;
      } else {
        formObject.AssetSate = null;
      }

      if (result.Owner) {
        formObject.Owner = result.Owner;
      } else {
        formObject.Owner = null;
      }

      if (result.HiredBy) {
        formObject.HiredBy = result.HiredBy;
      } else {
        formObject.HiredBy = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'BikeType': null,
      'BicycleColor': null,
      'ObjectID': null,
      'ObjectName': null,
      'AssetAvailability': null,
      'AssetSate': null,
      'Owner': null,
      'HiredBy': null
      });
  }

}
