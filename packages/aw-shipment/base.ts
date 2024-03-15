import { ShipmentProvider } from './interfaces/shipmentProvider';
import { OutBoundService } from './interfaces/shipmentService';

// Abstract class providing a base implementation for PaymentProvider
export abstract class BaseShipmentProvider implements ShipmentProvider {
  abstract outBound(): OutBoundService;
}
