import { LightningElement, wire } from 'lwc';
import getAllBears from '@salesforce/apex/BearController.getAllBears';
import searchBears from '@salesforce/apex/BearController.searchBears';
import { NavigationMixin } from 'lightning/navigation';
import { publish, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';

export default class BearList extends NavigationMixin(LightningElement) {
	bears;
	error;
    searchTerm = '';
	@wire(MessageContext)
	messageContext;

	@wire(searchBears, {searchTerm: '$searchTerm'})
	loadBears(result) {
		this.bears = result;
		if (result.data) {
			const message = {
				bears: result.data
			};
			publish(this.messageContext, BEAR_LIST_UPDATE_MESSAGE, message);
		}
	}

    //@wire(searchBears,{searchTerm: '$searchTerm'}) bears;
    //@wire(getAllBears) bears;

    //call to apex through imperative approach
	/*connectedCallback() {
		this.loadBears();
	}

	loadBears() {
		getAllBears()
			.then(result => {
				this.bears = result;
			})
			.catch(error => {
				this.error = error;
			});
	}*/

    handlesearchBears(event){
        window.clearTimeout(this.delayTimeout);
		const searchTerm1 = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm1;
		}, 300);
    }

    get hasResults() {
		return (this.bears.data != undefined && this.bears.data.length > 0);
	}

	handleBearView(event){
		const bearId = event.detail;
		// Navigate to bear record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: bearId,
				objectApiName: 'Bear__c',
				actionName: 'view',
			},
		});
	}
}
