class AuthorizationOrganizer
  include Interactor::Organizer

  organize ExtractAuthToken, DecodeAuthToken, FindUserById
end
