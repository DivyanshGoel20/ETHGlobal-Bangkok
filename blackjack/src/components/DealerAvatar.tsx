export const DealerAvatar = ({ name }: { name: string }) => {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 overflow-hidden">
                <img
                    src="./dealer.svg"
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-white text-sm helvetica">{name}</div>
        </div>
    );
};
