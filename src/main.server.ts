import { render } from '@analogjs/router/server';
import '@angular/platform-server/init';

import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

export default render(AppComponent, config);
