import SignInWidget from "./SignInWidget";

const Header = ({ user }) => {
  return (
    <header>
      <SignInWidget user={user} />
    </header>
  );
};

export default Header;
