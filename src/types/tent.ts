export interface Tent {
  id: string;
  nameEn: string;
  nameTo: string;
  descriptionEn: string;
  descriptionTo: string;
  size: string;
  price: number;
  active: boolean;
  imageUrls?: string[];
}
