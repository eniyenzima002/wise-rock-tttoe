import { useState } from 'react';
import useRegister from '../hooks/useRegister';
import useLogin from '../hooks/useLogin';

const UserAuth = () => {
  const { handleRegisterValue, handleRegisterUser, isRegisterLoading, formRegister } = useRegister();
  const { handleLoginValue, handleLoginUser, isLoginLoading, formLogin } = useLogin();

  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-md drop-shadow-2xl bg-gray-400 border border-cyan-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <div className="border border-dashed border-cyan-700 p-3 rounded-md">
          <h1 className="pb-3 text-xl font-semibold text-center text-cyan-400">
            <span className="text-2xl text-green-400">Wise Rock </span>- Tic Tac
            Toe
          </h1>
          <h2 className="text-3xl font-semibold text-center text-gray-300">
            {!showRegister ? 'Login' : 'Sign Up'}
          </h2>
        </div>
        {/* ------------FORM--------- */}
        <form>
          {showRegister && (
            <div>
              <label className="label p-2">
                <span className="text-gray-300 text-base label-text">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email..."
                className="input bg-cyan-950 input-ghost text-sm w-full text-slate-400"
                value={formRegister.email}
                onChange={handleRegisterValue}
              />
            </div>

            // ------- EMAIL FOR SIGN ------
          )}

          {!showRegister && (
            <div>
              <label className="label p-2">
                <span className="text-gray-300 text-base label-text">
                  Username
                </span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="@username..."
                className="input bg-cyan-950 input-ghost text-sm w-full text-slate-400"
                value={formLogin.username}
                onChange={handleLoginValue}
              />
            </div>
          )}

          {/* --------- PASSWORD HANDLE --------- */}

          {!showRegister ? (
          <div>
            <label className="label p-2">
              <span className="text-gray-300 text-base label-text">
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password..."
              className="input bg-cyan-950 input-ghost text-sm w-full text-slate-400"
              value={formLogin.password}
              onChange={handleLoginValue}
            />
          </div>
          ) : (
            <div>
              <label className="label p-2">
                <span className="text-gray-300 text-base label-text">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password..."
                className="input bg-cyan-950 input-ghost text-sm w-full text-slate-400"
                value={formRegister.password}
                onChange={handleRegisterValue}
              />
            </div>
          )}
          

          {/* ------- USERNAME & PASSWORD(rel->signUp) FOR LOGIN ------ */}

          {showRegister && (
            <div>
              <label className="label p-2">
                <span className="text-gray-300 text-base label-text">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password..."
                className="input bg-cyan-950 input-ghost text-sm w-full text-slate-400"
                value={formRegister.confirmPassword}
                onChange={handleRegisterValue}
              />
            </div>

            // ------- CONFIRM PASSWORD FOR SIGN ------
          )}

          {!showRegister ? (
            <span
              className="text-gray-300 text-sm hover:underline hover:text-cyan-600 mt-2 inline-block cursor-pointer"
              onClick={() => setShowRegister(true)}
            >
              {"Don't"} have an account? - Sign Up
            </span>
          ) : (
            <span
              className="text-gray-300 text-sm hover:underline hover:text-cyan-600 mt-2 inline-block cursor-pointer"
              onClick={() => setShowRegister(false)}
            >
              Already have an account? - Login
            </span>
          )}

          <div>
            {!showRegister ? (
              // ----- ACTION BUTTONS ------

              <button
                className="btn btn-active bg-cyan-950 border-none btn-block btn-md text-xl mt-4 hover:bg-cyan-800 hover:text-gray-300"
                type="button"
                onClick={handleLoginUser}
                disabled={isLoginLoading}
              >
                {isLoginLoading ? (
                  <span className="loading loading-spinner loading-md text-white"></span>
                ) : (
                  'Login'
                )}
              </button>
            ) : (
              <button
                className="btn btn-active bg-cyan-950 border-none btn-block btn-md text-xl mt-4 hover:bg-cyan-800 hover:text-gray-300"
                type="button"
                onClick={() => handleRegisterUser()}
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? (
                  <span className="loading loading-spinner loading-md text-white"></span>
                ) : (
                  'Sign Up'
                )}
              </button>
            )}
          </div>
        </form>
        {/* ----------- END -- FORM ------------- */}
      </div>
    </div>
  );
};
export default UserAuth;
