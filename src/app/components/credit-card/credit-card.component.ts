import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from 'src/app/services/credit-card.service';


@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  // listCreditCards: any[] = [
  //   {owner: 'Isac Danie Minano Corro', number: '4214 1002 2888 3189', expire_date:'09/27'},
  //   {owner: 'Luna Estrella Leon Juarez', number: '4214 1002 8745 6523', expire_date:'25/23'},
  //   {owner: 'Elisa Lopez', number: '4214 1002 3256 5412', expire_date:'18/25'}
  // ];

  listCreditCards: any[] = [];

  action = 'Add';
  id: number | undefined;

  buttonValue = 'Save';

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _creditCardService: CreditCardService) { 
    this.form = this.fb.group({
      owner: ['', Validators.required],
      number: ['', [Validators.required, Validators.maxLength(19), Validators.minLength(16)]],
      expire_date: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.obtainCreditCard();
  }

  obtainCreditCard(){
    this._creditCardService.getListCreditCards().subscribe(data => {
      console.log(data);
      this.listCreditCards = data;
    }, error => {
      console.log(error);
    });
  }

  saveCreditCard(){
    const creditCard: any = {
      owner: this.form.get('owner')?.value,
      number: this.form.get('number')?.value,
      expire_date: this.form.get('expire_date')?.value
    }
    if (this.id == undefined) {
      // Add new Credit Card

      // this.listCreditCards.push(creditCard);
      this._creditCardService.saveCreditCard(creditCard).subscribe(data => {
        //Show Toast for confirmation
        this.toastr.success('Successfully', 'Credit Card added');
        this.obtainCreditCard();
        //End Toast
        this.form.reset();
      }, error =>{
        this.toastr.error('Opps! error trying save to Credit Card', 'Error!!!');
        console.log(error);
      });
    } else{

       // Setear Id de tabla al body
        creditCard.id = this.id;
        
       // Update an exists Credit Card
       this._creditCardService.updateCreditCard(this.id, creditCard).subscribe(data => {
         //Devolver al formulario como nuevo y reinicializar variables
          this.form.reset();
          this.action = "Add";
          this.id = undefined;
          this.toastr.info('Credit Card was updated successfully', 'Credit Card Update!!!');
          this.obtainCreditCard();
       }, error => {
         console.log(error);
       });
    }
    

    
  }

  removeCreditCard(id: number) {
    // this.listCreditCards.splice(index, 1);
    this._creditCardService.removeCreditCard(id).subscribe(data => {
      this.toastr.info('Remove Success!!!', 'Credit Card removed');
      this.obtainCreditCard();
    }, error =>{
      console.log(error);
    });
    
  }

  modifiedCard(creditCard: any){
    this.action = "Update";
    this.buttonValue = "Update";
    this.id = creditCard.id;
    this.form.patchValue({
      owner: creditCard.owner,
      number: creditCard.number,
      expire_date: creditCard.expire_date,
    })
  }

}
