# app.rb
require 'sinatra'
require_relative 'mongoid_loader'
require_relative 'models/product'
require_relative 'models/order'


get '/products' do
  Product.all.to_json
end

post '/products' do
  product = Product.new(params)
  if product.save
    status 201
  else
    status 500
  end
end

get '/orders' do
  Order.all.to_json
end

post '/orders' do
  order = Order.new(params)
  if order.save
    status 201
  else
    status 500
  end
end
