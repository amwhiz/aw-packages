/* eslint-disable @typescript-eslint/no-explicit-any */
export type TemplateMessage = {
  broadcast_name: string;
  template_name: string;
  parameters: Parameters[];
};

export type Parameters = {
  name: string;
  value: string | number;
};

export type Parameter = {
  name: string;
  value: string;
};

export type Contact = {
  id: string;
  wAid: string;
  firstName: string;
  fullName: string;
  phone: string;
  source: any; // You may want to replace 'any' with the actual type for 'source'
  contactStatus: string;
  photo: any; // You may want to replace 'any' with the actual type for 'photo'
  created: string;
  tags: string[];
  customParams: Parameter[];
  optedIn: boolean;
  isDeleted: boolean;
  lastUpdated: string;
  allowBroadcast: boolean;
  allowSMS: boolean;
  teamIds: string[];
  isInFlow: boolean;
  lastFlowId: string;
  currentFlowNodeId: string;
};

export type Model = {
  ids: string[];
};

export type TemplateMessageResponse = {
  result: boolean;
  phone_number: string;
  template_name: string;
  parameteres: Parameter[];
  contact: Contact;
  model: Model;
  validWhatsAppNumber: boolean;
};
