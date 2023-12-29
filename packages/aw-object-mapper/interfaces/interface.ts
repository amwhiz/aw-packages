export interface SchemaDefinition {
  target: string; // name of the property to be mapped
  required?: boolean;
  sourceDateFormat?: string;
  targetDateFormat?: string;
  targetType?: 'string' | 'number' | 'boolean';
}

export interface JsonSchema {
  [key: string]: SchemaDefinition;
}
