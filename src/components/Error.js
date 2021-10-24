const Error = ({ error }) => {
    if (error.failed) {
        return <p>{error.failed.message}. Please try again later.</p>
    }
    if (!error.statusOk) {
        return <p>Something is wrong with a response. Please try again later.</p>
    }
}

export default Error
