# models/order.rb
class Order
    include Mongoid::Document
    field :product_id, type: BSON::ObjectId
    field :quantity, type: Integer
    field :order_code, type: String
    field :status, type: String
  end
  