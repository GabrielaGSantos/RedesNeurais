import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material'
import { FormsModule } from '@angular/forms'

import { IndexComponent } from './index/index.component'
import { TopMenuComponent } from './top-menu/top-menu.component'
import { MenuComponent } from './index/menu/menu.component'
import { OptionsComponent } from './index/options/options.component'
import { MnistComponent } from './mnist/mnist.component'
import { MnistOptionsComponent } from './mnist/mnist-options/mnist-options.component'
import { MnistMenuComponent } from './mnist/mnist-menu/mnist-menu.component'
import { TableComponent } from './index/table/table.component'
import { RedeneuralTabelaComponent } from './index/redeneural-tabela/redeneural-tabela.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatSliderModule } from '@angular/material/slider'
import { MatDividerModule } from '@angular/material/divider'
import { MatChipsModule } from '@angular/material/chips';
import { ResultadoGraficoComponent } from './index/resultado-grafico/resultado-grafico.component'
import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    TopMenuComponent,
    MenuComponent,
    OptionsComponent,
    MnistComponent,
    MnistOptionsComponent,
    MnistMenuComponent,
    TableComponent,
    RedeneuralTabelaComponent,
    ResultadoGraficoComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    MatSliderModule,
    MatDividerModule,
    MatChipsModule,
    PlotlyModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
