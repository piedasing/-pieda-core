<script setup lang="ts">
import { useForm } from '@/composables';

const { formData, $validate, $firstError, $hasError } = useForm(
    {
        name: '',
        url: '',
        email: '',
        mobile: '',
        show_mobile: false,
        min_money: '',
        max_money: '',
        baby: {
            name: '',
            pic: '',
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
            'formData.email'(value) {
                return Validator.value(value).required('此欄必填').email('信箱格式不正確');
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
    console.log(success);
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
                name="email"
                v-model.trim="formData.email"
                placeholder="請輸入信箱"
            />
            <p class="invalid-feedback" v-if="$hasError('formData.email')">
                {{ $firstError('formData.email') }}
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

<style lang="scss" scoped>
.form {
    padding: 4rem 1rem;
    .form__item {
        margin-bottom: 0.5rem;
    }
    input {
        border: 1px solid #999;
        padding: 4px 12px;
        font-size: 16px;
    }
    .invalid-feedback {
        font-size: 12px;
        color: #f1341c;
        margin-top: 4px;
        margin-bottom: 0;
    }
    .btn__submit {
        background-color: #0096ff;
        color: #fff;
        margin-top: 1rem;
        padding: 0.25rem 1rem;
        border-radius: 4px;
    }
}
</style>
