class SessionsController < ApplicationController
    include Service
    include LoginUser
    def create
        user = User.find_by(email: session_params[:email])
        if user
            if user.authenticate(session_params[:password])
                token = TokenProvider.call(user_id: user.id)
                # render json: ActiveModelSerializers::SerializableResource.new(user, serializer: UserSerializer).as_json.deep_merge(user: { token: token })
                puts "なぜ"
                puts "ok"
                render json: { access: token }, status: :ok
            else
                puts "bb"
                render json: { messages: ['メールアドレスかパスワードが間違っています'] }, status: :unauthorized 
            end
        else
            puts "aaa"
            render json: { messages: ['メールアドレスかパスワードが間違っています'] }, status: :unauthorized 
        end
    end

    def me
        render json: current_user, serializer: UserSerializer, status: :ok
    end
    
    private

    def session_params
        params.require(:session).permit(:email, :password)
    end

    
end
