interface IErrorMessage {
    errorMessage: string
}

function ErrorMessage(props: IErrorMessage) {
    return (<p className="alert">{props.errorMessage}</p>)
}

export default ErrorMessage;