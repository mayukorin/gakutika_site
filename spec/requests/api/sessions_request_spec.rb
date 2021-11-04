require 'rails_helper'

RSpec.describe "Api::Sessions", type: :request do

  describe "Session" do

    describe "#create" do


      context "メールアドレスとパスワードが合っている場合" do
        let!(:user) do
          FactoryBot.create(:user)
        end
        it 'status ok を返す' do
          post api_signin_path, params: { session: { email: "abcdef@example.com", password: "password" } }
          expect(response).to have_http_status(:ok)
        end
      end

      context "メールアドレスが間違っている場合" do
        let!(:user) do
          FactoryBot.create(:user)
        end
        it 'status unauthorized と「メールアドレスかパスワードが間違っています」メッセージを返す' do
          post api_signin_path, params: { session: { email: "abcde@example.com", password: "password" } }
          expect(response).to have_http_status(:unauthorized)
          expected_response = { 'message' => ['メールアドレスかパスワードが間違っています'] }
          expect(JSON.parse(response.body)).to match(expected_response)
        end
      end

      context "パスワードが間違っている場合" do
        let!(:user) do
          FactoryBot.create(:user)
        end
        it 'status unauthorized と「メールアドレスかパスワードが間違っています」メッセージを返す' do
          post api_signin_path, params: { session: { email: "abcdef@example.com", password: "passwor" } }
          expect(response).to have_http_status(:unauthorized)
          expected_response = { 'message' => ['メールアドレスかパスワードが間違っています'] }
          expect(JSON.parse(response.body)).to match(expected_response)
        end
      end

    end
  end
end

