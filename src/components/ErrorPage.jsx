import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError(ErrorPage);
    console.log(error);

    return (
        <div id="error-page" >
            <h1>Ooops!!</h1>
            <p>Sorry, an unexpected error has occured.</p>
            <p>
                <i className="error-message">
                    {error.statusText || error.message}
                </i>
            </p>

            <img src="https://i.imgur.com/AI4BS2I.png" />
        </div>
    )
}