// Import the 'Buffer' class from the 'buffer' module
import { Buffer } from 'buffer';

// Function to encode a string to Base64
// Encode the buffer to Base64
export const base64Encode = (str: string): string => Buffer.from(str, 'utf-8').toString('base64');

// Function to decode a Base64 string to the original string
// Decode the Base64 string to a buffer
export const base64Decode = (base64String: string): string => Buffer.from(base64String, 'base64').toString('utf-8');

// Convert string to buffer
export const stringToBuffer = (inputString: string): Buffer => Buffer.from(inputString, 'base64');

// Convert Binary to string base64
export const binaryImageData = (body: string): string => Buffer.from(body, 'binary').toString('base64');
