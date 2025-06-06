import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/login.png';
import toast from 'react-hot-toast';
import { useOtpVerifyMutation, useResendOtpMutation } from '../../redux/features/auth/authApi';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email') || '';
    const [otpVerify, { isLoading }] = useOtpVerifyMutation();
    const [resendOtp] = useResendOtpMutation();

    // redirect if email is not found
    if (!email) {
        navigate('/forget-password');
    }

    // veriry otp
    const onFinish: FormProps<any>['onFinish'] = async (values) => {
        toast.loading('Loading...', {
            id: 'otp-verify',
        });
        try {
            const res = await otpVerify({ oneTimeCode: Number(values?.oneTimeCode), email }).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'OTP verified successfully', {
                    id: 'otp-verify',
                });
                navigate(`/reset-password?auth=${res?.data}`);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to verify OTP', {
                id: 'otp-verify',
            });
            console.error(error);
        }
    };

    // resend otp
    const handleResendOtp = async () => {
        toast.loading('Loading...', {
            id: 'resend-otp',
        });
        try {
            const res = await resendOtp({ email }).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'OTP sent successfully', {
                    id: 'resend-otp',
                });
            }
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to send OTP', {
                id: 'resend-otp',
            });
            console.error(error);
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#9558b7',

                    // colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 40,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div className="grid grid-cols-2  items-center">
                <div>
                    <img src={login} alt="" className="w-full object-cover h-screen" />
                </div>

                <div className=" flex items-center justify-center bg-[#F1F1F1] min-h-screen">
                    <div className="max-w-sm">
                        <div className=" space-y-3 text-center">
                            <h1 className="text-2xl text-[#111111] font-semibold text-center mt-2">
                                Verification code
                            </h1>
                            <p className="text-primaryText">
                                We sent a reset link to {email || 'your email.'} Enter 6 digit code that is mentioned in
                                the email
                            </p>
                        </div>

                        <Form name="normal_VerifyOtp" className="my-5" layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                className="flex items-center justify-center mx-auto"
                                name="oneTimeCode"
                                rules={[{ required: true, message: 'Please input otp code here!' }]}
                            >
                                <Input.OTP length={6} size="large" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        height: 45,
                                        width: '100%',
                                        fontWeight: 500,
                                    }}
                                    className="rounded-lg"
                                    loading={isLoading}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Verifying...' : 'Submit'}
                                </Button>
                            </Form.Item>
                            <div className="text-center flex items-center justify-center gap-2">
                                <p className="text-primaryText font-medium">Didn't receive the code?</p>
                                <p
                                    onClick={handleResendOtp}
                                    className="text-primary font-medium hover:underline cursor-pointer"
                                >
                                    Resend code
                                </p>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
