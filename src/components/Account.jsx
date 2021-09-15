import { InputFields } from ".";

export const Account = ({passwordUpdateInputs, updatePassword, profileStatus}) => {
    return (
        <div className="bg-white rounded-md p-4 my-8">
            <h1 className="text-2xl mt-3">Change Password</h1>
            <form className="mt-6">
                <InputFields
                    labelName={"Current Password"}
                    name={"oldPassword"}
                    type={"password"}
                    onChangeOperation={passwordUpdateInputs}
                />
                <InputFields
                    labelName={"New Password"}
                    name={"newPassword"}
                    type={"password"}
                    onChangeOperation={passwordUpdateInputs}
                />
                <button
                    onClick={(e) => {e.preventDefault(); updatePassword();}} 
                    className="block text-center text-white bg-gray-800 p-3 duration-300 rounded hover:bg-black w-full">
                        {profileStatus === "updating password" ? <i className="animate-spin bx bx-loader-alt font-thin"></i> : "Update"}  
                </button>
            </form>
        </div>
    )
}