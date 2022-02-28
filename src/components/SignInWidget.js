import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase-config";
import avatar from "../images/blank_avatar.webp";

const SignInWidget = ({ user }) => {
  const [profilePic, setProfilePic] = useState(avatar);

  useEffect(() => {
    setProfilePic(user?.photoURL || avatar);
  }, [user]);

  async function handleUserLogin() {
    if (user) {
      await signOut(auth);
    } else {
      await signInWithPopup(auth, googleProvider);
    }
  }

  return (
    <div className='sign-in--widget'>
      <div className='sign-in--username'>
        {user ? user.displayName : "Login"}
      </div>
      <div className='profile-pic--wrapper' onClick={handleUserLogin}>
        <img src={profilePic} referrerPolicy='no-referrer' alt='' />{" "}
      </div>
    </div>
  );
};

export default SignInWidget;
