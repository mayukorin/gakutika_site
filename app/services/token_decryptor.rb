class TokenDecryptor

    include Service

    def call(token)
        decrypt(token)
    end

    private
    def decrypt(token)
        begin
            JWT.decode(token, Rails.application.credentials.secret_key_base)
            puts "ここまで"
        rescue JWT::ExpiredSignature
            puts "ログインの有効期限切れ"
            nil
        rescue StandardError => e
            puts "その他のエラー"
            puts e
            nil
        end
    end
end
