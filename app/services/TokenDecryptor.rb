class TokenDecryptor

    include Service

    def call(token)
        decrypt(token)
    end

    private
        def decrypt
            JWT.decode(token, Rails.application.credentials.secret_key_base)
            rescue StandardError
                raise StandardError
            end
        end
end