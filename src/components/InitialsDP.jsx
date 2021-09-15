export const InitialDP = ({name, size, fontSize}) => {

    const initials = name?.split(" ").map((word) => word[0]).join("").toUpperCase();

    return (
        <div className={`w-${size} h-${size} py-2 px-3 bg-blue-500 flex justify-center items-center rounded-md`}>
            <div className={`text-center text-white font-light ${fontSize}`}>{initials}</div>
        </div>
    )
}