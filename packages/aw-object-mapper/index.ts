import dayjs from 'dayjs';
import { JsonSchema } from './interfaces/interface';

export class ObjectMapper<I extends object, O extends object> {
  source: I;
  schema: JsonSchema;
  target: O;

  constructor(source: I, jsonSchema: JsonSchema) {
    this.source = source;
    this.schema = jsonSchema;
    this.target = {} as O;
  }

  mapObjects(): O {
    Object.entries(this.schema).forEach(([sourceKey, { target: targetKey, required, sourceDateFormat, targetDateFormat, targetType }]) => {
      if (required && !(sourceKey in this.source)) this.target[targetKey] = null;
      if (sourceKey in this.source) {
        let sourceValue = this.source[sourceKey];
        const sourceValueType = typeof sourceValue;

        if (targetType === 'number') {
          // Convert sourceValue to number if targetType is number
          if (sourceValueType === 'string') {
            this.target[targetKey] = parseFloat(sourceValue);
          } else if (sourceValueType === 'boolean') {
            this.target[targetKey] = sourceValue ? 1 : 0;
          } else {
            this.target[targetKey] = sourceValue;
          }
        } else if (targetType === 'string' && sourceValueType === 'number') {
          // Convert number to string if targetType is string
          sourceValue = sourceValue.toString();
          this.target[targetKey] = sourceValue;
        } else {
          // For other targetType values, assign sourceValue directly
          this.target[targetKey] = sourceValue;
        }

        if (sourceDateFormat && targetDateFormat) {
          this.target[targetKey] = this.formatDate(sourceValue, sourceDateFormat, targetDateFormat);
        }
      }
    });
    return this.target;
  }

  formatDate(dateString: string, sourceDateFormat: string, targetDateFormat: string): string {
    return dayjs(dateString, { format: sourceDateFormat }).format(targetDateFormat);
  }
}
