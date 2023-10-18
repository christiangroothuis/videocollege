import { useHome } from './api';

export default function CheckAuthOnMount() {
    const { data, isLoading, isError } = useHome();

    // Redirect to login if user is not authenticated
    if (!isLoading && !isError && !data?.LoggedInUserName) {
        window.location.href = `https://videocollege.tue.nl/Mediasite/Login/saml?ReturnUrl=${window.location.href}`;
    }

    if (isError) {
        alert('This site currently requires a firefox extension!');
    }

    return null;
}
