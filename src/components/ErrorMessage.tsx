interface IErrorMessage {
    errorMessage: string
}

function ErrorMessage(props: IErrorMessage) {
    return (<p className="text-danger">{props.errorMessage}</p>)
}

export default ErrorMessage;