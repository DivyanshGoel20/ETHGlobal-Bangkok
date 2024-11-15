import { SyncLoader } from "react-spinners";

const Loading = ({ loading = true }: { loading: boolean | undefined }) => {
    return (
        <div>
            <SyncLoader
                color="#F8DDA4"
                loading={loading}
                size={10}
                speedMultiplier={1}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loading;
