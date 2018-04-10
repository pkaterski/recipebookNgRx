import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.drop-show') showMenu: boolean = false;
    @HostListener('click') onclick() {
        this.showMenu = !this.showMenu;
    }
}