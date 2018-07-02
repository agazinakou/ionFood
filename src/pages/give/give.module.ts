import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GivePage } from './give';

@NgModule({
  declarations: [
    GivePage,
  ],
  imports: [
    IonicPageModule.forChild(GivePage),
  ],
})
export class GivePageModule {}
