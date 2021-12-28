import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type Props = {
    onClose: () => void;
};

// @ts-ignore
const RemoteEmailForm = React.lazy(() => import('app1/App'));

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div>
            <p>{error.message}</p>
        </div>
    );
}

const initialFormState = {
    type: 'host',
    email: '',
    text: '',
};

type FormData = typeof initialFormState;

export const Form: React.FC<Props> = (props) => {
    const [formState, setFormState] = React.useState<FormData>(initialFormState);

    const onSubmitHandler = (e: React.FormEvent, values: FormData) => {
        e.preventDefault();
        setFormState((prevState) => ({
            ...prevState,
            email: values.email,
            text: values.text,
        }));
    };

    return (
        <div className="form-container">
            <pre>{JSON.stringify(formState, null, 2)}</pre>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <React.Suspense fallback="Загрузка...">
                    <RemoteEmailForm onSubmit={onSubmitHandler} />
                </React.Suspense>
            </ErrorBoundary>
            <button onClick={props.onClose}>Закрыть</button>
        </div>
    );
};

export default Form;
