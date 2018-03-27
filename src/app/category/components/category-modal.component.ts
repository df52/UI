import { Component, Output, EventEmitter, OnDestroy, OnInit, Inject, forwardRef, trigger, state, style, transition, animate, keyframes, ViewChild } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { BsModalComponent } from 'ng2-bs3-modal';
import { CategoryService } from '../services/category.service';
import { CategoryComponent } from './category.component';


@Component({
    selector: 'category-modal',
    templateUrl: '../templates/category-modal.component.html',
    styleUrls: ['../css/category-modal.component.css']

})
export class CategoryModalComponent {


    @ViewChild('addCatModal')
    addCatModal: BsModalComponent;
    @ViewChild('addSubCatModal')
    addSubCatModal: BsModalComponent;
    @ViewChild('editCatModal')
    editCatModal: BsModalComponent;
    @ViewChild('editSubCatModal')
    editSubCatModal: BsModalComponent;

    model: any = {};
    subCategoryOptions: any = [];
    isOnlySubCategory: boolean = false;

    @Output() onAdd = new EventEmitter<boolean>();

    constructor(private router: Router, private toaster: ToasterService, private categoryService: CategoryService) {

    }

    openCategoryModal() {
        this.model = {};
        this.model.Category = 'Electronics';
        //this.model.Subcategory = 'Tv';
        //this.onCatChange();
        this.addCatModal.open();
    }

    openSubCategoryModal(category) {
        this.model = {};
        this.model.Category = category.name;
        this.onCatChange();
        this.model.CategoryDescription = category.description;
        this.model.CategoryType = category.type;
        this.model.categoryId = category.id;
        this.isOnlySubCategory = true;
        this.addSubCatModal.open();
    }

    dismiss() {
        this.addCatModal.close();
        this.addSubCatModal.close();
        this.editCatModal.close();
    }

    onCatChange() {
        this.subCategoryOptions = [];
        if (this.model.Category == 'Electronics') {
            this.model.Subcategory = 'Tv';
            this.subCategoryOptions.push('Tv');
            this.subCategoryOptions.push('AC');
            this.subCategoryOptions.push('Mobiles');
            this.subCategoryOptions.push('Laptops');
        } else if (this.model.Category == 'Fashion') {
            this.model.Subcategory = 'Shirts';
            this.subCategoryOptions.push('Shirts');
            this.subCategoryOptions.push('Trousers');
            this.subCategoryOptions.push('Jackets');
            this.subCategoryOptions.push('Kurta');
        } else if (this.model.Category == 'Furniture') {
            this.model.Subcategory = 'Bed';
            this.subCategoryOptions.push('Bed');
            this.subCategoryOptions.push('Sofa');
            this.subCategoryOptions.push('Chair');
            this.subCategoryOptions.push('Wardrobes');
        } else if (this.model.Category == 'Home Decors') {
            this.model.Subcategory = 'Wall clock';
            this.subCategoryOptions.push('Wall clock');
            this.subCategoryOptions.push('Wallpapers');
            this.subCategoryOptions.push('Curtains');
        } else if (this.model.Category == 'Automobiles') {
            this.model.Subcategory = 'Engine Oil';
            this.subCategoryOptions.push('Engine Oil');
            this.subCategoryOptions.push('Car Wax');
            this.subCategoryOptions.push('Bike Lock');
            this.subCategoryOptions.push('Headgear');
        }
    }

    addCategory() {
        this.categoryService.addCategory(this.model)
            .subscribe(
            (response) => {
                this.onAdd.emit(true);
                this.toaster.clear();
                this.toaster.pop('success', 'Category added successfully. Add more categories or close the modal.');
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );
    }

    addSubCategory() {

        var categoryId = this.model.categoryId;
        this.categoryService.addSubCategory(this.model, categoryId)
            .subscribe(
            (response) => {
                this.onAdd.emit(true);
                this.toaster.clear();
                this.toaster.pop('success', 'Sub-Category added successfully. Add more sub categories or close the modal.');
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );
    }

    openCatEditModal(category) {
        this.model.Category = category.name;
        this.model.CategoryDescription = category.description;
        this.model.CategoryType = category.type;
        this.model.categoryId = category.id;
        this.editCatModal.open();
    }

    editCategoy() {
        this.categoryService.editCategory(this.model)
            .subscribe(
            (response) => {
                this.onAdd.emit(true);
                this.editCatModal.close();
                this.toaster.clear();
                this.toaster.pop('success', 'Category edited successfully');
            },
            (err) => {

                console.error(err);
            },
            () => {
            }
            );
    }

    opeSubCatEditModal(category) {
        this.model.Subcategory = category.name;
        this.model.SubCategoryDescription = category.description;
        this.model.SubCategoryType = category.type;
        this.model.Category = category.parent_type;
        this.onCatChange();
        this.model.categoryId = category.categoryId;
        this.model.subCategoryId = category.id;
        this.editSubCatModal.open();
    }

    editSubCategory() {
        this.categoryService.editSubCategory(this.model)
            .subscribe(
            (response) => {
                this.onAdd.emit(true);
                this.editSubCatModal.close();
                this.toaster.clear();
                this.toaster.pop('success', 'Sub-Category edited successfully');
            },
            (err) => {

                console.error(err);
            },
            () => {
            }
            );
    }

}