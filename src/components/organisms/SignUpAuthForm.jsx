import React from "react";
import PropTypes from "prop-types";
import { Button } from "../atoms/Button";
import { InputField } from "../atoms/InputField";
import GoogleLogoUrl from "../../assets/GoogleLogo.svg";

/**
 * Organism representing a Sign Up/Login Authentication Form.
 */
export const SignUpAuthForm = ({
  type = "login",
  onLogin,
  onSignup,
  onGoogleAction,
  className = "",
  ...props
}) => {
  const isLogin = type === "login";

  // Wrapper for the Google Icon to be used as a component in Button
  const GoogleIcon = (props) => (
    <img src={GoogleLogoUrl} alt="Google" {...props} />
  );

  return (
    <form
      className={`flex flex-col gap-xsm w-full max-w-[448px] ${className}`}
      onSubmit={(e) => e.preventDefault()}
      {...props}
    >
      <InputField type="email" placeholder="Email Address" />
      <InputField type="password" placeholder="Password" />
      {!isLogin && (
        <InputField type="password" placeholder="Confirm Password" />
      )}
      <Button
        label="Log In"
        style={isLogin ? "solid" : "outline"}
        onClick={onLogin}
      />
      <Button
        label="Sign Up"
        style={isLogin ? "outline" : "solid"}
        onClick={onSignup}
      />
      <Button
        label="Continue with Google"
        style="solid"
        iconLeft={GoogleIcon}
        onClick={onGoogleAction}
      />
    </form>
  );
};

SignUpAuthForm.propTypes = {
  /**
   * The mode of the form
   */
  type: PropTypes.oneOf(["login", "signup"]),
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
