import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit{

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = "red";
  private _errors?: ValidationErrors | null;

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  @Input() set color(value: string){
    this._color = value; 
    this.setStyle();
  }

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    this.htmlElement = el;

    this.htmlElement.nativeElement.innerHTML = "TEXT EXAMPLE";
   }

   ngOnInit(): void {
    this.setStyle();
   }

   setStyle(): void{
    if (!this.htmlElement) return ; 
    this.htmlElement!.nativeElement.style.color = this._color;
   }

   setErrorMessage(): void {
    if(!this.htmlElement) return;
    if(!this._errors) {
      this.htmlElement.nativeElement.innerText = "No errors";
      return;
    }

    const formErrors = Object.keys(this._errors);

    if(formErrors.includes("required")) {
      this.htmlElement.nativeElement.innerText = "El campo es requerido";
      return;
    }

    if(formErrors.includes("minlength")) {
      const min = this._errors!["minlength"]["requiredLength"];
      const current = this._errors!["minlength"]["actualLength"];
      this.htmlElement.nativeElement.innerText = `Minimo ${current}/${min}caracteres.`;
      return;
    }

    if(formErrors.includes("email")) {
      this.htmlElement.nativeElement.innerText = "Email invalid format";
      return;
    }

   }


}
