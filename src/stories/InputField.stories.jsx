import { InputField } from './InputField';

export default {
    title: 'Components/InputField',
    component: InputField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number'],
        },
    },
};

export const Default = {
    args: {
        placeholder: 'Enter your promise...',
    },
};

export const Password = {
    args: {
        type: 'password',
        placeholder: 'Enter password...',
    },
};

export const WithValue = {
    args: {
        value: 'A predefined promise',
        placeholder: 'Enter your promise...',
    },
};
