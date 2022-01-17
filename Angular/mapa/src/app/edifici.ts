export interface Edifici {
  type: string;
  properties: {
    descripcio: string;
    orden: number;
    pdf: string;
    foto: string;
    fotow: string;
    web_turismo: string;
    web_turismow: string;
    como_llegar: string;
    como_llegarw: string;
    id: number,
  },
  geometry: {
    type: string,
    coordinates: number[][];
  }
}
