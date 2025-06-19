export interface IDestination {
  name: string;
  description: string;
  country: string;
  images: string[]; // Will store Cloudinary/ImgBB URLs
  bestTimeToVisit: string;
  visaRequirements: string;
  createdAt?: Date;
  updatedAt?: Date;
}
