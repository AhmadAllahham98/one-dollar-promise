import { Quote } from './Quote';

export default {
    title: 'Components/Quote',
    component: Quote,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'large'],
        },
    },
};

export const Large = {
    args: {
        size: 'large',
        children: 'I promise to keep my phone away during meals',
    },
};

export const Small = {
    args: {
        size: 'small',
        children: 'I promise to keep my phone away during meals',
    },
};
