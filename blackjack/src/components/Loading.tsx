import { SyncLoader } from "react-spinners";

const Loading = ({ loading = true }: { loading: boolean | undefined }) => {
    return (
        <div>
            <SyncLoader
                color="#ffffff"
                loading={loading}
                size={10}
                speedMultiplier={0.5}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loading;
