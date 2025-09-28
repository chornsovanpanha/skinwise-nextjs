import { MetricData } from "@/components/MetricDataList";
import { Brand } from "@/types";

export const dummyIngredientLists = [
  {
    id: 1,
    name: "Vitamin",
  },
  {
    id: 2,
    name: "Resin ",
  },
  {
    id: 3,
    name: "Retonin ",
  },
  {
    id: 4,
    name: "Aqau",
  },
];

export const popularProductListings = [
  {
    id: 1,
    name: "Sunforgettable Total Protection Face Shield Matte SPF 50 PA++",
    brandName: "Paula Choice",
    imageUrl: "https://storage.skinsort.com/vhfn18oeucujg2wmaqz2m4a6xy2a",
  },
  {
    id: 2,
    name: "C-Firma Fresh Day Serum Acid",
    brandName: "Drunk Elephant",
    imageUrl: "http://storage.skinsort.com/cmjmkvk0fufaysqcr2ryxy2eshq2",
  },
  {
    id: 3,
    name: "Advanced Night Repair Synchronized Multi-Recovery Complex",
    brandName: "Estée Lauder",
    imageUrl: "https://storage.skinsort.com/cs1sqextfzr4cloldu3oazixuirx",
  },
];
export const dummyBrands: Brand[] = [
  { id: 1, alias: "nike", title: "Nike" },
  { id: 2, alias: "adidas", title: "Adidas" },
  { id: 3, alias: "puma", title: "Puma" },
  { id: 4, alias: "reebok", title: "Reebok" },
  { id: 5, alias: "underarmour", title: "Under Armour" },
  { id: 6, alias: "newbalance", title: "New Balance" },
  { id: 7, alias: "asics", title: "ASICS" },
  { id: 8, alias: "fila", title: "Fila" },
  { id: 9, alias: "converse", title: "Converse" },
  { id: 10, alias: "vans", title: "Vans" },
];

export const recentProductsListing = [
  {
    id: 3,
    name: "Advanced Night Repair Synchronized Multi-Recovery Complex",
    brandName: "Estée Lauder",
    imageUrl: "https://storage.skinsort.com/cs1sqextfzr4cloldu3oazixuirx",
  },
  {
    id: 2,
    name: "C-Firma Fresh Day Serum Acid",
    brandName: "Drunk Elephant",
    imageUrl: "http://storage.skinsort.com/cmjmkvk0fufaysqcr2ryxy2eshq2",
  },
];

export const searchPreviewListing = {
  products: [
    {
      id: 111,
      name: "Sunforgettable Total Protection Face Shield Matte SPF 50 PA++",
      brandName: "Paula Choice",
      imageUrl: "https://storage.skinsort.com/vhfn18oeucujg2wmaqz2m4a6xy2a",
    },
    {
      id: 113,
      name: "Advanced Night Repair Synchronized Multi-Recovery Complex",
      brandName: "Estée Lauder",
      imageUrl: "https://storage.skinsort.com/cs1sqextfzr4cloldu3oazixuirx",
    },
    {
      id: 220,
      name: "C-Firma Fresh Day Serum Acid",
      brandName: "Drunk Elephant",
      imageUrl: "http://storage.skinsort.com/cmjmkvk0fufaysqcr2ryxy2eshq2",
    },
  ],
  ingredients: [
    {
      id: 221,
      name: "Vitamin",
      brandName: "Drunk Elephant",
      imageUrl: "http://storage.skinsort.com/cmjmkvk0fufaysqcr2ryxy2eshq2",
    },
  ],
};

export const overviewDashboard: MetricData[] = [
  {
    key: "revenue",
    title: "Total Revenue",
    value: "10",
    prefix: "$",
    saleTotal: {
      amount: "1200",
      percentage: "12.45",
    },
    trend: "increase",
    comparisonText: "from last 7 days",
  },
  {
    key: "user",
    title: "Active User",
    prefix: "",
    value: "1",
    saleTotal: {
      amount: "1200",
      percentage: "12.45",
    },
    trend: "increase",
    comparisonText: "from last 7 days",
  },
  {
    key: "product",
    title: "Total Products",
    value: "69",
    prefix: "",
    saleTotal: {
      amount: "1200",
      percentage: "12.45",
    },
    trend: "increase",
    comparisonText: "from last 7 days",
  },
  {
    key: "subscription",
    prefix: "%",
    title: "Total Subscriptions",
    value: "80.99",
    trend: "increase",
    saleTotal: {
      amount: "1200",
      percentage: "12.45",
    },
    comparisonText: "from last 7 days",
  },
];
