import { useEffect } from 'react';
import { useHistory } from 'react-router';

function PageNotFound() {
    const history = useHistory();

    useEffect(() => {
        const redirect = setTimeout(() => history.push('/'), 5000);

        return (() => clearTimeout(redirect))
    });

    return (
        <>
        <div className="main_container" id="page_not_found">
            <div>
                <h1 className="page_not_found">Page Not Found</h1>
            </div>
            <div>
                <h2>You will be redirected to the home page in 5 seconds</h2>
            </div>
            </div>
        </>
    )
}

export default PageNotFound;
