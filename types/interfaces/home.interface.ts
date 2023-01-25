import type { Session } from "next-auth";

export interface Home {
  categories: Category[];
  products: Product[];
  session: Session | null;
}
