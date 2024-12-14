export interface Station {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    prices: {
      petrol: number;
      diesel: number;
      kerosene: number;
      gas: number;
    };
  }
  
  