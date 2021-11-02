class TokenProvider
    include Service

    def call(payload)
        puts "このcallまで"
        issue_token(payload)
    end

    private
        def issue_token(payload)
            JWT.encode(payload, Rails.application.credentials.secret_key_base)
        end

end