import axios from 'axios';
import models from '../models';

const baseUrl = 'https://randomuser.me';

const prepareUser = (item) => {
    return {
        name: `${item.name.first} ${item.name.last}`,
        photo: item.picture.thumbnail,
        large_photo: item.picture.large,
        login: item.login.username,
        email: item.email,
        phone: item.phone,
        rating: 0,
    };
};

export default async () => {
    const result = await axios.get(
        `${baseUrl}/api/?results=25&seed=abc&inc=name,
                login,email,phone,picture`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    const parsedBody = await result.data.results;
    for (const item of parsedBody) {
        const user = prepareUser(item);
        await models.User.create({
            name: user.name,
            photo: user.photo,
            large_photo: user.large_photo,
            login: user.login,
            email: user.email,
            phone: user.phone,
            rating: user.rating,
        });
    }
};
