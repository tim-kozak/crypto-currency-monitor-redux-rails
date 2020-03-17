class AuthenticationOrganizer
  include Interactor::Organizer

  organize FindUserByEmail, CheckUserAuthentication, GenerateAuthToken
end
