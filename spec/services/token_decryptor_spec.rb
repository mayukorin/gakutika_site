require 'rails_helper'

RSpec.describe "TokenDecryptor", type: :model do
    describe "#call" do
        let!(:user) do
            FactoryBot.create(:user)
        end
        let!(:token) do
            puts user.id
            TokenProvider.new.call(user_id: user.id)
        end
        context "TokenProviderで生成したtokenを引数として呼び出す場合" do
            
            it "戻り値に含まれるuser_idがTokenProviderで生成した時に指定したuser.idと等しい" do
                payload,  = TokenDecryptor.new.call(token)
                puts payload
                expect(payload[:user_id]).to match(user.id)
            end
        end
        
    end
end