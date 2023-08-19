# app.rb
require 'sinatra'
require_relative 'mongoid_loader'
require_relative 'models/product'
require_relative 'models/order'
require_relative 'models/user'


get '/products' do
  Product.all.to_json
end

get '/products/:id' do
  product = Product.find(params[:id])
  if product
    product.to_json
  else
    status 404
  end
end

post '/products' do
  product = Product.new(params)
  if product.save
    status 201
  else
    status 500
  end
end

delete '/products/:id' do
  product = Product.find(params[:id])
  if product
    if product.destroy
      status 204
    else
      status 500
    end
  else
    status 404
  end
end

get '/orders' do
  Order.all.to_json
end

get '/orders/:id' do
  order = Order.find(params[:id])
  if order
    order.to_json
  else
    status 404
  end
end

post '/orders' do
  order = Order.new(params)
  if order.save
    status 201
  else
    status 500
  end
end

delete '/orders/:id' do
  order = Order.find(params[:id])
  if order
    if order.destroy
      status 204
    else
      status 500
    end
  else
    status 404
  end
end

# Métodos para Usuarios
get '/users' do
  User.all.to_json
end

# Obtener un usuario por su ID
get '/users/:id' do
  user = User.find(params[:id])
  if user
    user.to_json
  else
    status 404
  end
end

post '/users' do
  user = User.new(params)
  if user.save
    status 201
  else
    status 500
  end
end

delete '/users/:id' do
  user = User.find(params[:id])
  if user
    if user.destroy
      status 204
    else
      status 500
    end
  else
    status 404
  end
end
