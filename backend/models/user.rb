# models/user.rb
class User
    include Mongoid::Document
  
    field :first_name, type: String
    field :last_name, type: String
    field :email, type: String
    field :password_digest, type: String
    field :shipping_address, type: String
    field :phone_number, type: String
    field :role, type: String, default: "customer" 
  
    has_many :orders
  
    validates :email, presence: true, uniqueness: true
    validates :password_digest, presence: true
  end