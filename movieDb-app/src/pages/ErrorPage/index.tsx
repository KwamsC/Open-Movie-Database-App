interface ErrorProps {
	message: string;
}

const ErrorPage = ({ message }: ErrorProps) => {
	return (
		<div className="min-h-screen rounded-2xl bg-black/20 p-20 md:m-6 my-3">
			<div>Error: {message}</div>
		</div>
	);
};

export default ErrorPage;
