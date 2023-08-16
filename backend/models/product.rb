# models/product.rb
class Product
    include Mongoid::Document
    
    field :name, type: String
    field :description, type: String
    field :quantity, type: Integer
    field :image, type: String
    field :price, type: Float
  end
  