class Order
  include Mongoid::Document
  include Mongoid::Enum
  field :product_data, type: Array, default: []
  field :order_code, type: String
  field :status, type: String

  enum status: {
    completada: "Completado",
    pendiente: "Pendiente",
    cancelada: "Cancelado"
  }
end