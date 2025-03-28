export enum FeedStatus {
  OPEN = 'OPEN',
  FULL = 'FULL',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
}

export enum ItemType {
  DOCUMENT = 'DOCUMENT',
  FOOD = 'FOOD',
  LIQUID = 'LIQUID',
  BRANDED_ITEM = 'BRANDED_ITEM',
  OTHER = 'OTHER',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  ON_DELIVERY = 'ON_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}
