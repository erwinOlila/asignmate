import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTabsModule, MatCardModule, MatFormFieldModule,
        MatInputModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatMenuModule,
        MatDialogModule, MatTooltipModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTabsModule, MatCardModule, MatFormFieldModule,
              MatInputModule, MatDatepickerModule, MatIconModule, MatMenuModule, MatNativeDateModule, MatDialogModule,
              MatTooltipModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTabsModule, MatCardModule, MatFormFieldModule,
              MatInputModule, MatDatepickerModule, MatIconModule, MatMenuModule, MatNativeDateModule, MatDialogModule,
              MatTooltipModule]
})
export class MaterialModule { }
