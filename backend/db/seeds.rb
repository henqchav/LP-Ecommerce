require 'mongoid'
require 'faker'
require_relative '../mongoid_loader'
require_relative '../models/product'
require_relative '../models/order'

Mongoid.load!('mongoid.yml', :development)

1.times do
  product = Product.create(
    name: Faker::Commerce.product_name,
    description: Faker::Marketing.buzzwords,
    quantity: Faker::Number.between(from: 1, to: 100),
    image: Faker::Placeholdit.image,
    price: Faker::Commerce.price(range: 0..100.0)
  )

  Order.create(
    product_id: product._id,
    quantity: Faker::Number.between(from: 1, to: 10),
    buyer_id: BSON::ObjectId.new,
    status: ['pending', 'processing', 'complete'].sample
  )
end
