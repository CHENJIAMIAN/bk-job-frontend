

<template>
    <div class="create-ticket-page">
        <jb-form ref="ticketForm" :model="formData" :rules="rules" form-type="vertical">
            <jb-form-item :label="$t('ticket.名称')" required property="name">
                <bk-input v-model="formData.name" />
            </jb-form-item>
            <jb-form-item :label="$t('ticket.类型.label')">
                <div class="ticket-type-wraper">
                    <bk-select v-model="formData.type" :clearable="false">
                        <bk-option id="PASSWORD" :name="$t('ticket.单一密码')">
                            <div class="ticket-name-option">
                                <span>{{ $t('ticket.单一密码') }}</span>
                            </div>
                        </bk-option>
                        <bk-option id="USERNAME_PASSWORD" :name="$t('ticket.用户名+密码')">
                            <div class="ticket-name-option">
                                <span>{{ $t('ticket.用户名+密码') }}</span>
                            </div>
                        </bk-option>
                        <bk-option id="SECRET_KEY" :name="$t('ticket.单一SecretKey')">
                            <div class="ticket-name-option">
                                <span>{{ $t('ticket.单一SecretKey') }}</span>
                            </div>
                        </bk-option>
                        <bk-option id="APP_ID_SECRET_KEY" :name="$t('ticket.AppID+SecretKey')">
                            <div class="ticket-name-option">
                                <span>{{ $t('ticket.AppID+SecretKey') }}</span>
                            </div>
                        </bk-option>
                    </bk-select>
                </div>
            </jb-form-item>
        </jb-form>
        <component
            ref="handler"
            :is="formItemCom"
            :type="type"
            :secret-key="formData.secretKey"
            :data="formData" />
    </div>
</template>

<script>
    import I18n from '@/i18n';
    import TicketService from '@service/ticket-manage';
    import UsernamePassword from './components/username-password';
    import SecretkeyAppid from './components/app-id-secret-key';
    import Secretkey from './components/secret-key';
    import Password from './components/password';

    const getDefaultData = () => ({
        name: '',
        type: 'PASSWORD',
        value1: '',
        value2: '',
        value3: '',
        description: '',
    });
    export default {
        name: 'Opertion',
        props: {
            data: {
                type: Object,
                default: () => ({}),
            },
        },
        data () {
            return {
                formData: getDefaultData(),
                type: '',
            };
        },
        computed: {
            formItemCom () {
                const formItemMap = {
                    PASSWORD: Password,
                    USERNAME_PASSWORD: UsernamePassword,
                    SECRET_KEY: Secretkey,
                    APP_ID_SECRET_KEY: SecretkeyAppid,
                };
                return formItemMap[this.formData.type];
            },
        },
        watch: {
        },
        created () {
            if (this.data.id) {
                this.formData = { ...this.data };
                this.type = this.formData.type;
            }
            this.ticketTypeList = [
                { id: 'PASSWORD', name: I18n.t('ticket.单一密码') },
                { id: 'USERNAME_PASSWORD', name: I18n.t('ticket.用户名+密码') },
                { id: 'SECRET_KEY', name: I18n.t('ticket.单一SecretKey') },
                { id: 'APP_ID_SECRET_KEY', name: I18n.t('ticket.AppID+SecretKey') },
            ];
            this.rules = {
                name: [
                    {
                        required: true,
                        message: I18n.t('ticket.凭证名称必填'),
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            /**
             * @desc 新增、编辑确认
             *
             * 校验通过后,根据文件源ID是否存在提示新建、编辑提示语
             */
            submit () {
                return Promise.all([
                    this.$refs.handler.getData(),
                    this.$refs.ticketForm.validate(),
                ]).then(([data, validate]) => TicketService.update({
                    ...this.formData,
                    ...data,
                }))
                    .then(() => {
                        if (!this.data.id) {
                            this.messageSuccess(I18n.t('ticket.创建成功'));
                        } else {
                            this.messageSuccess(I18n.t('ticket.更新成功'));
                        }
                        this.$emit('on-change');
                    });
            },
        },
    };
</script>
