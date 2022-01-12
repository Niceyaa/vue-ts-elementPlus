import { ref, reactive, watch, toRefs } from "vue";
import { useStore } from 'vuex'
import { ElMessage } from "element-plus";
import { webLoginAppId, webCodeAppId } from "../../setting";
import {
    loginCode,
    loginPwd,
    sendCode,
    forgetPwd,
    register,
} from "../../api/user";

export default function (params?:any) {
    // 表单对象
    let pwdLoginForm = ref();
    let codeLoginForm = ref();
    let forgetPwdForm = ref();
    let refisterForm = ref();

    let store = useStore();
    // smsType 短信类型,1-验证码登录 2-找回登录密码 3-用户注册
    let loginStatusFlag = ref(false);

    let sendForPwdFlag = ref(false);
    let forPwdFlag = ref(false);
    let validatorForPwdText = ref("获取验证码");

    let sendRegisterFlag = ref(false);
    let registerFlag = ref(false);
    let validatorRegisterText = ref("获取验证码");

    let sendFlag = ref(false);
    let loginFlag = ref(false);
    let validatorText = ref("获取验证码");
    let loginWay = ref("pwdLogin");
    let flag = ref(false);

    let reactiveData = reactive({
        privacyPolicy: {},
        userPolicy: {},
        form: {
            tel: "",
            password: "",
            rememberPwd: false,
            code: "",
        },
    });

    const rules = {
        tel: [{ required: true, length: 11, message: "请填写手机号" }],
        code: [
            { required: true, length: 4, message: "请填写验证码", type: "number" },
        ],
    };

    // 监听登录状态值的改变
    watch(
        () => store.state.loginFlag,
        (value) => {
            console.log("login弹窗----store 登录状态值改变了", value);
            loginStatusFlag.value = <boolean>value;
        },
        {
            deep: true,
        }
    );
    // 监听登录模块的改变(登录、注册)
    watch(
        () => store.state.loginModule,
        (value) => {
            loginWay.value = value;
        },
        { deep: true }
    );

    // 方法
    // 登录弹窗关闭事件
    function closeHandle(): void {
        resetFormHandler();
        reactiveData.form.tel = "";
        reactiveData.form.password = "";
        reactiveData.form.rememberPwd = false;
        reactiveData.form.code = "";
        console.log("登录弹窗关闭事件");
        store.commit("SET_LOGIN", false);
        store.commit("SET_LOGIN_MODULE", "pwdLogin");
    }
    // 切换登录、注册
    function changeLoginWay(way: string): void {
        reactiveData.form.tel = "";
        reactiveData.form.password = "";
        reactiveData.form.rememberPwd = false;
        reactiveData.form.code = "";
        resetFormHandler();
        store.commit("SET_LOGIN_MODULE", way);
    }
    // 表单重置
    function resetFormHandler() {
        pwdLoginForm.value && pwdLoginForm.value.resetFields();
        codeLoginForm.value && codeLoginForm.value.resetFields();
        forgetPwdForm.value && forgetPwdForm.value.resetFields();
        refisterForm.value && refisterForm.value.resetFields();
    }
    // 登录方法
    function loginHandle(formRef: any) {
        formRef.validate((valid: boolean) => {
            if (valid) {
                var captcha1 = new TencentCaptcha(webLoginAppId, (res: any) => {
                    if (res.ret === 0) {
                        console.log("票据======================", res);
                        // alert(res.ticket)   // 票据
                        const prm =
                            loginWay.value === "pwdLogin"
                                ? {
                                    userPhone: reactiveData.form.tel,
                                    userPwd: reactiveData.form.password,
                                    randstr: res.randstr,
                                    ticket: res.ticket,
                                }
                                : {
                                    userPhone: reactiveData.form.tel,
                                    authCode: reactiveData.form.code,
                                    randstr: res.randstr,
                                    ticket: res.ticket,
                                };
                        loginFlag.value = true;

                        if (loginWay.value === "pwdLogin") {
                            loginPwd(prm)
                                .then((res) => {
                                    if (res.data.code === 200) {
                                        loginSuccessHandler(res);
                                        // $cookies.set("loginStatus", true);
                                    }
                                })
                                .catch((err) => {
                                    loginFlag.value = false;
                                });
                        } else {
                            loginCode(prm)
                                .then((res) => {
                                    if (res.data.code === 200) {
                                        loginSuccessHandler(res);
                                        // $cookies.set("loginStatus", true);
                                    }
                                })
                                .catch((err) => {
                                    console.log("error", err);
                                    loginFlag.value = false;
                                });
                        }
                    }
                });
                captcha1.show();
            }
        });
    }

    // 登录成功 统一处理函数
    function loginSuccessHandler(res: any) {
        ElMessage.success(res.data.msg);
        store.dispatch("setToken", res.headers.token);
        loginFlag.value = false;
        store.commit("SET_LOGIN", false);
        setUserInfo();
    }

    // 登录成功 获取用户信息，用户vip信息
    function setUserInfo() {
        store.dispatch("getUserInfo");
        store.dispatch("getUserVipInfo");
    }

    // 注册方法
    function registerHandle(formRef: any) {
        formRef.validate(async (valid) => {
            if (valid) {
                const prm = {
                    authCode: reactiveData.form.code,
                    userPhone: reactiveData.form.tel,
                    userPwd: reactiveData.form.password,
                };
                registerFlag.value = true;
                register(prm)
                    .then((res) => {
                        if (res.data.code === 200) {
                            resetFormHandler();
                            ElMessage.success(res.data.msg);
                            registerFlag.value = false;
                            loginWay.value = "pwdLogin";
                        }
                    })
                    .catch((err) => {
                        registerFlag.value = false;
                    });
            }
        });
    }

    // 忘记密码方法
    function forPwdHandle(formRef: any) {
        formRef.validate(async (valid) => {
            if (valid) {
                const prm = {
                    code: reactiveData.form.code,
                    userPhone: reactiveData.form.tel,
                    newPwd: reactiveData.form.password,
                };
                forPwdFlag.value = true;
                forgetPwd(prm)
                    .then((res) => {
                        if (res.data.code === 200) {
                            resetFormHandler();
                            ElMessage.success(res.data.msg);
                            forPwdFlag.value = false;
                            loginWay.value = "pwdLogin";
                        }
                    })
                    .catch((err) => {
                        forPwdFlag.value = false;
                    });
            }
        });
    }

    // 验证码登录发送验证码
    function sendValidateCode(formRef: any) {
        if (sendFlag.value) return;
        formRef.validateField("tel", (valid) => {
            if (!valid) {
                var captcha1 = new TencentCaptcha(webCodeAppId, (res) => {
                    if (res.ret === 0) {
                        // alert(res.ticket)   // 票据
                        const prm = {
                            code: "",
                            smsType: 1,
                            userPhone: reactiveData.form.tel,
                            userType: 200,
                            randstr: res.randstr,
                            ticket: res.ticket,
                        };
                        sendCode(prm).then((res) => {
                            if (res.data.code === 200) {
                                ElMessage.success(res.data.msg);
                                let s = 60;
                                sendFlag.value = true;
                                let codeTimer = setInterval(() => {
                                    s--;
                                    if (s === 0) {
                                        clearInterval(codeTimer);
                                        s = 60;
                                        sendFlag.value = false;
                                        validatorText.value = `获取验证码`;
                                        return;
                                    }
                                    validatorText.value = `还剩${s}s`;
                                }, 1000);
                            }
                        });
                    }
                });
                captcha1.show();
            }
        });
    }
    // 注册发送验证码
    function sendRegisterValidateCode(formRef: any) {
        if (sendRegisterFlag.value) return;
        formRef.validateField("tel", (valid) => {
            if (!valid) {
                var captcha1 = new TencentCaptcha(webCodeAppId, (res) => {
                    if (res.ret === 0) {
                        // alert(res.ticket)   // 票据
                        const prm = {
                            code: "",
                            smsType: 3,
                            userPhone: reactiveData.form.tel,
                            userType: 200,
                            randstr: res.randstr,
                            ticket: res.ticket,
                        };
                        sendCode(
                            prm
                        ).then((res) => {
                            if (res.data.code === 200) {
                                ElMessage.success(res.data.msg);
                                let s = 60;
                                sendRegisterFlag.value = true;
                                let codeTimer = setInterval(() => {
                                    s--;
                                    if (s === 0) {
                                        clearInterval(codeTimer);
                                        s = 60;
                                        sendRegisterFlag.value = false;
                                        validatorRegisterText.value = `获取验证码`;
                                        return;
                                    }
                                    validatorRegisterText.value = `还剩${s}s`;
                                }, 1000);
                            }
                        });
                    }
                });
                captcha1.show();
            }
        });
    }
    // 忘记密码发送验证码
    function sendForPwdValidateCode(formRef: any) {
        if (sendForPwdFlag.value) return;
        formRef.validateField("tel", (valid) => {
            if (!valid) {
                var captcha1 = new TencentCaptcha(webCodeAppId, (res) => {
                    if (res.ret === 0) {
                        // alert(res.ticket)   // 票据
                        const prm = {
                            code: "",
                            smsType: 2,
                            userPhone: reactiveData.form.tel,
                            userType: 200,
                            randstr: res.randstr,
                            ticket: res.ticket,
                        };
                        sendCode(
                            prm
                        ).then((res) => {
                            if (res.data.code === 200) {
                                ElMessage.success(res.data.msg);
                                let s = 60;
                                sendForPwdFlag.value = true;
                                let codeTimer = setInterval(() => {
                                    s--;
                                    if (s === 0) {
                                        clearInterval(codeTimer);
                                        s = 60;
                                        sendForPwdFlag.value = false;
                                        validatorForPwdText.value = `获取验证码`;
                                        return;
                                    }
                                    validatorForPwdText.value = `还剩${s}s`;
                                }, 1000);
                            }
                        });
                    }
                });
                captcha1.show();
            }
        });
    }

    return {
        loginStatusFlag,
        sendForPwdFlag,
        forPwdFlag,
        validatorForPwdText,
        sendRegisterFlag,
        registerFlag,
        validatorRegisterText,
        sendFlag,
        loginFlag,
        validatorText,
        loginWay,
        flag,
        reactiveData,
        store,

        ...toRefs(reactiveData),
        rules,
        pwdLoginForm,
        codeLoginForm,
        forgetPwdForm,
        refisterForm,

        // 方法
        closeHandle,
        changeLoginWay,
        loginHandle,
        registerHandle,
        forPwdHandle,
        sendValidateCode,
        sendRegisterValidateCode,
        sendForPwdValidateCode,

    };

}