# app.rb
require 'sinatra'
require 'rack/cors'
require 'mongoid'
require 'json'
require_relative 'mongoid_loader'
require_relative 'models/product'
require_relative 'models/order'
require_relative 'models/user'
require_relative 'models/productinv'

# Enable CORS for all routes
use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :options, :put, :delete]
  end
end


# Enable JSON parsing middleware using rack-parser
require 'rack/parser'
use Rack::Parser, parsers: {
  'application/json' => proc { |data| JSON.parse(data) }
}

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

put '/products/:id' do
  product = Product.find(params[:id])
  if product
    if product.update(params)
      status 200
    else
      status 500
    end
  else
    status 404
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

get '/product_inventory' do
  product_inventories = ProductInv.all.map do |product_inv|
    product = Product.find(product_inv.product_id)
    {
      id: product_inv._id.to_s,
      product_id: product_inv.product_id.to_s,
      quantity: product_inv.quantity,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
    }
  end

  content_type :json
  product_inventories.to_json
end

get '/product_inventory/:id' do
  product_inv = ProductInv.find(params[:id])

  if product_inv
    product = Product.find(product_inv.product_id)

    if product
      result = {
        id: product_inv._id.to_s,
        product_id: product_inv.product_id.to_s,
        quantity: product_inv.quantity,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
      }

      content_type :json
      result.to_json
    else
      status 404
    end
  else
    status 404
  end
end

post '/product_inventory' do
  puts "Recibida una solicitud POST en /product_inventory"
  puts "Datos recibidos: #{params.inspect}"
  productInv = ProductInv.new(params)
  if productInv.save
    status 201
  else
    status 500
  end
end

put '/product_inventory/:id' do
  productInv = ProductInv.find(params[:id])
  if productInv
    new_status = JSON.parse(request.body.read)['quantity']
    puts new_status
    productInv.quantity = new_status
    if productInv.save
      status 200
    else
      status 500
    end
  else
    status 404
  end
end



delete '/product_inventory/:id' do
  productInv = ProductInv.find(params[:id])
  if productInv
    if productInv.destroy
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

get '/orders/by_code/:order_code' do
  order = Order.find_by(order_code: params[:order_code])

  if order
    content_type :json
    { order_status: order.status }.to_json
  else
    status 404
  end
end

post '/orders' do
    puts "Recibida una solicitud POST en /orders"
    puts "Datos recibidos: #{params.inspect}"
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

put '/orders/:id' do
  order = Order.find(params[:id])
  
  if order
    new_status = JSON.parse(request.body.read)['status']
    puts new_status
    order.status = new_status
    if order.save
      status 200
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
