import { LightningElement,api } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';

export default class BearTile extends LightningElement {
    @api bear;

    appResources = {
		bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
	};

    //dispatch an event once bear tile is clicked
    handleOpenRecordClick(event){
        const evt = new CustomEvent('bearview', {
            detail: this.bear.Id
        });
        this.dispatchEvent(evt);
    }
}