Sidekiq.configure_server do |config|
  config.redis = {
      host: 'redis',
      port: '6379'
  }

  # config.periodic do |mgr|
  #   mgr.register('0/15 * * * *', "UpdatePricingJob")
  # end
end

Sidekiq.configure_client do |config|
  config.redis = {
      host: 'redis',
      port: '6379'
  }
end