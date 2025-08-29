export type Product = {
  id: number;
  category: {
    id: number;
    description: string;
    image: string;
    status: string;
  };
  tittle: string;
  description: string;
  price: number;
  status: string;
  productImages: Array<{
    id: number;
    image: string;
    status: string;
  }>;
  productAttributes: Array<{
    id: number;
    attributeValue: {
      id: number;
      attribute: {
        id: number;
        name: string;
        dataType: string;
        status: string;
      };
      valueString: string;
      valueNumber: number;
      valueBoolean: boolean;
    };
  }>;
};
