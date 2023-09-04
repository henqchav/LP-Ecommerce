require 'mongoid'
require 'faker'
require 'bcrypt'
require_relative '../mongoid_loader'
require_relative '../models/product'
require_relative '../models/order'
require_relative '../models/user'
require_relative '../models/productinv'

Mongoid.load!('mongoid.yml', :development)


# Crear usuarios
1.times do
  password = Faker::Internet.password # Genera una contraseña aleatoria
  encrypted_password = BCrypt::Password.create(password) # Cifra la contraseña

  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    password_digest: encrypted_password, 
    shipping_address: Faker::Address.full_address,
    phone_number: Faker::PhoneNumber.phone_number,
    role: ['customer', 'admin'].sample
  )
end

1.times do
  product = Product.create(
    name: Faker::Commerce.product_name,
    description: Faker::Marketing.buzzwords,
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

10.times do
  product_name = Faker::Food.dish
  product_description = "Delicious hamburger with #{Faker::Food.ingredient}, #{Faker::Food.spice} and more."

  product = Product.create(
    name: product_name,
    description: product_description,
    image: Faker::Placeholdit.image,
    price: Faker::Commerce.price(range: 0..100.0)
  )

  ProductInv.create(
    product_id: product._id,
    quantity: Faker::Number.between(from: 1, to: 100),
  )
end
