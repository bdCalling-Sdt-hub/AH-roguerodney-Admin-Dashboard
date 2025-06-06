import { useGetCmsQuery } from '../../redux/features/cms/cmsApi';

const ReadPrivacyPolicy = () => {
    const { data } = useGetCmsQuery({ query: `?type=privacy` });
    const privacyPolicy = data?.data?.content;

    return (
        <div className="max-w-screen-xl mx-auto py-16 px-4 lg:px-8">
            <div dangerouslySetInnerHTML={{ __html: privacyPolicy || '' }}></div>
        </div>
    );
};

export default ReadPrivacyPolicy;
