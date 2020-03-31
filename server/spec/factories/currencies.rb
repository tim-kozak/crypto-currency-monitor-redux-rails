FactoryBot.define do
  factory :currency do
    name { Faker::CryptoCoin.coin_name }
    symbol { Faker::CryptoCoin.acronym }
    price { Faker::Number.positive }
  end
end