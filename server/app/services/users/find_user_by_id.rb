class FindUserById
  include Interactor

  ## Find user service object
  # @param id
  # @return user
  def call
    id = context.id
    context.user = User.find(id)
    context.fail!(message: "FindUserById - couldn't find User with id=#{id}") unless context.user
  end
end
