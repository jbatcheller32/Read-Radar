import { useState } from "react";
import { useMutation } from '@apollo/client';

import { ADD_PROFILE } from '../../utils/mutations';
import { QUERY_PROFILES } from '../../utils/queries';


const ProfileForm = () => {
    const [name, setName] = useState('');

    const [addProfile, { error }] = useMutation(ADD_PROFILE, {
        refetchQueries: [
            QUERY_PROFILES,
            'allProfiles'
        ]
    });




    const handleFormSubmit = async (e) => {
        e.preventDefault();


        try {
            // eslint-disable-next-line no-unused-vars
            const { data } = await addProfile({
                variables: { name },
            });

            setName('');
        } catch (err) {
            console.error(err);
        }
    }



    return (
        <div>
            <h3>Create Your Profile</h3>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9">
                    <input
                        placeholder="Add your profile name..."
                        value={name}
                        className="form-input w-100"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className="col-12 col-lg-3">
                    <button className="btn btn-info btn-block py-3" type="submit">
                        Add Profile
                    </button>
                </div>
                {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                        Something went wrong...
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileForm;
