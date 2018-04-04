import { Component, OnDestroy, OnInit, ElementRef, Inject, forwardRef, trigger, state, style, transition, animate, keyframes, ViewChild } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { CategoryModalComponent } from './category-modal.component';
import { CategoryService } from '../services/category.service';
import { ScrollEvent } from 'ngx-scroll-event';



@Component({
    selector: 'category',
    templateUrl: '../templates/category.component.html',
    styleUrls: ['../css/category.component.css', '../css/category-list.component.css',
        '../css/loader.component.css', '../css/search.compoent.css']

})
export class CategoryComponent implements OnInit {


    user: any = {};
    userIconClass = "dropdown";
    AllCategory: any = [];
    showloader: boolean = false;
    mySearch: string = "";
    from: number = 0;
    to: number = 20;
    increment: number = 20;
    searchLimit: number = 20;

    @ViewChild(CategoryModalComponent) catModal: CategoryModalComponent;

    constructor(private router: Router, private toaster: ToasterService, private categoryService: CategoryService) {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.reset();
        this.showloader = true;
        this.AllCategory = [];

        this.showloader = true;
        var config: any = {};
        config.from = this.from;
        config.to = this.to;
        this.categoryService.getTopCategories(12)
            .subscribe(
            (response) => {
                var array = JSON.parse(response._body).body;
                if (array.legth > 0) {
                    this.from = array[array.length - 1].id;
                    this.to = this.from + this.increment;
                }
                this.AllCategory = this.AllCategory.concat(array);
                this.showloader = false;
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );
    }

    reset() {
        this.userIconClass = "dropdown";
        this.AllCategory = [];
        this.showloader = false;
        this.from = 0;
        this.to = 10;
        this.increment = 10;
    }

    getSubCategoriesByCategoryId(category) {
        this.categoryService.getSubCategoriesByCategoryId(category.id)
            .subscribe(
            (response) => {
                category.SubCategories = JSON.parse(response._body);
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );

    }

    signOut() {
        localStorage.clear();
        this.router.navigate(['./public/login']);
        this.categoryService.signOut()
            .subscribe(
            (response) => {
                this.toaster.clear();
                this.toaster.pop('success', ' Signed out successfully');
            },
            (err) => {
                console.error(err);
                this.toaster.pop('error', ' Signed out failed');
            },
            () => {
            }
            );

    }

    userDropdown() {
        if (this.userIconClass == 'dropdown') {
            this.userIconClass = 'dropdown open';
        } else {
            this.userIconClass = 'dropdown';
        }
    }

    addCategory() {
        this.catModal.openCategoryModal();
    }

    addSubCategory(category: any) {
        this.catModal.openSubCategoryModal(category);
    }

    expandCategory(category: any) {
        if (category.expand != undefined) {
            category.expand = !category.expand;
        } else {
            category.expand = true;
            this.getSubCategoriesByCategoryId(category);
        }

    }

    expandSubCategory(subcategory: any) {
        if (subcategory.expand != undefined) {
            subcategory.expand = !subcategory.expand;
        } else {
            subcategory.expand = true;
        }
    }

    deleteCategory(category) {
        this.categoryService.deleteCategory(category)
            .subscribe(
            (response) => {
                this.toaster.clear();
                this.toaster.pop('success', category.name + ' deleted successfully');
                this.ngOnInit();
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );

    }

    editCategoy(category) {
        this.catModal.openCatEditModal(category);
    }

    editSubCategory(category) {
        this.catModal.opeSubCatEditModal(category);
    }

    deleteSubCategory(category) {
        this.categoryService.deleteSubCategory(category)
            .subscribe(
            (response) => {
                this.toaster.clear();
                this.toaster.pop('success', category.name + ' deleted successfully');
                this.ngOnInit();
            },
            (err) => {
                console.error(err);
            },
            () => {
            }
            );
    }

    childEvent(event: any) {
        this.ngOnInit();
    }

    handleScroll(event: ScrollEvent) {
        //console.log('scroll occurred', event.originalEvent);
        if (event.isReachingBottom) {
            // console.log(`the user is reaching the bottom`);
            if (this.mySearch.length > 0) {

            } else {
                this.showloader = true;
                var config: any = {};
                this.from = this.from + this.increment;
                this.to = this.to + this.increment;
                config.from = this.from;
                config.to = this.to;
                this.categoryService.getCategoriesInrange(config)
                    .subscribe(
                    (response) => {
                        var array = JSON.parse(response._body).body;
                        this.AllCategory = this.AllCategory.concat(array);
                        this.showloader = false;
                    },
                    (err) => {
                        console.error(err);
                    },
                    () => {
                    }
                    );
            }
        }
        if (event.isReachingTop) {
            //console.log(`the user is reaching the bottom`);
        }
        if (event.isWindowEvent) {
            //console.log(`This event is fired on Window not on an element.`);
        }

    }

    onTypeHeadSearch() {
        if (this.mySearch.length == 0) {
            this.ngOnInit();
        } else {
            let config: any = {};
            config.pattern = this.mySearch;
            config.limit = this.increment;
            this.categoryService.getTypeHeadSearch(config)
                .subscribe(
                (response) => {
                    var array = JSON.parse(response._body).body;
                    this.AllCategory = array;
                    this.showloader = false;
                },
                (err) => {
                    console.error(err);
                },
                () => {
                }
                );
        }
    }

    onSearchKey(event) {
        if (event.key === "Enter") {
            this.onTypeHeadSearch();
        }
    }

    onTypeHeadSearchScroll() {
        if (this.mySearch.length == 0) {
            this.ngOnInit();
        } else {
            let config: any = {};
            config.pattern = this.mySearch;
            this.searchLimit += this.searchLimit;
            config.limit = this.searchLimit;
            this.categoryService.getTypeHeadSearch(config)
                .subscribe(
                (response) => {
                    var array = JSON.parse(response._body).body;
                    this.AllCategory = array;
                    this.showloader = false;
                },
                (err) => {
                    console.error(err);
                },
                () => {
                }
                );
        }
    }
}