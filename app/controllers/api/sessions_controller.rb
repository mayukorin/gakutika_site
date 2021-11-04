class Api::SessionsController < ApplicationController
    include Service
    include SigninUser
    def create
        user = User.find_by(email: session_params[:email])
        if user&.authenticate(session_params[:password])
            exp = Time.now.to_i + 4 * 60
            token = TokenProvider.call(user_id: user.id, exp: exp)
            render json: { access: token }, status: :ok
        else
            render json: { message: ['メールアドレスかパスワードが間違っています'] }, status: :unauthorized 
        end
     end

    def me
        render json: signin_user, serializer: UserSerializer, status: :ok
    end
  
    private

    def session_params
        params.require(:session).permit(:email, :password)
    end

end
