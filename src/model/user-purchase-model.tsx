export interface Purchase {
  id: number;
  itemCounter: number;
}

export interface UserPurchase {
  determineStats: string;
  userId: string;
  name: string;
  totalPrice: number;
  purchases: Purchase[];
}
