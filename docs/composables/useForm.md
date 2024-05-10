<script setup>
import { useForm } from '@/library';
import Form from '@/components/Demo/Form.vue'

</script>

# useForm

---
### Example

表單必填、格式驗證
<Form></Form>

---

::: code-group

```md [Form.vue]
<script setup lang="ts">
import { useForm } from '@pieda/core';

const { formData, $validate, $firstError, $hasError } = useForm(
    {
        name: '',
        url: '',
        mobile: '',
        show_mobile: false,
        min_money: '',
        max_money: '',
        baby: {
            name: '',
            age: '',
        },
    },
    {
        rules: (Validator) => ({
            'formData.name'(value) {
                return Validator.value(value).required('此欄必填');
            },
            'formData.url'(value) {
                return Validator.value(value)
                    .required('此欄必填')
                    .minLength(3, '最少需填寫3個字元')
                    .url('網址格式不正確');
            },
            'formData.mobile'(value) {
                if (value.length > 0) {
                    return Validator.value(value).mobile('手機格式不正確');
                }
                if (formData.show_mobile) {
                    return Validator.value(value).required('此欄必填');
                }
                return Validator.value(value);
            },
            'formData.show_mobile'(value) {
                $validate('mobile');
                return Validator.value(value);
            },
            'formData.min_money'(value) {
                const { max_money } = formData;
                return Validator.value(value)
                    .integer('請輸入正確金額')
                    .lessThanOrEqualTo(max_money, '金額不可超過最高金額');
            },
            'formData.max_money'(value) {
                const { min_money } = formData;
                return Validator.value(value)
                    .integer('請輸入正確金額')
                    .greaterThanOrEqualTo(min_money, '金額不可低於最低金額');
            },
            'formData.baby.name'(value) {
                return Validator.value(value).required('請輸入寶寶姓名');
            },
            'formData.baby.age'(value) {
                return Validator.value(value).required('請輸入寶寶年紀').integer('請輸入整數');
            },
        }),
        configs: {
            debug: true,
            scrollContainer: 'html',
            focusInvalid: true,
            formElement: 'form',
            errorElement: '.invalid-feedback',
            shakeDuration: 800,
        },
    },
);

const onSubmit = async () => {
    const success = await $validate();
    if (!success) {
        return;
    }
    console.log(formData);
};
</script>

<template>
    <form class="form" @submit.prevent="onSubmit">
        <div class="form__item">
            <input type="text" name="name" v-model="formData.name" placeholder="請輸入名字" />
            <p class="invalid-feedback" v-if="$hasError('formData.name')">
                {{ $firstError('formData.name') }}
            </p>
        </div>
        <div class="form__item">
            <input type="text" name="mobile" v-model="formData.mobile" placeholder="請輸入手機" />
            <input type="checkbox" v-model="formData.show_mobile" />
            <p class="invalid-feedback" v-if="$hasError('formData.mobile')">
                {{ $firstError('formData.mobile') }}
            </p>
        </div>
        <div class="form__item">
            <input type="text" name="url" v-model="formData.url" placeholder="請輸入網址" />
            <p class="invalid-feedback" v-if="$hasError('formData.url')">
                {{ $firstError('formData.url') }}
            </p>
        </div>
        <div class="form__item">
            <input
                type="text"
                v-model="formData.min_money"
                placeholder="請輸入最低金額"
                @input="() => $validate('formData.max_money')"
            />
            ~
            <input
                type="text"
                v-model="formData.max_money"
                placeholder="請輸入最高金額"
                @input="() => $validate('formData.min_money')"
            />
            <p class="invalid-feedback" v-if="$hasError('formData.min_money')">
                {{ $firstError('formData.min_money') }}
            </p>
            <p class="invalid-feedback" v-if="$hasError('formData.max_money')">
                {{ $firstError('formData.max_money') }}
            </p>
        </div>
        <div class="form__item">
            <input type="text" v-model="formData.baby.name" placeholder="請輸入寶寶姓名" />
            <p class="invalid-feedback" v-if="$hasError('formData.baby.name')">
                {{ $firstError('formData.baby.name') }}
            </p>
        </div>
        <div class="form__item">
            <input type="text" v-model="formData.baby.age" placeholder="請輸入寶寶年紀" />
            <p class="invalid-feedback" v-if="$hasError('formData.baby.age')">
                {{ $firstError('formData.baby.age') }}
            </p>
        </div>
        <button class="btn__submit" type="submit">送出</button>
    </form>
</template>
```

:::

### Validator

| 驗證規則 | 參數(參數+錯誤訊息) | 說明 | 備註 |
| :-- | :-- | :-- |:--|
| required | none | 必填 |  |
| float |  none  | 浮點數 |  |
| integer |  none  | 整數 |  |
| lessThan | \{Number num\} | 小於指定值 |  |
| lessThanOrEqualTo |  \{Number num\}  | 小於等於指定值 |  |
| greaterThan |  \{Number num\}  | 大於指定值 |  |
| greaterThanOrEqualTo |  \{Number num\}  | 大於等於指定值 |  |
| between | \{Number low\},\{Number high\} | 值介於兩個指定值之間 |  |
| size | \{Number num\} | 字段值為類似陣列的物件，其大小與指定的數量相同 | 可用在複選，至少選擇幾個答案 |
| length | \{Number num\} | 內容長度 |  |
| minLength | \{Number num\} | 最小長度 |  |
| maxLength | \{Number num\} | 最大長度 |  |
| lengthBetween | \{Number low\},\{Number high\} | 長度介於兩個指定值之間 |  |
| in |	\{Array options\} | 值在指定的集合中 |  |
| notIn |\{Array options\} | 值不在指定的集合中 |  |
| match | String | 值與指定值匹配 |  |
| regex | \{RegExp or String pattern\} \{String message?\} | 正則表達式 |  |
| digit | none | 數字驗證 |  |
| email | none | 電子郵件格式 |  |
| url | none | URL 格式 | 以「http://」或「https://」開頭 |
| tel | none | 市話格式(TW) | 國碼?-區號?-主要電話號碼-分機號碼? |
| mobile | none | 手機號碼格式(TW) | 09 + 8位數字 |



驗證規則參考 Simple Vue Validator：<https://simple-vue-validator.netlify.app/#r_validator>



