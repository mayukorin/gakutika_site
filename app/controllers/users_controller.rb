class UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user, serializer: UserSerializer, status: :created
        else
            puts "ok"
            puts @user.errors
            render json: @user.errors, status: :bad_request
        end
    end

    private
        def user_params
            params.require(:user).permit(:name, :email, :password, :password_confirmation)
        end

end
