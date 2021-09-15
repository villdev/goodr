export const InputFields = ({labelName, name, type,defaultValue, onChangeOperation}) => {
    return (
        <div className="my-5 text-sm">
            <label htmlFor={name} className="block text-gray-600">{labelName}</label>
            <input 
                id={name} 
                type={type}
                name={name}
                defaultValue={defaultValue}                       
                onChange={(e) => onChangeOperation(e)}
                className="rounded font-normal px-4 py-2 mt-1 focus:outline-none bg-gray-100 w-full" 
                placeholder={labelName} 
            />
        </div>
    )
}