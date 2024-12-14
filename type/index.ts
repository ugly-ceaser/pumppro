export interface Station {
    id: string
    name: string
    latitude: number
    longitude: number
    distance?: number
    prices: {
      petrol: number
      diesel: number
      kerosene: number
      gas: number
    }
  }
  
  export interface User {
    id: string
    name: string
    email: string
    role: 'user' | 'admin'
  }
  
  