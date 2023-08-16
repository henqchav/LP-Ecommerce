# mongoid_loader.rb
require 'mongoid'

Mongoid.load!('mongoid.yml', :development)
