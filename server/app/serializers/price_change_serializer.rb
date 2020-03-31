class PriceChangeSerializer < ActiveModel::Serializer
  attributes :currency_id, :day, :price
  def day
    object.day.to_i
  end
end
