import { UserPromise } from './UserPromise';

export default {
    title: 'Components/UserPromise',
    component: UserPromise,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        imageUrl: { control: 'text' },
        promiseText: { control: 'text' },
    },
};

export const Default = {
    args: {
        imageUrl: 'https://i.pravatar.cc/150?u=1',
        promiseText: 'I promise to keep my phone away during meals',
    },
};

export const LongText = {
    args: {
        imageUrl: 'https://i.pravatar.cc/150?u=2',
        promiseText: 'I promise to exercise for at least 30 minutes every single day no matter what',
    },
};
