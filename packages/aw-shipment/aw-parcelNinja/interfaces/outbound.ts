import { OrderStatus, PrintPlacement, SortColumn } from '../enums/outbound';

export interface IGetOutBound {
  orderTypeId?: number; // optional, lookup id retrieved from /lookups/getOrderTypes

  // Date filters
  startDate?: string; // optional, format YYYYMMDD (e.g., 20140101)
  endDate?: string; // optional, format YYYYMMDD (e.g., 20140701)

  // Pagination
  pageSize?: number; // optional, number of records per page (e.g., 15)
  page?: number; // optional, page number to return (e.g., 1)

  // Search
  search?: string; // optional, search string for ItemNo, ItemName, and Customer

  // Order number range filter
  startRange?: number; // optional, minimum order number (e.g., 154365)

  // Sorting
  col?: SortColumn; // optional, sort field (0: Reference, 1: Customer, 2: Dispatch Date, 3: Total Items, 4: Date Created)
  colOrder?: string; // optional, sort order ("asc" or "desc")

  // Filtering by status
  filter?: OrderStatus; // optional, filter by status (1: Delivered/Collect, 2: Processing, 3: Awaiting Stock, 4: En route with courier)
}

export interface IOutboundOrder {
  id: number;
  clientId: string;
  createDate: string; // Format YYYYMMDDHHmmss
  type: {
    id: number;
    description: string;
  };
  status: {
    code: number;
    timeStamp: string; // Format YYYYMMDDHHmmss
    description: string;
  };
  deliveryInfo: {
    customer: string;
    contactNo?: string; // Optional phone number
    addressLine1: string;
    addressLine2?: string; // Optional address line
    suburb: string;
    postalCode: string;
    dispatchDate: string; // Format YYYYMMDDHHmmss
    trackingNo?: string; // Optional tracking number
    trackingUrl?: string; // Optional tracking URL
    courierName?: string; // Optional courier name
    totes: string[];
    courierBillingInfo?: {
      service?: {
        code: string;
        description: string;
        workingDays: number;
      };
      shippingWeight?: number;
      boxList?: Box[];
      dispatchDate?: string; // Format YYYYMMDDHHmmss
      deliveryStartDate?: string; // Format YYYYMMDDHHmmss
      deliveryEndDate?: string; // Format YYYYMMDDHHmmss
      cost?: number;
    };
    status?: {
      code: number;
      timeStamp: string; // Format YYYYMMDDHHmmss
      description: string;
    };
  };
  items: Item[];
}

// Create Outbound
export interface OutboundRequest {
  clientId: string;
  typeId: number;
  deliveryInfo: DeliveryInfo;
  items: Item[];
  channelId?: string;
  documents?: Document[];
}

export interface DeliveryInfo {
  customer: string;
  companyName?: string;
  email?: string;
  contactNo: string;
  addressLine1: string;
  addressLine2?: string;
  suburb: string;
  postalCode: string;
  deliveryOption: DeliveryOption;
  forCollection?: boolean;
}

export interface DeliveryOption {
  deliveryQuoteId: number;
  SpecialServiceCode?: number;
}

export interface Item {
  itemNo: string;
  name: string;
  qty: number;
  fromReserve?: boolean;
  captureSerial?: boolean;
}

export interface Document {
  type: number;
  name: string;
  url?: string;
  printCount?: number;
  printPlacement?: number;
  data?: string;
}

export interface Box {
  name: string;
  weight: number;
  quantity: number;
}

export interface Item {
  id: number;
  itemNo: string;
  name: string;
  qty: number;
  SerialNumbers?: string[];
  status: {
    code: number;
    timeStamp: string; // Format YYYYMMDDHHmmss
    description: string;
  };
}

// Add Document to Outbound
export interface DocumentRequest {
  reference: string; // Required, string representing outbound reference ID (e.g., "Outbound001")
  type: number; // Required, numeric type of document (0: unknown, 1: Invoice, 2: Notice, 3: Packing slip)
  name: string; // Required, string representing document name (e.g., "name.pdf")
  url?: string; // Optional, URL to download the document (mutually exclusive with "data")
  printCount?: number; // Optional, number of prints required (default: 1)
  printPlacement?: PrintPlacement; // Optional, placement of printed documents (0: Inside & outside, 1: Inside only, 2: Outside only)
  data?: string; // Optional, UTF-8 Base64 encoded string of document data (mutually exclusive with "url")
}
