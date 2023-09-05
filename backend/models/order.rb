class Order
  include Mongoid::Document
  field :product_data, type: Array, default: []
  field :order_code, type: String
  field :status, type: String

end