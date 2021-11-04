import { expect } from "chai";
import Vue from "vue";
import Vuetify from 'vuetify';
import { createLocalVue, mount } from "@vue/test-utils";
import flushPromises from 'flush-promises';
import { ValidationProvider, ValidationObserver, setInteractionMode } from 'vee-validate';
// import VeeValidate from 'vee-validate';

import SignUpForm from "@/components/molecules/SignUpForm.vue";

Vue.use(Vuetify);
// Vue.use(VeeValidate, { mode: 'eager' });
const localVue = createLocalVue();
global.requestAnimationFrame = function () {};
// vee-validate
localVue.component('ValidationProvider', ValidationProvider);
localVue.component('ValidationObserver', ValidationObserver);
setInteractionMode("eager");

describe('SignUpForm', () => {
    describe('プロパティ', () => {
        describe('バリデーション', () => {
            let signUpForm;
            let vuetify;
            beforeEach(() => {
                vuetify = new Vuetify();
                signUpForm = mount(SignUpForm, {
                    localVue,
                    vuetify,
                    // stubs: [ 'VTextField' ]
                });
                /// signUpForm.vm.$nextTick(done);
            })
            describe('email', () => {
                describe('required', () => {
                    describe('何も入力されていない', () => {
                        it('emailがinvalidであること', async () => {
                            /*
                            signUpForm.setData({
                                email: "",
                                name: "abc",f
                                password: "password",
                                password_confirmation: "password"
                            });
                            */
                            signUpForm.find('#email').setValue('aaaa');
                            // await flushPromises();
                            await flushPromises();
                            // console.log(signUpForm.html());
                            console.log("validate適用前")
                            console.log(signUpForm.vm.$refs.emailProvider.errors);
                            console.log(signUpForm.find('#email').element.value);
                            await signUpForm.vm.$refs.observer.validate();
                            const error = signUpForm.vm.$refs.emailProvider.errors[0];
                            console.log("ここから");
                            console.log(signUpForm.find('#errorrr').text());
                            console.log(signUpForm.vm.$refs.emailProvider.errors);
                            // expect(signUpForm.vm.$refs.observer.invalid).to.be.false;
                            expect(error).to.equal('メールアドレス を入力してください');
                        })
                    })
                })
            })
        })
    })
})