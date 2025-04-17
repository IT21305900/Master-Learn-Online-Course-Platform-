// types/index.ts
export interface Module {
    title: string;
    description?: string;
    id?: string;
  }
  
  export interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    instructor?: string;
    category?: string;
    featured?: boolean;
    modules?: Module[];
  }
  