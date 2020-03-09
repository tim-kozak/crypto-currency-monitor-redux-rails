class AssetSerializer < ActiveModel::Serializer
  attributes :id, :amount, :currency_id
end
