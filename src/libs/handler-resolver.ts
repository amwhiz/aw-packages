/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const handlerPath = (context: string) => `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
