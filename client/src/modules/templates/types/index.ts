export interface Template {
  _id: string;
  name: string;
  fields: Field[];
}

export interface Field {
  label: string;
  type: string;
  required: boolean;
}