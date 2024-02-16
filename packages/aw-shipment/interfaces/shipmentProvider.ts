import { OutBoundService } from './shipmentService';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ShipmentProvider {
  outBound(): OutBoundService;
}
