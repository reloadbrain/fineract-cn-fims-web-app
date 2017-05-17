/**
 * Copyright 2017 The Mifos Initiative.
 *
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

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

export type PORTRAIT_SIZE = 'small' | 'medium' | 'large';

@Component({
  selector: 'fims-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.scss']
})
export class PortraitComponent implements OnDestroy {

  @Input() set blob(blob: Blob) {
    if(blob) {
      this.objectUrl = URL.createObjectURL(blob);
    }
  };

  @Input() size: PORTRAIT_SIZE = 'medium';

  @Input() tooltip: string;

  @Output() onClick = new EventEmitter();

  private objectUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png';

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnDestroy(): void {
    if(this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }

  get safeUrl(): SafeUrl {
    return this.objectUrl ? this.domSanitizer.bypassSecurityTrustUrl(this.objectUrl) : undefined;
  }

  clickPortrait(event: MouseEvent): void {
    event.preventDefault();
    this.onClick.emit();
  }

}
