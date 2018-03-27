import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule, BrowserXhr } from '@angular/http';
import { BsModalModule } from 'ng2-bs3-modal';
import { ScrollEventModule } from 'ngx-scroll-event';
import { CategoryComponent } from './components/category.component';
import { CategoryModalComponent } from './components/category-modal.component'
import { CategoryService } from './services/category.service';

import { CategoryRouting } from './category.routing';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, HttpModule, JsonpModule, BsModalModule, ScrollEventModule, CategoryRouting],
    declarations: [CategoryComponent, CategoryModalComponent],
    providers: [CategoryService],
    exports: [CategoryComponent, CategoryModalComponent]
})
export class CategoryModule { }

