import { expect } from "chai";
import Vue from "vue";
import Vuetify from 'vuetify';
import { createLocalVue, mount } from "@vue/test-utils";
import flushPromises from 'flush-promises';


import SignUpForm from "@/components/molecules/SignUpForm.vue";

Vue.use(Vuetify);
const localVue = createLocalVue();
global.requestAnimationFrame = function () {};

describe('SignUpForm', () => {
    describe('プロパティ', () => {
        describe('バリデーション', () => {
            let signUpForm;
            let vuetify;
            beforeEach(done => {
                vuetify = new Vuetify();
                signUpForm = mount(SignUpForm, {
                    localVue,
                    vuetify,
                    // stubs: [ 'VTextField' ]
                });
                signUpForm.vm.$nextTick(done);
            })
            describe('email', () => {
                describe('required', () => {
                    describe('何も入力されていない', () => {
                        it('emailがinvalidであること', async () => {
                        
                            signUpForm.setData({
                                email: "",
                                name: "abc",
                                password: "password",
                                password_confirmation: "password"
                            });
                            signUpForm.find('#email').setValue('aaaaa');
                            // await flushPromises();
                            await flushPromises();
                            console.log(signUpForm.html());
                            const error = signUpForm.vm.$refs.emailProvider.errors[0];
                            console.log("ここから");
                            // expect(signUpForm.vm.$refs.observer.invalid).to.be.false;
                            expect(error.text()).to.equal('メールアドレス を入力してください');
                        })
                    })
                })
            })
        })
    })
})