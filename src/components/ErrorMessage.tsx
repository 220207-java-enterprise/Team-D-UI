interface IErrorMessage {
    errorMessage: string
}

function ErrorMessage(props: IErrorMessage) {
    return (<p className="m-3 text-danger">{props.errorMessage}</p>)
}

export default ErrorMessage;