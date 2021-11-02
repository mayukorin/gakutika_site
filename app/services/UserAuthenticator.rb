class UserAuthenticator

    include Service

    def call(request_headers)
        @request_headers = request_headers
        begin
            payload, = TokenDecryptor.call(token)
            User.find(payload['user_id'])
        rescue StandardError
            nil
        end
    end

    private
        def token
            @request_headers['Authorization'].split(' ').last
        end

end