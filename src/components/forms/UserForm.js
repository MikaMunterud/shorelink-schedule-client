import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function UserForm({
  heading,
  handleSubmit,
  username,
  setUsername,
  password1,
  setPassword1,
  password2,
  setPassword2,
  autoCompletePassword,
  buttonValue,
  passwordAuthentication,
}) {
  const [inputType1, setInputType1] = useState("password");
  const [inputType2, setInputType2] = useState("password");

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form_heading">{heading}</h2>
      <label htmlFor="username">Användarnamn:</label>
      <input
        id="username"
        type="text"
        placeholder="Användarnamn"
        autoComplete="username"
        minLength={3}
        maxLength={50}
        value={username}
        onChange={function (event) {
          setUsername(event.target.value);
        }}
        required
      />
      <div className="inputPasswordRow">
        <label htmlFor="password1">Lösenord:</label>

        {inputType1 === "password" ? (
          <BsFillEyeFill
            onMouseDown={function () {
              setInputType1("text");
            }}
          />
        ) : (
          <BsFillEyeSlashFill
            onMouseUp={function () {
              setInputType1("password");
            }}
          />
        )}
      </div>

      <input
        id="password1"
        type={inputType1}
        placeholder="Lösenord"
        autoComplete={autoCompletePassword}
        minLength={6}
        maxLength={50}
        value={password1}
        onChange={function (event) {
          setPassword1(event.target.value);
        }}
        required
      />

      {passwordAuthentication && (
        <>
          <div className="inputPasswordRow">
            <label htmlFor="password2">Bekräfta lösenord:</label>

            {inputType2 === "password" ? (
              <BsFillEyeFill
                onMouseDown={function () {
                  setInputType2("text");
                }}
              />
            ) : (
              <BsFillEyeSlashFill
                onMouseUp={function () {
                  setInputType2("password");
                }}
              />
            )}
          </div>

          <input
            id="password2"
            type={inputType2}
            placeholder="Bekräfta lösenord"
            autoComplete={autoCompletePassword}
            minLength={6}
            maxLength={50}
            value={password2}
            onChange={function (event) {
              setPassword2(event.target.value);
            }}
            required
          />
        </>
      )}
      <input type="submit" className="submitButton" value={buttonValue} />
    </form>
  );
}
