require 'sinatra'
require 'mongoid'

Mongoid.load!('mongoid.yml', :development)

class Item
  include Mongoid::Document
  
  field :name, type: String
end

get '/items' do
  Item.all.to_json
end

post '/items' do
  item = Item.new(params)
  if item.save
    status 201
  else
    status 500
  end
end
