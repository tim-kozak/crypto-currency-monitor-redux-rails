Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index"

  namespace :api do
    namespace :v1 do
      resources :currencies
      resources :portfolios
      resources :assets
      post 'auth/login', to: 'authentication#authenticate'
      post 'users/signup', to: 'users#create'
    end
  end
end
