ZFoundation::Application.routes.draw do
  root :to => 'home#index'
  
  devise_for :users, :controllers => {
    :sessions => "users/sessions",
    :passwords => "users/passwords",
    :registrations => "users/registrations",
    :confirmations => "users/confirmations"
  }

  resources :users, :only => [:index]
end