import { DocumentRequest, IGetOutBound, IOutboundOrder, OutboundRequest } from '../aw-parcelNinja/interfaces/outbound';

export interface OutBoundService {
  getAll(outBound: IGetOutBound): Promise<IOutboundOrder[]>;
  get(id: string): Promise<IOutboundOrder | undefined>;
  create(outBound: OutboundRequest): Promise<string>;
  addDocument(outBoundDocument: DocumentRequest): Promise<void>;
  delete(id: string): Promise<void>;
}
