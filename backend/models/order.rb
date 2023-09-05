class Order
  include Mongoid::Document
  field :product_data, type: Array, default: []
  field :client_name, type: String
  field :order_code, type: String
  field :status, type: String

  # Agrega una validación de inclusión para el campo :status
  validates :status, inclusion: { in: ["completada", "pendiente", "cancelada"] }
end

