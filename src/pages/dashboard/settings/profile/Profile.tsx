import React from 'react';
import { Button, Form, Input } from 'antd';
import { Key, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '../../../../redux/features/profile/profileApi';
import { IMAGE_URL } from '../../../../redux/api/baseApi';
import Loader from '../../../../components/ui/Loader';

const Profile: React.FC = () => {
    const { data, isLoading } = useGetProfileQuery(undefined);
    const profileData = data?.data;

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center h-[80vh]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="pb-4">
                <h1 className="text-3xl text-primary font-semibold">Profile</h1>
            </div>
            <Form
                name="update_profile"
                layout="vertical"
                className="grid gap-4 p-10 bg-white rounded-lg"
                initialValues={profileData}
            >
                {/* Banner Image */}
                <div className="w-[150px] h-[150px] relative flex gap-2 items-end">
                    <img
                        src={`${IMAGE_URL}${profileData?.profile}`}
                        alt="User Profile"
                        className="w-full h-full object-cover rounded-full"
                    />

                    <h1 className="text-3xl font-semibold whitespace-nowrap">{profileData?.name}</h1>
                </div>

                <div className="flex justify-end gap-4 mb-4">
                    <Link to={'/profile/edit-profile'}>
                        <Button
                            style={{
                                height: 48,
                                padding: '4px 32px',
                                fontSize: 16,
                                backgroundColor: '#eae1ef',
                                fontWeight: 900,
                            }}
                            type="default"
                            className="text-primary font-semibold rounded-xl"
                        >
                            <Pencil size={16} /> Edit profile
                        </Button>
                    </Link>
                    <Link to={'/profile/change-password'}>
                        <Button
                            style={{
                                height: 48,
                                padding: '4px 32px',
                                fontSize: 16,
                                backgroundColor: '#eae1ef',
                                fontWeight: 900,
                            }}
                            type="default"
                            className="text-primary font-semibold rounded-xl"
                        >
                            <Key size={16} /> Change Password
                        </Button>
                    </Link>
                </div>

                <Form.Item
                    label={
                        <label htmlFor="name" className="block text-primaryText mb-1 text-lg font-semibold">
                            Full Name
                        </label>
                    }
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input className="h-12 rounded-lg border-none bg-zinc-100" placeholder="Enter your name" readOnly />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="email" className="block text-primaryText mb-1 text-lg font-semibold">
                            Email
                        </label>
                    }
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        className="h-12 rounded-lg border-none bg-zinc-100"
                        placeholder="Enter your email"
                        readOnly
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="contact" className="block text-primaryText mb-1 text-lg font-semibold">
                            Contact number
                        </label>
                    }
                    name="contact"
                    rules={[{ required: true, message: 'Please input your contact number!' }]}
                >
                    <Input className="h-12 rounded-lg border-none bg-zinc-100" placeholder="+99-01846875456" readOnly />
                </Form.Item>
            </Form>
        </div>
    );
};

export default Profile;
