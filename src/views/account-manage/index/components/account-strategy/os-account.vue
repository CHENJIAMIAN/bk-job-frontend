

<template functional>
    <div key="system-account">
        <jb-form-item
            :label="'类型'"
            required>
            <div class="radio-button-group-wraper">
                <bk-radio-group
                    :value="props.formData.type"
                    @change="value => props.change('type', value)">
                    <bk-radio-button
                        class="account-type-radio"
                        
                        :value="1">
                        Linux
                    </bk-radio-button>
                    <bk-radio-button
                        class="account-type-radio"
                        
                        :value="2">
                        Windows
                    </bk-radio-button>
                </bk-radio-group>
            </div>
        </jb-form-item>
        <jb-form-item
            :label="'名称'"
            required
            property="account">
            <jb-input
                :placeholder="props.namePlaceholder"
                :readonly="props.isEdit"
                :value="props.formData.account"
                @change="value => props.change('account', value)" />
        </jb-form-item>
        <jb-form-item
            :label="'别名'"
            required
            property="alias">
            <jb-input
                :placeholder="'在出现同名账号的情况下，账号的别名显得格外重要...'"
                :value="props.formData.alias"
                @change="value => props.change('alias', value)"
                :maxlength="32" />
        </jb-form-item>
        <!-- Linux系统账号不需要密码 -->
        <template v-if="props.formData.type !== 1">
            <jb-form-item
                key="systemPassword"
                :label="'密码'"
                required
                property="password">
                <bk-input
                    :placeholder="'输入密码'"
                    type="password"
                    :value="props.formData.password"
                    @change="value => props.change('password', value)" />
            </jb-form-item>
            <jb-form-item
                key="systemRepassword"
                :label="'确认密码'"
                required
                property="rePassword">
                <bk-input
                    :placeholder="'输入确认密码'"
                    type="password"
                    :value="props.formData.rePassword"
                    @change="value => props.change('rePassword', value)" />
            </jb-form-item>
        </template>
        <jb-form-item :label="'描述'">
            <bk-input
                :placeholder="'输入账号描述'"
                :value="props.formData.remark"
                type="textarea"
                :maxlength="200"
                @change="value => props.change('remark', value)" />
        </jb-form-item>
    </div>
</template>
