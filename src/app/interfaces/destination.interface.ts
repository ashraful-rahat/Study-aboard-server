export interface IDestination {
  name: string;
  description: string;
  country: string;
  photo?: string; // ✅ optional image URL
  bestTimeToVisit?: string;
  visaRequirements?: string;
  studentVisa?: string | null; // Add this line
}
