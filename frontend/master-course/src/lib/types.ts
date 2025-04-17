import { UUID } from "crypto";

// types/index.ts
export interface Module {
  title: string;
  description?: string;
  id?: string;
}

export interface Course {
  key: UUID;
  _id: string;
  title: string;
  description: string;
  price: number;
  instructor?: string;
  category?: string;
  featured?: boolean;
  modules?: Module[];
}


// lib/types.ts
export interface Module {
  type: string;
  lid: string; // or ObjectId in your schema
  title: string;
}


export interface Lesson {
  _id: string;
  key: string;
  course: string;
  title: string;
  content: string;
}