Rails.application.routes.draw do
  root "tasks#index"
  resources :tasks
  get '*path', to: 'tasks#index', via: :all
end
