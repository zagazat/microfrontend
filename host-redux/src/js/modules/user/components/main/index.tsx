import React from 'react';
import './index.module.css';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
    return <p>{error.message}</p>;
}

const EmailFormContainer = React.lazy(() => import('./FormContainer'));

export const MainPage: React.FC = (props) => {
    const [isOpened, setOpened] = React.useState(false);
    const [emailFormEl, setEmailFormEl] = React.useState(null);

    const closeHandler = () => setOpened(false);

    const openEmailForm = () => {
        import('./FormContainer')
            .then((module) => module.default)
            .then((emailFormModule) =>
                setEmailFormEl(
                    React.createElement(emailFormModule, {
                        onClose: closeHandler,
                    })
                )
            )
            .then(() => setOpened(true));
    };

    const renderSuspense = () => (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <React.Suspense fallback="Загрузка...">
                <EmailFormContainer onClose={closeHandler} />
            </React.Suspense>
        </ErrorBoundary>
    );

    return (
        <>
            <header className="header">
                <p>App Host</p>
            </header>
            <main>
                <button onClick={openEmailForm}>Написать письмо</button>
                {isOpened && emailFormEl}
            </main>
        </>
    );
};
