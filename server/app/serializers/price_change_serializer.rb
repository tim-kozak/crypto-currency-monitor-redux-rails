class PriceChangeSerializer < ActiveModel::Serializer
  attributes :currency_id, :timestamp, :price
  def timestamp
    #in miliseconds // use %s for seconds
    object.day.to_datetime.strftime("%Q").to_i
  end
end
