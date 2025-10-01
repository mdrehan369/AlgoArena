import api from 'config/axios.config';

export const updateProfile = async (data: Record<string, any>) => {
    try {
        const response = await api.put('/profile', data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateProfilePicture = async (data: FormData) => {
    try {
        const response = await api.put('/profile/picture', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getQuickStats = async () => {
    try {
        const response = await api.get('/profile/quick');
        return response.data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getOverviewStats = async () => {
    try {
        const response = await api.get('/profile/overview');
        return response.data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
