export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  templates: {
    primary?: string;
    secondary?: string;
  };
  etsyLink: string;
}

export interface Layer {
  type: 'text' | 'symbol';
  content: string;
  name?: string;
  font?: string;
  fontSize?: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  scaleFactor: number;
  visible: boolean;
  multiline?: boolean;
  align?: 'left' | 'center' | 'right';
  opacity?: number;
}

export interface GeneratedMockup {
  id: string;
  imageUrl: string;
  createdAt: Date;
  productId?: string;
}