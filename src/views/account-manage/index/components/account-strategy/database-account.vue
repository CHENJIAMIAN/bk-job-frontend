

<template functional>
    <div key="databaseAccount">
        <jb-form-item
            :label="parent.$t('account.数据库类型')"
            required>
            <bk-select
                style="width: 100%;"
                :readonly="props.isEdit"
                :clearable="false"
                :value="props.formData.type"
                @change="value => props.change('type', value)">
                <bk-option :id="9" name="Mysql" />
                <bk-option :id="10" name="Oracle" />
                <bk-option :id="11" name="DB2" />
            </bk-select>
        </jb-form-item>
        <jb-form-item
            :label="parent.$t('account.名称')"
            required
            property="account">
            <jb-input
                :placeholder="props.namePlaceholder"
                :readonly="props.isEdit"
                :value="props.formData.account"
                @change="value => props.change('account', value)" />
        </jb-form-item>
        <jb-form-item
            :label="parent.$t('account.别名')"
            required
            property="alias">
            <jb-input
                :placeholder="parent.$t('account.在出现同名账号的情况下，账号的别名显得格外重要...')"
                :value="props.formData.alias"
                @change="value => props.change('alias', value)"
                :maxlength="32" />
        </jb-form-item>
        <jb-form-item
            :label="parent.$t('account.密码')"
            property="dbPassword">
            <bk-input
                :placeholder="parent.$t('account.输入密码')"
                key="database-password"
                type="password"
                :value="props.formData.dbPassword"
                @change="value => props.change('dbPassword', value)" />
        </jb-form-item>
        <jb-form-item
            :label="parent.$t('account.确认密码')"
            property="rePassword">
            <bk-input
                :placeholder="parent.$t('account.输入确认密码')"
                key="database-repassword"
                type="password"
                :value="props.formData.rePassword"
                @change="value => props.change('rePassword', value)" />
        </jb-form-item>
        <jb-form-item
            :label="parent.$t('account.端口')"
            required
            property="dbPort">
            <bk-input
                :placeholder="parent.$t('account.输入确认端口')"
                type="number"
                :value="props.formData.dbPort"
                @change="value => props.change('dbPort', value)" />
        </jb-form-item>
        <jb-form-item
            :label="parent.$t('account.依赖系统账号')"
            required
            property="dbSystemAccountId">
            <account-select
                :placeholder="parent.$t('account.选择依赖系统账号')"
                :value="props.formData.dbSystemAccountId"
                type="system"
                @change="value => props.change('dbSystemAccountId', value)" />
        </jb-form-item>
        <jb-form-item :label="parent.$t('account.描述')">
            <bk-input
                :placeholder="parent.$t('account.输入账号描述')"
                :value="props.formData.remark"
                type="textarea"
                :maxlength="200"
                @change="value => props.change('remark', value)" />
        </jb-form-item>
    </div>
</template>
