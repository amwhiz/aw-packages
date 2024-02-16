export enum OrderStatus {
  DeliveredCollect = 1,
  Processing = 2,
  AwaitingStock = 3,
  EnRouteWithCourier = 4,
}

export enum SortColumn {
  Reference = 0,
  Customer = 1,
  DispatchDate = 2,
  TotalItems = 3,
  DateCreated = 4,
}

export enum PrintPlacement {
  InsideAndOutside = 0,
  InsideOnly = 1,
  OutsideOnly = 2,
}
