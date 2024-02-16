import { env } from '@aw/env';
import { OutBoundService } from '../../interfaces/shipmentService';
import { getUrl } from '../helpers/getUrls';
import { IGetOutBound, IOutboundOrder, OutboundRequest, DocumentRequest } from '../interfaces/outbound';
import { axiosClient } from '@aw/axios';

/** For More info OutBound: https://parcelninja.docs.apiary.io/#reference/outbounds */
export class OutBound implements OutBoundService {
  constructor() {
    axiosClient.setHeaders({
      Authorization: `Basic ${env('parcelNinjaToken')}`,
    });
  }

  async getAll(outBound: IGetOutBound = {}): Promise<IOutboundOrder[]> {
    const url = getUrl(env('stage') as string, 'outbound');
    const requestUrl = new URL(url);
    Object.entries(outBound).forEach(([key, value]) => requestUrl.searchParams.append(key, value));

    const response = await axiosClient.get<typeof url, { data: IOutboundOrder[] }>(url);
    return response?.data;
  }

  async get(id: string): Promise<IOutboundOrder | undefined> {
    const url = getUrl(env('stage') as string, 'outbound');
    const requestUrl = `${url}/${id}`;

    const response = await axiosClient.get<typeof url, { data: IOutboundOrder }>(requestUrl);
    return response?.data;
  }

  async create(outBound: OutboundRequest): Promise<string> {
    const url = getUrl(env('stage') as string, 'outbound');

    const response = await axiosClient.post<OutboundRequest>(url, outBound);
    return response?.headers?.['x-parcelninja-outbound-id'];
  }

  async addDocument(outBoundDocument: DocumentRequest): Promise<void> {
    const url = getUrl(env('stage') as string, 'documentOutbound');
    await axiosClient.post<DocumentRequest>(url, outBoundDocument);
  }

  async delete(id: string): Promise<void> {
    const url = getUrl(env('stage') as string, 'outbound');
    const requestUrl = `${url}/${id}`;

    await axiosClient.delete<typeof url>(requestUrl);
  }
}
