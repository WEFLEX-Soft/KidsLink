import { RiKakaoTalkFill } from "react-icons/ri";
import LoginHeader from "../../components/login/LoginHeader";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAppStore from "../../stores/store";
import { login as loginAPI } from "../../api/member";

export default function LoginCenterPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const setUserType = useAppStore((state) => state.setUserType);

    useEffect(() => {
        const state = location.state;

        if (state) {
            const { accessToken, expiredAt, role } = state;

            if (accessToken && expiredAt) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("expiredAt", expiredAt);

                setUserType(role);
            }
        }
    }, [location.state]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hide, setHide] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await loginAPI({ username, password });

            setUserType(data.role);

            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);

            setError("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleSocialLogin = (provider: string) => {
        window.location.href = `${import.meta.env.VITE_API}/oauth2/authorization/${provider}`;
    };

    return (
        <>
            <LoginHeader />

            <div className="min-h-[calc(100vh-85px)] mt-[85px] bg-[#edf1f4] flex items-center justify-center px-4">
                <div className="w-full max-w-[560px] bg-white rounded-[10px] shadow-sm px-[70px] py-[60px]">

                    {/* Title */}
                    <div className="mb-10">
                        <h1 className="text-[46px] font-bold text-[#222] leading-tight">
                            Back to your digital life origin/feature/login
                        </h1>

                        <p className="text-[20px] text-[#777] mt-3">
                            Choose one of the option to go
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="flex flex-col">

                        {/* Email */}
                        <input
                            type="text"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            className="
                w-full
                h-[74px]
                rounded-[14px]
                border
                border-[#cfd6dc]
                px-7
                text-[22px]
                text-[#222]
                outline-none
                focus:border-[#7eb2ff]
                transition-all
                mb-5
              "
                        />

                        {/* Password */}
                        <div className="relative mb-7">
                            <input
                                type={hide ? "password" : "text"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                className="
                  w-full
                  h-[74px]
                  rounded-[14px]
                  border
                  border-[#e1e1e1]
                  px-7
                  pr-16
                  text-[22px]
                  text-[#222]
                  outline-none
                  focus:border-[#7eb2ff]
                  transition-all
                "
                            />

                            <button
                                type="button"
                                onClick={() => setHide(!hide)}
                                className="
                  absolute
                  right-6
                  top-1/2
                  -translate-y-1/2
                  text-[#777]
                  text-[24px]
                "
                            >
                                {hide ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center mb-8">
                            <div className="flex-1 h-[1px] bg-[#e5e5e5]" />

                            <span className="px-4 text-[18px] text-[#888]">
                Or continue with
              </span>

                            <div className="flex-1 h-[1px] bg-[#e5e5e5]" />
                        </div>

                        {/* Social Login */}
                        <div className="flex gap-4 mb-10">

                            {/* Google */}
                            <button
                                type="button"
                                onClick={() => handleSocialLogin("google")}
                                className="
                  flex-1
                  h-[78px]
                  rounded-[12px]
                  bg-[#f7f7f7]
                  border
                  border-[#ececec]
                  flex
                  items-center
                  justify-center
                  hover:bg-[#f0f0f0]
                  transition-all
                "
                            >
                                <FcGoogle className="text-[34px]" />
                            </button>

                            {/* Kakao / Meta 느낌 */}
                            <button
                                type="button"
                                onClick={() => handleSocialLogin("kakao")}
                                className="
                  flex-1
                  h-[78px]
                  rounded-[12px]
                  bg-[#f7f7f7]
                  border
                  border-[#ececec]
                  flex
                  items-center
                  justify-center
                  hover:bg-[#f0f0f0]
                  transition-all
                "
                            >
                                <RiKakaoTalkFill className="text-[34px] text-[#222]" />
                            </button>

                            {/* Apple */}
                            <button
                                type="button"
                                className="
                  flex-1
                  h-[78px]
                  rounded-[12px]
                  bg-[#f7f7f7]
                  border
                  border-[#ececec]
                  flex
                  items-center
                  justify-center
                  hover:bg-[#f0f0f0]
                  transition-all
                "
                            >
                                <FaApple className="text-[34px] text-black" />
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-500 text-[16px] mb-5 text-center">
                                {error}
                            </p>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="
                w-full
                h-[76px]
                rounded-[14px]
                bg-[#1565f9]
                hover:bg-[#0052f0]
                text-white
                text-[24px]
                font-semibold
                transition-all
              "
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}