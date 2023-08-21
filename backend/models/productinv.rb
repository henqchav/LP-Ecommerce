# models/productinv.rb
class ProductInv
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :product_id, type: BSON::ObjectId
  field :quantity, type: Integer
end