import { LightningElement, track, wire } from 'lwc';
import averageprice from'@salesforce/apex/AveragePriceController.getprice';

export default class AveragePrice extends LightningElement {

months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
@track data = [];
@track error;
@track loaded = false;
year= String(new Date().getFullYear());

get YearValues() {
    const currentyear = new Date().getFullYear();

    return [
        { label: currentyear - 3, value: String(currentyear - 3) },
            { label: currentyear - 2, value: String(currentyear - 2) },
            { label: currentyear - 1, value: String(currentyear - 1) },
            { label: currentyear,     value: String(currentyear) },
            { label: currentyear + 1, value: String(currentyear + 1) },
            { label: currentyear + 2, value: String(currentyear + 2) },
    ];
}

handleyearChange(event) {
    this.year = event.target.value;
    this.connectedCallback() 
}

connectedCallback() {
   this.loaded = true;
    averageprice({year:this.year})
    .then((result) => {
      this.data = result;
      this.loaded = false;
    })
    .catch((error) => {
      console.log("===>>Error during callout : " + JSON.stringify(error));
      this.error = JSON.stringify(error);
      this.loaded = false;
    });
    
}



 }
