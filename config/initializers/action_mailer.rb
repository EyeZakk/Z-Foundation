dreamhost_smtp_settings = {
  :address              => "mail.ZFoundation.com",
  :port                 => 587,
  :domain               => 'ZFoundation.com',
  :user_name            => 'info@ZFoundation.com',
  :password             => 'randywatson',
  :authentication       => :login,
  :enable_starttls_auto => true,
  :openssl_verify_mode => 'none'

}

sendgrid_smtp_settings = {
  :user_name => "bookingguru",
  :password => "finley89",
  :domain => "getbookingguru.com",
  :address => "smtp.sendgrid.net",
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true  
}

ActionMailer::Base.smtp_settings = dreamhost_smtp_settings

if Rails.env.development?
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = { :address => "localhost", :port => 1025 }
  
  url_opts = {
    :host => Rails.application.config.domain,
    :port => 2222
  }

  Rails.application.config.action_mailer.default_url_options = url_opts
  Rails.application.config.action_controller.default_url_options = url_opts
  ActionMailer::Base.default_url_options = url_opts
end

if Rails.env.production?
  url_opts = {
    :host => Rails.application.config.domain
  }  

  Rails.application.config.action_mailer.default_url_options = url_opts
  Rails.application.config.action_controller.default_url_options = url_opts
  ActionMailer::Base.default_url_options = url_opts
end