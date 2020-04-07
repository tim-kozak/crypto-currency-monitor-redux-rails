require 'json'
require 'sidekiq-scheduler'

class UpdatePricingJob < ActiveJob::Base
  queue_as :default

  URL = ENV['CMC_URL']
  KEY = ENV['CMC_TOKEN']

  def perform(*args)
    currencies = Currency.all

    symbols_string = currencies.map do |currency|
      currency.symbol
    end.join(',')

    begin
      response = Faraday.get(URL, { symbol: symbols_string }, { 'Accepts' => 'application/json', 'X-CMC_PRO_API_KEY' => KEY })
    rescue StandardError => e
      puts "UpdatePricingJob request error"
      puts e
      return
    end

    prices = JSON.parse(response.body)["data"]
    currencies.each do |currency|
      symbol = currency.symbol
      price = prices[symbol]["quote"]["USD"]["price"]
      change = PriceChange.where({ currency_id: currency.id, day: Time.now.midnight..(Time.now.midnight + 1.day) }).first
      unless change
        change = PriceChange.new( currency_id: currency.id)
      end
      change.day = DateTime.now
      change.price = price
      change.save

      currency.last_change = change.day
      currency.save
    end

  end
end
