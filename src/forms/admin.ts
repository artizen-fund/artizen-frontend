export const schema = {
  name: 'artizen-admin-form',
  type: 'object',
  properties: {
    tokenURI: {
      type: 'string',
    },
    startTime: {
      type: 'string',
      format: 'date-time',
    },
    endTime: {
      type: 'string',
      format: 'date-time',
    },
    mimDonationAmount: {
      type: 'number',
    },
    tokenAllocation: {
      type: 'number',
    },
  },
  required: ['tokenURI', 'startTime', 'endTime', 'mimDonationAmount', 'tokenAllocation'],
}

export const initialState = {
  tokenURI: undefined,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  mimDonationAmount: 10,
  tokenAllocation: 1000,
}

export interface FormState extends Record<string, unknown> {
  tokenURI?: string
  startTime: string
  endTime: string
  mimDonationAmount: number
  tokenAllocation: number
}

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/tokenURI',
      label: 'Token URI',
    },
    {
      type: 'Control',
      scope: '#/properties/startTime',
      label: 'Start Time',
    },
    {
      type: 'Control',
      scope: '#/properties/endTime',
      label: 'End Time',
    },
    {
      type: 'Control',
      scope: '#/properties/mimDonationAmount',
      label: 'Mimimum Donation Amount',
    },
    {
      type: 'Control',
      scope: '#/properties/tokenAllocation',
      label: 'Token Allocation',
    },
  ],
}
