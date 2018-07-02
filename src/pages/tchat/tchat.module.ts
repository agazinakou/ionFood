import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TchatPage } from './tchat';

@NgModule({
  declarations: [
    TchatPage,
  ],
  imports: [
    IonicPageModule.forChild(TchatPage),
  ],
})
export class TchatPageModule {}
