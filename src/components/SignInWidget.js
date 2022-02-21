import { useEffect, useState } from "react";
import avatar from "../images/blank_avatar.webp";

const SignInWidget = (props) => {
  const userSignedIn = false;
  const [profilePic, setProfilePic] = useState(avatar);

  return (
    <div>
      <div className='profile-pic--wrapper'>
        <img src={userSignedIn ? profilePic : profilePic} alt='' />
      </div>
    </div>
  );
};

export default SignInWidget;
