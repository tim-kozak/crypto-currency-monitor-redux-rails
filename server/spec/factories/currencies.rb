FactoryBot.define do
  factory :currency do
    name { Faker::CryptoCoin.coin_name }
    symbol { Faker::CryptoCoin.acronym }
    price { Faker::Number.positive }
    last_change { Faker::Date.between(from: DateTime.now - 1, to: DateTime.now) }
  end
end