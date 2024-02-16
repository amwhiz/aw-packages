import { BaseShipmentProvider } from './base';
import { ShipmentProvider } from './interfaces/shipmentProvider';
import { OutBoundService } from './interfaces/shipmentService';

export class ShipmentProcessor implements BaseShipmentProvider {
  private provider: ShipmentProvider;

  constructor(provider: ShipmentProvider) {
    this.provider = provider;
  }

  outBound(): OutBoundService {
    return this.provider.outBound();
  }
}
