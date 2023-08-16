# models/order.rb
class Order
    include Mongoid::Document
    
    field :product_id, type: BSON::ObjectId
    field :quantity, type: Integer
    field :buyer_id, type: BSON::ObjectId
    field :status, type: String
  end
  