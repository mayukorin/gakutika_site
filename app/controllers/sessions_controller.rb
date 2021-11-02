class SessionsController < ApplicationController
    include Service

    def create
        user = User.find_by(email: session_params[:email])

        if user&.authenticate(session_params[:password])
            puts "だめ"
            token = TokenProvider.call(user_id: user.id)
            puts token    
            render json: ActiveModelSerializers::SerializableResource.new(user, serializer: UserSerializer).as_json.deep_merge(user: { token: token })
        else
            puts "ログイン失敗"
            render json: { messages: ['メールアドレスかパスワードが間違っています'] }, status: :unauthorized 
        end
    end
    
    private

    def session_params
        params.require(:session).permit(:email, :password)
    end
    
end
