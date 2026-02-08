import React from "react";
import PropTypes from "prop-types";
import { Button } from "../atoms/Button";
import { InputField } from "../atoms/InputField";
import GoogleLogoUrl from "../../assets/GoogleLogo.svg";

/**
 * Organism representing a Sign Up/Login Authentication Form.
 */
export const SignUpAuthForm = ({
  initialMode = "login",
  onLogin,
  onSignup,
  onGoogleAction,
  className = "",
  ...props
}) => {
  const [mode, setMode] = React.useState(initialMode);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const isLogin = mode === "login";

  // Internal handler for Login Button
  const handleLogin = (e) => {
    e?.preventDefault();
    if (!isLogin) {
      setMode("login");
    } else {
      if (onLogin) {
        onLogin({ email, password });
      }
    }
  };

  // Internal handler for Signup Button
  const handleSignup = (e) => {
    e?.preventDefault();
    if (isLogin) {
      setMode("signup");
    } else {
      if (onSignup) {
        onSignup({ email, password, confirmPassword });
      }
    }
  };

  // Wrapper for the Google Icon to be used as a component in Button
  const GoogleIcon = (props) => (
    <img src={GoogleLogoUrl} alt="Google" {...props} />
  );

  return (
    <form
      className={`card-container section-gap flex flex-col h-full ${className}`}
      onSubmit={(e) => e.preventDefault()}
      {...props}
    >
      <span className="font-display-sm md:font-display-md w-full text-center text-content-base">
        Create an account to store your promise
      </span>
      <div className="w-full h-[1px] bg-surface-200" />
      <div className="form-width flex flex-col items-stretch justify-center flex-1 gap-y-xsm">
        <InputField
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className={`grid transition-all duration-500 ease-out ${
            isLogin
              ? "grid-rows-[0fr] opacity-0"
              : "grid-rows-[1fr] opacity-100"
          }`}
        >
          <div className="overflow-hidden">
            <InputField
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-xsm"
            />
          </div>
        </div>
        <Button
          label="Log In"
          style={isLogin ? "solid" : "outline"}
          onClick={handleLogin}
          className="w-full"
        />
        <Button
          label="Sign Up"
          style={isLogin ? "outline" : "solid"}
          onClick={handleSignup}
          className="w-full"
        />
        <Button
          label="Continue with Google"
          style="solid"
          iconLeft={GoogleIcon}
          onClick={onGoogleAction}
          className="w-full"
        />
      </div>
    </form>
  );
};

SignUpAuthForm.propTypes = {
  /**
   * The initial mode of the form
   */
  initialMode: PropTypes.oneOf(["login", "signup"]),
  /**
   * Login handler
   */
  onLogin: PropTypes.func,
  /**
   * Signup handler
   */
  onSignup: PropTypes.func,
  /**
   * Google Auth action handler
   */
  onGoogleAction: PropTypes.func,
  /**
   * Additional tailwind classes
   */
  className: PropTypes.string,
};
