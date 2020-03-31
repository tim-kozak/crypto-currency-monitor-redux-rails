FactoryBot.define do
  factory :currency do
    name { Faker::CryptoCoin.coin_name }
    symbol { Faker::CryptoCoin.acronym }
  end
end