/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {GroupService} from '../../services/group/group.service';
import {isString} from './validators';
import {of as observableOf, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

const invalid = observableOf({
  invalidGroup: true
});

export function groupExists(groupService: GroupService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<any> => {
    if (!control.dirty || !control.value || control.value.length === 0) {
      return observableOf(null);
    }

    if (isString(control.value) && control.value.trim().length === 0) {
      return invalid;
    }

    return groupService.getGroup(control.value, true).pipe(
      map(group => null),
      catchError(() => invalid));
  };
}





