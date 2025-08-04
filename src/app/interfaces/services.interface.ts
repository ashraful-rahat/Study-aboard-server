export interface IService {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  icon?: string;
  coverImage?: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}
