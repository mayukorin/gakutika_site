module SigninUser
    def signin_user
        @signin_user ||= UserAuthenticator.call(request.headers)
        unless @signin_user
            render json: { message: [ 'ログインの有効切れです'] }, status: :unauthorized 
        end
        return @signin_user
    end
end