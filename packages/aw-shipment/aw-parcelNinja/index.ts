/* eslint-disable no-undef */
import { BaseShipmentProvider } from '../base';
import { OutBoundService } from '../interfaces/shipmentService';
import { OutBound } from './services/outBound';

export class ParcelNinja extends BaseShipmentProvider {
  private parcelNinjaTurnedOff: number = +(process.env.TURN_OFF_PARCEL_NINJA_SERVICE || '0');

  constructor() {
    super();
    /* The code `if (this.hubspotProviderIsTurnedOff) throw new Error('Hubspot Provider is turn off');`
        is checking the value of the `hubspotProviderIsTurnedOff` variable. If the value is truthy (not
        equal to 0), it means that the Hubspot provider is turned off. In this case, it throws an error
        with the message 'Hubspot Provider is turn off'. This is a way to prevent the HubspotCRM class
        from being instantiated when the provider is turned off. */
    if (this.parcelNinjaTurnedOff) throw new Error('ParcelNinja Provider is turned off');
  }

  outBound(): OutBoundService {
    const outbound = new OutBound();
    return outbound;
  }
}
